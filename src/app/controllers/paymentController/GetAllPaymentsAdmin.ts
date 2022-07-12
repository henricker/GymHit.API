import { Request, Response } from "express";
import dataSource from "../../../database/data-source";
import { Payment } from "../../entities/Payment";


export class GetAllPaymentsAdmin {

  async handle(request: Request, response: Response) {
    const limit = 4;
    const { id } = request.params;
    const { page } = request.query;

    const respository = dataSource.getRepository(Payment);

    const payments = respository.find({
      where: {
        admin_id: id
      },
      take: limit,
      skip: (Number(page) - 1) * limit,
    });

    const totalCounts = await respository.count({
      where: {
        admin_id: id
      }
    })

    return response.json({ payments, totalCounts });
  }

}