import React from 'react';
import PropTypes from 'prop-types';
import Item from '../Item';
import './List.css';

const List = (props) => {
  const list = props.list
  return (
    <div>
      {list.map((task) => { 
        return <Item task={task} key={task}/>  //фиксануть
      })}
    </div>    
  );
}

List.propTypes = {
  list: PropTypes.array,
}

export default List;