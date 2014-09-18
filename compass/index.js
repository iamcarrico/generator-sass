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
    this.sassOptions = {};

    if (this.config.get['gems'] !== undefined) {
      this.gems = this.config.get['gems'];
    }
    if (this.options.gems !== undefined) {
      this.gems = this.options.gems;
    }

    if (this.config.get['httpPath'] !== undefined) {
      this.httpPath = this.config.get['httpPath'];
    }
    if (this.options.httpPath !== undefined) {
      this.httpPath = this.options.httpPath;
    }

    if (this.config.get['cssDir'] !== undefined) {
      this.cssDir = this.config.get['cssDir'];
    }
    if (this.options.cssDir !== undefined) {
      this.cssDir = this.options.cssDir;
    }

    if (this.config.get['sassDir'] !== undefined) {
      this.sassDir = this.config.get['sassDir'];
    }
    if (this.options.sassDir !== undefined) {
      this.sassDir = this.options.sassDir;
    }

    if (this.config.get['imagesDir'] !== undefined) {
      this.imagesDir = this.config.get['imagesDir'];
    }
    if (this.options.imagesDir !== undefined) {
      this.imagesDir = this.options.imagesDir;
    }

    if (this.config.get['jsDir'] !== undefined) {
      this.jsDir = this.config.get['jsDir'];
    }
    if (this.options.jsDir !== undefined) {
      this.jsDir = this.options.jsDir;
    }

    if (this.config.get['fontsDir'] !== undefined) {
      this.fontsDir = this.config.get['fontsDir'];
    }
    if (this.options.fontsDir !== undefined) {
      this.fontsDir = this.options.fontsDir;
    }

    if (this.config.get['outputStyle'] !== undefined) {
      this.outputStyle = this.config.get['outputStyle'];
    }
    if (this.options.outputStyle !== undefined) {
      this.outputStyle = this.options.outputStyle;
    }

    if (this.config.get['outputDir'] !== undefined) {
      this.outputDir = this.config.get['outputDir'];
    }
    if (this.options.outputDir !== undefined) {
      this.outputDir = this.options.outputDir;
    }

    if (this.config.get['relativeAssets'] !== undefined) {
      this.relativeAssets = this.config.get['relativeAssets'];
    }
    if (this.options.relativeAssets !== undefined) {
      this.relativeAssets = this.options.relativeAssets;
    }

    if (this.config.get['lineComments'] !== undefined) {
      this.lineComments = this.config.get['lineComments'];
    }
    if (this.options.lineComments !== undefined) {
      this.lineComments = this.options.lineComments;
    }

    if (this.config.get['sassOptions'] !== undefined) {
      this.sassOptions = this.config.get['sassOptions'];
    }
    if (this.options.sassOptions !== undefined) {
      this.sassOptions = this.options.sassOptions;
    }
  },

  prompting: function () {
    var done = this.async(),
        prompts = [],
        _this = this,
        ask = false,
        gemKeys = Object.keys(this.gems);

    if (gemKeys.indexOf('compass') === -1) {
      prompts.push({
        type: 'string',
        name: 'compassVersion',
        message: 'What version of Compass would you like to use?'
      });
    }

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

    if (this.relativeAssets === null) {
      ask = true;

      prompts.push({
        type: 'confirm',
        name: 'relativeAssets',
        message: 'Would you like to use relative assets?',
      });
    }

    if (this.lineComments === null) {
      ask = true;

      prompts.push({
        type: 'confirm',
        name: 'lineComments',
        message: 'Would you like to enable line comments?',
      });
    }

    if (!ask) {
      return done();
    }

    this.prompt(prompts, function (props) {
      if (props.compassVersion !== undefined) {
        this.gems['compass'] = props.compassVersion;
      }

      if (props.httpPath !== undefined) {
        this.httpPath = props.httpPath;
      }

      if (props.cssDir !== undefined) {
        this.cssDir = props.cssDir;
      }

      if (props.sassDir !== undefined) {
        this.sassDir = props.sassDir;
      }

      if (props.imagesDir !== undefined) {
        this.imagesDir = props.imagesDir;
      }

      if (props.jsDir !== undefined) {
        this.jsDir = props.jsDir;
      }

      if (props.fontsDir !== undefined) {
        this.fontsDir = props.fontsDir;
      }

      if (props.outputStyle !== undefined) {
        this.outputStyle = props.outputStyle;
      }

      if (props.relativeAssets !== undefined) {
        this.relativeAssets = props.relativeAssets;
      }

      if (props.lineComments !== undefined) {
        this.lineComments = props.lineComments;
      }

      if (props.sassOptions !== undefined) {
        this.sassOptions = props.sassOptions;
      }


      return done();
    }.bind(this));
  },

  configuring: function () {
    var settings = [
      'httpPath',
      'cssDir',
      'sassDir',
      'imagesDir',
      'jsDir',
      'fontsDir',
      'outputStyle',
      'relativeAssets',
      'lineComments',
      'sassOptions',
      'gems'
    ],
      _this = this;

    settings.forEach(function (setting) {
      _this.config.set(setting, _this[setting]);
    });
  },

  default: function () {
    this.composeWith('sass:bundler', {
      options: {
        gems: this.gems
      }
    });
  },

  writing: function () {
    var gemKeys = Object.keys(this.config.get('gems')),
        dirs = ['cssDir', 'sassDir', 'imagesDir', 'jsDir', 'fontsDir'],
        compassGems = '',
        _this = this;

    gemKeys.forEach(function (gem) {
      if (gem !== 'sass' && gem !== 'compass') {
        compassGems += 'require "' + gem + '"\n';
      }
    });

    this.compassGems = compassGems;

    if (Object.keys(this.sassOptions).length) {
      this.optionsPassthrough = 'sass_options = {';

      Object.keys(this.sassOptions).forEach(function (option) {
        _this.optionsPassthrough += option + ' => ' + _this.sassOptions[option] + ', ';
      });

      this.optionsPassthrough = this.optionsPassthrough.slice(0, -2) + '}';
    }
    else {
      this.optionsPassthrough = '';
    }

    this.template('_config.rb', 'config.rb');

    dirs.forEach(function (dir) {
      _this.copy('../../structure/templates/gitkeep', _this[dir] + '/' + '.gitkeep');
    });
  }
});

module.exports = SassGenerator;
