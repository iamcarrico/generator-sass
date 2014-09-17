'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var SassGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.composeWith('sass:bundler');
  }
});

module.exports = SassGenerator;
