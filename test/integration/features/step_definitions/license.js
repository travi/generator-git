var assert = require('yeoman-assert');

module.exports = function () {
  this.Given(/^the "([^"]*)" license is chosen$/, function (license, callback) {
    this.answers.license = license;

    callback();
  });

  this.Given(/^the repo should not be licensed$/, function (callback) {
    this.answers.license = 'UNLICENSED';

    callback();
  });

  this.Then(/^the license file should be populated$/, function (callback) {
    assert.file(['LICENSE']);
    if (this.answers.license === 'MIT') {
      assert.fileContent('LICENSE', this.mitLicenseWith(this.answers.copyrightYear, this.answers.fullName));
    }

    callback();
  });

  this.Then(/^the license file should not be populated$/, function (callback) {
    assert.noFile(['LICENSE']);

    callback();
  });

  this.Then(/^the license choice should be persisted$/, function (callback) {
    assert.equal(require(`${this.tempDir}/.yo-rc.json`)['@travi/generator-git'].license, this.answers.license);

    callback();
  });
};
