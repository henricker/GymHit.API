import {Request, Response} from 'express'
import { CreatePupilService } from '../../services/pupilServices/CreatePupilService'

type errorsRequest = {
    field: any
    message: string
}

export class CreatePupilController{
    async handle(request: Request, response: Response){
        const {name, cpf, email, admin_id, telephone, height, weight} = request.body

        const dataMandatory = ['name', 'cpf', 'email', 'admin_id', 'telephone', 'weight', 'height']
        const errors: Array<errorsRequest> = []

        dataMandatory.forEach(element => {
            if(!request.body[element]){
                errors.push({
                    field: element,
                    message: `O campo ${element} é obrigatório`
                })
            }
        })

        if(errors.length > 0) return response.json(errors)

        if(request.admin.admin_id !== admin_id) return response.status(403).json("Operação não autorizada")

        const service = new CreatePupilService()
        const result = await service.execute({ name, cpf, email, admin_id, telephone, height, weight})

        return result instanceof Error ? response.status(400).json(result.message) : response.status(201).json(result)
    }
}