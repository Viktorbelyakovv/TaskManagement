import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  getDefaultCategory,
} from "../../store/categories/selectors";
import { addTaskThunk } from "../../store/tasks/reducer";
import { MenuItem } from "@mui/material";
import StyledTextField from "../ui-kit/StyledTextField";
import StyledSelect from "../ui-kit/StyledSelect";
import StyledButton from "../ui-kit/StyledButton";
import { getSvgIcon } from "../../helpers/getSvgIcon";
import "./AddTaskForm.css";

const AddTaskForm = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [isEmpty, setEmpty] = useState(false);
  const [isTooLong, setTooLong] = useState(false);
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);
  const defaultCategory = useSelector(getDefaultCategory);
  const [categoryId, setCategoryId] = useState(defaultCategory.id);

  const isError = isTooLong || isEmpty;

  const helperText = isTooLong
    ? "Task name can not be longer than 50 characters"
    : isEmpty
    ? "Task name required"
    : "";

  const onAddTask = () => {
    if (taskTitle.trim()) {
      dispatch(addTaskThunk({ title: taskTitle, categoryId }));
      setTaskTitle("");
    } else {
      setEmpty(true);
    }
  };

  const handleTitleChange = (e) => {
    setTaskTitle(e.target.value);
    setEmpty(e.target.value.trim().length === 0);
    setTooLong(e.target.value.trim().length > 50);
  };

  const onIconRender = (selected) => {
    const selectedCategory = selected
      ? categories.find(({ id }) => id === selected)
      : defaultCategory;
    return (
      <>
        {getSvgIcon({
          iconId: selectedCategory.iconId,
          colorId: selectedCategory.colorId,
          size: "30px",
        })}
      </>
    );
  };

  return (
    <div className="AddTaskForm">
      <StyledTextField
        width="60%"
        value={taskTitle}
        onChange={(e) => handleTitleChange(e)}
        onKeyPress={(e) => e.key === "Enter" && onAddTask()}
        error={isError}
        helperText={helperText}
        required
      />

      <StyledSelect
        width="10%"
        value={categoryId}
        label="Category"
        onChange={(e) => setCategoryId(e.target.value)}
        displayEmpty
        renderValue={(selected) => onIconRender(selected)}
      >
        {categories ? (
          categories.map(({ id, title, colorId, iconId }) => (
            <MenuItem value={id} key={id}>
              {getSvgIcon({ iconId, colorId, size: "30px" })}
              {title}
            </MenuItem>
          ))
        ) : (
          <h2>No categories</h2>
        )}
      </StyledSelect>

      <StyledButton
        width="15%"
        variant="outlined"
        disabled={isError}
        onClick={onAddTask}
      >
        Add
      </StyledButton>
    </div>
  );
};

export default AddTaskForm;
