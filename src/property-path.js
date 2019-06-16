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

    /**
     * 设置属性值
     * @param {*} object 任意对象
     * @param {*} value 属性值
     */
    setValue(object, value) {
        //roles,0,name,admin = {roles:[{name:'admin'}]}
        this.nodes.forEach((node, index) => {
            //如果是叶子节点直接设置值
            if (this.nodes.length === index + 1) {
                object[node] = value;
            } else if (!object[node]) {
                //如果途经空对象，初始化一个对象
                object = object[node] = typeof this.nodes[index + 1] === 'number' ? [] : {};
            }
        });
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
