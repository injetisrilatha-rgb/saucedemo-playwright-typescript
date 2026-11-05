import { Page, Locator, expect } from '@playwright/test';

//Page Object Model for the shopping cart page.
//Encapsulates cart-related locators, actions and assertions
export class CartPage {
  readonly title: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(private readonly page: Page) {
    //Initialize shopping-cart page locators
    this.title = page.getByTestId('title');
    this.checkoutButton = page.getByTestId('checkout');
    this.continueShoppingButton = page.getByTestId('continue-shopping');
  }

  //Locate a specific product inside the shopping cart
  item(name: string): Locator {
    return this.page.locator('.cart_item').filter({
      has: this.page.getByText(name, { exact: true })
    });
  }

  //Verify that the shopping cart page is displayed
  async expectLoaded() {
    await expect(this.title).toHaveText('Your Cart');
  }

  //Verify the expected number of products in the cart
  async expectItemCount(count: number) {
    await expect(this.page.locator('.cart_item')).toHaveCount(count);
  }

  //Verify that a particular product is present in the cart
  async expectItemVisible(name: string) {
    await expect(this.item(name)).toBeVisible();
  }

  //Remove a specific product from the cart
  async removeItem(name: string) {
    await this.item(name).getByRole('button', { name: 'Remove' }).click();
  }

  //Proceed from the cart to the checkout process
  async checkout() {
    await this.checkoutButton.click();
  }
}
