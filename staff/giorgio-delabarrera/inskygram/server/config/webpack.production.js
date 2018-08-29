'use_strict';

const commonPaths = require('./common-paths');
const { DefinePlugin } = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(css|sass)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCssAssetsWebpackPlugin()
    ]
  },
  plugins: [
    new CleanWebpackPlugin([commonPaths.build], { root: commonPaths.root }),
    new MiniCssExtractPlugin({ filename: 'styles.[chunkhash].css' }),
    new DefinePlugin({
      SCHEME: JSON.stringify('https'),
      HOST: JSON.stringify('giodelabarrera.github.io/accordion-component'),
    })
  ]
};