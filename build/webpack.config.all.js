const BaseConfig = require('./webpack.config.base');
const Lodash = require('lodash');

module.exports = Lodash.merge({
    entry: {
        'peace': './src/all.js',
    },
    output: {
        filename: 'peace.js',
        library: ['Peace'],
    },
    externals: {
        'jsonpath': 'jsonpath'
    }
}, BaseConfig);