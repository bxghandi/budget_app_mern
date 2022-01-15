import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import { yupResolver } from '@hookform/resolvers/yup';
import { AnyObjectSchema } from 'yup';
import Lazy from 'yup/lib/Lazy';
import InputLabel from '@mui/material/InputLabel';
import { AccountType } from '../../models/accounts.interface';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { TransactionType } from '../../models/transactions.interface';
import { Account, Transaction } from '../../api/api';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { addToAccountState } from '../../utils';
import useStore from '../../store';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  schema: AnyObjectSchema | Lazy<any, unknown>;
}

interface FormInput {
  name: string;
  nickname?: string;
  balance: string;
  category: string;
  subCategory?: string;
}

const AddAccountModal: React.FC<ModalProps> = ({ open, onClose, schema }) => {
  const {
    control,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      name: '',
      nickname: '',
      balance: '',
      category: '',
      subCategory: '',
    },
  });

  const accounts = useStore((state) => state.accounts);
  const setAccounts = useStore((state) => state.setAccounts);

  const handleClose = () => onClose();
  const watchCategory = watch('category', '');

  const onSubmit: SubmitHandler<FormInput> = (data: FormInput) => {
    const transaction: TransactionType = {
      date: new Date(),
      description: 'Starting Balance',
      category: data.category,
      amount: Number(data.balance),
      account: data.name,
    };

    const account: AccountType = {
      name: data.name,
      nickname: data.nickname ? data.nickname : data.name,
      startingBalance: Number(data.balance),
      currentBalance: Number(data.balance),
      category: data.category as string,
      subCategory: data.subCategory as string,
    };

    Account.createAccount(account).then((res) => console.log(res));
    setAccounts(addToAccountState(account, accounts));
    Transaction.createTransaction(transaction).then((res) => console.log(res));
    reset();
    handleClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth='sm'>
      <CssBaseline />
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 'auto',
            width: 'fit-content',
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <DialogTitle sx={{ alignSelf: 'center' }}>
                Add Account
              </DialogTitle>
              <FormControl variant='standard'>
                <Controller
                  name='name'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      variant='standard'
                      onChange={onChange}
                      value={value}
                      label='Account Name'
                      error={!!errors.name}
                      helperText={errors.name ? errors.name?.message : ''}
                      margin='normal'
                    />
                  )}
                />
                <Controller
                  name='nickname'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      variant='standard'
                      onChange={onChange}
                      value={value}
                      label='Account Nickname'
                      error={!!errors.nickname}
                      helperText={
                        errors.nickname ? errors.nickname?.message : ''
                      }
                      margin='normal'
                    />
                  )}
                />
                <Controller
                  name='balance'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant='standard'
                      error={!!errors.balance}
                      helperText={errors.balance ? errors.balance?.message : ''}
                      label='Starting Balance'
                      sx={{ marginBottom: 3 }}
                      margin='normal'
                    />
                  )}
                />
                <Controller
                  name='category'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FormControl variant='standard'>
                      <InputLabel id='category-label'>Category</InputLabel>
                      <Select
                        sx={{
                          marginBottom: watchCategory === 'Budget' ? 3 : 0,
                        }}
                        labelId='category-label'
                        id='category'
                        value={value}
                        onChange={onChange}
                        label='Category'
                        error={!!errors.category}
                      >
                        <MenuItem value='Budget'>Budget</MenuItem>
                        <MenuItem value='Loans'>Loans</MenuItem>
                        <MenuItem value='Tracking'>Tracking</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
                {watchCategory === 'Budget' && (
                  <Controller
                    name='subCategory'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <FormControl variant='standard'>
                        <InputLabel id='subCategory-label'>
                          Sub-Category
                        </InputLabel>
                        <Select
                          labelId='subCategory-label'
                          id='subCategory'
                          value={value}
                          onChange={onChange}
                          label='Sub-Category'
                          error={!!errors.subCategory}
                        >
                          <MenuItem value='Banking'>Banking</MenuItem>
                          <MenuItem value='Credit'>Credit</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                )}
                <Button type='submit' variant='contained' sx={{ marginTop: 5 }}>
                  Submit
                </Button>
              </FormControl>
            </FormGroup>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddAccountModal;
