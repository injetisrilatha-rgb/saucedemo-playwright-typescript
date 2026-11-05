import { Page, Locator, expect } from '@playwright/test';

//Page Object Model for the inventory/products page
//Contains reusable methods for product and shopping-cart interactions

export class InventoryPage {
  readonly title: Locator;
  readonly cartLink: Locator;
  readonly sortDropdown: Locator;

  constructor(private readonly page: Page) {
    // Initialize inventory-page locators
    this.title = page.getByTestId('title');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.sortDropdown = page.getByTestId('product-sort-container');
  }

  //Locate a specific product by its displayed name
  product(name: string): Locator {
    return this.page.locator('.inventory_item').filter({
      has: this.page.getByText(name, { exact: true })
    });
  }

  //Verify that the inventory page has loaded successfully
  async expectLoaded() {
    await expect(this.title).toHaveText('Products');
  }

  //Add the specified product to the shopping cart
  async addProduct(name: string) {
    await this.product(name).getByRole('button', { name: 'Add to cart' }).click();
  }

  //Remove the specified product from the shopping cart
  async removeProduct(name: string) {
    await this.product(name).getByRole('button', { name: 'Remove' }).click();
  }

  //Navigate to the shopping cart
  async openCart() {
    await this.cartLink.click();
  }

  //Sort products using the selected sorting option
  async sortBy(value: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(value);
  }

  //Verify the number of products displayed on the inventory page
  async expectProductCount(count: number) {
    await expect(this.page.locator('.inventory_item')).toHaveCount(count);
  }
}
