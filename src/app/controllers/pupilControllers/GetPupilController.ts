import { Request, Response } from "express";
import { GetPupilService } from "../../services/pupilServices/GetPupilService";

export class GetPupilController {
    async handle(request: Request, response: Response): Promise<Response> {
        const params = request.params;

        const service = new GetPupilService();

        const pupil = await service.execute(params.id);

        if(!pupil) {
            return response.status(404).json({
                message: 'Aluno não encontrado'
            })
        }

        const body = {
            ...pupil,
            image: `http://localhost:3535/pupils/image/${pupil.id}`
        }

        return response.json(body)
    }
}