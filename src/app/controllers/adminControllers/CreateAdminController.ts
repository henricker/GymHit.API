import {Request, Response} from 'express'
import { CreateAdminService } from '../../services/adminServices/CreateAdminService'

export class CreateAdminController{
    async handle(request: Request, response: Response){
        const dataMandatory = ['email', 'password', 'city', 'street', 'fantasy_name', 'coorporate_name', 'cnpj', 'number', 'district', 'telephone', 'amount']
        const errors: Array<any> = []

        dataMandatory.forEach(element => {
            if(!request.body[element]){
                errors.push({
                    field: element,
                    message: `The ${element} field is required`
                })
            }
        });

        if(errors.length > 0) {return response.json(errors)}

        const service = new CreateAdminService()

        const result = await service.execute(request.body);

        return result instanceof Error ? response.status(400).json(result.message) : response.status(201).json(result)
    }
}