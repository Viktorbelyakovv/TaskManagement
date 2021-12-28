import React from "react";
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

  return (
    <>
      <DefaultCategory />
      <AddCategoryForm iconConnecter={iconConnecter} />
      <ListCategories iconConnecter={iconConnecter} />
    </>
  );
};

export default Settings;
