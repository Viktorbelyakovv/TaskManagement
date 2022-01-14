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

  const [idColor, setIdColor] = useState(1);
  const [idIcon, setIdIcon] = useState(1);
  const [categoryTitle, setCategoryTitle] = useState("");

  const [isEmpty, setEmpty] = useState(false);
  const [isTooLong, setTooLong] = useState(false);
  const isSameCategory = !!categories.find(
    ({ colorId, iconId }) => idColor === colorId && idIcon === iconId
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
    if (categoryTitle.trim()) {
      dispatch(
        addCategoryThunk({
          title: categoryTitle,
          colorId: idColor,
          iconId: idIcon,
        })
      );
      setCategoryTitle("");
    } else {
      setEmpty(true);
    }
  };

  const handleTitleChange = (e) => {
    setCategoryTitle(e.target.value);
    setEmpty(e.target.value.trim().length === 0);
    setTooLong(e.target.value.trim().length > 15);
  };

  return (
    <>
      <h2>Add new category</h2>
      <div className="AddCategoryForm">
        <StyledTextField
          width="40%"
          value={categoryTitle}
          onChange={(e) => handleTitleChange(e)}
          onKeyPress={(e) => e.key === "Enter" && onAddCategory()}
          disabled={isLimitCategories}
          error={isError}
          helperText={helperText}
          required
        />
        <StyledSelect
          width="12%"
          value={idColor}
          variant="outlined"
          onChange={(e) => setIdColor(e.target.value)}
        >
          {colors.map(({ id, colorName }) => (
            <MenuItem value={id} key={id}>
              {colorName}
            </MenuItem>
          ))}
        </StyledSelect>

        <StyledSelect
          width="15%"
          value={idIcon}
          onChange={(e) => setIdIcon(e.target.value)}
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
