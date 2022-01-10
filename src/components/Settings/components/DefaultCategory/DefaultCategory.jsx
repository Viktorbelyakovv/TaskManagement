import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import {
  selectCategories,
  selectDefaultCategory,
} from "../../../../store/categories/selectors";
import { changeDefaultCategoryAction } from "../../../../store/categories/reducer";
import { changeDefaultCategoryServer } from "../../../../utils/apiCategories";
import StyledSelect from "../../../StyledSelect";

const DefaultCategory = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const defaultCategory = useSelector(selectDefaultCategory);

  const [category, setCategory] = useState(defaultCategory.id);

  const onChangeCategory = (e) => {
    changeDefaultCategoryServer(defaultCategory.id, e.target.value).then(() => {
      dispatch(changeDefaultCategoryAction(e.target.value));
    });
  };

  return (
    <>
      <h2>Default category</h2>
      <StyledSelect
        sx={{ width: "80%" }}
        value={category}
        label="Category"
        onChange={(e) => setCategory(e.target.value)}
        onBlur={(e) => onChangeCategory(e)}
      >
        {categories ? (
          categories.map(({ id, title }) => (
            <MenuItem value={id} key={id}>
              {title}
            </MenuItem>
          ))
        ) : (
          <h2>No categories</h2>
        )}
      </StyledSelect>
    </>
  );
};

export default DefaultCategory;
