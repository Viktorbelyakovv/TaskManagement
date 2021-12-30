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
  const categories = useSelector(selectCategories) || {};
  const defaultCategory = useSelector(selectDefaultCategory) || {};

  const [category, setCategory] = useState(
    categories.find(({ id }) => id === defaultCategory.id).id || {}
  );

  const onChangeCategory = (e) => {
    changeDefaultCategoryServer(e.target.value).then(({ status }) => {
      if (status === 200) {
        dispatch(changeDefaultCategoryAction({ id: e.target.value }));
      } else {
        console.log("Error status = " + status);
      }
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
