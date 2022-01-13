import * as dotenv from 'dotenv';
import axios, { AxiosResponse } from 'axios';
import { AccountType } from '../models/accounts.interface';
import { TransactionType } from '../models/transactions.interface';

dotenv.config();

const api = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 1500,
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => api.get(url).then(responseBody),
  post: (url: string, body: {}) => api.post(url, body).then(responseBody),
  patch: (url: string, body: {}) => api.patch(url, body).then(responseBody),
  delete: (url: string) => api.delete(url).then(responseBody),
};

export const Account = {
  getAccounts: async (): Promise<AccountType[]> =>
    await requests.get('accounts'),
  getAnAccount: async (id: string): Promise<AccountType> =>
    await requests.get(`accounts/${id}`),
  createAccount: async (account: AccountType): Promise<AccountType> =>
    await requests.post('accounts', account),
  updateAccount: async (
    account: AccountType,
    id: string
  ): Promise<AccountType> => await requests.patch(`accounts/${id}`, account),
  deleteAccount: async (id: string): Promise<AccountType> =>
    await requests.delete(`accounts/${id}`),
};

export const Transaction = {
  getTransactions: async (): Promise<TransactionType[]> =>
    await requests.get('transactions'),
  getATransaction: async (id: string): Promise<TransactionType> =>
    await requests.get(`accounts/${id}`),
  createTransaction: async (
    transaction: TransactionType
  ): Promise<TransactionType> =>
    await requests.post('transactions', transaction),
  updateTransaction: async (
    transaction: TransactionType,
    id: string
  ): Promise<TransactionType> =>
    await requests.patch(`accounts/${id}`, transaction),
  deleteTransaction: async (id: string): Promise<TransactionType> =>
    await requests.delete(`transactions/${id}`),
};
