import { Request, Response } from "express";
import { ListOrderService } from "../../services/order/getOrderListService";

class GetOrderListController {
  async handle(req: Request, res: Response) {
    try {
      const user_id = req.user._id;

      if(!user_id) {
        return res.status(400).json({ message: "Usuário não tem permissao!" });
      }
      const {page, limit, state} = req.query;
      const service = new ListOrderService();
      const orders = await service.execute({ 
        user_id, 
        page: page ? Number(page) : 1,
        limit:limit ? Math.min(Number(limit), 100) : 10,
        state: state as 'CREATED' | 'ANALYSIS' | 'COMPLETED'});

      return res.status(200).json(orders);
    }
    catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }

  }
}

export { GetOrderListController };