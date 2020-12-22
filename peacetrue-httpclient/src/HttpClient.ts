/** simple abstract interface for fetch */
export interface HttpClient {
    (url: string, options?: any): Promise<any>
}

export const defaultHttpClient: HttpClient = fetch;

export default HttpClient;