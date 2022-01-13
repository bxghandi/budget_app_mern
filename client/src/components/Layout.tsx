import Navbar from './Navbar';
import SideDrawer from './sidebar/SideDrawer';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <div>
        <Navbar />
        <SideDrawer />
      </div>
      <main>{children}</main>
    </>
  );
};

export default Layout;
