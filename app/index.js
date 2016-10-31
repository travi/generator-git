const yeoman = require('yeoman-generator');
const gitConfig = require('git-config');
const _ = require('lodash');

module.exports = yeoman.Base.extend({
  initializing() {
    this.projectName = _.kebabCase(this.appname);
    this.spawnCommandSync('git', ['init', '--quiet']);
  },

  prompting() {
    return this.prompt([
      {
        name: 'projectName',
        message: 'What is the name of this project?',
        default: this.projectName
      },
      {
        name: 'license',
        message: 'How should this project be licensed?',
        type: 'list',
        choices: ['MIT'],
        default: 'MIT'
      },
      {
        message: 'What year should be used in the license?',
        name: 'copyrightYear',
        default: new Date().getFullYear()
      },
      {
        message: 'What is your full name',
        name: 'fullName',
        default: gitConfig.sync().user.name
      }
    ]).then((props) => {
      this.projectName = props.projectName;
      this.copyrightYear = props.copyrightYear;
      this.fullName = props.fullName;

      this.config.set({
        projectName: this.projectName,
        userFullName: this.fullName,
        license: props.license
      });
    });
  },

  configuring() {
    this.copy('gitattributes', '.gitattributes');
    this.copy('editorconfig', '.editorconfig');
  },

  app() {
    this.template('_README.md', 'README.md');
    this.template('licenses/MIT', 'LICENSE');
  }
});
