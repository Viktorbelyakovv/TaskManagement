import React, { useState } from "react";
import { AddTask } from "../../utils/api.js";
import { useDispatch } from "react-redux";
import { addTaskAction } from "../../store/tasks/reducer";
import {
  StyledTextField,
  StyledSelect,
  StyledButton,
} from "./Header.styles.js";
import "./Header.css";

const Header = () => {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();

  const addTask = () => {
    if (task.trim()) {
      setTask("");
      AddTask(task).then(({ status, data }) => {
        if (status === 201) {
          dispatch(addTaskAction(data));
        } else {
          alert("Error status = " + status);
        }
      });
    }
  };

  return (
    <div className="Header">
      <h1>TO-DO LIST AND TASK MANAGEMENT</h1>
      <StyledTextField
        label="Task name"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && addTask()}
      />
      <StyledSelect />
      <StyledButton variant="outlined" onClick={addTask}>
        Add
      </StyledButton>
    </div>
  );
};

export default Header;
