import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import MenuItem from "@mui/material/MenuItem";

import StyledTextField from "../../../StyledTextField";
import StyledButton from "../../../StyledButton";
import StyledSelect from "../../../StyledSelect";
import {
  selectColors,
  selectIcons,
} from "../../../../store/categories/selectors";

const AddCategoryForm = ({ iconConnecter }) => {
  const colors = useSelector(selectColors);
  const icons = useSelector(selectIcons);
  const defaultColor = "red";
  const defaultIcon = "Family";
  const [category, setCategory] = useState("");

  const [color, setColor] = useState(defaultColor);
  const [icon, setIcon] = useState(defaultIcon);

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleIconChange = (event) => {
    setIcon(event.target.value);
  };

  const onAddCategory = () => {
    console.log("add category");
  };

  return (
    <div>
      <div>{"Add new category"}</div>
      <StyledTextField
        sx={{ width: "40%" }}
        label="Category name"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && onAddCategory()}
      />
      <StyledSelect value={color} label="Color" onChange={handleColorChange}>
        {colors.map((item) => (
          <MenuItem value={item.title} key={item.id}>
            {item.title}
          </MenuItem>
        ))}
      </StyledSelect>

      <StyledSelect value={icon} label="Icon" onChange={handleIconChange}>
        {icons.map((item) => (
          <MenuItem value={item.title} key={item.id}>
            {iconConnecter(item.title)}
          </MenuItem>
        ))}
      </StyledSelect>
      <StyledButton variant="outlined" onClick={onAddCategory}>
        Add
      </StyledButton>
    </div>
  );
};

AddCategoryForm.propTypes = {
  iconConnecter: PropTypes.func,
};

export default AddCategoryForm;
