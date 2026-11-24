import { expect, test } from "@playwright/test";

test("Exercise: Form Actions", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/contact.html");
  const name = "Petr Test";
  const email = "petr@example.org";
  const contactDate = "2026-12-24";
  const roleValue = "instructor";
  const comment = "Bla bla test test";

  await page.locator('[data-testid="input-name"]').fill(name);
  await page.locator('[data-testid="input-email"]').fill(email);
  await page.locator('[data-testid="input-contact-date"]').fill(contactDate);
  await page.locator('[data-testid="select-role"]').selectOption(roleValue);
  await page.locator('[data-testid="textarea-comments"]').fill(comment);
  await page.locator('[data-testid="checkbox-newsletter"]').check();
  await page.locator('[data-testid="button-submit"]').click();
  await expect(
    page.locator("#successBox"),
    `Success Message is Displayed`,
  ).toBeVisible();
});
