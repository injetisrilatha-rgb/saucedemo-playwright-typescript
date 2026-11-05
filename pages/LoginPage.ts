import { Page, Locator, expect } from '@playwright/test';

//Page Object Model for the SauceDemo login page
//This class encapsulates page locators and login-related actions

export class LoginPage {
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(private readonly page: Page) {
    //Initialize locators using SauceDemo data-test attributes
    this.username = page.getByTestId('username');
    this.password = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
    this.errorMessage = page.getByTestId('error');
  }

  //Navigate to the application login page
  async goto() {
    await this.page.goto('/');
  }

  //Enter credentials and submit the login form
  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  //Verify that the expected login validation message is displayed
  async expectLoginError(message: string) {
    await expect(this.errorMessage).toContainText(message);
  }
}
