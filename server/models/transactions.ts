import { Schema, model } from 'mongoose';

interface Transaction {
  date: Date;
  description: string;
  category: string;
  amount: number;
  account: string;
}

export type TransactionType = {
  date: Date;
  description: string;
  category: string;
  amount: number;
  account: string;
};

const schema = new Schema<Transaction>({
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
