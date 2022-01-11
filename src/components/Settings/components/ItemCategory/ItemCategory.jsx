import React, { useState } from "react";
import PropTypes from "prop-types";
import ClearIcon from "@mui/icons-material/Clear";
import StyledListItem from "../../../StyledListItem";
import StyledIconButton from "../../../StyledIconButton";
import { getSvgIcon } from "../../../../helpers/getSvgIcon";
import "./ItemCategory.css";

const ItemCategory = ({
  item: { id, title, colorId, iconId, isDefault },
  changeTitle,
  deleteItem,
}) => {
  const [categoryTitle, setCategoryTitle] = useState(title);
  const isError =
    categoryTitle.trim().length < 1 || categoryTitle.trim().length > 15;

  return (
    <div className="ItemCategory">
      <StyledListItem
        value={categoryTitle}
        onChange={(e) => setCategoryTitle(e.target.value)}
        onBlur={(e) => changeTitle(id, e.target.value)}
        error={isError}
        variant="standard"
        color="success"
        focused={isDefault}
        helperText={
          isError ? "Category name must be between 1 and 15 characters" : ""
        }
      />
      {getSvgIcon({ iconId, colorId, size: "40px" })}
      <StyledIconButton onClick={() => deleteItem(id, isDefault)}>
        <ClearIcon />
      </StyledIconButton>
    </div>
  );
};

ItemCategory.propTypes = {
  item: PropTypes.object,
  getSvgIcon: PropTypes.func,
  changeTitle: PropTypes.func,
  deleteItem: PropTypes.func,
};

export default ItemCategory;
