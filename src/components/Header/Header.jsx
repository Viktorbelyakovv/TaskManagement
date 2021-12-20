import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {AddTask} from "../../utils/api.js";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import './Header.css';

const StyledTextField = styled(TextField)({
  height: "50px",
  width: "60%",
  margin: "10px",

  "& label.Mui-focused": {
    color: "rgb(130, 50, 50)",
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black",
      borderWidth: 2,
    },

    "&:hover fieldset": {
      borderColor: "rgb(250, 235, 96)",
      borderWidth: 2,
    },

    "&.Mui-focused fieldset": {
      borderColor: "rgb(241, 93, 93)",
      borderWidth: 2,
    },
  },
});

const StyledSelect = styled(TextField)({
  height: "50px",
  width: "10%",
  margin: "10px",
});

const StyledButton = styled(Button)({
  height: "55px",
  width: "10%",
  margin: "10px",
  color: "black",
  borderColor: "black",
  borderWidth: 2,

  "&:active": {
    backgroundColor: "rgb(241, 93, 93)",
    borderColor: "rgb(241, 93, 93)",
    borderWidth: 2,
  },

  "&:hover": {
    borderColor: "rgb(250, 235, 96)",
    borderWidth: 2,
  },
});

const Header = ({refresh}) => {
  const [task, setTask] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setTask(e.target.value);
  };

  const addTask = () => {
    if (task.trim()) {
      AddTask(task);
      setTask("");
      refresh()
    }    
  };

  return (
    <div className="Header">
      <StyledTextField
        label="Task name"
        value={task}
        onChange={handleChange}
        onKeyPress={(e) => {e.key === "Enter" && addTask()}}
      />
      <StyledSelect />
        <StyledButton variant="outlined" onClick={addTask}>
        Add
      </StyledButton>
    </div>
  )
}  

Header.propTypes = {
  refresh: PropTypes.func,
}

export default Header;