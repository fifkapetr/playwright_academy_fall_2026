import { expect, test } from "@playwright/test";
import { LoginPage } from "../../src/pages/pmtool/login_page.ts";

test("Exercise: Asserts", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage
    .open()
    .then((login) => login.login("pw_academy", "Playwright321!"))
    .then((dashboard) => dashboard.clickProjects())
    .then((projects) => projects.clickAddProject());

  const nameInput = page.locator('div[data-testid="Name"] input');
  const saveButton = page.locator("button[type='submit']");

  await expect(nameInput, "Name Input is Visible").toBeVisible();
  await expect(saveButton, "Save Button has Text").toHaveText("Save");
});
