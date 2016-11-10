import { STORE_DEV_TOOLS } from '../constants';

const webpack            = require('webpack');
const webpackShellPlugin = require('webpack-shell-plugin');

const path = require('path');
const fs   = require('fs');

let options = require('./webpack.options');

const EVENT = process.env.npm_lifecycle_event;
const PROD  = EVENT.includes('prod');

const CONSTANTS = {
  ENV:             PROD ? JSON.stringify('production') : JSON.stringify('development'),
  STORE_DEV_TOOLS: JSON.stringify(STORE_DEV_TOOLS)
};

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
      extensions: ['.ts', '.js'],
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
                tsconfig:       path.resolve(__dirname, parentRoot, './tsconfig.json')
              }
            },
            {
              loader: 'angular2-template-loader'
            }
          ],
          exclude: [/\.(spec|e2e)\.ts$/]
        },
        {test: /\.json$/, loader: 'json-loader'},
        {test: /\.css$/, loaders: ['raw-loader', 'postcss-loader']},
        {test: /\.styl$/, loaders: ['raw-loader', 'postcss-loader', 'stylus-loader']},
        {test: /\.less$/, loaders: ['raw-loader', 'postcss-loader', 'less-loader']},
        {test: /\.scss$|\.sass$/, loaders: ['raw-loader', 'postcss-loader', 'sass-loader']},
        {test: /\.(jpg|png)$/, loader: 'url-loader?limit=128000'},
        {test: /\.html$/, loader: 'raw-loader'}
      ]
    },
    plugins: [
      new webpackShellPlugin(options.WebpackShellPlugin),
      new webpack.DefinePlugin(CONSTANTS),
      // https://github.com/AngularClass/angular2-webpack-starter/issues/993
      new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        __dirname
      )
    ],
    node:    {
      fs:             'empty',
      global:         true,
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
    config.watch   = false;
    // Add optimization plugin for prod
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.NormalModuleReplacementPlugin(
        // This plugin is responsible for swapping the environment files.
        // Since it takes a RegExp as first parameter, we need to escape the path.
        // See https://webpack.github.io/docs/list-of-plugins.html#normalmodulereplacementplugin
        new RegExp(path.resolve(__dirname, parentRoot, './src/environments/environment.ts')
                       .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')),
        path.resolve(__dirname, parentRoot, './src/environments/environment.prod.ts')
      )
    );
  }

  return config;
};
