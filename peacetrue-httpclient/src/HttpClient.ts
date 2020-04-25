/** simple abstract interface for fetch */
export default interface HttpClient {
    (url: string, options?: any): Promise<any>
}

export const defaultHttpClient: HttpClient = fetch;


