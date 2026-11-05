import { defineConfig, devices } from '@playwright/test';

//Playwright test configuration
//Defines test execution settings, browser configuration and reporting options
export default defineConfig({
  //Directory containing all automated test specification files
  testDir: './tests',

  //Allows independent test files to run in parallel
  fullyParallel: true,

  //Prevents accidental execution of tests marked with test.only in CI
  forbidOnly: !!process.env.CI,

  //Automatically retries failed tests twice in CI environments
  //No retries are performed during local execution
  retries: process.env.CI ? 2 : 0,

  // Configures the number of parallel workers
  // Uses 2 workers in CI and Playwright's default locally
  workers: process.env.CI ? 2 : undefined,

  //Configures terminal output and HTML test reporting
  //The HTML report is generated without opening automatically
  reporter: [['list'], ['html', { open: 'never' }]],
  
  //Shared browser and application settings for all tests
  use: {

    //Uses the locally installed Google Chrome browser
    channel: 'chrome',

    //Configures Playwright to identify elements using SauceDemo's
    //data-test attributes when using getByTestId()
    testIdAttribute: 'data-test',

    //Base URL of the SauceDemo application
    //Tests can navigate using relative paths instead of full URLs
    baseURL: 'https://www.saucedemo.com',

    //Captures a trace when a test is retried
    //Helps investigate failures using Playwright Trace Viewer
    trace: 'on-first-retry',

    //Captures screenshots only when a test fails
    screenshot: 'only-on-failure',

    // Video recording is disabled to avoid browser-context cleanup
    // issues in the current Windows environment
    video: 'off',

    //Runs tests in headless mode without displaying the browser UI
    //Can be overridden using the --headed command-line option
    headless: true
  },

  //Defines the browser project used for test execution
  projects: [
    {
      //Executes the test suite using Chromium-based Google Chrome
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
