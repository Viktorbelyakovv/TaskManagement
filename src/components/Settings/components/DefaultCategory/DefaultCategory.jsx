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
  const defaultCategoryId = useSelector(selectDefaultCategory);

  const [category, setCategory] = useState(
    categories.find(({ id }) => id === defaultCategoryId.id)
  );

  const onChangeCategory = (event) => {
    changeDefaultCategoryServer(event.target.value).then(({ status }) => {
      if (status === 200) {
        dispatch(changeDefaultCategoryAction(event.target.value));
      } else {
        alert("Error status = " + status);
      }
    });
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
