const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackBar = require("webpackbar");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { ProvidePlugin } = require("webpack");

const resolve = (p) => path.resolve(__dirname, p);

const webpackConfig = {
	entry: "./src/index.ts",
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "../src"),
		},
		extensions: [".ts", ".js", ".json"],
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
			{
				test: /\.tsx?$/,
				use: ["babel-loader", "ts-loader"],
				exclude: [/node_modules/],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "My App",
			template: resolve("../public/index.html"),
			favicon: resolve("../public/favicon.svg"),
		}),
		new CleanWebpackPlugin(),
		new WebpackBar(),
		new MiniCssExtractPlugin({
			filename: "[name].[contenthash:8].css",
		}),
		new ProvidePlugin({
			d3: "d3",
		}),
	],
};

module.exports = webpackConfig;
