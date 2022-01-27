import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  getCategoriesError,
  getCategoriesLoading,
  getDefaultCategory,
} from "../../store/categories/selectors";
import { addTaskThunk } from "../../store/tasks/reducer";
import { MenuItem } from "@mui/material";
import { format } from "date-fns";
import Error from "../Error";
import Loader from "../Loader";
import StyledTextField from "../ui-kit/StyledTextField";
import StyledSelect from "../ui-kit/StyledSelect";
import StyledButton from "../ui-kit/StyledButton";
import { getSvgIcon } from "../../helpers/getSvgIcon";
import "./AddTaskForm.css";

const AddTaskForm = ({
  isCompletedTasks,
  queryParams: { sortDate, sortName, categoryId },
  start,
  paginationLimit,
  setStartTask,
}) => {
  const [title, setTitle] = useState("");
  const [isEmpty, setEmpty] = useState(false);
  const [isTooLong, setTooLong] = useState(false);
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);
  const defaultCategory = useSelector(getDefaultCategory);
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    defaultCategory?.id || ""
  );
  const loading = useSelector(getCategoriesLoading);
  const error = useSelector(getCategoriesError);
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
            categoryId: selectedCategoryId,
            date: format(new Date(), "yyyy-MM-dd"),
          },
          sortFilterPayload: {
            isCompletedTasks,
            sortDate,
            sortName,
            categoryId,
            start,
          },
        })
      );
      setStartTask(paginationLimit);
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

  useEffect(() => {
    if (defaultCategory) setSelectedCategoryId(defaultCategory.id);
  }, [defaultCategory]);

  if (error) return <Error message={"Error downloading"} />;

  if (loading === "pending" || !defaultCategory) return <Loader />;

  return (
    <>
      <h2>Add new task</h2>
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
          value={selectedCategoryId}
          label="Category"
          onChange={(e) => setSelectedCategoryId(e.target.value)}
          displayEmpty
          renderValue={(selectedId) => renderIcon(selectedId)}
        >
          {categories.map(({ id, title, colorId, iconId }) => (
            <MenuItem value={id} key={id}>
              {getSvgIcon({ iconId, colorId, size: "30px" })}
              {title}
            </MenuItem>
          ))}
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
    </>
  );
};

AddTaskForm.propTypes = {
  isCompletedTasks: PropTypes.bool,
  queryParams: PropTypes.shape({
    sortDate: PropTypes.bool,
    sortName: PropTypes.bool,
    categoryId: PropTypes.number,
  }),
  start: PropTypes.number,
  paginationLimit: PropTypes.number,
  setStartTask: PropTypes.func,
};

export default AddTaskForm;
