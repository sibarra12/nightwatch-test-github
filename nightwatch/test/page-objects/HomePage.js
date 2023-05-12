
const homeCommands = {

    enterUserManagement() {
        this.waitForElementVisible('@user_management_section')
        this.click('@user_management_section');
        return this; 
    }
  };
  
  module.exports = {
    commands: [
      homeCommands
    ],
    elements: {
      user_management_section:  '[data-cy="/users"]',

    }
  };
  