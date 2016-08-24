var webpack = require('webpack');
var path = require('path');

var parentRoot = './';

module.exports = {
  devtool: 'cheap-module-source-map',
  resolve: {
    extensions: ['', '.ts', '.js'],
    root:       path.resolve(__dirname, parentRoot, 'src')
  },
  entry:   require('./components.entry')(parentRoot),
  output:  {
    path:          path.resolve(__dirname, parentRoot, '../lib/components'),
    filename:      "[name].js",
    libraryTarget: 'umd'
  },
  module:  {
    loaders:    [
      {
        test:    /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            query:  {
              useForkChecker: true,
              tsconfig:       path.resolve(parentRoot, 'src/tsconfig.json')
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
    new webpack.optimize.UglifyJsPlugin({
      // tmp string to fix for prod mode @see https://github.com/angular/angular/issues/10618
      mangle: { screw_ie8: true, keep_fnames: true }
    })
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