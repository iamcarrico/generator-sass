'use strict';
var util = require('util'),
    chalk = require('chalk'),
    sh = require('execSync'),
    yeoman = require('yeoman-generator');

var settings = {};

var SassGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.gems = {};

    if (this.config.get['gems']) {
      this.gems = this.config.get['gems'];
    }
    if (this.options.gems) {
      this.gems = this.options.gems;
    }
  },

  prompts: function () {
    var done = this.async(),
        _this = this,
        prompts = [],
        gems = [];

    if (Object.keys(this.gems).length) {
      done();
    }

    prompts.push({
      type: 'string',
      name: 'sassVersion',
      message: 'What version of Sass would you like to use?'
    });

    // Add Gems
    gems.push({
      type: 'confirm',
      name: 'gemAdd',
      message: 'Add a gem?',
      default: true
    });

    // Gem Name
    gems.push({
      type: 'string',
      name: 'gemName',
      message: 'Gem name' + chalk.red(' (Required)'),
      validate: function (answer) {
        if (answer === '') {
          return 'You must provide a gem name!';
        }
        else if (Object.keys(_this.gems).indexOf(answer.toLowerCase()) !== -1) {
          return 'Gem `' + answer + '` already included';
        }
        else {
          return true;
        }
      },
      when: function (answers) {
        return answers.gemAdd;
      }
    });

    // Gem Version
    gems.push({
      type: 'string',
      name: 'gemVersion',
      message: 'Gem version' + chalk.red(' (Required)'),
      validate: function (answer) {
        if (answer === '') {
          return 'You must provide a gem version!';
        }
        else {
          return true;
        }
      },
      when: function (answers) {
        return answers.gemAdd;
      }
    });


    var addGem = function () {
      _this.prompt(gems, function (props) {

        if (props.gemAdd) {
          _this.gems[props.gemName.toLowerCase()] = props.gemVersion;
          addGem();
        }
        else {
          done();
        }
      }.bind(_this));
    }

    this.prompt(prompts, function (props) {
      this.gems['sass'] = props.sassVersion;

      addGem();
    }.bind(this));
  },

  saveSettings: function () {
    settings.gems = this.gems;

    this.config.set(settings);
  },

  buildGemfile: function () {
    var output = '',
        _this = this;

    Object.keys(this.gems).forEach(function (v) {
      output += 'gem ' +
        '\'' + v + '\', ' +
        '\'' + _this.gems[v] + '\'' +
        '\n';
    });

    this.gemDeps = output;

    this.template('_Gemfile', 'Gemfile');
  },

  end: function () {
    sh.run('bundle install --path vendor');
  }
});

module.exports = SassGenerator;