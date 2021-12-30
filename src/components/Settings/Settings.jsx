import React from "react";
import { useSelector } from "react-redux";
import {
  selectCategories,
  selectDefaultCategory,
} from "../../store/categories/selectors";
import DefaultCategory from "./components/DefaultCategory";
import AddCategoryForm from "./components/AddCategoryForm";
import ListCategories from "./components/ListCategories";
import "./Settings.css";

const Settings = () => {
  const isDefaultExist = useSelector(selectDefaultCategory);
  return (
    <>
      {useSelector(selectCategories).length && isDefaultExist && (
        <div>
          <DefaultCategory />
          <AddCategoryForm />
          <ListCategories />
        </div>
      )}
    </>
  );
};

export default Settings;
