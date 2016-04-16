// Allowing console calls below since this is a build file.
/*eslint-disable no-console */

import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

let DEVMODE;
if (process.env.NODE_ENV == 'production') {
  DEVMODE = false;
  console.log('Using PRODUCTION mode settings for Webpack');
} else {
  DEVMODE = true;
  console.log('Using DEVELOPMENT mode settings for Webpack; set NODE_ENV=production to use production settings');
}

const DEVSERVER_PORT = 3000;

export default {
  debug: DEVMODE,
  // more info: https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
  devtool: DEVMODE ? 'cheap-module-eval-source-map' : 'source-map',
  noInfo: true, // set to false to see a list of every file being bundled.
  entry: DEVMODE ? [
    'webpack/hot/dev-server',
    `webpack-dev-server/client?http://localhost:${DEVSERVER_PORT}/`,
    './src/index'
  ] : ['./src/index'],
  target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  output: {
    path: __dirname + '/dist/assets',
    publicPath: '/assets/',
    filename: 'bundle.js'
  },
  plugins: DEVMODE ? [ // debug plugins
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __DEV__: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ] : [ // production plugins
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.DefinePlugin({
        // Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
        'process.env.NODE_ENV': JSON.stringify('production'),
        __DEV__: false
      }),
      new ExtractTextPlugin('styles.css'),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel', 'eslint']},
      {test: /\.(jpe?g|png|gif|svg)$/i, loaders: ['file']},
      DEVMODE ? { // debug css/scss config
          test: /(\.css|\.scss)$/, loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
        } : { // production css/scss config
          test: /(\.css|\.scss)$/,
          include: path.join(__dirname, 'src'),
          loader: ExtractTextPlugin.extract("css?sourceMap!sass?sourceMap")
        }
    ]
  },
  devServer: {
    contentBase: __dirname + '/src',
    historyApiFallback: true,
    hot: true,
    noInfo: true,
    colors: true,
    port: DEVSERVER_PORT
  }
};
