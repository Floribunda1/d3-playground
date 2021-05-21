const path = require('path');
const { merge } = require('webpack-merge');
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const common = require('./base.config');

const prodConfig = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: './',
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
  },
	plugins: [
		new BundleAnalyzerPlugin(),
	]
};

module.exports = merge(common, prodConfig);
