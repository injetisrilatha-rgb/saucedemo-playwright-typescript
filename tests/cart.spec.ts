import { test, expect } from '../fixtures/test';
import { CartPage } from '../pages/CartPage';

//Shopping cart test suite covering product management and sorting
test.describe('Shopping cart', () => {
  //TC05: Verify that multiple products can be added to the cart
  //and that the cart displays the correct products and item count
  test('TC05 - add multiple products and verify cart contents', async ({ loggedInInventory, page }) => {
    await loggedInInventory.addProduct('Sauce Labs Backpack');
    await loggedInInventory.addProduct('Sauce Labs Bike Light');

    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('2');
    await loggedInInventory.openCart();

    const cart = new CartPage(page);
    await cart.expectLoaded();
    await cart.expectItemCount(2);
    await cart.expectItemVisible('Sauce Labs Backpack');
    await cart.expectItemVisible('Sauce Labs Bike Light');
  });

  // TC06: Verify that a product can be removed from the cart
  //and that the cart badge is updated correctly
  test('TC06 - remove a product from the cart', async ({ loggedInInventory, page }) => {
    await loggedInInventory.addProduct('Sauce Labs Backpack');
    await loggedInInventory.openCart();

    const cart = new CartPage(page);
    await cart.expectItemCount(1);
    await cart.removeItem('Sauce Labs Backpack');
    await cart.expectItemCount(0);
    await expect(page.getByTestId('shopping-cart-badge')).toHaveCount(0);
  });

  //TC04: Verify that products are sorted by price in ascending order
  test('TC04 - sort products by price from low to high', async ({ loggedInInventory, page }) => {
    await loggedInInventory.sortBy('lohi');
    const prices = await page.locator('.inventory_item_price').allTextContents();
    const numericPrices = prices.map(value => Number(value.replace('$', '')));
    expect(numericPrices).toEqual([...numericPrices].sort((a, b) => a - b));
  });
});
