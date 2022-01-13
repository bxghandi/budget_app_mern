import { AccountType } from './models/accounts.interface';

export const formatBalance = (balanceNumber: number): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return formatter.format(balanceNumber);
};

export const editAccountState = (
  editedAccount: AccountType,
  accounts: AccountType[]
): AccountType[] => {
  const index = accounts.findIndex(
    (account) => account._id === editedAccount._id
  );
  const newState: AccountType[] = [
    ...accounts.slice(0, index),
    Object.assign({}, accounts[index], editedAccount),
    ...accounts.slice(index + 1),
  ];
  return newState;
};
