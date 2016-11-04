var assert = require('yeoman-assert');
var any = require('@travi/any');
var sinon = require('sinon');
var gitConfig = require('git-config');


module.exports = function () {
  this.World = require('../support/world.js').World;

  let sandbox;
  const name = `${any.word()} ${any.word()}`;

  this.Before(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(gitConfig, 'sync').returns({
      user: {name}
    });
  });

  this.After(() => {
    sandbox.restore();
  });

  this.Given(/^the user responds to all prompts$/, function (callback) {
    this.answers = Object.assign({}, this.answers, {
      projectName: any.word(),
      copyrightYear: any.integer(),
      fullName: `${any.word()} ${any.word()}`
    });

    callback();
  });

  this.Given(/^the user leaves defaults in all prompts$/, function (callback) {
    callback();
  });

  this.Then(/^the core files should be present$/, function (callback) {
    assert.file([
      '.git/',
      '.gitattributes',
      '.editorconfig',
      'README.md',
      'LICENSE'
    ]);

    assert.fileContent('.gitattributes', /^\* text=auto\n$/);
    assert.fileContent(
      '.editorconfig',
      `# EditorConfig is awesome: http://EditorConfig.org

# top-most EditorConfig file
root = true

[*]
charset = utf-8
trim_trailing_whitespace = true
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
`
    );

    callback();
  });

  this.Then(/^the user provided answers should be used$/, function (callback) {
    assert.fileContent('README.md', `# ${this.answers.projectName}\n`);
    assert.fileContent('LICENSE', this.mitLicenseWith(this.answers.copyrightYear, this.answers.fullName));

    callback();
  });

  this.Then(/^the default answers should be used$/, function (callback) {
    assert.fileContent('README.md', `# ${this.tempDirName}\n`);
    assert.fileContent('LICENSE', this.mitLicenseWith(new Date().getFullYear(), name));

    callback();
  });
};
