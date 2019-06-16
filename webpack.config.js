const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: {
        'Core': './src/core.js',
        'PropertyPath': './src/property-path.js',
        'Object': './src/object.js',
    },
    // devtool: 'inline-source-map',
    plugins: [
        new CleanWebpackPlugin(),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename(chunkData) {
            let name = chunkData.chunk.name.replace(/([A-Z])/g, (value) => '-' + value.toLowerCase()).substr(1);
            return `peace.${name}.js`;
        },
        library: ['Peace', '[name]'],
        libraryExport: '',
        libraryTarget: 'umd',
        globalObject: 'this',
    },
    // externals: function (context, request, callback) {
    //     console.info('arguments:', arguments);
    //     if (/^yourregex$/.test(request)) {
    //         return callback(null, 'commonjs ' + request);
    //     }
    //     callback();
    // },
    externals: ['./core', './property-path']

};