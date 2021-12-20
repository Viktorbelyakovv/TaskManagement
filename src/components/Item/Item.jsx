import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ClearIcon from '@mui/icons-material/Clear';
import {StyledCheckbox, StyledInput, StyledIconButton} from './Item.styles.js'
import './Item.css';

const Item = ({item, handleCheckbox, changeTitle, deleteItem}) => {
  const [title, setTitle] = useState(item.title)

  return (
    <div className="Item">
      <StyledCheckbox
        checked={item.completed}
        onChange={() => handleCheckbox(item.id)}
      />
      <StyledInput 
        value={title} 
        onChange={e => setTitle(e.target.value)}
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