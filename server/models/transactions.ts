import { Schema, model } from 'mongoose';

interface Transaction {
  id?: string;
  date: Date;
  description: string;
  category: string;
  amount: number;
  account: string;
}

export type TransactionType = {
  id?: string;
  date: Date;
  description: string;
  category: string;
  amount: number;
  account: string;
};

const schema = new Schema<Transaction>({
  id: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: '',
  },
  amount: {
    type: Number,
    required: true,
  },
  account: {
    type: String,
    required: true,
  },
});

export const Transaction = model<Transaction>('Transaction', schema);
