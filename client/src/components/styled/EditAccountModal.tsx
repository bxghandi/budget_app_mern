import Button from '@mui/material/Button';
import { styled as muiStyled } from '@mui/material/styles';
import styled from 'styled-components';

export const ButtonBox = styled.div`
  width: 35rem;
  display: flex;
  overflow: auto;
  margin: 0 auto;
`;

export const LeftButtonBox = styled.div`
  width: 40%;
  display: inline-flex;
  overflow: auto;
  justify-content: left;
  margin: 0 auto;
`;

export const RightButtonBox = styled.div`
  width: 60%;
  display: inline-flex;
  overflow: auto;
  justify-content: right;
  margin: 0 auto;
  border: 1 red solid;
`;

export const CloseAccountButton = muiStyled(Button)({
  borderColor: '#D3D3D3',
  backgroundColor: '#fff',
  color: 'red',
  '&:hover': {
    backgroundColor: '#CB4C4E',
    borderColor: '#ff6666',
    boxShadow: 'none',
    color: '#fff',
  },
});

export const SaveEditsButton = muiStyled(Button)({
  borderColor: '#D3D3D3',
  backgroundColor: '#0063cc',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#004a99',
    boxShadow: 'none',
    color: '#fff',
  },
});

export const CancelEditsButton = muiStyled(Button)({
  borderColor: '#D3D3D3',
  '&:hover': {
    backgroundColor: '#004a99',
    boxShadow: 'none',
    color: '#fff',
  },
});
