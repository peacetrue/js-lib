/** simple abstract interface for fetch */
export default interface HttpClient {
    (url: string, options?: any): Promise<any>;
}
export declare const defaultHttpClient: HttpClient;
