import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import AccountDetail from './AccountDetail';
import useStore from '../../store';

interface SidebarMenuProps {
  menuName: string;
}

const CategoryBox = styled(Box)`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 2rem;
  justify-content: space-between;
  margin: 0 0.3125rem 0.25rem 0.5rem;
  padding: 0;
`;

const CategoryButton = styled(Button)`
  color: #bdbebf;
  float: left;
  font-size: 0.6875rem;
  letter-spacing: 0.085rem;
  margin-left: 0;
  padding-left: 0;
  text-align: left;
  background-color: var(--main-background);
`;

const TotalBalance = styled.div`
  -webkit-box-flex: 1;
  flex: 0 1 auto;
  font-size: 0.6875rem;
  margin-left: auto;
  max-width: 13rem;
  background-color: inherit;
  color: #bdbebf;
`;

const EndMenuRow = styled.div`
  -webkit-box-flex: 1;
  flex: 0 0 auto;
  height: 1rem;
  margin: 0 0.5rem;
  position: relative;
  width: 1rem;
`;

const formatBalance = (balanceNumber: number): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return formatter.format(balanceNumber);
};

const SidebarMenus: React.FC<SidebarMenuProps> = ({ menuName }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const accounts = useStore((state) => state.accounts);

  useEffect(() => {
    const result: number = accounts
      .filter((account) => account.category === menuName)
      .map((account) => account.currentBalance)
      .reduce((a, b) => a + b, 0);

    setTotalBalance(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts]);

  const schema = yup.object().shape({
    nickname: yup.string().min(4).required(),
    balance: yup
      .string()
      .required()
      .matches(
        /^\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$/,
        'Not valid currency'
      ),
  });

  return (
    <div>
      <CategoryBox>
        <CategoryButton
          disableRipple
          disableElevation
          variant='text'
          startIcon={
            open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />
          }
          onClick={() => setOpen(!open)}
        >
          {menuName}
        </CategoryButton>
        {menuName !== 'Closed' && (
          <TotalBalance>{formatBalance(totalBalance)}</TotalBalance>
        )}
        <EndMenuRow />
      </CategoryBox>
      {open && (
        <AccountDetail
          accounts={accounts}
          schema={schema}
          menuName={menuName}
        />
      )}
    </div>
  );
};

export default SidebarMenus;
