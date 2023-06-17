const path = require('path');
// importuję bibliotękę [path] z [node.js]
const HtmlWebpackPlugin = require('html-webpack-plugin');
// importuję odpowiedni plugin
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
	entry: {
		client: ['whatwg-fetch', './src/js/client.js'],
		admin: ['whatwg-fetch', './src/js/admin.js'],
	},
	// definiuje pliki wejściowe
	// posiadające swoje identyfikatory [chunks]
	output: {
		path: path.resolve(__dirname, 'build'),
		// definiuje ścieżką wyjściową
		filename: '[name].min.js',
		// definiuję nazwę pliku wyjściowego
	},
	devtool: 'inline-source-map',
	devServer: {
		static: './',
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				// określam jakie pliki
				// będą brane pod uwagę
				exclude: /node_modules/,
				// określam wykluczenia
				use: 'babel-loader',
				// określam jaki [loader]
				// ma być wykorzystany
			},
			{
				test: /\.css$/,
				// określam jakie pliki
				// będą brane pod uwagę
				exclude: /node_modules/,
				// określam wykluczenia
				use: ['style-loader', 'css-loader'],
				// określam jaki [loader]
				// ma być wykorzystany
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
			// wskazuje plik źródłowy
			filename: 'index.html',
			// określan nazwę dla pliku
			chunks: ['client'],
			// wskazuje plik do podpięcia
		}),
		new HtmlWebpackPlugin({
			template: './src/admin.html',
			// wskazuje plik źródłowy
			filename: 'admin.html',
			// określan nazwę dla pliku
			chunks: ['admin'],
			// wskazuje plik do podpięcia
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
// eksportuję ustawienia dla webpack-a