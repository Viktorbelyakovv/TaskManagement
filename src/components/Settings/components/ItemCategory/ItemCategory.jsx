import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  selectColors,
  selectIcons,
} from "../../../../store/categories/selectors";

import StyledCategoryInput from "./components/StyledCategoryInput";

const ItemCategory = ({ title, colorId, iconId, iconConnecter }) => {
  const colors = useSelector(selectColors);
  const icons = useSelector(selectIcons);

  return (
    <div>
      <StyledCategoryInput defaultValue={title}></StyledCategoryInput>
      {iconConnecter(
        icons.find(({ id }) => id === iconId).title,
        colors.find(({ id }) => id === colorId).title
      )}
    </div>
  );
};

ItemCategory.propTypes = {
  title: PropTypes.string,
  colorId: PropTypes.number,
  iconId: PropTypes.number,
  iconConnecter: PropTypes.func,
};

export default ItemCategory;
