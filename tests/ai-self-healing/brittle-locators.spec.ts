import { test, expect } from "@playwright/test";

const emiUrl = process.env.EMI_CALCULATOR_URL;

test.describe("AI Self-Healing - Intentionally Brittle Locators", () => {

    test.skip("AI Demo 1 - Incorrect loan amount locator", async ({ page }) => {
        await page.goto(emiUrl!);
        await expect(page.locator("#loan-amount-old")).toBeVisible();
    });

    test.skip("AI Demo 2 - Incorrect interest rate locator", async ({ page }) => {
        await page.goto(emiUrl!);
        await expect(page.locator("#interest-rate-input")).toBeVisible();
    });

    test.skip("AI Demo 3 - Incorrect loan tenure locator", async ({ page }) => {
        await page.goto(emiUrl!);
        await expect(page.locator(".loan-tenure-field")).toBeVisible();
    });

    test.skip("AI Demo 4 - Incorrect EMI result locator", async ({ page }) => {
        await page.goto(emiUrl!);
        await expect(page.locator("#emi-result-card")).toBeVisible();
    });

    test.skip("AI Demo 5 - Incorrect chart locator", async ({ page }) => {
        await page.goto(emiUrl!);
        await expect(page.locator("[data-testid='emi-chart']")).toBeVisible();
    });

});