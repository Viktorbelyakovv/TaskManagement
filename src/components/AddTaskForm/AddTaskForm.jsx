import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTaskAction } from "../../store/tasks/reducer";
import { addTaskServer } from "../../utils/api.js";
import StyledTextField from "./components/StyledTextField";
import StyledSelect from "./components/StyledSelect";
import StyledButton from "./components/StyledButton";
import "./AddTaskForm.css";

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
          alert("Error status = " + status);
        }
      });
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
      <StyledSelect />
      <StyledButton variant="outlined" onClick={onAddTask}>
        Add
      </StyledButton>
    </div>
  );
};

export default AddTaskForm;
