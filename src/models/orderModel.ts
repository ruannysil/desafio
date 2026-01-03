import { Document, model, Schema, Types } from "mongoose";

export type OrderState = 'CREATED' | 'ANALYSIS' | 'COMPLETED';
export type ServiceStatus = 'PENDING' | 'DONE';

export interface IOrderService {
  name: string;
  value: number;
  status: ServiceStatus;
}

export interface IOrder extends Document {
  user: Types.ObjectId;
  lab: String;
  patient: String;
  customer: String;
  state: OrderState;
  status: 'ACTIVE' | 'DELETED';
  services: IOrderService[];
}

const OrderSchema = new Schema<IOrder>(
  {
    user:{
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
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
          required: true,
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