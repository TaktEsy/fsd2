const fs = require('fs')
const path = require('path')
const MiniCssExtract = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')

const PATHS = {
	src: path.join(__dirname, '../src'),
	dist: path.join(__dirname, '../public'),
	assets: 'static/',
}
const PAGES_DIR = `${PATHS.src}/pug/pages/`
const PAGES = fs.readdirSync(PAGES_DIR).filter(filename=>filename.endsWith('.pug'))



module.exports = {
	externals:{
		paths: PATHS,
	},
	entry: {
		indexPage: `${PATHS.src}/js/index/index.js`,
		filtersPage: `${PATHS.src}/js/filters/filters.js`,
		detailPage: `${PATHS.src}/js/detail/detail.js`,
	},
	
	output: {
		filename: `${PATHS.assets}/js/[name].js`,
		path: PATHS.dist,
		publicPath: '/',
	},

	module:{
		rules: [ 
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: '/node_modules/',
			},
			{
				test: /\.pug$/,
				loader: 'pug-loader',
				exclude: '/node_modules/',
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
				}
			}, 
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					MiniCssExtract.loader,
					{
						loader: 'css-loader',
						options: { sourceMap: true}
					}, 
					{
						loader: 'sass-loader',
						options: { sourceMap: true}
					},
					{
						loader: 'postcss-loader',
						options: { sourceMap: true, config: {path: `${PATHS.src}/js/postcss.config.js` } }
					},
				]
			}, 
			{
				test: /\.css$/,
				use: [
					'style-loader',
					MiniCssExtract.loader,
					{
						loader: 'css-loader',
						options: { sourceMap: true}
					},
					{
						loader: 'postcss-loader',
						options: { sourceMap: true, config: {path: `${PATHS.src}/js/postcss.config.js` } }
					},
				]
			}
		]},
	
		plugins:[
			new MiniCssExtract({
				filename: `${PATHS.assets}css/[name].css`,
			}),
		// new HtmlPlugin({
		// 	hash: false,
		// 	template: `${PATHS.src}/index.html`,
		// 	filename: './index.html',
		// }),
			new CopyPlugin([
				{ from: `${PATHS.src}/img`, to: `${PATHS.assets}img` },
      			{ from: `${PATHS.src}/fonts`, to: `${PATHS.assets}fonts` },
      			{ from: `${PATHS.src}/static`, to: '' },
			]),
			...PAGES.map(page => new  HtmlPlugin({
				template: `${PAGES_DIR}/${page}`,
				filename: `./${page.replace(/\.pug/,'.html')}`,
			}))
	],
}