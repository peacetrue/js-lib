const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    // mode: 'production',

    devtool: 'inline-source-map',
    /*
    plugins: [
        new CleanWebpackPlugin(),
    ],
    */
    output: {
        path: path.resolve(__dirname, '../dist'),
        libraryExport: '',
        libraryTarget: 'umd',
        globalObject: 'this',
    },

};