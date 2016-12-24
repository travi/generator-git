var path = require('path');
var helpers = require('yeoman-test');
var any = require('@travi/any');
const defineSupportCode = require('cucumber').defineSupportCode;
const World = require('../support/world').World;

defineSupportCode(({Before, After, When, setWorldConstructor}) => {
  setWorldConstructor(World);

  Before(function () {
    this.tempDirName = `${any.word()}-${any.word()}`;
    this.tempDir = path.join(__dirname, `temp/${this.tempDirName}`);
    this.answers = {};
    this.options = {};
  });

  After(function () {
    this.answers = {};
  });

  When(/^the generator is run$/, function (callback) {
    helpers.run(path.join(__dirname, '../../../../app'))
      .inDir(this.tempDir)
      .withOptions(this.options)
      .withPrompts(this.answers)
      .on('end', callback);
  });
});
