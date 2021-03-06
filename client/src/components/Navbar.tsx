import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Toolbar from '@mui/material/Toolbar';
import { DrawerButton, TopBar } from './styled/Navbar';
import { useNavigate } from 'react-router-dom';
import useStore from '../store';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const open = useStore((state) => state.open);
  const setOpen = useStore((state) => state.setOpen);
  const navigate = useNavigate();

  return (
    <>
      <AppBar
        position='fixed'
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <TopBar>
          <DrawerButton clicked={open} onClick={() => setOpen()} />
          <IconButton onClick={() => navigate('/')}>
            <HomeRoundedIcon sx={{ color: 'common.white' }} />
          </IconButton>
        </TopBar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Navbar;
