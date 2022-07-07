import { Request, Response } from "express";
import { GetAllPupilsService } from "../../services/pupilServices/GetAllPupilsService";

export class GetAllPupilsController{
    async handle(request: Request, response: Response){
        const { page, pattern } = request.query;

        const service = new GetAllPupilsService()
        const admin_id = request.admin.admin_id
        const { pupils, totalCounts } = await service.execute(admin_id, Number(page ?? 10), pattern as string);
        
        return response.json({ pupils, totalCounts })
    }
}