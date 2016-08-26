/**
 * You can override options in this file, by creating webpack.options.local.js file.
 * Note that webpack.options.local.js is added to .gitignore and won't be track by version control.
 * It should include any settings specifically for your development computer.
 *
 * @type {{}}
 */
module.exports = {
  // @see https://github.com/1337programming/webpack-shell-plugin
  WebpackShellPlugin: {
    onBuildStart: [],
    onBuildEnd:   [],
    onBuildExit:  [],
    dev:          true,
    verbose:      false
  }
};
