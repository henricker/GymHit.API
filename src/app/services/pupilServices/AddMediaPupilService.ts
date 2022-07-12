import dataSource from "../../../database/data-source";
import { Medias } from "../../entities/Media";

interface AddMediaPupilProps {
  url: string;
  pupil_id: string;
}

export class AddMediaPupilService {

  async execute({ pupil_id, url }: AddMediaPupilProps) {
    const repository = dataSource.getRepository(Medias);

    const media = repository.create({
      pupil_id,
      url
    });

    media.url = url;
    media.pupil_id = pupil_id;
    return repository.save(media);
  }

}