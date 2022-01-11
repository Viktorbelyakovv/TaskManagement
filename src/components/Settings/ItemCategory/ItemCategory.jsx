import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  changeCategoryTitleAsync,
  deleteCategoryAsync,
} from "../../../store/categories/reducer";
import ClearIcon from "@mui/icons-material/Clear";
import StyledListItem from "../../StyledListItem";
import StyledIconButton from "../../StyledIconButton";
import { getSvgIcon } from "../../../helpers/getSvgIcon";
import "./ItemCategory.css";

const ItemCategory = ({ item: { id, title, colorId, iconId, isDefault } }) => {
  const dispatch = useDispatch();

  const [categoryTitle, setCategoryTitle] = useState(title);
  const isError =
    categoryTitle.trim().length < 1 || categoryTitle.trim().length > 15;

  const changeTitle = (id, title) => {
    dispatch(changeCategoryTitleAsync({ id, title }));
  };

  return (
    <div className="ItemCategory">
      <StyledListItem
        value={categoryTitle}
        onChange={(e) => setCategoryTitle(e.target.value)}
        onBlur={(e) => !isError && changeTitle(id, e.target.value)}
        error={isError}
        variant="standard"
        color="success"
        focused={isDefault}
        helperText={
          isError ? "Category name must be between 1 and 15 characters" : ""
        }
      />
      {getSvgIcon({ iconId, colorId, size: "40px" })}
      <StyledIconButton
        onClick={() => !isDefault && dispatch(deleteCategoryAsync(id))}
      >
        <ClearIcon />
      </StyledIconButton>
    </div>
  );
};

ItemCategory.propTypes = {
  item: PropTypes.object,
  getSvgIcon: PropTypes.func,
};

export default ItemCategory;
