import { test, expect } from '../fixtures/test';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { checkoutCustomer } from '../data/users';

// Checkout test suite covering mandatory-field validation
// and the complete order placement workflow

test.describe('Checkout', () => {
  test('TC08 - checkout requires a first name', async ({ loggedInInventory, page }) => {
    await loggedInInventory.addProduct('Sauce Labs Backpack');
    await loggedInInventory.openCart();

    //TC08: Verify that checkout cannot continue without a first name
    const cart = new CartPage(page);
    await cart.checkout();

    const checkout = new CheckoutPage(page);
    await checkout.continue();
    await checkout.expectValidationError('First Name is required');
  });

  //TC07, TC09 and TC10: Verify customer information, order overview, price calculation
  //and successful order confirmation
  test('TC07/TC09/TC10 - complete checkout successfully', async ({ loggedInInventory, page }) => {
    await loggedInInventory.addProduct('Sauce Labs Backpack');
    await loggedInInventory.openCart();

    const cart = new CartPage(page);
    await cart.checkout();

    const checkout = new CheckoutPage(page);
    await checkout.enterCustomerInformation(
      checkoutCustomer.firstName,
      checkoutCustomer.lastName,
      checkoutCustomer.postalCode
    );
    await checkout.continue();
    await checkout.expectOverviewLoaded();

    await expect(page.locator('.cart_item')).toHaveCount(1);
    await expect(page.locator('.summary_subtotal_label')).toContainText('$29.99');
    await expect(page.locator('.summary_total_label')).toContainText('$32.39');

    await checkout.finish();
    await checkout.expectOrderConfirmation();
    await expect(page.getByTestId('complete-text')).toContainText('dispatched');
  });
});
