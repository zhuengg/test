/**
 * 
 */

const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const devConfig = {
    mode: 'development',
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, "../example"),
        filename: `[name].min.js`,
    },
    devServer: {
        port: process.argv.includes('--https') ? '9443' : '9080',
        static: [
            {
                directory: path.resolve(__dirname, '../example'),
            }
        ],
    }
}

// console.debug(process.argv)
// 启用跨域隔离
if (process.argv.includes('--https')) {
    Object.assign(devConfig.devServer, {
        headers: {
            'Cross-Origin-Embedder-Policy': 'require-corp',
            'Cross-Origin-Opener-Policy': 'same-origin'
        }
    })
}

module.exports = merge(common, devConfig);
