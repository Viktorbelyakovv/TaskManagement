import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCategories,
  selectDefaultCategory,
} from "../../store/categories/selectors";

import {
  uploadCategoriesAction,
  uploadColorsAction,
  uploadIconsAction,
  uploadDefaultCategoryAction,
} from "../../store/categories/reducer";
import {
  uploadCategoriesServer,
  uploadColorsServer,
  uploadIconsServer,
  uploadDefaultCategoryServer,
} from "../../utils/apiCategories";

import DefaultCategory from "./components/DefaultCategory";
import AddCategoryForm from "./components/AddCategoryForm";
import ListCategories from "./components/ListCategories";

import Family from "../../categories/icons/Family";
import Food from "../../categories/icons/Food";
import Shopping from "../../categories/icons/Shopping";
import Sport from "../../categories/icons/Sport";
import Work from "../../categories/icons/Work";

import "./Settings.css";

const Settings = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    uploadColorsServer().then(
      (data) => data && dispatch(uploadColorsAction(data))
    );

    uploadIconsServer().then(
      (data) => data && dispatch(uploadIconsAction(data))
    );

    uploadDefaultCategoryServer().then(
      (data) => data && dispatch(uploadDefaultCategoryAction(data))
    );

    uploadCategoriesServer().then(
      (data) => data && dispatch(uploadCategoriesAction(data))
    );
  }, [dispatch]);

  const iconConnecter = (title, color, size) => {
    switch (title) {
      case "Family":
        return <Family size={size} color={color}></Family>;
      case "Food":
        return <Food size={size} color={color}></Food>;
      case "Shopping":
        return <Shopping size={size} color={color}></Shopping>;
      case "Sport":
        return <Sport size={size} color={color}></Sport>;
      case "Work":
        return <Work size={size} color={color}></Work>;
    }
  };
  const isDefaultExist = useSelector(selectDefaultCategory);

  return (
    <>
      {useSelector(selectCategories).length && (
        <div>
          {isDefaultExist && <DefaultCategory />}
          <AddCategoryForm iconConnecter={iconConnecter} />
          <ListCategories iconConnecter={iconConnecter} />
        </div>
      )}
    </>
  );
};

export default Settings;
