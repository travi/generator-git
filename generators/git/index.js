const yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
  configuring() {
    this.copy('gitattributes', '.gitattributes');
  }
});
