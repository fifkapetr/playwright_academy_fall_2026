import { Locator, Page } from "@playwright/test";

export class LostPasswordPage {
  private readonly page: Page;
  private readonly emailInput: Locator;
  private readonly usernameInput: Locator;
  private readonly sendButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator(
      ":nth-child(3) > .input-icon > .form-control",
    );
    this.usernameInput = page.locator(
      ":nth-child(2) > .input-icon > .form-control",
    );
    this.sendButton = page.locator(".btn-info");
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async clickSend() {
    await this.sendButton.click();
  }
}
