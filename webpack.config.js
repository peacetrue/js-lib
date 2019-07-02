const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = {
    mode: 'development',
    // mode: 'production',
    entry: {
        'Core': './src/core.js',
        'PropertyPath': './src/property-path.js',
        'Object': './src/object.js',
        'AsyncValidator': './src/async-validator.js',
    },
    devtool: 'inline-source-map',
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
    externals: {
        './core': {
            commonjs: 'peacetrue-js/src/core',
            commonjs2: 'peacetrue-js/src/core',
            amd: 'peacetrue-js/src/core',
            root: ['Peace', 'Core']
        },
        './property-path': {
            commonjs: 'peacetrue-js/src/property-path',
            commonjs2: 'peacetrue-js/src/property-path',
            amd: 'peacetrue-js/src/property-path',
            root: ['Peace', 'PropertyPath']
        },
        'jsonpath': 'jsonpath'
    }

};