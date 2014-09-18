'use strict';
var util = require('util'),
    yeoman = require('yeoman-generator');

var settings = {};


var SassGenerator = yeoman.generators.Base.extend({
  initializing: function () {

    this.gems = {};
    this.httpPath = null;
    this.cssDir = null;
    this.sassDir = null;
    this.imagesDir = null;
    this.jsDir = null;
    this.fontsDir = null;
    this.outputStyle = null;
    this.relativeAssets = null;
    this.lineComments = null;
    this.sassOptions = null;

    if (this.config.get['gems']) {
      this.gems = this.config.get['gems'];
    }
    if (this.options.gems) {
      this.gems = this.options.gems;
    }

    if (this.config.get['httpPath']) {
      this.httpPath = this.config.get['httpPath'];
    }
    if (this.options.httpPath) {
      this.httpPath = this.options.httpPath;
    }

    if (this.config.get['cssDir']) {
      this.cssDir = this.config.get['cssDir'];
    }
    if (this.options.cssDir) {
      this.cssDir = this.options.cssDir;
    }

    if (this.config.get['sassDir']) {
      this.sassDir = this.config.get['sassDir'];
    }
    if (this.options.sassDir) {
      this.sassDir = this.options.sassDir;
    }

    if (this.config.get['imagesDir']) {
      this.imagesDir = this.config.get['imagesDir'];
    }
    if (this.options.imagesDir) {
      this.imagesDir = this.options.imagesDir;
    }

    if (this.config.get['jsDir']) {
      this.jsDir = this.config.get['jsDir'];
    }
    if (this.options.jsDir) {
      this.jsDir = this.options.jsDir;
    }

    if (this.config.get['fontsDir']) {
      this.fontsDir = this.config.get['fontsDir'];
    }
    if (this.options.fontsDir) {
      this.fontsDir = this.options.fontsDir;
    }

    if (this.config.get['outputStyle']) {
      this.outputStyle = this.config.get['outputStyle'];
    }
    if (this.options.outputStyle) {
      this.outputStyle = this.options.outputStyle;
    }

    if (this.config.get['outputDir']) {
      this.outputDir = this.config.get['outputDir'];
    }
    if (this.options.outputDir) {
      this.outputDir = this.options.outputDir;
    }

    if (this.config.get['relativeAssets']) {
      this.relativeAssets = this.config.get['relativeAssets'];
    }
    if (this.options.relativeAssets) {
      this.relativeAssets = this.options.relativeAssets;
    }

    if (this.config.get['lineComments']) {
      this.lineComments = this.config.get['lineComments'];
    }
    if (this.options.lineComments) {
      this.lineComments = this.options.lineComments;
    }

    if (this.config.get['sassOptions']) {
      this.sassOptions = this.config.get['sassOptions'];
    }
    if (this.options.sassOptions) {
      this.sassOptions = this.options.sassOptions;
    }
  },

  prompting: function () {
    var done = this.async,
        prompts = [],
        _this = this,
        ask = false;

    if (!this.httpPath) {
      ask = true;

      prompts.push({
        type: 'string',
        name: 'httpPath',
        message: 'What is your HTTP path?',
        default: '/'
      });
    }

    if (!this.cssDir) {
      ask = true;

      prompts.push({
        type: 'string',
        name: 'cssDir',
        message: 'What is your CSS directory?',
        default: 'stylesheets'
      });
    }

    if (!this.sassDir) {
      ask = true;

      prompts.push({
        type: 'string',
        name: 'sassDir',
        message: 'What is your Sass directory?',
        default: 'sass'
      });
    }

    if (!this.imagesDir) {
      ask = true;

      prompts.push({
        type: 'string',
        name: 'imagesDir',
        message: 'What is your Images directory?',
        default: 'images'
      });
    }

    if (!this.jsDir) {
      ask = true;

      prompts.push({
        type: 'string',
        name: 'jsDir',
        message: 'What is your JavaScript directory?',
        default: 'javascripts'
      });
    }

    if (!this.fontsDir) {
      ask = true;

      prompts.push({
        type: 'string',
        name: 'fontsDir',
        message: 'What is your Fonts directory?',
        default: 'stylesheets/fonts'
      });
    }

    if (!this.outputStyle) {
      ask = true;

      prompts.push({
        type: 'list',
        name: 'outputStyle',
        message: 'What is Output Style would you like to use?',
        choices: [':nested', ':expanded', ':compact', ':compressed'],
        default: ':expanded'
      });
    }

    if (this.relativeAssets !== null) {
      ask = true;

      prompts.push({
        type: 'confirm',
        name: 'relativeAssets',
        message: 'Would you like to use relative assets?',
      });
    }

    if (this.lineComments !== null) {
      ask = true;

      prompts.push({
        type: 'confirm',
        name: 'lineComments',
        message: 'Would you like to enable line comments?',
      });
    }

    if (!ask) {
      done();
    }

    this.prompt(prompts, function (props) {
      this.httpPath = props.httpPath;
      this.cssDir = props.cssDir;
      this.sassDir = props.sassDir;
      this.imagesDir = props.imagesDir;
      this.jsDir = props.jsDir;
      this.fontsDir = props.fontsDir;
      this.outputStyle = props.outputStyle;
      this.relativeAssets = props.relativeAssets;
      this.lineComments = props.lineComments;
      this.sassOptions = props.sassOptions;

      done();
    });
  },

  configuring: function () {
    settings = {
      httpPath: this.httpPath,
      cssDir: this.cssDir,
      sassDir: this.sassDir,
      imagesDir: this.imagesDir,
      jsDir: this.jsDir,
      fontsDir: this.fontsDir,
      outputStyle: this.outputStyle,
      relativeAssets: this.relativeAssets,
      lineComments: this.lineComments,
      sassOptions: this.sassOptions,
      gems: this.gems
    }

    this.config.set(settings);
    //
  },

  default: function () {
    this.composeWith('sass:bundler');
  }

  // writing: function () {
    // this.src.copy('somefile.js', 'somefile.js');
  // }
});

module.exports = SassGenerator;
