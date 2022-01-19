import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import { changeDefaultCategoryThunk } from "../../../store/categories/reducer";
import {
  getCategories,
  getDefaultCategory,
} from "../../../store/categories/selectors";
import StyledSelect from "../../ui-kit/StyledSelect";

const DefaultCategory = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);
  const defaultCategory = useSelector(getDefaultCategory);

  const [categoryId, setCategoryId] = useState(defaultCategory?.id || "");

  const onChangeCategory = (e) => {
    dispatch(
      changeDefaultCategoryThunk({
        oldId: defaultCategory.id,
        newId: e.target.value,
      })
    );
  };

  if (!categories.length) return null;

  return (
    <>
      <h2>Default category</h2>
      <StyledSelect
        width="80%"
        value={categoryId}
        label="Category"
        onChange={(e) => setCategoryId(e.target.value)}
        onBlur={(e) => onChangeCategory(e)}
      >
        {categories.length ? (
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
