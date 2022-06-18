import { Request, Response } from "express";
import { IController, IHttpRequest } from "../../../presentation/protocols";

export const adaptRoute =
  (controller: IController) => async (request: Request, response: Response) => {
    const httpRequest: IHttpRequest = {
      body: request.body,
      params: request.params,
      user: request.user,
      headers: request.headers,
    };

    const httpResponse = await controller.handle(httpRequest);
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode < 500)
      return response.status(httpResponse.statusCode).json(httpResponse.body);
    return response
      .status(httpResponse.statusCode)
      .json({ error: httpResponse.body.message });
  };
