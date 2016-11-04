var path = require('path');
var helpers = require('yeoman-test');
var any = require('@travi/any');

module.exports = function () {
  this.World = require('../support/world.js').World;

  this.Before(function () {
    this.tempDirName = `${any.word()}-${any.word()}`;
    this.tempDir = path.join(__dirname, `temp/${this.tempDirName}`);
    this.answers = {};
    this.options = {};
  });

  this.After(function () {
    this.answers = {};
  });

  this.When(/^the generator is run$/, function (callback) {
    helpers.run(path.join(__dirname, '../../../../app'))
      .inDir(this.tempDir)
      .withOptions(this.options)
      .withPrompts(this.answers)
      .on('end', callback);
  });
};
