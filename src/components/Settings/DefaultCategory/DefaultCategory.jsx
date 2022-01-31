import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import { changeDefaultCategoryThunk } from "../../../store/categories/reducer";
import {
  getCategories,
  getCategoriesError,
  getCategoriesLoading,
  getDefaultCategory,
} from "../../../store/categories/selectors";
import Error from "../../Error";
import Loader from "../../Loader";
import StyledSelect from "../../ui-kit/StyledSelect";

const DefaultCategory = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);
  const defaultCategory = useSelector(getDefaultCategory);
  const loading = useSelector(getCategoriesLoading);
  const error = useSelector(getCategoriesError);

  const [categoryId, setCategoryId] = useState(defaultCategory?.id || "");

  const onChangeCategory = (e) => {
    dispatch(
      changeDefaultCategoryThunk({
        oldId: defaultCategory.id,
        newId: e.target.value,
      })
    );
  };

  useEffect(() => {
    setCategoryId(defaultCategory?.id);
  }, [defaultCategory]);

  if (error) return <Error message={"Error downloading"} />;

  if (loading === "pending" || !categoryId) return <Loader />;

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
        {categories.map(({ id, title }) => (
          <MenuItem value={id} key={id}>
            {title}
          </MenuItem>
        ))}
      </StyledSelect>
    </>
  );
};

export default DefaultCategory;
