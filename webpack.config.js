const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
	entry: {
		client: ['whatwg-fetch', './src/js/client.js'],
		admin: ['whatwg-fetch', './src/js/admin.js'],
	},

	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].min.js',
	},
	devtool: 'inline-source-map',
	devServer: {
		static: './',
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: ['style-loader', 'css-loader'],
			},

			{
				test: /\.(png|jpe?g|gif)$/i,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'assets/img/',
					publicPath: './assets/img/',
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
			chunks: ['client'],
		}),
		new HtmlWebpackPlugin({
			template: './src/admin.html',
			filename: 'admin.html',
			chunks: ['admin'],
		}),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/assets/img'),
					to: path.resolve(__dirname, 'build/assets/img'),
				},
			],
		}),
	],
};
