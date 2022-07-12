import { Request, Response } from "express";
import dataSource from "../../../database/data-source";
import { Admin } from "../../entities/Admin";
import { Payment } from "../../entities/Payment";

export class CreatePaymentController {
 
  async handle(request: Request, response: Response) {

    const { admin_id, pupil_id } = request.body;

    const respository = dataSource.getRepository(Payment);
    const adminRepo = dataSource.getRepository(Admin);

    const { amount } = await adminRepo.findOne({
      where: {
        id: admin_id
      },
      select: ['amount']
    })

    const payment = respository.save({
      admin_id,
      pupil_id,
      amount
    });


    return response.json(payment);
  }
  
}