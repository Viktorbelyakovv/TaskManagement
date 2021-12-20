import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Input  from '@mui/material/Input';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { styled } from '@mui/material/styles';
import './Item.css';

const CssCheckbox = styled(Checkbox)({
  color: 'black',
  '&.Mui-checked': {
    color: 'black',
  }  
});

const CssInput = styled(Input)({
  height:'50px', 
  width: '75%',  
  margin:'10px', 
  '&.Mui-focused': {
    fontStyle: 'italic', 
  }  
});

const CssIconButton = styled(IconButton)({
  color: 'red',
});

const Item = ({item, handleCheckbox, changeTitle, deleteItem}) => {
  const [title, setTitle] = useState(item.title)
  const handleChange = (e) => {
    e.preventDefault()
    setTitle(e.target.value)
  }
  return (
    <div>
      <CssCheckbox
        checked={item.completed}
        onChange={() => handleCheckbox(item.id)}
      />
      <CssInput 
        value={title} 
        onChange={handleChange}
        onBlur={() => changeTitle(item.id, title)}
        disabled={item.completed?true:false}
        disableUnderline={false}
      />
      <CssIconButton         
        onClick={() => deleteItem(item.id)}
      >
        <ClearIcon/>
      </CssIconButton>
    </div> 
  );
}

Item.propTypes = {
  item: PropTypes.object,
  handleCheckbox: PropTypes.func,
  changeTitle: PropTypes.func,
  deleteItem: PropTypes.func,
}

export default Item;