import { test, expect } from '../fixtures/test';
import { users } from '../data/users';
import { InventoryPage } from '../pages/InventoryPage';

//Login test suite covering valid credentials, invalid credentials,
//locked-out users and mandatory-field validation

test.describe('Login', () => {
  //TC01: Verify that a valid standard user can log in successfully
  test('TC01 - standard user can log in successfully', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);

    await expect(page).toHaveURL(/inventory\.html/);
    await new InventoryPage(page).expectLoaded();
  });

  const invalidLoginCases = [
    //TC02: Verify that invalid username and password are rejected
    { title: 'invalid username and password', username: users.invalid.username,
      password: users.invalid.password, message: 'Username and password do not match' },
    { title: 'locked out user', username: users.lockedOut.username,
      password: users.lockedOut.password, message: 'Sorry, this user has been locked out' }
  ];

  for (const scenario of invalidLoginCases) {
    //TC03: Verify that a locked-out user cannot access the application
    test(`TC02/TC03 - ${scenario.title} cannot log in`, async ({ loginPage, page }) => {
      await loginPage.goto();
      await loginPage.login(scenario.username, scenario.password);
      await loginPage.expectLoginError(scenario.message);
      await expect(page).toHaveURL(/\/$/);
    });
  }

  //TC02: Verify that submitting empty credentials displays validation
  test('TC02 - empty credentials show required-field validation', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('', '');
    await loginPage.expectLoginError('Username is required');
  });
});
