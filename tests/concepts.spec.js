const { test, expect } = require("@playwright/test");

const BASE_URL = "http://127.0.0.1:8000";

test.describe("CarrToons concept variants", () => {
  test("v2 pages render and key links resolve", async ({ page, request }) => {
    const pages = [
      "/v2/index.html",
      "/v2/books.html",
      "/v2/about.html",
      "/v2/resources.html",
    ];

    for (const path of pages) {
      const response = await request.get(`${BASE_URL}${path}`);
      expect(response.ok(), `Expected ${path} to load`).toBeTruthy();
    }

    await page.goto(`${BASE_URL}/v2/index.html`, { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { level: 1 })).toContainText("CarrToons helps kids");
    await page.getByRole("link", { name: "Browse the books" }).click();
    await expect(page).toHaveURL(/\/v2\/books\.html$/);

    await expect(page.locator(".chapter-links li")).toHaveCount(4);
    const pdfResponse = await request.get(`${BASE_URL}/1%20The%20Word%20of%20God%20%20WPDF.pdf`);
    expect(pdfResponse.ok()).toBeTruthy();
  });

  test("v3 tabbed chapter explorer switches panels", async ({ page, request }) => {
    await page.goto(`${BASE_URL}/v3/index.html`, { waitUntil: "networkidle" });

    await expect(page.getByRole("heading", { level: 2 }).first()).toContainText("warm place");
    await expect(page.locator("#panel-word")).toBeVisible();
    await expect(page.locator("#panel-context")).toBeHidden();

    await page.getByRole("tab", { name: "Context" }).click();
    await expect(page.locator("#panel-context")).toBeVisible();
    await expect(page.locator("#panel-word")).toBeHidden();

    await page.getByRole("tab", { name: "Genre" }).click();
    await expect(page.locator("#panel-genre")).toBeVisible();

    const pdfResponse = await request.get(`${BASE_URL}/5%20Genre%20Revised%20copy.pdf`);
    expect(pdfResponse.ok()).toBeTruthy();
  });

  test("v4 Eric-Carle-inspired concept renders and key anchors work", async ({ page, request }) => {
    const response = await request.get(`${BASE_URL}/v4/index.html`);
    expect(response.ok()).toBeTruthy();

    await page.goto(`${BASE_URL}/v4/index.html`, { waitUntil: "networkidle" });

    await expect(page.getByRole("heading", { level: 1 })).toContainText("Warm drawings");
    await expect(page.locator(".nav-disc")).toHaveCount(7);
    await expect(page.locator(".portal")).toHaveCount(3);

    await page.getByRole("link", { name: "Sample Chapters" }).first().click();
    await expect(page).toHaveURL(/#samples$/);

    const pdfResponse = await request.get(`${BASE_URL}/1%20Preface%20.pdf`);
    expect(pdfResponse.ok()).toBeTruthy();
  });

  test("v5 image-led concept renders and keeps the large visual bands intact", async ({ page, request }) => {
    const response = await request.get(`${BASE_URL}/v5/index.html`);
    expect(response.ok()).toBeTruthy();

    await page.goto(`${BASE_URL}/v5/index.html`, { waitUntil: "networkidle" });

    await expect(page.getByRole("heading", { level: 1 })).toContainText("Stories and drawings");
    await expect(page.locator(".wide-band")).toHaveCount(5);
    await expect(page.locator(".wide-band img")).toHaveCount(12);

    await page.getByRole("link", { name: "About Karen" }).click();
    await expect(page).toHaveURL(/#about$/);

    await expect(page.getByRole("link", { name: "Genre" })).toHaveAttribute(
      "href",
      "../5%20Genre%20Revised%20copy.pdf"
    );

    const pdfResponse = await request.get(`${BASE_URL}/5%20Genre%20Revised%20copy.pdf`);
    expect(pdfResponse.ok()).toBeTruthy();
  });

  test("v6 editorial folio renders and section navigation works", async ({ page, request }) => {
    const response = await request.get(`${BASE_URL}/v6/index.html`);
    expect(response.ok()).toBeTruthy();

    await page.goto(`${BASE_URL}/v6/index.html`, { waitUntil: "networkidle" });

    await expect(page.getByRole("heading", { level: 1 })).toContainText("Reading Ledger");
    await expect(page.locator(".rail-nav a")).toHaveCount(5);
    await expect(page.locator(".plate")).toHaveCount(3);
    await expect(page.locator(".shelf-row")).toHaveCount(5);

    await page.getByRole("link", { name: /Karen Carr/i }).first().click();
    await expect(page).toHaveURL(/#karen$/);

    const pdfResponse = await request.get(`${BASE_URL}/1%20Preface%20.pdf`);
    expect(pdfResponse.ok()).toBeTruthy();
  });
});
