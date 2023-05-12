// Refer to the online docs for more details:
// https://nightwatchjs.org/gettingstarted/configuration/
//

//  _   _  _         _      _                     _          _
// | \ | |(_)       | |    | |                   | |        | |
// |  \| | _   __ _ | |__  | |_ __      __  __ _ | |_   ___ | |__
// | . ` || | / _` || '_ \ | __|\ \ /\ / / / _` || __| / __|| '_ \
// | |\  || || (_| || | | || |_  \ V  V / | (_| || |_ | (__ | | | |
// \_| \_/|_| \__, ||_| |_| \__|  \_/\_/   \__,_| \__| \___||_| |_|
//             __/ |
//            |___/
const fs = require('fs');
const path = require('path');
const Mochawesome = require('mochawesome');
const merge = require('mochawesome-merge');
module.exports = {
  // An array of folders (excluding subfolders) where your tests are located;
  // if this is not specified, the test source must be passed as the second argument to the test runner.
  // See https://nightwatchjs.org/guide/concepts/page-object-model.html
  page_objects_path: ['nightwatch/test/page-objects'],

  // See https://nightwatchjs.org/guide/extending-nightwatch/adding-custom-commands.html
  custom_commands_path: ['nightwatch/support/custom-commands'],

  // See https://nightwatchjs.org/guide/extending-nightwatch/adding-custom-assertions.html
  custom_assertions_path: ['nightwatch/support/custom-assertions'],

  // See https://nightwatchjs.org/guide/extending-nightwatch/adding-plugins.html
  plugins: [],
  
  // See https://nightwatchjs.org/guide/concepts/test-globals.html
  globals_path: "",
  cucumber: {
    require: ['./nightwatch/test/step_definitions'],
    format: ['json:reports/cucumber.json'],
  },
  webdriver: {},
  test_runner: {
    // set cucumber as the runner
    type: 'cucumber',
    // define cucumber specific options
    options: {
      //set the feature path
      feature_path: 'nightwatch/test/features/*.feature',

      // start the webdriver session automatically (enabled by default)
      auto_start_session: true,

      // use parallel execution in Cucumber
      // set number of workers to use (can also be defined in the cli as --parallel 2
      parallel: 2 
    },
    
  
  },
  src_folders: ['nightwatch/test/step_definitions'],

  test_workers: {
    enabled: true
  },

  test_settings: {
    default: {
      disable_error_log: false,
      launch_url: 'http://localhost',
      screenshots: {
        enabled: false,
        path: 'screens',
        on_failure: true
      },

      desiredCapabilities: {
        browserName: 'chrome'
      },
      
      webdriver: {
        start_process: true,
        server_path: ''
      },
      
    },
    
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          // More info on Chromedriver: https://sites.google.com/a/chromium.org/chromedriver/
          //
          // w3c:false tells Chromedriver to run using the legacy JSONWire protocol (not required in Chrome 78)
          w3c: true,
          args: [
            //'--no-sandbox',
            //'--ignore-certificate-errors',
            //'--allow-insecure-localhost',
            //'--headless'
          ]
        }
      },

      webdriver: {
        start_process: true,
        server_path: '',
        cli_args: [
          // --verbose
        ]
      }
    },
    
  },
  onComplete: function (exitCode, results) {
    // Combinar los archivos de reporte de Mochawesome
    merge({
      files: [path.join(__dirname, 'reports/mochawesome/*.json')],
    })
      .then((report) => {
        // Generar el informe HTML de Mochawesome
        const reportFilePath = path.join(__dirname, 'reports/mochawesome/report.html');
        Mochawesome.create(report, {
          reportDir: path.join(__dirname, 'reports/mochawesome'),
          reportTitle: 'Nightwatch + Cucumber Report',
          inlineAssets: true,
          overwrite: true,
        }).save(reportFilePath, function () {
          console.log(`Mochawesome report generated: ${reportFilePath}`);
        });
      })
      .catch((error) => {
        console.error('Error merging Mochawesome reports:', error);
      });
  },
  
};
