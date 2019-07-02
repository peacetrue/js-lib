const BaseConfig = require('./webpack.config.base');
const Lodash = require('lodash');

module.exports = Lodash.merge({
    entry: {
        'Core': './src/core.js',
        'PropertyPath': './src/property-path.js',
        'Object': './src/object.js',
        'AsyncValidator': './src/async-validator.js',
    },
    output: {
        filename(chunkData) {
            let name = chunkData.chunk.name.replace(/([A-Z])/g, (value) => '-' + value.toLowerCase()).substr(1);
            return `peace.${name}.js`;
        },
        library: ['Peace', '[name]'],
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
}, BaseConfig);