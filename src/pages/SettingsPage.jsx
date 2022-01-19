import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCategoriesThunk } from "../store/categories/reducer";
import DefaultCategory from "../components/Settings/DefaultCategory";
import AddCategoryForm from "../components/Settings/AddCategoryForm";
import ListCategories from "../components/Settings/ListCategories";

const SettingsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  return (
    <>
      <h1>SETTINGS</h1>
      <div>
        <DefaultCategory />
        <AddCategoryForm />
        <ListCategories />
      </div>
    </>
  );
};

export default SettingsPage;
