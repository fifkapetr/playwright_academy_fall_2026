import { expect, Locator, Page } from "@playwright/test";

export class DashboardPage {
  private readonly page: Page;
  private readonly profileButton: Locator;
  private readonly logoutButton: Locator;
  private readonly notificationButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profileButton = this.page.locator("#user_dropdown");
    this.logoutButton = this.page.locator("#logout");
    this.notificationButton = this.page.locator("#user_notifications_report");
  }

  async clickProfile() {
    await expect(this.notificationButton).toBeVisible();
    await this.profileButton.click();
  }

  async clickLogout() {
    await this.logoutButton.click();
  }

  async logout() {
    await this.clickProfile();
    await this.clickLogout();
  }
}
