import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Input  from '@mui/material/Input';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { styled } from '@mui/material/styles';
import './Item.css';

const StyledCheckbox = styled(Checkbox)({
  color: 'black',

  '&.Mui-checked': {
    color: 'black',
  }  
});

const StyledInput = styled(Input)({
  height:'50px', 
  width: '75%',  
  margin:'10px', 
  
  '&.Mui-focused': {
    fontStyle: 'italic', 
  }  
});

const StyledIconButton = styled(IconButton)({
  color: 'red',
});

const Item = ({item, handleCheckbox, changeTitle, deleteItem}) => {
  const [title, setTitle] = useState(item.title)

  const handleChange = (e) => {
    e.preventDefault()
    setTitle(e.target.value)
  }

  return (
    <div className="Item">
      <StyledCheckbox
        checked={item.completed}
        onChange={() => handleCheckbox(item.id)}
      />
      <StyledInput 
        value={title} 
        onChange={handleChange}
        onBlur={() => changeTitle(item.id, title)}
        disabled={item.completed}
        disableUnderline={false}
      />
      <StyledIconButton         
        onClick={() => deleteItem(item.id)}
      >
        <ClearIcon/>
      </StyledIconButton>
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