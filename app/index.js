const yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
  initializing() {
    this.projectName = 'project-name';
  },

  configuring() {
    this.copy('gitattributes', '.gitattributes');
    this.copy('editorconfig', '.editorconfig');
    this.template('_README.md', 'README.md');
  }
});
