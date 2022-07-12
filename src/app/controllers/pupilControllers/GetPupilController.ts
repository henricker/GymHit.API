import { Request, Response } from "express";
import dataSource from "../../../database/data-source";
import { Payment } from "../../entities/Payment";
import { GetPupilService } from "../../services/pupilServices/GetPupilService";

export class GetPupilController {
    async handle(request: Request, response: Response): Promise<Response> {
        const params = request.params;

        const service = new GetPupilService();

        const pupil = await service.execute(params.id);

        const paymentRepo = dataSource.getRepository(Payment);

        const totalPayments = await paymentRepo.count({
            where: {
                pupil_id: params.id,
                admin_id: pupil.admin_id
            }
        });

        const payments = await paymentRepo.find({
            order: {
                id: 'DESC'
            },
            take: 1,
            select: ['created_at']
        });

        if(!pupil) {
            return response.status(404).json({
                message: 'Aluno não encontrado'
            })
        }

        const body = {
            ...pupil,
            image: `http://localhost:3535/pupils/image/${pupil.id}`,
            totalPayments,
            lastPayment: payments[0]?.created_at ?? undefined
        }

        return response.json(body)
    }
}