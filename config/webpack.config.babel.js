const webpack = require('webpack');
const WebpackShellPlugin = require('webpack-shell-plugin');

const path = require('path');
const fs = require('fs');

let options = require('./webpack.options');

if (fs.existsSync('./config/webpack.options.local.js')) {
  let optionsLocal = require('./webpack.options.local');
  // Extend options with local options
  Object.assign(options, optionsLocal);
}

const parentRoot = '../';

module.exports = function (env) {
  // Main config for webpack for development
  let config = {
    devtool: 'inline-source-map',
    watch:   true,
    resolve: {
      extensions: ['', '.ts', '.js'],
      root:       path.resolve(__dirname, parentRoot, './src')
    },
    entry:   require('./components.entry')(path.resolve(__dirname, parentRoot)),
    output:  {
      path:          path.resolve(__dirname, parentRoot, './lib/components'),
      filename:      "[name].js",
      libraryTarget: 'umd'
    },
    module:  {
      loaders: [
        {
          test:    /\.ts$/,
          loaders: [
            {
              loader: 'awesome-typescript-loader',
              query:  {
                useForkChecker: true,
                tsconfig:       path.resolve(__dirname, parentRoot, './src/tsconfig.json')
              }
            },
            {
              loader: 'angular2-template-loader'
            }
          ],
          exclude: [/\.(spec|e2e)\.ts$/]
        },
        { test: /\.json$/, loader: 'json-loader' },
        { test: /\.css$/, loaders: ['raw-loader', 'postcss-loader'] },
        { test: /\.styl$/, loaders: ['raw-loader', 'postcss-loader', 'stylus-loader'] },
        { test: /\.less$/, loaders: ['raw-loader', 'postcss-loader', 'less-loader'] },
        { test: /\.scss$|\.sass$/, loaders: ['raw-loader', 'postcss-loader', 'sass-loader'] },
        { test: /\.(jpg|png)$/, loader: 'url-loader?limit=128000' },
        { test: /\.html$/, loader: 'raw-loader' }
      ]
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({ name: 'core', filename: 'core.js' }),
      new WebpackShellPlugin(options.WebpackShellPlugin)
    ],
    node:    {
      fs:             'empty',
      global:         'window',
      crypto:         'empty',
      module:         false,
      clearImmediate: false,
      setImmediate:   false
    }
  };

  // Prod environment by default if not passed
  if (!env) {
    env = 'prod';
  }

  // Change config for production
  if (env === 'prod') {
    config.devtool = 'cheap-module-source-map';
    config.watch = false;
    // Add optimization plugin for prod
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
      // tmp string to fix for prod mode @see https://github.com/angular/angular/issues/10618
      mangle: { screw_ie8: true, keep_fnames: true }
    }));
  }

  return config;
};
