var webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
	entry: {
    module: './src/main.js',
    common: ['react', 'react-dom', 'material-ui/lib/index.js', 'ipc', 'https', 'lodash', 'jquery', './src/ImgCard.js']
  },
	// entry: ,
	output: {
		path: __dirname + "/build",
		filename: 'main.js'
	},
	devtool: 'source-map',
	target: 'atom',
	stats: {
		colors: true,
		modules: true,
		reasons: true
	},
	resolve: {
		alias: {},
		modulesDirectories: [
			'node_modules'
		],
	},
	module: {
		loaders: [
			{
				test: /\.js/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				loader: 'style!css!sass'
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			}
		]
	},
	plugins: [
		new webpack.IgnorePlugin(/vertx/),
		new BrowserSyncPlugin({
			host: 'localhost',
			port: 9999,
			open: false,
			files: ['index.html','index.css', 'build/main.js'],
			server: {
				baseDir: ['.']
			}
		})
	]
};
