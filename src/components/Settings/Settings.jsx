import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCategories } from "../../store/categories/selectors";

import { getCategories } from "../../store/categories/reducer";
import DefaultCategory from "./components/DefaultCategory";
import AddCategoryForm from "./components/AddCategoryForm";
import ListCategories from "./components/ListCategories";
import "./Settings.css";

const Settings = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const categoriesList = useSelector(selectCategories);

  return (
    <>
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

export default Settings;
