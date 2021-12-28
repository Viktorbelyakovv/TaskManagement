import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import ClearIcon from "@mui/icons-material/Clear";
import {
  selectColors,
  selectIcons,
} from "../../../../store/categories/selectors";

import StyledInput from "../../../StyledInput";
import StyledIconButton from "../../../StyledIconButton";
import "./ItemCategory.css";

const ItemCategory = ({
  item: { id, title, colorId, iconId },
  iconConnecter,
  changeTitle,
  deleteItem,
}) => {
  const colors = useSelector(selectColors);
  const icons = useSelector(selectIcons);

  return (
    <div className="ItemCategory">
      <StyledInput
        defaultValue={title}
        onBlur={(e) => changeTitle(id, e.target.value)}
      />
      {iconConnecter(
        icons.find(({ id }) => id === iconId).title,
        colors.find(({ id }) => id === colorId).title,
        "40px"
      )}
      <StyledIconButton onClick={() => deleteItem(id)}>
        <ClearIcon />
      </StyledIconButton>
    </div>
  );
};

ItemCategory.propTypes = {
  item: PropTypes.object,
  iconConnecter: PropTypes.func,
  changeTitle: PropTypes.func,
  deleteItem: PropTypes.func,
};

export default ItemCategory;
