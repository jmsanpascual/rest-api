exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: [
        'public/e2e-tests/**/*.spec.js'
    ],
    onPrepare: function() {
        browser.driver.manage().window().maximize();

        var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
        jasmine.getEnv().addReporter(new SpecReporter({ displayStacktrace: 'all' }));
    },
    jasmineNodeOpts: {
        showColors: true
    },
    multiCapabilities: [{
        browserName: 'chrome'
    }]
}
