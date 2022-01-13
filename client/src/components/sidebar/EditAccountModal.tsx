import { useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import {
  ButtonBox,
  LeftButtonBox,
  RightButtonBox,
  CloseAccountButton,
  SaveEditsButton,
  CancelEditsButton,
} from '../styled/EditAccountModal';
import { yupResolver } from '@hookform/resolvers/yup';
import { AnyObjectSchema } from 'yup';
import { AccountType } from '../../models/accounts.interface';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { Account } from '../../api/api';
import Lazy from 'yup/lib/Lazy';
import useStore from '../../store';
import { editAccountState } from '../../utils';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  schema: AnyObjectSchema | Lazy<any, unknown>;
  account: AccountType;
  formDefaults: FormInput;
}

interface FormInput {
  nickname: string;
  balance: string;
}

const EditAccountModal: React.FC<ModalProps> = ({
  open,
  onClose,
  schema,
  account,
  formDefaults,
}) => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: formDefaults,
  });

  const accounts = useStore((state) => state.accounts);
  const setAccounts = useStore((state) => state.setAccounts);
  const handleClose = () => onClose();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        nickname: account.nickname,
        balance: account.currentBalance.toString(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset, isSubmitSuccessful]);

  const closeAccount = (): void => {
    const closedAccount: AccountType = {
      ...account,
      category: 'Closed',
    };

    Account.updateAccount(closedAccount, account._id!);
    setAccounts(editAccountState(closedAccount, accounts));
    reset(formDefaults);
    handleClose();
  };

  const onSubmit: SubmitHandler<FormInput> = (data: FormInput) => {
    const editedAccount: AccountType = {
      ...account,
      currentBalance: Number(data.balance),
    };

    if (account._id === undefined) {
      alert('No Account ID');
    } else {
      Account.updateAccount(editedAccount, account._id);
    }

    setAccounts(editAccountState(editedAccount, accounts));
    reset(data);
    handleClose();
  };

  return (
    <Dialog maxWidth='md' onClose={handleClose} open={open}>
      <Box sx={{ display: 'flex', m: 'auto' }}>
        <Container
          component='main'
          maxWidth='md'
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 5,
            width: 'fit-content',
          }}
        >
          <CssBaseline />
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <DialogTitle sx={{ alignSelf: 'center' }}>
                Edit {account.name}
              </DialogTitle>
              <FormControl>
                <Controller
                  name='nickname'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      variant='outlined'
                      onChange={onChange}
                      value={value}
                      label='Account Nickname'
                      placeholder={account.nickname}
                      error={!!errors.nickname}
                      helperText={
                        errors.nickname ? errors.nickname?.message : ''
                      }
                      // sx={{ marginTop: 3, marginBottom: 6 }}
                      margin='normal'
                    />
                  )}
                />
                <Controller
                  name='balance'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      variant='outlined'
                      onChange={onChange}
                      value={value}
                      label='Working Balance'
                      placeholder={account.currentBalance.toString()}
                      error={!!errors.balance}
                      helperText={errors.balance ? errors.balance?.message : ''}
                      margin='normal'
                      sx={{ paddingBottom: 3 }}
                    />
                  )}
                />
                <ButtonBox>
                  <LeftButtonBox>
                    <CloseAccountButton
                      type='button'
                      variant='outlined'
                      onClick={() => closeAccount()}
                    >
                      Close Account
                    </CloseAccountButton>
                  </LeftButtonBox>
                  <RightButtonBox>
                    <CancelEditsButton
                      sx={{ marginRight: 1 }}
                      variant='outlined'
                      type='reset'
                      onClick={() => {
                        reset(formDefaults);
                        handleClose();
                      }}
                    >
                      Cancel
                    </CancelEditsButton>
                    <SaveEditsButton type='submit' variant='outlined'>
                      Save
                    </SaveEditsButton>
                  </RightButtonBox>
                </ButtonBox>
              </FormControl>
            </FormGroup>
          </form>
        </Container>
      </Box>
    </Dialog>
  );
};

export default EditAccountModal;
