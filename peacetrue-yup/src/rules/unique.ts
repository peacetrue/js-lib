//see https://github.com/jquense/yup#mixedtestoptions-object-schema
import {HttpClient} from "peacetrue-httpclient";

export interface UniqueOptions {
    httpClient?: HttpClient,

    url(value: string): string,
}

export const unique = ({httpClient = fetch, url = value => value}: UniqueOptions) => {
    return {
        name: 'unique',
        test: async (value: string) => !(await httpClient(url(value))),
        message: '${path} 必须是唯一的',
        params: {},
        exclusive: false,
    };
};

export default unique;