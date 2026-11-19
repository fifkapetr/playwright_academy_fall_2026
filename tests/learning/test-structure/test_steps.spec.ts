// tests/learning/test-structure/test_steps.spec.ts
import { test } from "@playwright/test";

test("Using test.step", async ({ page }) => {
  await test.step("Open Pmtool", async () => {
    await page.goto("https://tredgate.com/pmtool/");
  });

  await test.step("Login to Pmtool", async () => {
    await page.locator("#username").fill("pw_academy");
    await page.locator("#password").fill("Playwright321!");
    await page.locator('[type="submit"]').click();
  });
});
