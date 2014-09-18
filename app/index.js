'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var welcome = require('./welcome.js');


var SassGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    var gems = {
      'compass': '~>1.0',
      'singularitygs': '~>1.4',
      'breakpoint': '~>2.5'
    };

    this.composeWith('sass:compass', {
      options: {
        gems: gems,
        httpPath: './',
        cssDir: 'css',
        sassDir: 'sass',
        imagesDir: 'images',
        jsDir: 'js',
        fontsDir: 'fonts',
        outputStyle: ':expanded',
        relativeAssets: true,
        lineComments: false,
        sassOptions: {
          ':sourcemaps': false
        }
      }
    });
  }
});

module.exports = SassGenerator;
