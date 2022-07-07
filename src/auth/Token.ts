import {Request, Response} from 'express'
import { Admin } from '../app/entities/Admin'
import dataSource from '../database/data-source'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

type errorsRequest = {
    field: any
    message: string
}

class Token{
    async authenticate(request: Request, response: Response){
        const {email, password} = request.body

        const dataMandatory = ['email', 'password']
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

        const adminRepository = dataSource.getRepository(Admin)
        const adminExists = await adminRepository.findOne({where: {email}}) 

        if(!adminExists) return response.status(404).json('Invalid Email')

        const correctPass = bcrypt.compareSync(password, adminExists.password) 
        if(!correctPass) return response.status(401).json('Invalid password')

        const accessToken = jwt.sign({admin_id: adminExists.id, email: adminExists.email}, process.env.SECRET_JWT_KEY, {expiresIn: '1d'})

        return response.status(200).json({
            accessToken,
            fantasy_name: adminExists.fantasy_name,
            email: adminExists.email,
            id: adminExists.id,
        })
    }
}

export default new Token()