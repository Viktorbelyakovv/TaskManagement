import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import MenuItem from "@mui/material/MenuItem";

import StyledTextField from "../../../StyledTextField";
import StyledButton from "../../../StyledButton";
import StyledSelect from "../../../StyledSelect";
import {
  selectColors,
  selectIcons,
} from "../../../../store/categories/selectors";
import { addCategoryAction } from "../../../../store/categories/reducer";
import "./AddCategoryForm.css";

const AddCategoryForm = ({ iconConnecter }) => {
  const colors = useSelector(selectColors);
  const icons = useSelector(selectIcons);

  const [color, setColor] = useState(colors[0]);
  const [icon, setIcon] = useState(icons[0]);
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();

  const onAddCategory = () => {
    if (category.trim()) {
      setCategory("");
      if (category.length > 15) {
        alert("The name of a category should contain less than 15 charaters");
      } else {
        dispatch(
          addCategoryAction({
            id: Date.now(),
            title: category,
            colorId: color.id,
            iconId: icon.id,
          })
        );
      }
    }
  };

  return (
    <>
      {"Add new category"}
      <div className="AddCategoryForm">
        <StyledTextField
          sx={{ width: "40%" }}
          label="Category name"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <StyledSelect
          value={color}
          label="Color"
          sx={{ width: "12%" }}
          variant="outlined"
          onChange={(event) => setColor(event.target.value)}
        >
          {colors.map((item) => (
            <MenuItem value={item} key={item.id}>
              {item.title}
            </MenuItem>
          ))}
        </StyledSelect>

        <StyledSelect
          value={icon}
          label="Icon"
          sx={{ width: "15%" }}
          onChange={(event) => setIcon(event.target.value)}
        >
          {icons.map((item) => (
            <MenuItem value={item} key={item.id}>
              {iconConnecter(item.title, "black", "30px")}
            </MenuItem>
          ))}
        </StyledSelect>
        <StyledButton variant="outlined" onClick={onAddCategory}>
          Add
        </StyledButton>
      </div>
    </>
  );
};

AddCategoryForm.propTypes = {
  iconConnecter: PropTypes.func,
};

export default AddCategoryForm;
