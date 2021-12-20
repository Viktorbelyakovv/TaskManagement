import React from 'react';
import PropTypes from 'prop-types';
import Item from '../Item';
import './List.css';

const List = ({list, handleCheckbox, changeTitle, deleteItem}) => {
  return (
    <div>
      {list.map((item) => { 
        return (
          <Item 
            item={item} 
            key={item.id}  
            handleCheckbox={handleCheckbox} 
            changeTitle = {changeTitle}
            deleteItem={deleteItem}
          />
        )
      })}
    </div>    
  );
}

List.propTypes = {
  list: PropTypes.array,
  handleCheckbox: PropTypes.func,
  changeTitle: PropTypes.func,
  deleteItem: PropTypes.func,
}

export default List;