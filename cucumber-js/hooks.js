const {BeforeAll, AfterAll} = require('@cucumber/cucumber');

BeforeAll(async function(testCase) {
  if (!this.client) {
    console.error('Nightwatch instance was not created.');

    return;
  }
  

  this.client.updateCapabilities({
    testCap: 'testing'
  });

  this.browser = await this.client.launchBrowser();
});

AfterAll(async()=>{
  const generation = allure(['generate', 'allure-results', '--clean'])
  generation.on('exit', function(exitCode){
    console.log('Generation is finished with code: ', exitCode)
  })
})

