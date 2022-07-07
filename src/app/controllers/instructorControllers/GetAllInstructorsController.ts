import { Request, Response } from "express";
import { GetAllInstructorsService } from "../../services/instructorServices/GetAllInstructorsService";

export class GetAllInstructorsController{
    async handle(request: Request, response: Response){
        const service = new GetAllInstructorsService()
        const admin_id = request.admin.admin_id
        const instructors = await service.execute(admin_id)
        
        return response.json(instructors)
    }
}