import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users } from '../data/users';

//Define custom fixtures available to the test cases
type AppFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  loggedInInventory: InventoryPage;
};

//Extend the standard Playwright test object with reusable fixtures
export const test = base.extend<AppFixtures>({
  //Provide a reusable LoginPage instance
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  
  //Provide a reusable InventoryPage instance
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  //Automatically log in before tests that require an authenticated user
  loggedInInventory: async ({ page }, use) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    //Navigate to the application and authenticate using valid credentials
    await login.goto();
    await login.login(users.standard.username, users.standard.password);

    //Confirm successful login before exposing the fixture to the test
    await inventory.expectLoaded();

    await use(inventory);

    //Playwright creates an isolated browser context for each test,
    //so authentication and cart state do not leak between tests
  }
});

//Export expect so test files can use the same Playwright assertion library
export { expect };
