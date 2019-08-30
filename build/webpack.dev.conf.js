const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConf = require('./webpack.base.conf')

const devConf = merge(baseConf, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        // compress: true,
        // historyApiFallback: true,
        // disableHostCheck: true,
        // contentBase: baseConf.externals.paths.dist,
        contentBase: './public',
        watchContentBase: true,
        inline: true,
        historyApiFallback: true,
        port: 8080,
        stats: {
            colors: true,
            modules: false,
            chunks: false,
            chunkGroups: false,
            chunkModules: false,
            env: true,
        },
        overlay: {
            warnings: true,
            errors: true,
        },
        
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map',
        })
    ],
})

module.exports = new Promise((resolve, reject) => {
    resolve(devConf)
})