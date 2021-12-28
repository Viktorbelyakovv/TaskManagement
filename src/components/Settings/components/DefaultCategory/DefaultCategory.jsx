import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCategories,
  selectDefaultCategory,
} from "../../../../store/categories/selectors";
import { changeDefaultCategoryAction } from "../../../../store/categories/reducer";
import MenuItem from "@mui/material/MenuItem";

import StyledSelect from "../../../StyledSelect";

const DefaultCategory = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const defaultCategoryId = useSelector(selectDefaultCategory);
  const [category, setCategory] = useState(
    categories.find(({ id }) => id === defaultCategoryId.id)
  );

  const onChangeCategory = (event) => {
    console.log(event.target.value);
    dispatch(changeDefaultCategoryAction(event.target.value));
  };
  return (
    <div>
      {"Default category"}
      <div>
        <StyledSelect
          sx={{ width: "80%" }}
          value={category}
          label="Category"
          onChange={(event) => {
            setCategory(event.target.value);
          }}
          onBlur={(event) => {
            onChangeCategory(event);
          }}
        >
          {categories.map((item) => (
            <MenuItem value={item} key={item.id}>
              {item.title}
            </MenuItem>
          ))}
        </StyledSelect>
      </div>
    </div>
  );
};

export default DefaultCategory;
