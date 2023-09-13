/**
 * 
 */

module.exports = {
    entry: {
        rotate: "./src/packages/rotateImage/index.js"
    },
    output: {
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     exclude: [/node_modules/],
            //     use: [
            //         {
            //             loader: 'babel-loader?cacheDirectory=true'
            //         },
            //     ]
            // },
            // {
            //     test: /worker\.js$/,
            //     use: {
            //         loader: "worker-loader",
            //         options: {
            //             filename: "[name].min.js",
            //             inline: "no-fallback",
            //         }
            //     },
            // },
            // {
            //     test: /\.worklet\.js$/,
            //     exclude: [/node_modules/],
            //     use: {
            //         loader: 'worklet-loader',
            //         options: {
            //             name: '[name].js',
            //             inline: true
            //         }
            //     },
                
            // }
        ]
    }
};
