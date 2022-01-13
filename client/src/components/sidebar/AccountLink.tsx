import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import EditAccountModal from './EditAccountModal';
import {
  AccountEditBox,
  AccountName,
  AccountBalance,
  AccountBox,
  EndMenuRow,
} from '../styled/SideDrawer';
import { AccountType } from '../../models/accounts.interface';
import { useState } from 'react';
import { AnyObjectSchema } from 'yup';
import { formatBalance } from '../../utils';
import Lazy from 'yup/lib/Lazy';

interface AccountLinkProps {
  account: AccountType;
  schema: AnyObjectSchema | Lazy<any, unknown>;
}

const AccountLink: React.FC<AccountLinkProps> = ({ account, schema }) => {
  const [showIcon, setShowIcon] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Link
        href='#'
        component={AccountBox}
        onMouseEnter={() => {
          setShowIcon(true);
        }}
        onMouseLeave={() => {
          setShowIcon(false);
        }}
        underline='none'
        onClick={() => {
          console.log('account link clicked');
        }}
      >
        <AccountEditBox>
          {showIcon && (
            <IconButton
              sx={{ color: '#bdbebf' }}
              href='#'
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                setOpen(true);
              }}
            >
              <EditTwoToneIcon sx={{ fontSize: 18 }} />
            </IconButton>
          )}
        </AccountEditBox>
        <AccountName>{account.nickname}</AccountName>
        <AccountBalance>{formatBalance(account.currentBalance)}</AccountBalance>
        <EndMenuRow />
      </Link>
      <div>
        <EditAccountModal
          open={open}
          onClose={handleClose}
          account={account}
          schema={schema}
          formDefaults={{
            nickname: account.nickname,
            balance: account.currentBalance.toString(),
          }}
        />
      </div>
    </div>
  );
};

export default AccountLink;
