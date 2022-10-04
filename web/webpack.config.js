const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('dotenv').config();

const template = process.env.REACT_APP_TEMPLATE || 'default';

const appDirectory = path.resolve(__dirname, '../');

// This is needed for webpack to compile JavaScript.
// Many OSS React Native packages are not compiled to ES5 before being
// published. If you depend on uncompiled packages they may cause webpack build
// errors. To fix this webpack can be configured to compile to the necessary
// `node_module`.
const babelLoaderConfiguration = {
  test: /\.(js)|(jsx)$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(appDirectory, 'index.web.js'),
    path.resolve(appDirectory, 'src'),
    path.resolve(appDirectory, 'shared'),
    path.resolve(appDirectory, 'App.js'),
    path.resolve(appDirectory, 'node_modules/react-native-uncompiled'),
    path.resolve(
      appDirectory,
      'node_modules/react-native-segmented-control-tab',
    ),
    path.resolve(appDirectory, 'node_modules/@react-navigation'),
    path.resolve(appDirectory, 'node_modules/react-native-shadow'),
    path.resolve(appDirectory, 'node_modules/react-native-inset-shadow'),
    // path.resolve(appDirectory, 'node_modules/react-native-vector-icons'),
    path.resolve(appDirectory, 'node_modules/react-native-dropdown-picker'),
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      // The 'metro-react-native-babel-preset' preset is recommended to match React Native's packager
      presets: ['module:metro-react-native-babel-preset'],
      // Re-write paths to import only the modules needed by the app
      plugins: [
        'react-native-web',
        [
          'module-resolver',
          {
            root: ['.'],
            alias: {
              '^react-native$': 'react-native-web',
              '@assets': [
                `./shared/assets/${template}`,
                `./shared/assets/default`,
              ],
              '@components': [
                `./shared/components/${template}`,
                `./shared/components/default`,
              ],
              '@library': './library',
              '@theme': [
                `./shared/theme/${template}`,
                `./shared/theme/default`,
              ],
              '@pages': './shared/pages',
            },
          },
        ],
      ],
    },
  },
};

// This is needed for webpack to import static images in JavaScript files.
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
      esModule: false,
    },
  },
};

//below is the config for react-native-vector-icons
const ttfLoaderConfiguration = {
  test: /\.ttf$/,
  loader: 'url-loader',
  include: path.resolve(appDirectory, 'node_modules/react-native-vector-icons'),
};

module.exports = {
  entry: [
    // load any web API polyfills
    // path.resolve(appDirectory, 'polyfills-web.js'),
    // your web-specific entry file
    path.resolve(appDirectory, 'index.web.js'),
  ],

  // configures where the build ends up
  output: {
    publicPath: '/',
    filename: 'bundle.web.js',
    path: path.resolve(appDirectory, 'dist'),
  },

  // ...the rest of your config

  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      ttfLoaderConfiguration,
    ],
  },

  resolve: {
    // This will only alias the exact import "react-native"
    alias: {
      'react-native$': 'react-native-web',
    },
    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js`.
    extensions: ['.web.js', '.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(appDirectory, 'index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      // See: https://github.com/necolas/react-native-web/issues/349
      __DEV__: JSON.stringify(true),
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
};
