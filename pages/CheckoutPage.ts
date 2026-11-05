import { Page, Locator, expect } from '@playwright/test';

//Page Object Model for the checkout process
//Handles customer information, validation, order overview and confirmation
export class CheckoutPage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly errorMessage: Locator;

  constructor(private readonly page: Page) {
    //Initialize checkout-page locators
    this.firstName = page.getByTestId('firstName');
    this.lastName = page.getByTestId('lastName');
    this.postalCode = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.finishButton = page.getByTestId('finish');
    this.errorMessage = page.getByTestId('error');
  }

  //Enter customer details into the checkout information form
  async enterCustomerInformation(first: string, last: string, postal: string) {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postalCode.fill(postal);
  }

  //Submit customer information and proceed to the order overview
  async continue() {
    await this.continueButton.click();
  }

  //Verify that the expected checkout validation error is displayed
  async expectValidationError(message: string) {
    await expect(this.errorMessage).toContainText(message);
  }

  //Verify that the order overview page has loaded
  async expectOverviewLoaded() {
    await expect(this.page.getByTestId('title')).toHaveText('Checkout: Overview');
  }

  //Verify successful order completion
  async expectOrderConfirmation() {
    await expect(this.page.getByTestId('complete-header'))
      .toHaveText('Thank you for your order!');
  }

  //Finish the checkout process and place the order
  async finish() {
    await this.finishButton.click();
  }
}
