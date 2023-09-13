/**
 * 
 */
const WebpackObfuscator = require('webpack-obfuscator')

const path = require('path');
const { merge } = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'production',
    entry: {
        h5player: "./src/plugin.js"
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: `[name].min.js`
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin()
        ]
    },
    plugins: [
        new WebpackObfuscator({
            rotateStringArray: true
        }, ['excluded_bundle_name.js'])
    ]
});
