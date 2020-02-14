import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
module.exports = {
    entry: path.join(__dirname, 'react-src', 'index.js'),
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'chat.js'
    },
    mode: process.env.NODE_ENV || 'development',
    resolve: {
        modules: [path.resolve(__dirname, 'react-src'), 'node_modules']
    },
    devServer: {
        contentBase: path.join(__dirname, 'react-src'),
		compress: true,
        port: 2028,
        // host: "192.168.19.117"
    },
    module: {
        rules: [{
            // this is so that we can compile any React,
            // ES6 and above into normal ES5 syntax 
            test: /\.(js|jsx)$/,
            // we do not want anything from node_modules to be compiled 
            exclude: /node_modules/,
            use: ['babel-loader']
        }, {
            test: /\.(css|scss)$/,
            use: ["style-loader",
                // creates style nodes from JS strings 
                "css-loader",
                // translates CSS into CommonJS 
                "sass-loader"
                // compiles Sass to CSS, using Node Sass by default
            ]
        }, {
            test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
            loaders: ['file-loader']
        }]
    },
    plugins: [new HtmlWebpackPlugin({
        template: path.join(__dirname, 'react-src', 'index.html')
    })]
};