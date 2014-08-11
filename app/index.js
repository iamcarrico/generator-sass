'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var welcome = require('./welcome.js');


var SassGenerator = yeoman.generators.Base.extend({
  init: function () {

    this.on('end', function () {
      if (!this.options['skip-install']) {
        
      }
    });
  },

  welcome: function() {
    this.log(welcome.welcome());
  },

  askFor: function () {
    var done = this.async();

    var prompts = [

    ];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;

      done();
    }.bind(this));
  },

  app: function () {
  },

  projectfiles: function () {
  }
});

module.exports = SassGenerator;
