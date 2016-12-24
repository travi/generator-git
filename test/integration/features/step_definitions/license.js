var assert = require('yeoman-assert');
const defineSupportCode = require('cucumber').defineSupportCode;
const World = require('../support/world').World;

defineSupportCode(({Given, Then, setWorldConstructor}) => {
  setWorldConstructor(World);

  Given(/^the "([^"]*)" license is chosen$/, function (license, callback) {
    this.answers.license = license;

    callback();
  });

  Given(/^the repo should not be licensed$/, function (callback) {
    this.answers.license = 'UNLICENSED';

    callback();
  });

  Then(/^the license file should be populated$/, function (callback) {
    assert.file(['LICENSE']);
    if (this.answers.license === 'MIT') {
      assert.fileContent('LICENSE', this.mitLicenseWith(this.answers.copyrightYear, this.answers.fullName));
    }

    callback();
  });

  Then(/^the license file should not be populated$/, function (callback) {
    assert.noFile(['LICENSE']);

    callback();
  });
});
