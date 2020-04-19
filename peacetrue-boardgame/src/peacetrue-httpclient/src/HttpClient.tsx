export interface HttpClientOptions {
    params?: any,
    body?: any,

    [propName: string]: any
}

export interface HttpClient<T> {
    (url: string, options: HttpClientOptions): Promise<T>
}

export interface HttpClientProxy {
    (httpClient: HttpClient<any>): HttpClient<any>
}