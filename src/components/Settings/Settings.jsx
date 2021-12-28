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
  const iconConnecter = (title, color) => {
    switch (title) {
      case "Family":
        return <Family size={"40px"} color={color}></Family>;
      case "Food":
        return <Food size={"40px"} color={color}></Food>;
      case "Shopping":
        return <Shopping size={"40px"} color={color}></Shopping>;
      case "Sport":
        return <Sport size={"40px"} color={color}></Sport>;
      case "Work":
        return <Work size={"40px"} color={color}></Work>;
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
