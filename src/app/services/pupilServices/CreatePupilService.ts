import { Pupil } from "../../entities/Pupil";
import { Admin } from "../../entities/Admin";
import dataSource from "../../../database/data-source";

interface PupilRequest{
    name: string
    cpf: string;
    admin_id: string,
    telephone: string
    email: string
}

export class CreatePupilService{
    async execute({name, cpf, admin_id, telephone, email}: PupilRequest): Promise<Pupil | Error>{
        const pupilRepository = dataSource.getRepository(Pupil)
        const adminRepository = dataSource.getRepository(Admin)


        if(await pupilRepository.findOne({where: {cpf}})){
            return new Error('Cpf already exists')
        }

        if(!await adminRepository.findOne({where: {id: admin_id}})){
            return new Error('Admin does not exists')
        }


        const pupil = pupilRepository.create({
            name,
            cpf,
            admin_id,
            telephone,
            email
        })

        await pupilRepository.save(pupil)

        return pupil
    }
}