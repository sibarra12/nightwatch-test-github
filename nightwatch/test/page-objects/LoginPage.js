
const loginCommands = {

    inputUser(user) {
        this.waitForElementVisible('@user_input')
        this.setValue('@user_input', user);
        return this; 
    },
    inputPassword(password) {
      this.waitForElementVisible('@password_input')
      this.setValue('@password_input', password);
      return this; 
    },
    clickOnLoginBtn() {
        this.waitForElementVisible('@login_btn')
        this.click('@login_btn');
        return this; 
    },
    validateDashboard() {
        this.assert.visible('@logo_img')
        return this
    }

  };
  
  module.exports = {
    url: 'https://appqa.clcsoft.com/sign-in',
  
    commands: [
      loginCommands
    ],
    elements: {
      user_input:  '[data-cy="username"] input',
      password_input: '[data-cy="field-password"] input',
      login_btn: '[data-cy="login-button"]',
      logo_img: '[data-cy="nav-logo"]'
    }
  };
  