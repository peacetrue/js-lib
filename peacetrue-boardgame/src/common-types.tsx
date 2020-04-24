export interface ObjectLike<V> {
    [name: string]: V
}

export interface Loadable<T = any> {
    loading: boolean,
    data?: T,
}

