import { Request, Response } from "express";
import dataSource from "../../../database/data-source";
import { Medias } from "../../entities/Media";
import fs from 'fs/promises';
import path from 'path';


export class GetMediaPupilController {
  async handle(request: Request, response: Response) {
  
    const { id } = request.params;
    const repository = dataSource.getRepository(Medias);

    const media = await repository.findOne({
      where: {
        pupil_id: id
      }
    });

    if(!media) {
      response.sendFile('https://icon-library.com/images/generic-user-icon/generic-user-icon-4.jpg')
      return;
    }

    const file = path.resolve(__dirname, '..', '..', '..', '..', 'uploads', media.url);
    response.sendFile(file);
  }
}