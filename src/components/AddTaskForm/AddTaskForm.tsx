import React, { FC, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/useTypedStore";
import {
  getCategories,
  getCategoriesError,
  getCategoriesLoading,
  getDefaultCategory,
} from "../../store/categories/selectors";
import { getPaginationLimit } from "../../store/tasks/selectors";
import { addTaskThunk } from "../../store/tasks/reducer";
import { MenuItem } from "@mui/material";
import { format } from "date-fns";
import { CategoryItemType, QueryParamsType } from "../../types/types";
import Error from "../Error";
import Loader from "../Loader";
import StyledTextField from "../ui-kit/StyledTextField";
import StyledSelect from "../ui-kit/StyledSelect";
import StyledButton from "../ui-kit/StyledButton";
import { getSvgIcon } from "../../helpers/getSvgIcon";
import "./AddTaskForm.css";

type AddTaskFormProps = {
  isCompletedTasks: boolean;
  queryParams: QueryParamsType;
  setStartTask: (paginationLimit: number) => void;
};

const AddTaskForm: FC<AddTaskFormProps> = ({
  isCompletedTasks,
  queryParams,
  setStartTask,
}) => {
  const [title, setTitle] = useState<string>("");
  const [isEmpty, setEmpty] = useState<boolean>(false);
  const [isTooLong, setTooLong] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const categories = useAppSelector(getCategories);
  const defaultCategory = useAppSelector(getDefaultCategory);
  const [categoryId, setCategoryId] = useState<number | string>(
    defaultCategory?.id || ""
  );
  const paginationLimit = useAppSelector(getPaginationLimit);
  const loading = useAppSelector(getCategoriesLoading);
  const error = useAppSelector(getCategoriesError);
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
            categoryId: Number(categoryId),
            date: format(new Date(), "yyyy-MM-dd"),
          },
          sortFilterPayload: {
            isCompletedTasks,
            queryParams,
            start: 0,
          },
        })
      );
      setStartTask(paginationLimit);
      setTitle("");
    } else {
      setEmpty(true);
    }
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setEmpty(value.trim().length === 0);
    setTooLong(value.trim().length > 50);
  };

  const renderIcon = (selectedId: number) => {
    const { iconId, colorId } = selectedId
      ? (categories.find(
          ({ id }: { id: number }) => id === selectedId
        ) as CategoryItemType)
      : (defaultCategory as CategoryItemType);

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
    if (defaultCategory) setCategoryId(defaultCategory.id);
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
          value={categoryId}
          label="Category"
          onChange={(e) => setCategoryId(Number(e.target.value))}
          displayEmpty
          renderValue={(selectedId) => renderIcon(Number(selectedId))}
        >
          {categories.map(
            ({ id, title, colorId, iconId }: CategoryItemType) => (
              <MenuItem value={id} key={id}>
                {getSvgIcon({ iconId, colorId, size: "30px" })}
                {title}
              </MenuItem>
            )
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
    </>
  );
};

export default AddTaskForm;
