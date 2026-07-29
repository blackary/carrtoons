const { test, expect } = require("@playwright/test");

const BASE_URL = "http://127.0.0.1:8000";
const PREVIEW_URL = `${BASE_URL}/final-preview`;
const pages = ["index.html", "books.html", "about.html", "resources.html"];

const imageSources = (page) =>
  page.locator("img").evaluateAll((images) =>
    [...new Set(images.map((image) => image.currentSrc || image.src).filter(Boolean))]
  );

test.describe("CarrToons final preview", () => {
  test("all pages render with working navigation and assets", async ({ page, request }) => {
    const pageErrors = [];
    const consoleErrors = [];

    page.on("pageerror", (error) => pageErrors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });

    for (const path of pages) {
      const response = await request.get(`${PREVIEW_URL}/${path}`);
      expect(response.ok(), `Expected ${path} to load`).toBeTruthy();

      await page.goto(`${PREVIEW_URL}/${path}`, { waitUntil: "networkidle" });
      await expect(page.locator(".site-nav .nav-link")).toHaveCount(4);
      await expect(page.locator('.site-nav [aria-current="page"]')).toHaveCount(1);
      await expect(page.locator("h1")).toHaveText(/.+/);

      for (const source of await imageSources(page)) {
        const imageResponse = await request.get(source);
        expect(imageResponse.ok(), `Expected image to load: ${source}`).toBeTruthy();
      }

      const links = await page
        .locator("a[href]")
        .evaluateAll((anchors) => [...new Set(anchors.map((anchor) => anchor.href))]);
      for (const href of links.filter((link) => link.startsWith(BASE_URL))) {
        const linkResponse = await request.get(href);
        expect(linkResponse.ok(), `Expected link to resolve: ${href}`).toBeTruthy();
      }

      const bodyText = (await page.locator("body").innerText()).toLowerCase();
      expect(bodyText).not.toMatch(/\bbuy now\b|\bsubscribe\b|\bshop now\b/);
    }

    expect(pageErrors).toEqual([]);
    expect(consoleErrors).toEqual([]);
  });

  test("home page preserves the visual idea and has three clear paths", async ({ page }) => {
    await page.goto(`${PREVIEW_URL}/index.html`, { waitUntil: "networkidle" });

    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Pictures to help children become wise"
    );
    await expect(page.locator(".collage-wide")).toBeVisible();
    await expect(page.locator(".habit-grid article")).toHaveCount(3);
    await expect(page.locator(".path-grid .path")).toHaveCount(3);

    await page.getByRole("link", { name: /Open the books/ }).click();
    await expect(page).toHaveURL(/\/final-preview\/books\.html$/);
  });

  test("book PDFs and status labels are complete and working", async ({ page, request }) => {
    await page.goto(`${PREVIEW_URL}/books.html`, { waitUntil: "networkidle" });

    await expect(page.locator(".book-entry")).toHaveCount(3);
    await expect(page.locator(".book-meta strong")).toHaveCount(3);
    await expect(page.locator(".document-links a")).toHaveCount(5);

    const pdfLinks = await page
      .locator('.document-links a[target="_blank"]')
      .evaluateAll((links) => [...new Set(links.map((link) => link.href))]);

    for (const href of pdfLinks) {
      const response = await request.get(href);
      expect(response.ok(), `Expected PDF to load: ${href}`).toBeTruthy();
      expect(response.headers()["content-type"]).toContain("application/pdf");
    }
  });

  test("mobile pages fit the viewport and keep navigation visible", async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const page = await context.newPage();

    for (const path of pages) {
      await page.goto(`${PREVIEW_URL}/${path}`, { waitUntil: "networkidle" });
      await expect(page.locator(".site-nav .nav-link")).toHaveCount(4);

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth
      );
      expect(overflow, `Expected no horizontal overflow on ${path}`).toBeLessThanOrEqual(1);
    }

    await page.goto(`${PREVIEW_URL}/index.html`, { waitUntil: "networkidle" });
    await expect(page.locator(".collage-mobile")).toBeVisible();
    await expect(page.locator(".collage-wide")).toBeHidden();

    await context.close();
  });
});
