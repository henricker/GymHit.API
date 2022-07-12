import { Request, Response } from "express";
import { AddMediaPupilService } from "../../services/pupilServices/AddMediaPupilService";


export class AddImagePupilController {

  async handle(request: Request, response: Response): Promise<Response> {

    const { id } = request.params;
    const { file } = request;

    const service = new AddMediaPupilService();

    const media = service.execute({
      pupil_id: id,
      url: file.filename
    })

    return response.json(media);
  }

}