import { Request, Response } from "express";
import { CreateOrderService } from "../../services/order/createOrderService";

class CreateOrderController {
  async handle(req: Request, res: Response) {
    const { lab, patient, customer, services } = req.body;
    const user_id = req.user._id;

    try {
      const createOrder = new CreateOrderService();
      const order = await createOrder.execute({
        lab,
        patient,
        customer,
        services
      }, user_id);
      return res.status(200).json({ order });
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }
}


export { CreateOrderController };