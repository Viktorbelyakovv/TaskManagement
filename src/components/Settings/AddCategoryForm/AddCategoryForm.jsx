import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import { getCategories } from "../../../store/categories/selectors";
import { addCategoryThunk } from "../../../store/categories/reducer";
import { getSvgIcon } from "../../../helpers/getSvgIcon";
import { colors } from "../../../helpers/colors";
import { icons } from "../../../helpers/icons";
import StyledTextField from "../../ui-kit/StyledTextField";
import StyledButton from "../../ui-kit/StyledButton";
import StyledSelect from "../../ui-kit/StyledSelect";
import "./AddCategoryForm.css";

const AddCategoryForm = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);

  const [colorId, setСolorId] = useState(1);
  const [iconId, setIconId] = useState(1);
  const [title, setTitle] = useState("");

  const [isEmpty, setEmpty] = useState(false);
  const [isTooLong, setTooLong] = useState(false);
  const isSameCategory = !!categories.find(
    (category) => category.colorId === colorId && category.iconId === iconId
  );
  const isLimitCategories = categories.length >= colors.length * icons.length;
  const isError = isTooLong || isEmpty || isSameCategory || isLimitCategories;

  const helperText = isLimitCategories
    ? "You have reached the limit for the number of categories"
    : isSameCategory
    ? "Category with this icon already exists"
    : isTooLong
    ? "Category name can not be longer than 15 characters"
    : isEmpty
    ? "Category name required"
    : "";

  const onAddCategory = () => {
    if (title.trim()) {
      dispatch(
        addCategoryThunk({
          title,
          colorId,
          iconId,
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
    setTooLong(value.trim().length > 15);
  };

  return (
    <>
      <h2>Add new category</h2>
      <div className="AddCategoryForm">
        <StyledTextField
          width="40%"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && onAddCategory()}
          disabled={isLimitCategories}
          error={isError}
          helperText={helperText}
          required
        />
        <StyledSelect
          width="12%"
          value={colorId}
          variant="outlined"
          onChange={(e) => setСolorId(e.target.value)}
        >
          {colors.map(({ id, colorName }) => (
            <MenuItem value={id} key={id}>
              {colorName}
            </MenuItem>
          ))}
        </StyledSelect>

        <StyledSelect
          width="15%"
          value={iconId}
          onChange={(e) => setIconId(e.target.value)}
        >
          {icons.map(({ id }) => (
            <MenuItem value={id} key={id}>
              {getSvgIcon({ iconId: id, colorId: "black", size: "30px" })}
            </MenuItem>
          ))}
        </StyledSelect>
        <StyledButton
          width="10%"
          variant="outlined"
          disabled={isError}
          onClick={onAddCategory}
        >
          Add
        </StyledButton>
      </div>
    </>
  );
};

export default AddCategoryForm;
