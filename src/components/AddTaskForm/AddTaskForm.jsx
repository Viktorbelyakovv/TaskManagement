import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../store/tasks/reducer";
import { MenuItem } from "@mui/material";
import StyledTextField from "../StyledTextField";
import StyledSelect from "../StyledSelect";
import StyledButton from "../StyledButton";
import "./AddTaskForm.css";

const AddTaskForm = () => {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();

  const onAddTask = () => {
    if (task.trim()) {
      dispatch(addTask(task));
      setTask("");
    } else {
      console.log("Error the name of a task");
    }
  };

  return (
    <div className="AddTaskForm">
      <StyledTextField
        label="Task name"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && onAddTask()}
      />
      <StyledSelect value="1">
        <MenuItem value="1">{"category"}</MenuItem>
      </StyledSelect>
      <StyledButton variant="outlined" onClick={onAddTask}>
        Add
      </StyledButton>
    </div>
  );
};

export default AddTaskForm;
