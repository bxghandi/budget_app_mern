import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { ListButton } from '../styled/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import * as yup from 'yup';
import AddAccountModal from '../sidebar/AddAccountModal';
import useStore from '../../store';

interface AddAccountProps {}

const AddAccount: React.FC<AddAccountProps> = () => {
  const [open, setOpen] = useState<boolean>(false);
  const accounts = useStore((state) => state.accounts);

  const schema = yup
    .object()
    .shape({
      name: yup
        .string()
        .notOneOf(accounts.map((account) => account.name))
        .min(4)
        .required(),
      nickname: yup
        .string()
        .notOneOf(accounts.map((account) => account.nickname))
        .min(4),
      balance: yup
        .string()
        .required()
        .matches(
          /^\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$/,
          'Not valid currency'
        ),
      category: yup.string().required(),
      subCategory: yup
        .string()
        .when('category', { is: 'Budget', then: yup.string().required() }),
    })
    .required();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Grid container spacing={2} justifyContent='flex-start'>
        <Grid item xs={8}>
          <ListButton divider onClick={handleClickOpen}>
            <ListItemIcon
              style={{ minWidth: '20px', paddingLeft: '5px' }}
              sx={{ color: 'common.white' }}
            >
              <AddCircleIcon style={{ fontSize: 15 }} />
            </ListItemIcon>
            <ListItemText
              primary='Add Account'
              primaryTypographyProps={{
                color: 'common.white',
                variant: 'body2',
                noWrap: true,
              }}
            />
          </ListButton>
        </Grid>
      </Grid>
      <AddAccountModal open={open} onClose={handleClose} schema={schema} />
    </div>
  );
};

export default AddAccount;
