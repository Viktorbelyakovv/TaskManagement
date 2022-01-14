import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  changeCategoryTitleThunk,
  deleteCategoryThunk,
} from "../../../store/categories/reducer";
import ClearIcon from "@mui/icons-material/Clear";
import StyledListItem from "../../ui-kit/StyledListItem";
import StyledIconButton from "../../ui-kit/StyledIconButton";
import { getSvgIcon } from "../../../helpers/getSvgIcon";
import "./ItemCategory.css";

const ItemCategory = ({ item: { id, title, colorId, iconId, isDefault } }) => {
  const dispatch = useDispatch();

  const [categoryTitle, setCategoryTitle] = useState(title);
  const isError =
    categoryTitle.trim().length < 1 || categoryTitle.trim().length > 15;

  const onChangeTitle = (payload) => {
    dispatch(changeCategoryTitleThunk(payload));
  };

  const onDeleteCategory = () => {
    !isDefault && dispatch(deleteCategoryThunk(id));
  };

  return (
    <div className="ItemCategory">
      <StyledListItem
        value={categoryTitle}
        onChange={(e) => setCategoryTitle(e.target.value)}
        onBlur={(e) => !isError && onChangeTitle({ id, title: e.target.value })}
        error={isError}
        variant="standard"
        color="success"
        focused={isDefault}
        helperText={
          isError ? "Category name must be between 1 and 15 characters" : ""
        }
      />
      {getSvgIcon({ iconId, colorId, size: "40px" })}
      <StyledIconButton disabled={isDefault} onClick={() => onDeleteCategory()}>
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
