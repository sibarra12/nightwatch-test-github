const {Given, When, Then , defineStep , And=defineStep} = require('@cucumber/cucumber')

Given("estoy en la pagina de continental",()=>{
    const loginPage = browser.page.LoginPage()
    loginPage.navigate()
})

When("ingreso el usuario {string}",(user)=>{
    const loginPage = browser.page.LoginPage()
    loginPage.inputUser(user)
})

And("ingreso el password {string}",(password)=>{
    const loginPage = browser.page.LoginPage()
    loginPage.inputPassword(password)
})

And("hago click en el login button", ()=>{
    const loginPage = browser.page.LoginPage()
    loginPage.clickOnLoginBtn()
})

Then("se visualiza el ingreso al dashboard",()=>{
    const loginPage = browser.page.LoginPage()
    const homePage = browser.page.HomePage()
    loginPage.validateDashboard()
    homePage.enterUserManagement()
})
