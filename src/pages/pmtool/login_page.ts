// src/pages/pmtool/login_page.ts

import { expect, Locator, Page, test } from "@playwright/test";
import { DashboardPage } from "./dashboard_page.ts";
import { LostPasswordPage } from "./lost_password_page.ts";

export class LoginPage {
  private readonly page: Page;
  private readonly url = "https://tredgate.com/pmtool"; // ? Použijeme jen na prvním PO (LoginPage), odkud budeme PMTool otevírat
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly passwordForgottenButton: Locator;
  private readonly pageHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("//input[@id='username']");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator('[type="submit"]');
    this.passwordForgottenButton = page.locator("#forget_password");
    this.pageHeader = page.locator("h3.form-title");
  }

  // Při vytváření metod doporučím přístup začít s atomickými (malými) metodami s jedním krokem a pak vytvářet sdružující metody
  // Například: typeUsername - jeden krok, login - sdružení více kroků
  // Atomické metody používáme, když danou funkcionalitu testujeme a sdružující metody například pro preconditions jiných testů

  // ? Typová anotace `Promise<this>` není povinná, určí se implicitně -> doporučení: dávat ke složitějším metodám
  async open(): Promise<this> {
    await this.page.goto(this.url);
    return this;
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
    return this;
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
    return this;
  }

  async clickLogin() {
    await this.loginButton.click();
    return new DashboardPage(this.page);
  }

  async login(username: string, password: string) {
    await test.step("Login to Pmtool", async () => {
      await this.fillUsername(username);
      await this.fillPassword(password);
      await this.clickLogin();
    });

    return new DashboardPage(this.page);
  }

  async clickPasswordForgotten() {
    await this.passwordForgottenButton.click();
    return new LostPasswordPage(this.page);
  }

  async assertLoginHeader(headerText: string) {
    await test.step("Assert Login Header", async () => {
      await expect(this.pageHeader, "Page Header is Visible").toBeVisible();
      await expect(this.pageHeader, "Page Header has Text").toHaveText(
        headerText,
      );
    });

    return this;
  }
}
