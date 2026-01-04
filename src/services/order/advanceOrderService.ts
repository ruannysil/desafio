import { Order, OrderState } from "../../models/orderModel";

class AdvanceOrderService {
  async execute(order_id: string, user_id: string) {
    const order = await Order.findOne({ _id: order_id, user: user_id, status: 'ACTIVE' });
    console.log(order_id);

    if (!order) {
      throw new Error("Pedido não encontrado!");
    }

    if (order.status === 'DELETED') {
      throw new Error("Não é possível avançar um pedido deletado");
    }

    const stateSequence: OrderState[] = ['CREATED', 'ANALYSIS', 'COMPLETED'];
    const currentIndex = stateSequence.indexOf(order.state);

    if (currentIndex === -1) {
      throw new Error(`Estado atual inválido: ${order.state}`);
    }


    const currentState = order.state;
    const nextState = stateSequence[currentIndex + 1];

    if (currentIndex >= stateSequence.length - 1) {
      throw new Error(`O pedido já está no estado final (${order.state}) e não pode avançar mais.`);
    }

    if (!nextState) {
      if (currentState === 'COMPLETED') {
        throw new Error("O pedido já está COMPLETED.");
      }
      throw new Error(`Não é possível avançar o estado a partir de ${currentState}.`);
    }

    order.state = nextState as OrderState;
    await order.save();

    return {
      success: true,
      message: `Pedido avançado de ${currentState} para ${nextState}.`,
      data: order,
    }

  }
}

export { AdvanceOrderService };
