import React from "react";
import DefaultCategory from "./components/DefaultCategory";
import AddCategoryForm from "./components/AddCategoryForm";
import ListCategories from "./components/ListCategories";
/* import Family from "../../categories/icons/Family";
import Food from "../../categories/icons/Food";
import Shopping from "../../categories/icons/Shopping";
import Sport from "../../categories/icons/Sport";
import Work from "../../categories/icons/Work"; */
import "./Settings.css";

const Settings = () => {
  return (
    <div>
      <DefaultCategory />
      <AddCategoryForm />
      <ListCategories />
      {/* <Family color={"red"} size={"50px"}></Family>
      <Food color={"blue"} size={"50px"}></Food>
      <Shopping color={"yellow"} size={"50px"}></Shopping>
      <Sport color={"green"} size={"50px"}></Sport>
      <Work color={"purple"} size={"50px"}></Work> */}
    </div>
  );
};

export default Settings;
