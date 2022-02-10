import React, { FC, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks/useTypedStore";
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

const DefaultCategory: FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(getCategories);
  const defaultCategory = useAppSelector(getDefaultCategory);
  const loading = useAppSelector(getCategoriesLoading);
  const error = useAppSelector(getCategoriesError);

  const [categoryId, setCategoryId] = useState<number | string>(
    defaultCategory?.id || ""
  );

  const onChangeCategory = (value: string) => {
    dispatch(
      changeDefaultCategoryThunk({
        oldId: defaultCategory ? defaultCategory.id : 1,
        newId: +value,
      })
    );
  };

  useEffect(() => {
    setCategoryId(defaultCategory ? defaultCategory.id : 1);
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
        onChange={(e) => setCategoryId(e.target.value as number)}
        onBlur={(e) => onChangeCategory(e.target.value)}
      >
        {categories.map(({ id, title }: { id: number; title: string }) => (
          <MenuItem value={id} key={id}>
            {title}
          </MenuItem>
        ))}
      </StyledSelect>
    </>
  );
};

export default DefaultCategory;
