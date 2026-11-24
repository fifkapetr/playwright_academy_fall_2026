// tests/learning/iframe/handling_iframe.spec.ts
import { test } from "@playwright/test";

test("Handling Iframes", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/web-actions.html");
  // await page.locator("#name").fill("Jsem v iframe"); // ! Nebude fungovat, test spadne na timeoutu
  const frame = page.frameLocator('[data-testid="test-automation-iframe"]');
  await frame.locator("#name").fill("Jsem v iframe");
  // ? Pokud už v iframe nepracuji, použiju zase page
  await page.locator('[data-testid="new-domain-link"]').click();
});
