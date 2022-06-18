import { IHttpRequest, IHttpResponse } from "./http.interface";

export interface IController {
    handle(request: IHttpRequest): Promise<IHttpResponse>
}