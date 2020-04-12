let Core = require('./core');
let PropertyPath = require('./property-path');

/** 对象访问上下文 */
class VisitorContext {
    /**
     * @param {*} root 根对象值
     * @param {PropertyPath} [path] 当前属性到根对象的属性路径
     * @param {*} [parent] 父对象值
     * @param {String|Number} [name] 当前属性名
     * @param {*} [value] 当前属性值
     */
    constructor(root, path, parent, name, value) {
        this.root = root;
        this.path = path;
        this.parent = parent;
        this.name = name;
        this.value = value;
    }
}

/** 对象访问器 */
class Visitor {
    /**
     * 前置访问可遍历对象
     * @param {VisitorContext} context
     */
    preVisit(context) {}

    /**
     * 后置访问可遍历对象
     * @param {VisitorContext}context
     */
    postVisit(context) {}

    /**
     * 访问属性值
     * @param {VisitorContext}context
     */
    visit(context) {}
}

class ConsoleVisitor extends Visitor {

    preVisit(context) {
        console.info('preVisit:', context.path ? context.path.toString() : null, '=>', context.value);
    }

    postVisit(context) {
        console.info('postVisit:', context.path ? context.path.toString() : null, '=>', context.value);
    }

    visit(context) {
        console.info('visit:', context.path.toString(), '=>', context.value);
    }
}

let CONSOLE_VISITOR = new ConsoleVisitor();


/**
 * 递归遍历对象的所有属性
 * @param {*} value
 * @param {Visitor} visitor
 * @param {VisitorContext} context
 */
function _walkTree(value, visitor, context) {
    context.value = value;
    //处理原始类型
    if (Core.isSimpleType(value)) {
        visitor.visit && visitor.visit(context);
        return;
    }

    //处理数组类型
    if (value instanceof Array) {
        visitor.preVisit && visitor.preVisit(context);
        value.forEach((item, i) => {
            _walkTree(item, visitor, new VisitorContext(
                context.root,
                context.path ? context.path.addNode(i) : new PropertyPath(i),
                value,
                i,
            ));
        });
        visitor.postVisit && visitor.postVisit(context);
        return;
    }

    //处理对象类型
    let keys = Object.keys(value);
    visitor.preVisit && visitor.preVisit(context);
    keys.forEach(key => {
        _walkTree(value[key], visitor, new VisitorContext(
            context.root,
            context.path ? context.path.addNode(key) : new PropertyPath(key),
            value,
            key,
        ));
    });
    visitor.postVisit && visitor.postVisit(context);
}

/**
 * @param {*} value
 * @param {Visitor} visitor
 */
function walkTree(value, visitor) {
    _walkTree(value, visitor, new VisitorContext(value));
}

module.exports = {
    VisitorContext,
    Visitor,
    ConsoleVisitor,
    walkTree,
    CONSOLE_VISITOR
};