import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ClearIcon from '@mui/icons-material/Clear';
import { DeleteTask, ChangeTitle, ChangeCompleted } from '../../utils/api';
import { useSelector, useDispatch } from 'react-redux';
import {selectList} from '../../store/tasks/selectors';
import { deleteTaskAction, changeTitleAction, changeCompletedAction } from '../../store/tasks/reducer';
import { StyledCheckbox, StyledInput, StyledIconButton } from './Item.styles.js'
import './Item.css';

const Item = ({item}) => {
  const [title, setTitle] = useState(item.title);  
  const list = useSelector(selectList);
  const dispatch = useDispatch();

  const deleteItem = id => {
    DeleteTask(id).then(response => {

      if (response.status === 200) {        
        dispatch(deleteTaskAction(id))
      } else {
        alert("Error status = " + response.status)
      }

    })
  };

  const changeTitle = (id, title) => {
    ChangeTitle(id, title).then(response => {

      if (response.status === 200) {
        dispatch(changeTitleAction({id, title}))
      } else {
        alert("Error status = " + response.status)
      }

    })
  };

  const handleCheckbox = id => {
    const item = list.find(item => item.id === id)

    if (item) {
      ChangeCompleted(id, !item.completed).then(response => {

        if (response.status === 200) {
          dispatch(changeCompletedAction(id))    
        } else {
          alert("Error status = " + response.status)
        }

      })
    } 

  };

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
}

export default Item;