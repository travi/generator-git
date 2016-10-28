const yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
  prompting() {
    return this.prompt([{
      name: 'projectName',
      message: 'foo',
      default: ''
    }]).then((props) => {
      this.projectName = props.projectName;
    });
  },

  configuring() {
    this.copy('gitattributes', '.gitattributes');
    this.copy('editorconfig', '.editorconfig');
  },

  app() {
    this.template('_README.md', 'README.md');
  }
});
