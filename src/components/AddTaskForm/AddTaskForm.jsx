import React, { useState } from "react";
import PropTypes from "prop-types";
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
import { format } from "date-fns";

const AddTaskForm = ({ isCompletedTasks, sortDate, sortName }) => {
  const [title, setTitle] = useState("");
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
    if (title.trim()) {
      dispatch(
        addTaskThunk({
          addPayload: {
            title,
            categoryId,
            date: format(new Date(), "yyyy-MM-dd"),
          },
          sortPayload: {
            isCompletedTasks,
            sortDate,
            sortName,
          },
        })
      );
      setTitle("");
    } else {
      setEmpty(true);
    }
  };

  const handleTitleChange = (value) => {
    setTitle(value);
    setEmpty(value.trim().length === 0);
    setTooLong(value.trim().length > 50);
  };

  const renderIcon = (selectedId) => {
    const { iconId, colorId } = selectedId
      ? categories.find(({ id }) => id === selectedId)
      : defaultCategory;

    return (
      <>
        {getSvgIcon({
          iconId,
          colorId,
          size: "30px",
        })}
      </>
    );
  };

  return (
    <div className="AddTaskForm">
      <StyledTextField
        width="60%"
        value={title}
        onChange={(e) => handleTitleChange(e.target.value)}
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
        renderValue={(selectedId) => renderIcon(selectedId)}
      >
        {categories.length ? (
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

AddTaskForm.propTypes = {
  isCompletedTasks: PropTypes.bool,
  sortDate: PropTypes.bool,
  sortName: PropTypes.bool,
};

export default AddTaskForm;
