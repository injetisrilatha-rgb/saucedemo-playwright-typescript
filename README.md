# SauceDemo UI Automation – Playwright + TypeScript

## 1. Project Overview

This project demonstrates UI test automation for the SauceDemo e-commerce application using **Playwright Test and TypeScript**.

The automation suite covers critical customer journeys, including user authentication, product browsing and sorting, shopping cart operations, and checkout.

**Application Under Test:** https://www.saucedemo.com/

## 2. Technology Stack

- **Playwright Test:** Browser automation, test execution, assertions, and HTML reporting.
- **TypeScript:** Strongly typed and maintainable automation code.
- **Page Object Model (POM):** Separates page locators and actions from test scenarios.
- **Data-Driven Testing:** Reuses test data for multiple login scenarios.
- **Custom Fixtures:** Provides reusable page objects and authenticated application setup.
- **Browser Context Isolation:** Ensures each test runs in an independent browser context.
- **HTML Reporting:** Provides detailed test execution results.

## 3. Test Coverage

The following scenarios are implemented:

| Test ID | Test Scenario | Priority | Type |
|---|---|---|---|
| TC01 | Login with valid standard user | P1 | Positive |
| TC02 | Login with invalid credentials | P1 | Negative |
| TC03 | Login with locked-out user | P1 | Negative |
| TC04 | Sort products by price, low to high | P1 | Positive |
| TC05 | Add multiple products and verify cart | P1 | Positive |
| TC06 | Remove a product from cart | P2 | Positive |
| TC07 | Enter valid checkout information | P1 | Positive |
| TC08 | Attempt checkout with missing first name | P1 | Negative |
| TC09 | Verify checkout overview and total | P1 | Positive |
| TC10 | Finish checkout and verify confirmation | P1 | Positive |

**Note:** The framework contains 9 Playwright test cases covering ten logical test scenarios. TC07, TC09 and TC10 are validated within a single end-to-end checkout test.

**Priority definitions:**
- P1 – Critical business functionality and high-impact scenarios.
- P2 – Important supporting functionality.

## 4. Project Structure

```text
saucedemo-playwright-assignment/
│
├── data/
│   └── users.ts
│
├── fixtures/
│   └── test.ts
│
├── pages/
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
│
├── tests/
│   ├── login.spec.ts
│   ├── cart.spec.ts
│   └── checkout.spec.ts
│
├── package.json
├── package-lock.json
├── playwright.config.ts
├── tsconfig.json
├── .gitignore
└── README.md
```


## 5. Prerequisites

The following tools are required to run this project:

Node.js (version 20 or later; LTS version recommended)

npm (included with Node.js)

Google Chrome browser installed locally

Visual Studio Code or another TypeScript editor

Verify the installation:

node --version
npm --version

## 6. Installation

Clone the repository or open the project directory in a terminal.

Install project dependencies:

npm install

**Note:** This project uses the locally installed Google Chrome browser through the `channel: 'chrome'` setting in `playwright.config.ts`. A separate Playwright-managed Chromium installation is not required for the current configuration.

## 7. Test Execution

Run all tests:
npx playwright test

Run tests with a visible browser:
npx playwright test --headed

Run tests using the Chromium project:
npx playwright test --project=chromium

Run tests with one worker:
npx playwright test --project=chromium --workers=1

Open Playwright UI mode:
npx playwright test --ui

Open the HTML report:
npx playwright show-report

If the default report port is already in use:
npx playwright show-report --port 9324

On Windows PowerShell environments where npm or npx script execution is restricted, use `npm.cmd` and `npx.cmd` instead.

## 8. Test Execution Results

**Latest successful execution:**

| Metric | Result |
|---|---:|
| Total tests | 9 |
| Passed | 9 |
| Failed | 0 |
| Skipped | 0 |
| Browser | Google Chrome |
| Execution mode | Headed |	
| Execution time | 6.9 seconds |

All nine automated test cases passed successfully in the configured Google Chrome browser.

The HTML report provides individual test results and execution details.

## 9. Framework Design and Implementation

### Page Object Model

Each application page is represented by a separate TypeScript class.

Page-specific locators and reusable actions are encapsulated in the `pages/` directory.

This keeps test scenarios readable and reduces duplicated locator definitions.

### Data-Driven Testing

The `data/users.ts` file contains reusable login credentials and checkout information.

Login scenarios use data-driven test execution to validate invalid credentials and locked-out accounts without duplicating test logic.

### Custom Fixtures

The `fixtures/test.ts` file defines reusable Playwright fixtures.

The `loggedInInventory` fixture performs the login operation and verifies that the inventory page has loaded before the test continues.

### Browser Context Isolation

Playwright's built-in page fixture runs each test in an isolated browser context, providing independent cookies, local storage, and session state.

### Assertions and Synchronization

Playwright's auto-retrying `expect` assertions are used to validate:

- Page URLs and titles.
- Login validation messages.
- Product visibility and sorting.
- Shopping cart contents and item count.
- Checkout validation and price calculations.
- Successful order confirmation.

No arbitrary fixed waits are used in the test scenarios.

## 10. Test Data and Assumptions

The project uses SauceDemo's publicly available demonstration accounts:

| User | Username | Password |
|---|---|---|
| Standard user | `standard_user` | `secret_sauce` |
| Locked-out user | `locked_out_user` | `secret_sauce` |
| Invalid user | `invalid_user` | `wrong_password` |

Checkout test information is sample data only. No real customer or payment information is entered.

The checkout price assertions use the following expected values for Sauce Labs Backpack:

- Product price: $29.99
- Tax: $2.40
- Total: $32.39

These values should be updated if the demonstration application's catalog or tax calculation changes.

## 11. Configuration and Reporting

The `playwright.config.ts` file defines:

- Test directory and execution settings.
- Google Chrome browser channel.
- SauceDemo base URL.
- `data-test` as the test ID attribute.
- List and HTML reporters.
- Trace collection on the first retry.
- Screenshots on test failure.
- Headless browser execution by default.

**Note:** Video recording is currently disabled in the Playwright configuration. Screenshots are captured on test failure, and traces are collected on the first retry.

## 12. Future Enhancements

Potential improvements include:

- Cross-browser testing with Firefox and WebKit.
- Responsive viewport testing.
- Additional checkout validation scenarios.
- Accessibility testing.
- CI/CD integration using GitHub Actions.
- Environment-specific configuration and secure credential management.

## 13. Repository Information

GitHub Repository:`saucedemo-playwright-typescript`

The project source code, test scripts, configuration files, and documentation are maintained in this GitHub repository.

## 14. Assignment Summary

This automation framework was developed using Playwright Test and TypeScript to validate critical e-commerce workflows.

The implementation follows the Page Object Model design pattern, uses reusable fixtures and data-driven login scenarios, and takes advantage of Playwright's browser context isolation and auto-waiting assertions.

The suite currently contains nine passing tests covering authentication, product sorting, shopping cart management, and checkout.

The framework is structured to support future enhancements, including cross-browser execution, additional test coverage, and CI/CD integration.
