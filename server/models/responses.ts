import { AccountsType } from '../models/accounts';
import { TransactionType } from '../models/transactions';
import { Response } from 'express';

export interface AccountsResponse extends Response {
  account?: AccountsType;
}

export interface TransactionResponse extends Response {
  transaction?: TransactionType;
}

export interface DeleteResponse extends Response {
  n?: number;
  ok?: number;
  deletedCount?: number;
}
