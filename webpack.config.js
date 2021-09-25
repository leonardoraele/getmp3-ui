const path = require('path');
const _ = require('lodash');
const rev = require('git-rev-sync');
const Throw = require('throw2');
const webpack = require('webpack');
const Package = require(path.resolve(__dirname, 'package.json'));
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
require('dotenv/config');

// Validates environment
['production', 'development', 'test'].includes(process.env.NODE_ENV)
	|| Throw('Unsupported environment:', process.env.NODE_ENV ?? 'NODE_ENV undefined');

const mode = process.env.NODE_ENV ?? 'production';
const appName = "Get MP3";

module.exports = () => (
{
	mode,
	entry: path.resolve(__dirname, 'src/main.js'),
	output: { path: path.resolve(__dirname, 'dist') },
	plugins:
	[
		new webpack.ProgressPlugin(),
		new HtmlWebpackPlugin({ title: appName }),
		new CopyWebpackPlugin(
			{
				patterns:
				[
					{ from: './assets', to: './assets' },
				],
			},
		),
		new webpack.DefinePlugin(
			{
				'BUILD_ARGS.APP_NAME': JSON.stringify(appName),
				'BUILD_ARGS.ENVIRONMENT': JSON.stringify(mode),
				'BUILD_ARGS.VERSION': JSON.stringify(Package.version),
				'BUILD_ARGS.VERSION_BRANCH': JSON.stringify(rev.branch()),
				'BUILD_ARGS.VERSION_HASH': JSON.stringify(rev.short()),
				'BUILD_ARGS.API_URL': `(window.location.origin + "${process.env.API_PATH ?? '/'}")`,
				'process.env': `({ NODE_ENV: "${mode}" })`,
			},
		),
		mode === 'production'
			? new WorkboxWebpackPlugin.GenerateSW()
			: _.noop,
		new VueLoaderPlugin(),
	],
	module:
	{
		rules:
		[
			{
				test: /\.js$/i,
				loader: 'babel-loader',
			},
			{
				test: /\.vue$/i,
				loader: 'vue-loader',
			},
			{
				test: /\.s[ac]ss$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
				type: 'asset',
			},
		],
	},
	optimization:
	{
		minimizer: [ new TerserPlugin() ],
	},
	resolve: {
		alias:
		{
			[Package.name]: path.resolve(__dirname, 'src'),
			// vue$: 'vue/dist/vue.runtime.esm.js',
		},
		extensions: ['.js', '.vue', '.json'],
	},
	devtool: process.env.WEBPACK_DEVTOOL || undefined,
	devServer:
	{
		port: process.env.PORT ?? '8080',
		proxy:
		{
			[process.env.API_PATH ?? '/']:
			{
				target: process.env.API_URL ?? 'http://localhost:3100',
				pathRewrite: { [`^${process.env.API_PATH ?? '/'}`]: '/' },
				// ws: true,
			},
		},
		// open: true,
		// host: 'localhost',
	},
});
