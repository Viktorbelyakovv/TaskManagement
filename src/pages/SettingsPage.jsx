import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "../store/categories/selectors";
import { getCategoriesAsync } from "../store/categories/reducer";
import DefaultCategory from "../components/Settings/DefaultCategory";
import AddCategoryForm from "../components/Settings/AddCategoryForm";
import ListCategories from "../components/Settings/ListCategories";

const SettingsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoriesAsync());
  }, [dispatch]);

  const categoriesList = useSelector(selectCategories);

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
