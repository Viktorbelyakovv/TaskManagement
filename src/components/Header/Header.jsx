import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {AddTask} from "../../utils/api.js";
import {StyledTextField, StyledSelect, StyledButton} from './Header.styles.js'
import './Header.css';

const Header = ({list, setList}) => {
  const [task, setTask] = useState("");

  const addTask = () => {

    if (task.trim()) {
      setTask("");
      AddTask(task).then(response => {

        if (response.status === 201) {
          setList(list.concat(response.data))
        } else {
          alert("Error status = " + response.status)
        }        
      })       
    }    
  };

  return (
    <div className="Header">
      <h1>TO-DO LIST AND TASK MANAGEMENT</h1>
      <StyledTextField
        label="Task name"
        value={task}
        onChange={e => setTask(e.target.value)}
        onKeyPress={e => e.key === "Enter" && addTask()}
      />
      <StyledSelect/>
      <StyledButton variant="outlined" onClick={addTask}>
        Add
      </StyledButton>
    </div>
  )
}  

Header.propTypes = {
  list: PropTypes.array,
  setList: PropTypes.func,
}

export default Header;