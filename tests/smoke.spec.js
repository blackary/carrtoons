const { test, expect } = require("@playwright/test");

const BASE_URL = "http://127.0.0.1:8000";
const V1_URL = `${BASE_URL}/v1/index.html`;

const collectBrokenImages = async (page) =>
  page.locator("img").evaluateAll((images) =>
    images
      .filter((image) => {
        const rect = image.getBoundingClientRect();
        const isVisible = rect.width > 0 && rect.height > 0 && rect.bottom >= 0 && rect.top <= window.innerHeight;
        return isVisible && (!image.complete || image.naturalWidth === 0);
      })
      .map((image) => image.getAttribute("src"))
  );

const collectImageSources = async (page) =>
  page.locator("img").evaluateAll((images) =>
    [...new Set(images.map((image) => image.currentSrc || image.src).filter(Boolean))]
  );

test.describe("CarrToons static site", () => {
  test("root index lists every version and linked pages resolve", async ({ page, request }) => {
    const versionPaths = [
      "/v1/index.html",
      "/v2/index.html",
      "/v3/index.html",
      "/v4/index.html",
      "/v5/index.html",
      "/v6/index.html",
    ];

    await page.goto(BASE_URL, { waitUntil: "networkidle" });

    await expect(page.getByRole("heading", { level: 1 })).toContainText("Six different directions");
    await expect(page.locator(".version-entry")).toHaveCount(6);

    for (const path of versionPaths) {
      const response = await request.get(`${BASE_URL}${path}`);
      expect(response.ok(), `Expected ${path} to load`).toBeTruthy();
    }

    await expect(page.getByRole("link", { name: "Open v1" })).toHaveAttribute("href", "v1/");
    await expect(page.getByRole("link", { name: "Open v5" })).toHaveAttribute("href", "v5/");
    await expect(page.getByRole("link", { name: "Open v6" })).toHaveAttribute("href", "v6/");
  });

  test("v1 desktop: renders content, anchor navigation, and linked PDFs", async ({ page, request }) => {
    const pageErrors = [];
    const consoleErrors = [];
    const failedResponses = [];

    page.on("pageerror", (error) => pageErrors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });
    page.on("response", (response) => {
      if (response.url().startsWith(BASE_URL) && response.status() >= 400) {
        failedResponses.push(`${response.status()} ${response.url()}`);
      }
    });

    await page.goto(V1_URL, { waitUntil: "networkidle" });

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/.+/);
    await expect(page.locator("#purpose-cards .purpose-card")).toHaveCount(3);
    await expect(page.locator("#book-grid .book-card")).toHaveCount(2);
    await expect(page.locator("#sampler-grid .sampler-card")).toHaveCount(4);
    await expect(page.locator("#resource-cloud .resource-bubble")).toHaveCount(4);
    await expect(page.locator("#hero-sparks .hero-spark")).toHaveCount(2);

    const imageSources = await collectImageSources(page);
    for (const source of imageSources) {
      const response = await request.get(source);
      expect(response.ok(), `Expected image to load: ${source}`).toBeTruthy();
    }
    expect(await collectBrokenImages(page)).toEqual([]);

    await page.locator("#hero-actions a").first().click();
    await expect(page).toHaveURL(/#books$/);
    await expect(page.locator("#featured-title")).toContainText("Wise Child and the Word of God");
    await expect(page.locator('.nav-cluster a[data-section-link="books"]').last()).toHaveClass(
      /is-active/
    );

    await page.getByRole("link", { name: "About Karen Carr" }).click();
    await expect(page).toHaveURL(/#about$/);
    await expect(page.locator("#about-title")).toContainText("grandmother still teaching");
    await expect(page.locator('.nav-cluster a[data-section-link="about"]').first()).toHaveClass(
      /is-active/
    );

    await page.getByRole("link", { name: "Other Resources" }).click();
    await expect(page).toHaveURL(/#resources$/);
    await expect(page.locator("#resources-title")).toContainText("wider circle of helps");
    await expect(
      page.locator('.nav-cluster a[data-section-link="resources"]').last()
    ).toHaveClass(/is-active/);

    await page.getByRole("link", { name: "Home" }).first().click();
    await expect(page).toHaveURL(/#home$/);

    const pdfLinks = await page
      .locator('a[target="_blank"]')
      .evaluateAll((links) => [...new Set(links.map((link) => link.href))]);

    for (const url of pdfLinks) {
      const response = await request.get(url);
      expect(response.ok(), `Expected linked document to load: ${url}`).toBeTruthy();
    }

    expect(pageErrors).toEqual([]);
    expect(consoleErrors).toEqual([]);
    expect(failedResponses).toEqual([]);
  });

  test("v1 mobile: menu toggles, closes, and navigates to sections", async ({ browser, request }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    });
    const page = await context.newPage();

    await page.goto(V1_URL, { waitUntil: "networkidle" });

    const menuButton = page.getByRole("button", { name: "Open navigation" });
    const mobileNav = page.locator("#mobile-nav");

    await expect(menuButton).toHaveAttribute("aria-expanded", "false");
    await expect(mobileNav).not.toHaveClass(/is-open/);

    await menuButton.click();
    await expect(menuButton).toHaveAttribute("aria-expanded", "true");
    await expect(mobileNav).toHaveClass(/is-open/);

    await page.locator('#mobile-nav a[data-section-link="books"]').click();
    await expect(page).toHaveURL(/#books$/);
    await expect(menuButton).toHaveAttribute("aria-expanded", "false");
    await expect(mobileNav).not.toHaveClass(/is-open/);
    await expect(page.locator("#featured-title")).toContainText("Wise Child and the Word of God");

    await menuButton.click();
    await page.locator('#mobile-nav a[data-section-link="resources"]').click();
    await expect(page).toHaveURL(/#resources$/);
    await expect(menuButton).toHaveAttribute("aria-expanded", "false");

    const imageSources = await collectImageSources(page);
    for (const source of imageSources) {
      const response = await request.get(source);
      expect(response.ok(), `Expected image to load: ${source}`).toBeTruthy();
    }
    expect(await collectBrokenImages(page)).toEqual([]);

    await context.close();
  });
});
