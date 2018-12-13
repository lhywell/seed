const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.tdseed.default.js');
const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const utils = require('./utils')

process.env.NODE_ENV = 'production';

module.exports = merge(webpackBaseConfig, {
    devtool: 'source-map',
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: 'tdseed.min.js',
        library: 'tdseed',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        }
    },
    plugins: [
        // @todo
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new ExtractTextPlugin({
            filename: utils.assetsPath('[name].css'),
            // Setting the following option to `false` will not extract CSS from codesplit chunks.
            // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
            // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
            // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
            allChunks: true,
        }),
        new UglifyJsPlugin({
            parallel: true,
            sourceMap: true,
            uglifyOptions: {
                mangle: {
                    toplevel: true
                },
                output: {
                    comments: false
                },
            }
        })
    ]
});
