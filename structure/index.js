'use strict';
var util = require('util'),
    path = require('path'),
    _s = require('underscore.string'),
    yeoman = require('yeoman-generator');

var settings = {};


var SassGenerator = yeoman.generators.Base.extend({
  init: function () {
    //////////////////////////////
    // Syntax
    //////////////////////////////
    this.syntax = null;

    if (this.config.get['syntax']) {
      this.syntax = this.config.get['syntax'];
    }
    if (this.options.syntax) {
      this.syntax = this.options.syntax;
    }

    //////////////////////////////
    // Base
    //////////////////////////////
    this.base = null;

    if (this.config.get['base']) {
      this.base = this.config.get['base'];
    }
    if (this.options.base) {
      this.base = this.options.base;
    }

    //////////////////////////////
    // Files
    //////////////////////////////
    this.files = null;

    if (this.config.get['files']) {
      this.files = this.config.get['files'];
    }
    if (this.options.files) {
      this.files = this.options.files;
    }

    //////////////////////////////
    // Partials
    //////////////////////////////
    this.partials = null;

    if (this.config.get['partials']) {
      this.partials = this.config.get['partials'];
    }
    if (this.options.partials) {
      this.partials = this.options.partials;
    }

    //////////////////////////////
    // Folders
    //////////////////////////////
    this.folders = null;

    if (this.config.get['folders']) {
      this.folders = this.config.get['folders'];
    }
    if (this.options.folders) {
      this.folders = this.options.folders;
    }

    //////////////////////////////
    // Template Files
    //////////////////////////////
    this.fileTemplate = null;

    if (this.config.get['folders']) {
      this.fileTemplate = this.config.get['folders'];
    }
    if (this.options.fileTemplate) {
      this.fileTemplate = this.options.fileTemplate;
    }

    this.partialTemplate = null;
    if (this.config.get['folders']) {
      this.partialTemplate = this.config.get['folders'];
    }
    if (this.options.partialTemplate) {
      this.partialTemplate = this.options.partialTemplate;
    }

  },

  prompts: function () {
    var done = this.async(),
        prompts = [];

    // Sass Syntax
    if (!this.syntax) {
      prompts.push({
        type: 'list',
        name: 'syntax',
        message: 'What Sass syntax would you like to use?',
        choices: ['sass', 'scss'],
        default: 'scss'
      });
    }

    // Sass Base Folder
    if (!this.base) {
      prompts.push({
        type: 'string',
        name: 'base',
        message: 'What base folder would you like to use for your Sass?',
        default: function (answers) {
          return answers.syntax;
        },
        validate: function (input) {
          if (input === '') {
            return 'Please enter the base folder';
          }
          return true;
        }
      });
    }

    // Files
    if (!this.files) {
      prompts.push({
        type: 'string',
        name: 'files',
        message: 'Files to include (not partials; relative to base; comma-separated)'
      });
    }

    // Partials
    if (!this.partials) {
      prompts.push({
        type: 'string',
        name: 'partials',
        message: 'Partials to include (relative to base; comma-separated)'
      });
    }

    // Folders
    if (!this.folders) {
      prompts.push({
        type: 'string',
        name: 'folders',
        message: 'Folders to include (relative to base; comma-separated)'
      });
    }

    if (prompts.length === 0) {
      done();
    }
    else {
      this.prompt(prompts, function (props) {
        this.syntax = props.syntax;
        this.base = props.base;
        this.files = props.files.split(',');
        this.partials = props.partials.split(',');
        this.folders = props.folders.split(',');

        done();
      }.bind(this));
    }
  },

  saveSettings: function () {
    settings = {
      syntax: this.syntax,
      base: this.base,
      files: this.files,
      partials: this.partials,
      folders: this.folders
    };

    this.config.set(settings);
  },

  buildFiles: function () {
    var base = this.base + '/',
        syntax = this.syntax,
        fileTemplate = '_file.scss',
        partialTemplate = '_partial.scss',
        _this = this;

    if (this.fileTemplate) {
      fileTemplate = path.relative(this.sourceRoot(), this.fileTemplate);
    }

    if (this.partialTemplate) {
      partialTemplate = path.relative(this.sourceRoot(), this.partialTemplate);
    }

    //////////////////////////////
    // Files
    //////////////////////////////
    this.files.forEach(function (v) {
      var ext = path.extname(v),
          filename = v;

      if (v !== '') {
          if (filename.charAt(0) === ' ' || filename.charAt(0) === '_') {
          filename = filename.slice(1, filename.length);
        }

        _this.fileName = _s.humanize(filename);

        if (ext === '.sass' || ext === '.scss') {
          _this.template(fileTemplate, base + filename)
        }
        else {
          _this.template(fileTemplate, base + filename + '.' + syntax);
        }
      }
    });

    //////////////////////////////
    // Partials
    //////////////////////////////
    this.partials.forEach(function (v) {
      var ext = path.extname(v),
          filename = v,
          files,
          file;

      if (v !== '') {
        files = filename.split('/');
        filename = files.pop();

        if (filename.charAt(0) !== '_') {
          filename = '_' + filename;
        }

        file = files.join('/') + '/' + filename;

        if (file.charAt(0) === ' ') {
          file = file.slice(1, file.length);
        }

        _this.fileName = _s.humanize(filename);

        if (ext === '.sass' || ext === '.scss') {
          _this.template(partialTemplate, base + file)
        }
        else {
          _this.template(partialTemplate, base + file + '.' + syntax);
        }
      }
    });

    //////////////////////////////
    // Folders
    //////////////////////////////
    this.folders.forEach(function (v) {
      if (v !== '') {
        if (v.charAt(v.length - 1) !== '/') {
          v += '/';
        }
        if (v.charAt(0) === '/') {
          v = v.slice(1, v.length);
        }

        _this.copy('gitkeep', base + v + '.gitkeep');
      }
    });

  }
});

module.exports = SassGenerator;
