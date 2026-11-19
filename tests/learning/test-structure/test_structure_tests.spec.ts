// tests/learning/test-structure/test_structure_tests.spec.ts
import { test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";

test.describe("Test Suite - Login Pmtool", () => {
  const username = "pw_academy";
  const password = "Playwright321!";

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
  });

  test("Pmtool Login", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage
      .fillUsername(username)
      .then((login) => login.fillPassword(password))
      .then((login) => login.clickLogin());
  });

  test("Pmtool Login and Logout", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage
      .login(username, password)
      .then((dashboard) => dashboard.clickProfile())
      .then((dashboard) => dashboard.clickLogout());
  });
});
