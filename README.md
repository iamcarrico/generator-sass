# generator-sass [![Build Status](https://secure.travis-ci.org/iamcarrico/generator-sass.png?branch=master)](https://travis-ci.org/iamcarrico/generator-sass)

The Sass generator is a little bit different than other generators. Instead of using it as a stand-alone generator, it's meant to be called from other generators to add Sassy magic to your project. Each sub-generator available provides a different aspect of integrating Sass into your project.

## Installation

Your generators need at least `"yeoman-generator": "~0.17.0",` as a minimum development requirement. You also should add `"generator-sass": "<0.1.0"` as a `peerDependency` to your project. The Sass generator relies upon Yeoman's [composability](http://yeoman.io/authoring/composability.html), and boy is it magic.

## Usage

Each sub-generator has a series of options. Each option will try and get the [config](http://yeoman.io/authoring/storage.html) saved for any given option. If an option is passed in via composability, that will override the saved config. Any options that are not stored in config or passed in the user will be prompted for. Each option will be saved to config regardless of how it got there.

### `sass:structure`

This will build a Sass file structure, including full files, partials, and and empty folders you may want to start scaffolded out. The following options are available:

* `syntax` - Sass syntax to use. Can either be `sass` or `scss`
* `base` - Base level Sass folder, where all Sass files will be placed. Usually `sass`
* `files` - An array full files (not partials) to be created. Can be nested. No need to include file extension.
* `fileTemplate` - Path to template file for use with all files. Available variables: `fileName`. Recommendation: store your template in your generator's `templates` file and use `this.sourceRoot() + '/_template.scss'` for the path.
* `partials` - An array of partials to be created. Can be nested. No need to include leading `_` or file extension.
* `partialTemplate` - Path to template file for use with all partials. Available variables: `fileName`. Recommendation: store your template in your generator's `templates` file and use `this.sourceRoot() + '/_template.scss'` for the path.
* `folders` - An array of folders to be created.

[Example usage](https://github.com/north/generator-north/blob/master/sass/index.js)

## License

MIT
