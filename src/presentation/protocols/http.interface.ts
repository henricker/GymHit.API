
export interface IHttpResponse {
    statusCode: number;
    body: any;
}

export interface IHttpRequest {
    body?: any;
    headers?: any;
    params?: any;
    userId?: number;
}