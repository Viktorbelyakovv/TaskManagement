import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectCategories } from "../../../../store/categories/selectors";
import ItemCategory from "../ItemCategory";

const ListCategories = ({ iconConnecter }) => {
  const categories = useSelector(selectCategories);
  return (
    <div>
      {"List of categories"}
      {categories.map(({ title, colorId, iconId, id }) => (
        <ItemCategory
          title={title}
          colorId={colorId}
          iconId={iconId}
          key={id}
          iconConnecter={iconConnecter}
        />
      ))}
    </div>
  );
};

ListCategories.propTypes = {
  iconConnecter: PropTypes.func,
};

export default ListCategories;
