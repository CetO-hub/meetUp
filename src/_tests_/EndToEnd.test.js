import puppeteer from "puppeteer";

describe("show/hide event details", () => {
  let page, browser;
  beforeAll(async () => {
    jest.setTimeout(30000);
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto("http://localhost:3000/");
    await page.waitForSelector(".event-overview");
  });
  afterAll(() => {
    browser.close();
  });
  test("An event element is collapsed by default", async () => {
    const eventDetails = await page.$(".event-overview .details");
    expect(eventDetails).toBe(null);
  });
  test("user can expend an event to see its details", async () => {
    await page.click(".show-details");
    const eventDetails = await page.$(".event-overview .details");
    expect(eventDetails).toBeDefined();
  });
  test("user can collapse the event to hide its details", async () => {
    await page.click(".show-details");
    const eventDetails = await page.$(".event-overview .details");
    expect(eventDetails).toBe(null);
  });
});
