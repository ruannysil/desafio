import { Request, Response } from 'express';
import { AdvanceOrderService } from '../../services/order/advanceOrderService';

class AdvanceOrderController {
  async handler(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user_id = req.user._id;

      if (!user_id) {
        return res.status(401).json({ message: "Usuário não autenticado" });
      }

      const advanceOrder = new AdvanceOrderService();
      const order = await advanceOrder.execute(id, user_id);

      return res.status(200).json(order);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }

  }
}

export { AdvanceOrderController };

