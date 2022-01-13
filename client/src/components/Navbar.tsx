import AppBar from '@mui/material/AppBar';
import { DrawerButton, TopBar } from './styled/Navbar';
import useStore from '../store';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const open = useStore((state) => state.open);
  const setOpen = useStore((state) => state.setOpen);

  return (
    <AppBar
      position='fixed'
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <TopBar>
        <DrawerButton clicked={open} onClick={() => setOpen()} />
      </TopBar>
    </AppBar>
  );
};

export default Navbar;
