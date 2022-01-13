import { AnyObjectSchema } from 'yup';
import Lazy from 'yup/lib/Lazy';
import { AccountType } from '../../models/accounts.interface';
import AccountLink from './AccountLink';

interface AccountDetailProps {
  accounts: AccountType[];
  menuName: string;
  schema: AnyObjectSchema | Lazy<any, unknown>;
}

const AccountDetail: React.FC<AccountDetailProps> = ({
  accounts,
  menuName,
  schema,
}) => {
  return (
    <div>
      {accounts
        .filter((account) => account.category === menuName)
        .map((account, index) => (
          <AccountLink key={index} account={account} schema={schema} />
        ))}
    </div>
  );
};

export default AccountDetail;
