import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTaskAction } from "../../store/tasks/reducer";
import { addTaskServer } from "../../utils/api.js";
import StyledTextField from "../StyledTextField";
import StyledSelect from "../StyledSelect";
import StyledButton from "../StyledButton";
import "./AddTaskForm.css";
import { MenuItem } from "@mui/material";

const AddTaskForm = () => {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();

  const onAddTask = () => {
    if (task.trim()) {
      setTask("");
      addTaskServer(task).then(({ status, data }) => {
        if (status === 201) {
          dispatch(addTaskAction(data));
        } else {
          console.log("Error status = " + status);
        }
      });
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
