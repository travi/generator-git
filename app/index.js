const Generator = require('yeoman-generator');
const gitConfig = require('git-config');
const _ = require('lodash');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  initializing() {
    this.projectName = _.kebabCase(this.appname);
    this.spawnCommandSync('git', ['init', '--quiet']);
  }

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
        choices: ['UNLICENSED', 'MIT'],
        default: 'MIT'
      },
      {
        message: 'What year should be used in the license?',
        name: 'copyrightYear',
        default: new Date().getFullYear()
      },
      {
        message: 'What is the full name of this project\'s author?',
        name: 'fullName',
        default: gitConfig.sync().user.name
      }
    ]).then((props) => {
      this.projectName = props.projectName;
      this.copyrightYear = props.copyrightYear;
      this.fullName = props.fullName;
      this.license = props.license;

      _.merge(this.options, props);
    });
  }

  configuring() {
    this.fs.copyTpl(this.templatePath('gitattributes'), this.destinationPath('.gitattributes'));
    this.fs.copyTpl(this.templatePath('editorconfig'), this.destinationPath('.editorconfig'));
  }

  app() {
    this.fs.copyTpl(
      this.templatePath('_README.md'),
      this.destinationPath('README.md'),
      {projectName: this.projectName}
    );

    if (this.license !== 'UNLICENSED') {
      this.fs.copyTpl(
        this.templatePath('licenses/MIT'),
        this.destinationPath('LICENSE'),
        {
          copyrightYear: this.copyrightYear,
          fullName: this.fullName
        }
      );
    }
  }
};
