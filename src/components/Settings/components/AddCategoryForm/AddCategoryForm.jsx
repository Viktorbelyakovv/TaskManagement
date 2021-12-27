import React, { useState } from "react";
import StyledTextField from "../../../StyledTextField/StyledTextField";
import StyledButton from "../../../StyledButton/StyledButton";
import MenuItem from "@mui/material/MenuItem";
import StyledSelect from "../../../StyledSelect/StyledSelect";
import Family from "../../../../categories/icons/Family";
import Food from "../../../../categories/icons/Food";
import Shopping from "../../../../categories/icons/Shopping";
import Sport from "../../../../categories/icons/Sport";
import Work from "../../../../categories/icons/Work";

const AddCategoryForm = () => {
  const [category, setCategory] = useState("");

  const [color, setColor] = React.useState("");
  const [icon, setIcon] = React.useState("");

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
      <div>{"New category"}</div>
      <StyledTextField
        label="Category name"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && onAddCategory()}
      />
      <StyledSelect
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={color}
        label="Age"
        onChange={handleColorChange}
      >
        <MenuItem value={"red"}>Red</MenuItem>
        <MenuItem value={"blue"}>Blue</MenuItem>
        <MenuItem value={"green"}>Green</MenuItem>
      </StyledSelect>

      <StyledSelect
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={icon}
        label="Age"
        onChange={handleIconChange}
      >
        <MenuItem value={10}>
          <Family size={"40px"}></Family>
        </MenuItem>
        <MenuItem value={20}>
          <Food size={"40px"}></Food>
        </MenuItem>
        <MenuItem value={30}>
          <Shopping size={"40px"}></Shopping>
        </MenuItem>
        <MenuItem value={30}>
          <Sport size={"40px"}></Sport>
        </MenuItem>
        <MenuItem value={30}>
          <Work size={"40px"}></Work>
        </MenuItem>
      </StyledSelect>
      <StyledButton variant="outlined" onClick={onAddCategory}>
        Add
      </StyledButton>
    </div>
  );
};

export default AddCategoryForm;
