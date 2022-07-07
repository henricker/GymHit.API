import {Request, Response} from 'express'
import { CreatePupilService } from '../../services/pupilServices/CreatePupilService'

type errorsRequest = {
    field: any
    message: string
}

export class CreatePupilController{
    async handle(request: Request, response: Response){
        const {name, cpf, email, admin_id, telephone} = request.body

        const dataMandatory = ['name', 'cpf', 'email', 'admin_id', 'telephone']
        const errors: Array<errorsRequest> = []

        dataMandatory.forEach(element => {
            if(!request.body[element]){
                errors.push({
                    field: element,
                    message: `The ${element} field is required`
                })
            }
        })

        if(errors.length > 0) return response.json(errors)

        if(request.admin.admin_id !== admin_id) return response.status(403).json("Not authorized for different admins")

        const service = new CreatePupilService()
        const result = await service.execute({name, cpf, email, admin_id, telephone})

        return result instanceof Error ? response.status(400).json(result.message) : response.status(201).json(result)
    }
}