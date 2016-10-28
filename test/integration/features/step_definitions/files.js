var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var path = require('path');
var any = require('@travi/any')

var tempDir = path.join(__dirname, 'temp');

module.exports = function () {
  const answers = {projectName: any.string()};

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
    assert.fileContent('README.md', `# ${answers.projectName}\n`);

    callback();
  });
};
