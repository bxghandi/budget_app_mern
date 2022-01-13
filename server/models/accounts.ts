import { Schema, model } from 'mongoose';

interface Accounts {
  id?: string;
  name: string;
  nickname: string;
  startingBalance: number;
  currentBalance: number;
  category: string;
  subCategory?: string;
}

export type AccountsType = {
  id?: string;
  name: string;
  nickname: string;
  startingBalance: number;
  currentBalance: number;
  category: string;
  subCategory?: string;
};

const schema = new Schema<Accounts>({
  id: {
    type: String,
    required: false,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    default: 'Account',
    unique: true,
  },
  nickname: {
    type: String,
    unique: true,
  },
  startingBalance: {
    required: true,
    type: Number,
    default: 0,
  },
  currentBalance: {
    type: Number,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: false,
    default: '',
  },
});

export const Account = model<Accounts>('Accounts', schema);
