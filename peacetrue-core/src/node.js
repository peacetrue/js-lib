//provide some method related to node
module.exports = {
    args2options(args = process.argv, prefix = '--', separator = '=') {
        let options = {};
        args.filter(argv => argv.startsWith(prefix))
            .map(argv => argv.substring(prefix.length).split(separator))
            .forEach(value => options[value[0]] = value[1]);
        return options;
    }
};