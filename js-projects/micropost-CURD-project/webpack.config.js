// webpack v4
const path = require('path');

module.exports = {
    entry: ["@babel/polyfill", "./src/app.js"],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.module.js',
        publicPath: '/dist'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        }]
    }
};