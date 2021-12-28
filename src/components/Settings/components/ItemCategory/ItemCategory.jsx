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

const ItemCategory = ({ title, colorId, iconId, iconConnecter }) => {
  const colors = useSelector(selectColors);
  const icons = useSelector(selectIcons);

  return (
    <div className="ItemCategory">
      <StyledInput
        defaultValue={title}
        onBlur={
          () => console.log("onblur")
          /* (e) => changeTitle(id, e.target.value) */
        }
      />
      {iconConnecter(
        icons.find(({ id }) => id === iconId).title,
        colors.find(({ id }) => id === colorId).title,
        "40px"
      )}
      <StyledIconButton
        onClick={() => console.log("delete") /* () => deleteItem(id) */}
      >
        <ClearIcon />
      </StyledIconButton>
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
