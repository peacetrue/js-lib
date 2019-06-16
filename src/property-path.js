/** 属性路径 */
class PropertyPath {

    /**
     * @param {...String|Number} nodes 属性路径中的节点数组
     */
    constructor(...nodes) {
        this.nodes = nodes;
        this.nodes.forEach((node, i) => this[i] = node);
    }

    /**
     * 在末尾添加节点
     * @param {String|Number} node
     * @return {PropertyPath}
     */
    addNode(node) {
        return new PropertyPath(...this.nodes, node);
    }

    /**
     * 获取属性值
     * @param {*} object 任意对象
     * @return {null | undefined | *}
     */
    getValue(object) {
        let value = object;
        for (let i = 0; i < this.nodes.length; i++) {
            if (value === undefined) return undefined;
            if (value === null) return null;
            value = value[this.nodes[i]];
        }
        return value;
    }

    /**属性路径的字符串格式*/
    toString() {
        let string = '';
        this.nodes.forEach((node, i) => {
            if (typeof node === 'number') {
                string += '[' + node + ']'
            } else {
                string += (i === 0 ? '' : '.') + node;
            }
        });
        return string;
    }
}


module.exports = PropertyPath;
