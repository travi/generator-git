const yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
  initializing() {
    this.appname = this.appname.replace(/\s+/g, '-');
  },

  prompting() {
    return this.prompt([
      {
        name: 'projectName',
        message: 'foo',
        default: this.appname
      },
      {
        name: 'copyrightYear',
        default: new Date().getFullYear()
      },
      {
        name: 'fullName',
        default: 'Matt Travi'
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
