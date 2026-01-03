import { Document, model, Schema } from "mongoose";

export type OrderState = 'CREATED' | 'ANALYSIS' | 'COMPLETED';
export type ServiceStatus = 'PENDING' | 'DONE';

export interface IOrderService {
  name: string;
  value: string;
  status: ServiceStatus;
}

export interface IOrder extends Document {
  lab: String;
  patient: String;
  customer: String;
  state: OrderState;
  status: 'ACTIVE' | 'DELETED';
  services: IOrderService[];
}

const OrderSchema = new Schema<IOrder>(
  {
    lab: {
      type: String,
      required: true,
    },
    patient: {
      type: String,
      required: true,
    },
    customer: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      enum: ['CREATED', 'ANALYSIS', 'COMPLETED'],
      default: 'CREATED',
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'DELETED'],
      default: 'ACTIVE',
    },
    services: [
      {
        name: {
          type: String,
          required: String,
        },
        value: {
          type: Number,
          required: true,
        },
        status: {
          type: String,
          enum: ['PENDING', 'DONE'],
          default: 'PENDING',
        }
      }
    ]
  },
  {
    timestamps: true,
  }
);


export const Order = model<IOrder>('Order', OrderSchema);