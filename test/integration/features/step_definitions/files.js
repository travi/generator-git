var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var path = require('path');
var any = require('@travi/any')

var tempDir = path.join(__dirname, 'temp');

module.exports = function () {
  let answers;

  this.Before(() => {
    answers = {};
  });

  this.Given(/^the user reponds to all prompts$/, function (callback) {
    answers = {projectName: any.string()};

    callback();
  });

  this.Given(/^the user leaves defaults in all prompts$/, function (callback) {
    callback();
  });

  this.When(/^the generator is run$/, function (callback) {
    helpers.run(path.join(__dirname, '../../../../app'))
      .inDir(tempDir)
      .withPrompts(answers)
      .on('end', callback);
  });

  this.Then(/^the core files should be present$/, function (callback) {
    assert.file([
      '.gitattributes',
      '.editorconfig',
      'README.md'
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
    assert.fileContent('README.md', `# ${answers.projectName}\n`);

    callback();
  });

  this.Then(/^the default answers should be used$/, function (callback) {
    assert.fileContent('README.md', `# default\n`);

    callback();
  });
};
