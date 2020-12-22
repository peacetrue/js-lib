export interface Authentication {

    isAuthenticated(): boolean,

    getAuthenticateInfo(): any,

    register(params: any): Promise<any>,

    login(params: any): Promise<any>,

    logout(params?: any): Promise<any>,
}

export default Authentication;