import { expect, Locator, Page, test } from "@playwright/test";
import { LoginPage } from "./login_page.ts";
import { ProjectsPage } from "./projects_page.ts";

export class DashboardPage {
  private readonly page: Page;
  private readonly profileButton: Locator;
  private readonly logoutButton: Locator;
  private readonly notificationButton: Locator;
  private readonly projectsButton: Locator;
  private readonly appNameAnchor: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profileButton = this.page.locator("#user_dropdown");
    this.logoutButton = this.page.locator("#logout");
    this.notificationButton = this.page.locator("#user_notifications_report");
    this.projectsButton = this.page.locator("#Projects");
    this.appNameAnchor = this.page.locator("a.navbar-brand");
  }

  async clickProfile() {
    await expect(this.notificationButton).toBeVisible();
    await this.profileButton.click();
    return this;
  }

  async clickLogout() {
    await this.logoutButton.click();
    return new LoginPage(this.page);
  }

  async logout() {
    await test.step("Logout", async () => {
      await this.clickProfile();
      await this.clickLogout();
    });

    return new LoginPage(this.page);
  }

  async clickProjects() {
    await this.projectsButton.click();
    return new ProjectsPage(this.page);
  }

  async assertAppNameAnchor(appName: string) {
    await expect(
      this.appNameAnchor,
      "App Name Anchor is Visible",
    ).toBeVisible();
    await expect(this.appNameAnchor, "App Name Anchor has Text").toHaveText(
      appName,
    );
    return this;
  }

  async assertProfileButtonVisibility() {
    await expect(this.profileButton, "Profile Button is Visible").toBeVisible();
    return this;
  }
}
