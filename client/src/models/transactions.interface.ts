export interface TransactionType {
  id?: string;
  date: Date;
  description: string;
  category: string;
  amount: number;
  account: string;
}
