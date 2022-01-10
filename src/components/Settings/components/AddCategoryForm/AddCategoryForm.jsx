import React, { useState } from "react";
import { /* useSelector, */ useDispatch } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
//import { selectCategories } from "../../../../store/categories/selectors";
import { addCategoryAction } from "../../../../store/categories/reducer";
import { addCategoryServer } from "../../../../utils/apiCategories";
import { getSvgIcon } from "../../../../helpers/getSvgIcon";
import { colors } from "../../../../helpers/colors";
import { icons } from "../../../../helpers/icons";
import StyledTextField from "../../../StyledTextField";
import StyledButton from "../../../StyledButton";
import StyledSelect from "../../../StyledSelect";
import "./AddCategoryForm.css";

const AddCategoryForm = () => {
  //const categories = useSelector(selectCategories);

  const [idColor, setIdColor] = useState(1);
  const [idIcon, setIdIcon] = useState(1);
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();

  /* const isLimitCategories = categories.length === colors.length * icons.length;
  const isTooLong = category.length > 15;
  const isSameCategory =
    categories.find(
      ({ colorId, iconId }) => idColor === colorId && idIcon === iconId
    ) || false;
  const isTooShort = category.trim().length === 0;
  const isError =
    isTooLong || isTooShort || isSameCategory || isLimitCategories;
  const helperText = isLimitCategories
    ? "You have reached the limit for the number of categories"
    : isSameCategory
    ? "Category with this icon already exists"
    : isTooLong
    ? "Category name can not be longer than 15 characters"
    : isTooShort
    ? "Category name required"
    : ""; */

  const onAddCategory = () => {
    if (category.trim()) {
      setCategory("");
      addCategoryServer(category, idColor, idIcon).then(({ status, data }) => {
        if (status === 201) {
          dispatch(addCategoryAction(data));
        } else {
          console.log("Error status = " + status);
        }
      });
    }
  };

  return (
    <>
      <h2>Add new category</h2>
      <div className="AddCategoryForm">
        <StyledTextField
          sx={{ width: "40%" }}
          value={category}
          onKeyPress={(e) => e.key === "Enter" && onAddCategory()}
          //disabled={isLimitCategories}
          onChange={(e) => setCategory(e.target.value)}
          //error={isError}
          //helperText={helperText}
          required
        />
        <StyledSelect
          value={idColor}
          sx={{ width: "12%" }}
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
          value={idIcon}
          sx={{ width: "15%" }}
          onChange={(e) => setIdIcon(e.target.value)}
        >
          {icons.map(({ id }) => (
            <MenuItem value={id} key={id}>
              {getSvgIcon({ iconId: id, colorId: "black", size: "30px" })}
            </MenuItem>
          ))}
        </StyledSelect>
        <StyledButton
          variant="outlined"
          //disabled={isError}
          onClick={onAddCategory}
        >
          Add
        </StyledButton>
      </div>
    </>
  );
};

export default AddCategoryForm;
