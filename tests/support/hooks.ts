import {
Before,
After,
setDefaultTimeout,
} from "@cucumber/cucumber";

import { chromium, Browser, Page } from "playwright";

setDefaultTimeout(60 * 1000);

let browser: Browser;

Before(async function () {
browser = await chromium.launch({
headless: false,
});

this.browser = browser;
this.page = await browser.newPage();
});

After(async function () {
if (this.page) {
await this.page.close();
}

if (browser) {
await browser.close();
}
});
