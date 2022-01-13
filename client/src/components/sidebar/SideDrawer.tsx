import { Account } from '../../api/api';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AddAccount from './AddAccount';
import Divider from '@mui/material/Divider';
import useStore from '../../store';
import { useEffect } from 'react';
import SidebarMenus from './SidebarMenus';
import { DrawerBox, TempDrawer } from '../styled/SideDrawer';

const menus: string[] = ['Budget', 'Loans', 'Tracking', 'Closed'];

interface SideDrawerProps {}

const SideDrawer: React.FC<SideDrawerProps> = () => {
  const open = useStore((state) => state.open);
  const setAccounts = useStore((state) => state.setAccounts);

  useEffect(() => {
    const fetchAccounts = async () => {
      const data = await Account.getAccounts();
      setAccounts(data);
    };
    fetchAccounts().catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contents = () => (
    <DrawerBox role='presentation'>
      <List>
        <ListItemButton>
          <ListItemIcon sx={{ color: 'common.white' }}>
            <AttachMoneyIcon />
          </ListItemIcon>
          <ListItemText
            primary='Budget'
            primaryTypographyProps={{ color: 'common.white' }}
          ></ListItemText>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon sx={{ color: 'common.white' }}>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText
            primary='Analytics'
            primaryTypographyProps={{ color: 'common.white' }}
          ></ListItemText>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon sx={{ color: 'common.white' }}>
            <AccountBalanceIcon />
          </ListItemIcon>
          <ListItemText
            primary='All Accounts'
            primaryTypographyProps={{ color: 'common.white' }}
          ></ListItemText>
        </ListItemButton>
        <Divider />
        {menus.map((menu, index) => (
          <SidebarMenus key={index} menuName={menu} />
        ))}
        <AddAccount />
      </List>
    </DrawerBox>
  );

  return (
    <TempDrawer variant='temporary' anchor='left' open={open}>
      <Toolbar />
      {contents()}
    </TempDrawer>
  );
};

export default SideDrawer;
