import { useEffect, useState } from 'react';
import { TransactionType } from '../models/transactions.interface';
import { Transaction } from '../api/api';

function AllAccounts() {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await Transaction.getTransactions();
      setTransactions(data);
    };
    fetchTransactions().catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>All Accounts</h1>
      <pre>{JSON.stringify(transactions, null, 2)}</pre>
    </div>
  );
}

export default AllAccounts;
