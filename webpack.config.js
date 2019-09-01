const Path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const Loadash = require('lodash');
const {args2options} = require('./src/node');

/* prefix:--
module|m=*|{moduleName}|none  //指定编译的模块，none编译到一个文件中，默认为none
clean|c //执行清除插件
*/
let options = Loadash.merge({module: 'none'}, args2options(process.argv, '-pt:'));

let configs = {
    base: {
        mode: 'development',
        // mode: 'production',
        devtool: 'source-map',
        plugins: [
            // new CleanWebpackPlugin(),
        ],
        output: {
            path: Path.resolve(__dirname, './dist'),
            libraryExport: '',
            libraryTarget: 'umd',
            globalObject: 'this',
        },
        externals: {
            'jsonpath': 'jsonpath',
            'axios': {
                commonjs: 'axios',
                commonjs2: 'axios',
                amd: 'axios',
                root: '_'
            },
        }
    },
    'none': {
        entry: {
            'Peace': './src/all.js',
        },
        output: {
            filename: 'peace.js',
            library: ['Peace'],
        },
    },
    '*': {
        entry: {
            'Core': './src/core.js',
            'PropertyPath': './src/property-path.js',
            'Object': './src/object.js',
            'AsyncValidator': './src/async-validator.js',
            'Node': './src/node.js',
            // 'Axios': './src/axios.js',
        },
        output: {
            filename(chunkData) {
                // console.info('chunkData:', chunkData);
                let module = chunkData.chunk.entryModule;
                return `peace.${module.request.substring(module.context.length + 1)}`;
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
        }
    }
};

if ('clean' in options) {
    configs.base.plugins.push(new CleanWebpackPlugin());
}

function findModuleOptions(module) {
    if (module in configs) return configs[module];
    let all = configs['*'];
    if (!(module in all.entry)) throw new Error(`invalid module[${module}]`);
    all.entry = {[module]: all.entry[module]};
    return all;
}

module.exports = Loadash.merge(configs.base, findModuleOptions(options.module));