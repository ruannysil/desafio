import { Order } from "../../models/orderModel";

interface CreateOrderRequest {
  lab: string;
  patient: string;
  customer: string;
  services: Array<{
    name: string;
    value: number;
  }>
}

class CreateOrderService {
  async execute({ lab, patient, customer, services }: CreateOrderRequest, user_id: string) {

    if (!services || services.length === 0) {
      throw new Error("É neccessario pelo menos um servico!");
    }

    if (!lab || lab.trim() === '') {
      throw new Error("Lab é obrigatório!");
    }

    if (!patient || patient.trim() === '') {
      throw new Error("Patient é obrigatório!");
    }

    if (!customer || customer.trim() === '') {
      throw new Error("Customer é obrigatório!");
    }

    services.forEach(service => {
      if (service.value === undefined || service.value === null) {
        throw new Error("Valor do servico é obrigatório!");
      }

      if (service.value < 0) {
        throw new Error("Valor do servico não pode ser negativo!");
      }
    });

    const totalValue = services.reduce((sum, service) => sum + service.value, 0);
    if (totalValue <= 0) {
      throw new Error("Valor total do pedido deve ser maior que zero");
    }

    const formattedServ = services.map(service => ({
      name: service.name.trim(),
      value: Number(service.value),
      status: 'PENDING' as const
    }))


    const order = await Order.create({
      lab,
      patient,
      customer,
      state: 'CREATED',
      status: 'ACTIVE',
      services: formattedServ,
      user: user_id
    });
    return order.save();
  }
}

export { CreateOrderService };

