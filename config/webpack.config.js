var webpack = require('webpack');
var path = require('path');

var sourceDir = 'src';
var projectRoot = './';

module.exports = {
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['', '.ts', '.js'],
    root:       path.resolve(projectRoot, './' + sourceDir)
  },
  entry:   {
    'detailed-targeting': './src/app/detailed-targeting/detailed-targeting.component.ts'
  },
  output:  {
    path:     path.resolve(projectRoot, './build'),
    filename: "[name].js"
  },
  module:  {
    preLoaders: [
      {
        test:    /\.js$/,
        loader:  'source-map-loader',
        exclude: [
          path.resolve(projectRoot, 'node_modules/rxjs'),
          path.resolve(projectRoot, 'node_modules/@angular')
        ]
      }
    ],
    loaders:    [
      {
        test:    /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            query:  {
              useForkChecker: true,
              tsconfig:       path.resolve(projectRoot, './' + sourceDir + '/tsconfig.json')
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
  //plugins: [
  //  new ForkCheckerPlugin(),
  //  //new HtmlWebpackPlugin({
  //  //  template:       path.resolve(projectRoot, './${sourceDir}/index.html'),
  //  //  chunksSortMode: 'dependency'
  //  //}),
  //  //new webpack.optimize.CommonsChunkPlugin({
  //  //  name: ['polyfills']
  //  //}),
  //  //new webpack.optimize.CommonsChunkPlugin({
  //  //  minChunks:         Infinity,
  //  //  name:              'inline',
  //  //  filename:          'inline.js',
  //  //  sourceMapFilename: 'inline.map'
  //  //}),
  //  new CopyWebpackPlugin([{
  //    context: path.resolve(projectRoot, './public'),
  //    from:    '**/*',
  //    to:      path.resolve(projectRoot, './build')
  //  }])
  //],
  node:    {
    fs:             'empty',
    global:         'window',
    crypto:         'empty',
    module:         false,
    clearImmediate: false,
    setImmediate:   false
  }
};
