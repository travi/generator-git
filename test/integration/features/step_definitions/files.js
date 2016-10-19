var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var path = require('path');

var tempDir = path.join(__dirname, 'temp');

module.exports = function () {
  this.When(/^the generator is run$/, function (callback) {
    helpers.run(path.join(__dirname, '../../../../generators/git'))
      .inDir(tempDir)
      .on('end', callback);
  });

  this.Then(/^the core files should be present$/, function (callback) {
    assert.file(['.gitattributes']);

    assert.fileContent('.gitattributes', /^\* text=auto\n$/);

    callback();
  });
};
