import React from "react";
import { useSelector } from "react-redux";
import { selectCategories } from "../../../store/categories/selectors";
import ItemCategory from "../ItemCategory";

const ListCategories = () => {
  const categories = useSelector(selectCategories);

  return (
    <>
      <h2>List of categories</h2>
      {categories.length ? (
        categories.map((item) => <ItemCategory item={item} key={item.id} />)
      ) : (
        <h2>No categories</h2>
      )}
    </>
  );
};

export default ListCategories;
