import styled from 'styled-components';
import Toolbar from '@mui/material/Toolbar';

export const DrawerButton = styled.button`
  background-color: var(--main-background);
  background-color: #282c34;
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  &::before,
  &::after {
    content: '';
    background-color: var(--sidebar-font);
    height: 2px;
    width: 1rem;
    position: absolute;
    transition: all 0.3s ease;
  }
  &::before {
    top: ${(props: { clicked: boolean }) => (props.clicked ? '1.5' : '1rem')};
    transform: ${(props: { clicked: boolean }) =>
      props.clicked ? 'rotate(135deg)' : 'rotate(0)'};
  }
  &::after {
    top: ${(props: { clicked: boolean }) => (props.clicked ? '1.2' : '1.5rem')};
    transform: ${(props: { clicked: boolean }) =>
      props.clicked ? 'rotate(-135deg)' : 'rotate(0)'};
  }
`;

export const TopBar = styled(Toolbar)`
  background-color: #282c34;
`;
