const yeoman = require('yeoman-generator');
const gitConfig = require('git-config');

module.exports = yeoman.Base.extend({
  initializing() {
    this.appname = this.appname.replace(/\s+/g, '-');
    this.spawnCommandSync('git', ['init', '--quiet']);
  },

  prompting() {
    return this.prompt([
      {
        name: 'projectName',
        message: 'What is the name of this project?',
        default: this.appname
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
