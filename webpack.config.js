let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let path = require("path");

// let publicPath = 'http://localhost:3000/dist/';

module.exports = {
    entry: {
        simpleByThree:path.resolve(__dirname, "public/src/js/simpleByThree.js")
    },
    output: {
        path: path.resolve(__dirname, 'public/dist/'),
        filename: "[name].js",
        //配置按需加载[chunkhash:5]
        chunkFilename: '[name].chunk.js',
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel',
                include: [path.resolve(__dirname, 'public/src/js/')],
                exclude: /node_modules/,
                query: {
                    "presets":
                    [
                        "es2015",
                        "stage-0"
                    ]
                }
            },
            {
                test: /\.scss$/,//'postcss-loader?parser=postcss-scss'
                loader: ExtractTextPlugin.extract('style', ['css', 'postcss', 'sass'])
            }
        ]
    },
    plugins:[
        new ExtractTextPlugin("dist/styles/[name].css")
    ],
    devtool: 'source-map'
}
