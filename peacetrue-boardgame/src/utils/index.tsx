import {ObjectLike} from '../common-types'

/**棋盘边界*/
export interface Boundary {
    width: number,
    height: number,
}

/**单元格*/
export interface Cell extends ObjectLike<any> {
    /**单元格归属的玩家*/
    owner: string,
}

/**单元格坐标*/
export interface Location {
    x: number,
    y: number,
}

/**棋盘内坐标转换为索引*/
export function toIndex(location: Location, width: number): number {
    return location.x * width + location.y;
}

/**棋盘内索引转换为坐标*/
export function toLocation(index: number, width: number): Location {
    return {
        x: index % width,
        y: Math.floor(index / width),
    }
}

export interface Mapper<E, V> {
    (element: E, index: number): V
}

export interface ObjectLikeArray<V> extends ObjectLike<Array<V>> {
}

/**分组*/
export function groupBy<E, V>(array: Array<E>,
                              keyMapper: Mapper<E, string>,
                              valueMapper: Mapper<E, V>): ObjectLikeArray<V> {
    let groupBy: ObjectLikeArray<V> = {};
    for (let i = 0; i < array.length; i++) {
        let element = array[i];
        let key = keyMapper(element, i);
        if (!(key in groupBy)) groupBy[key] = [];
        groupBy[key].push(valueMapper(element, i));
    }
    return groupBy;
}

/**数组是否存在指定个数的递增连续值*/
export function isContinuous(items: Array<number>, count: number): boolean {
    if (items.length < count) return false;
    for (let i = 0; i <= items.length - count; i++) {
        if (_isContinuous(items.slice(i, i + count))) return true;
    }
    return false;
}

/**数组是否递增连续的*/
function _isContinuous(items: Array<number>): boolean {
    for (let i = 1; i < items.length; i++) {
        if (!(items[i - 1] + 1 === items[i])) return false;
    }
    return true;
}


/**查找胜利的玩家*/
export function findVictoryPlayer(cells: Array<Cell>, boundary: Boundary, count: number): string | null {
    if (1 === 1) return '0';

    // 单元格按归属玩家分组
    let ownerLocations = groupBy<Cell, Location>(cells,
        (element) => element ? element.owner : 'null',
        (element, index) => toLocation(index, boundary.width)
    );
    delete ownerLocations['null'];
    console.info("ownerCells:", ownerLocations);

    let owners = Object.keys(ownerLocations);
    // x 轴相等、y 轴全部相等、正斜对角、反斜对角 全部相等
    let groupBys = [
        (locations: Location[]) => groupBy(locations, element => String(element.x), element => element.y),
        (locations: Location[]) => groupBy(locations, element => String(element.y), element => element.x),
        (locations: Location[]) => groupBy(locations, element => String(element.x - element.y), element => element.x),
        (locations: Location[]) => groupBy(locations, element => String(element.x + element.y), element => element.y),
    ];

    for (let owner of owners) {
        let locations = ownerLocations[owner];
        if (locations.length < count) continue;
        for (let _groupBy of groupBys) {
            let groupedLocations = _groupBy(locations);
            console.info("groupedLocation:", groupedLocations)
            if (Object.values(groupedLocations).some(locations => isContinuous(locations, count))) return owner;
        }
    }

    return null;
}

export function extract(object: ObjectLike<any>, keys: Array<string>): ObjectLike<any> {
    let newObject: ObjectLike<any> = {};
    for (let key of keys) {
        newObject[key] = object[key];
    }
    return newObject;
}

export default {toLocation, toIndex, groupBy, findVictoryPlayer};
