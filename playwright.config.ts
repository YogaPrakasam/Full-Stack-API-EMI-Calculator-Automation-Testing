import "dotenv/config";
import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: "./tests",
    fullyParallel: true,
    retries: 0,

    reporter: [
        ["list"],
        ["html", {
            outputFolder: "playwright-report",
            open: "never"
        }]
    ],

    use: {
        baseURL: process.env.API_BASE_URL || "http://localhost:3000",
        trace: "retain-on-failure"
    }
});