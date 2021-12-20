import Input  from '@mui/material/Input';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

export const StyledCheckbox = styled(Checkbox)({
  color: 'black',

  '&.Mui-checked': {
    color: 'black',
  }  
});

export const StyledInput = styled(Input)({
  height:'50px', 
  width: '75%',  
  margin:'10px', 
  
  '&.Mui-focused': {
    fontStyle: 'italic', 
  }  
});

export const StyledIconButton = styled(IconButton)({
  color: 'red',
});