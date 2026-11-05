import { test } from "@playwright/test";
import { LoginPage } from "../../src/pages/pmtool/login_page.ts";

test("Fluent Exercise: E2E lost password", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage
    .open()
    .then((login) => login.clickPasswordForgotten())
    .then((lostPassword) => lostPassword.fillEmail("test@tredgate.cz"))
    .then((lostPassword) => lostPassword.fillUsername("test"))
    .then((lostPassword) => lostPassword.clickSend());
});

test("Fluent Exercise: Open Lost Password Page and Return", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  await loginPage
    .open()
    .then((login) => login.clickPasswordForgotten())
    .then((lostPassword) => lostPassword.clickBack());
});
