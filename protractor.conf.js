// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/docs/referenceConf.js

/*global jasmine */
var SpecReporter = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout:      120000,
  specs:                  [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities:           {
    'browserName': 'chrome'
  },
  directConnect:          true,
  baseUrl:                'http://localhost:4200/',
  framework:              'jasmine',
  jasmineNodeOpts:        {
    showColors:             true,
    defaultTimeoutInterval: 30000,
    print:                  function () {}
  },
  useAllAngular2AppRoots: true,
  // The params object will be passed directly to the protractor instance,
  // and can be accessed from your test. It is an arbitrary object and can
  // contain anything you may need in your test.
  // This can be changed via the command line as:
  //   --params.login.email 'me@example.com'
  params:                 {
    login: {
      email: '',
      pass:  ''
    }
  },
  beforeLaunch:           function () {
    require('ts-node')
      .register({
        project: 'e2e'
      });
  },
  onPrepare:              function () {
    jasmine.getEnv()
           .addReporter(new SpecReporter());
  }
};
