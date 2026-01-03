import { _QueryFilter } from "mongoose";
import { Order } from "../../models/orderModel";


interface IListOrderService {
  user_id: string;
  page?: number;
  limit?: number;
  state?: 'CREATED' | 'ANALYSIS' | 'COMPLETED';
}

class ListOrderService {
  async execute({ user_id, page = 1, limit = 10, state }: IListOrderService) {
    try {
      const filter: Record<string, string> = {
        user: user_id,
        status: 'ACTIVE' as const,
      }

      if (state) {
        filter.state = state;
      }

      const skip = (page - 1) * limit;

      const orders = await Order.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }).select('-__v');
      const total = await Order.countDocuments(filter);
      const totPages = Math.ceil(total / limit);

      return {
        data: orders,
        total,
        page,
        totPages,
        hasNextPage: page < totPages,
        hasPrevPage: page > 1
      }
    }
    catch (error) {
      throw new Error("Erro ao buscar pedidos!");
    }
  }
}

export { ListOrderService };