//Centralized test data used across the automation test suite
//Keeping test data separate from test logic improves maintainability

export const users = {
  //Valid SauceDemo user credentials
  standard: {
    username: 'standard_user',
    password: 'secret_sauce'
  },
  //User account that is intentionally locked out
  lockedOut: {
    username: 'locked_out_user',
    password: 'secret_sauce'
  },
  //Invalid credentials used to verify login error handling
  invalid: {
    username: 'invalid_user',
    password: 'wrong_password'
  }
};

//Customer information used during the checkout process
export const checkoutCustomer = {
  firstName: 'Alex',
  lastName: 'Tester',
  postalCode: '11000'
};
