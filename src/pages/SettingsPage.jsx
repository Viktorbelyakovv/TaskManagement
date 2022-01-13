import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../store/categories/selectors";
import { getCategoriesThunk } from "../store/categories/reducer";
import DefaultCategory from "../components/Settings/DefaultCategory";
import AddCategoryForm from "../components/Settings/AddCategoryForm";
import ListCategories from "../components/Settings/ListCategories";

const SettingsPage = () => {
  const categoriesList = useSelector(getCategories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  return (
    <>
      <h1>SETTINGS</h1>
      {categoriesList.length && (
        <div>
          <DefaultCategory />
          <AddCategoryForm />
          <ListCategories />
        </div>
      )}
    </>
  );
};

export default SettingsPage;
