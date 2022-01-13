import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import styled from 'styled-components';

export const AccountBox = styled(Box)`
  -webkit-box-align: center;
  align-items: center;
  border-radius: 0.375rem;
  cursor: pointer;
  display: flex;
  height: 2rem;
  -webkit-box-pack: justify;
  justify-content: space-between;
  margin: 0 0.3125rem 0.25rem 0;
  padding: 0;
`;

export const AccountEditBox = styled(Box)`
  -webkit-box-flex: 1;
  flex: 0 0 auto;
  height: 1rem;
  margin: 0 1rem 0 0;
  position: relative;
  width: 1rem;
  color: #fff;
  padding: 0;
  display: inline-flex;
  opacity: 50%;
`;

export const AccountName = styled.div`
  color: var(--sidebar-font);
  -webkit-box-flex: 1;
  flex: 1;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 2.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: narrow;
  width: 100%;
`;

export const AccountBalance = styled.div`
  -webkit-box-flex: 1;
  flex: 0 1 auto;
  font-size: 0.75em;
  margin-bottom: -0.2em;
  padding-right: 0;
  position: relative;
  text-align: right;
  color: var(--sidebar-font);
`;

export const EndMenuRow = styled.div`
  -webkit-box-flex: 1;
  flex: 0 0 auto;
  height: 1rem;
  margin: 0 0.5rem;
  position: relative;
  width: 1rem;
`;

export const DrawerBox = styled(Box)`
  width: 240px;
`;

export const TempDrawer = styled(Drawer)`
  & .MuiDrawer-paper {
    background-color: #282c34;
  }
`;
