var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var path = require('path');
var any = require('@travi/any');
var sinon = require('sinon');
var gitConfig = require('git-config');

var tempDirName = `${any.word()}-${any.word()}`;
var tempDir = path.join(__dirname, `temp/${tempDirName}`);

function mitLicenseWith(copyrightYear, fullName) {
  return `MIT License

Copyright (c) ${copyrightYear} ${fullName}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`;
}

module.exports = function () {
  let answers, sandbox;
  const name = `${any.word()} ${any.word()}`;

  this.Before(() => {
    answers = {};
    sandbox = sinon.sandbox.create();
    sandbox.stub(gitConfig, 'sync').returns({
      user: {name}
    });
  });

  this.After(() => {
    sandbox.restore();
  });

  this.Given(/^the user reponds to all prompts$/, function (callback) {
    answers = {
      projectName: any.word(),
      copyrightYear: any.integer(),
      fullName: `${any.word()} ${any.word()}`
    };

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
    assert.fileContent('README.md', `# ${answers.projectName}\n`);
    assert.fileContent('LICENSE', mitLicenseWith(answers.copyrightYear, answers.fullName));

    callback();
  });

  this.Then(/^the default answers should be used$/, function (callback) {
    assert.fileContent('README.md', `# ${tempDirName}\n`);
    assert.fileContent('LICENSE', mitLicenseWith(new Date().getFullYear(), name));

    callback();
  });

  this.Then(/^reusable prompt answers are persisted$/, function (callback) {
    assert.jsonFileContent(`${tempDir}/.yo-rc.json`, {"@travi/generator-git": {
      projectName: answers.projectName,
      userFullName: answers.fullName,
      license: 'MIT'
    }});

    callback();
  });
};
