import { IHttpRequest, IHttpResponse } from './http.interface';

export interface IMiddleware {
  handle(request: IHttpRequest): Promise<IHttpResponse>;
}
