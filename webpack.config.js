const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = {
    mode: 'development',
    // mode: 'production',
    entry: {
        'Core': './src/core.js',
        'PropertyPath': './src/property-path.js',
        'Object': './src/object.js',
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
            commonjs: './core',
            commonjs2: './core',
            amd: './core',
            root: 'Peace.Core'
        },
        './property-path': {
            commonjs: './property-path',
            commonjs2: './property-path',
            amd: './property-path',
            root: 'Peace.PropertyPath'
        }
    }

};