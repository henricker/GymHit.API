import dataSource from "../../../database/data-source";
import { Pupil } from "../../entities/Pupil";

export class GetPupilService {
    async execute(id: string): Promise<Pupil> {
        const pupilRepository = dataSource.getRepository(Pupil);

        return pupilRepository.findOne({
            where: {
                id
            }
        })
    }
}