import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { styled } from '@mui/material/styles';
import './Item.css';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'rgb(130, 50, 50)',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'black',
      borderWidth: 2,
    },
    '&:hover fieldset': {
      borderColor: 'rgb(250, 235, 96)',
      borderWidth: 2,
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgb(241, 93, 93)',
      borderWidth: 2,
    },
  },
});

const Item = (props) => {
  const task = props.task
  return (
    <div>
      <Checkbox {...label} defaultChecked />
      <CssTextField 
        sx={{ width: '75%', height:'50px', margin:'10px' }} 
        value={task} 
        variant="standard"
      />
      <IconButton color="error">
        <ClearIcon/>
      </IconButton>
    </div> 
  );
}

Item.propTypes = {
  task: PropTypes.string,
}

export default Item;