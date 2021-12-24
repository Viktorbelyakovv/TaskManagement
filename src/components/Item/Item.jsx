import React, { useState } from "react";
import PropTypes from "prop-types";
import ClearIcon from "@mui/icons-material/Clear";
import {
  StyledCheckbox,
  StyledInput,
  StyledIconButton,
} from "./Item.styles.js";
import "./Item.css";

const Item = ({
  item,
  deleteItem,
  changeTitle,
  changeCompleted,
  changeFavorite,
}) => {
  const [title, setTitle] = useState(item.title);
  const [starSign, setStarSign] = useState(
    item.favorite ? "star" : "star_border"
  );

  return (
    <div className="Item">
      <StyledCheckbox
        checked={item.completed}
        onChange={() => changeCompleted(item.id)}
      />
      <StyledInput
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={() => changeTitle(item.id, title)}
        disabled={item.completed}
      />
      {!item.completed && (
        <span
          className="material-icons"
          onMouseOver={() => !item.favorite && setStarSign("star_half")}
          onMouseOut={() => !item.favorite && setStarSign("star_border")}
          onClick={() => changeFavorite(item.id)}
        >
          {starSign}
        </span>
      )}
      <StyledIconButton onClick={() => deleteItem(item.id)}>
        <ClearIcon />
      </StyledIconButton>
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.object,
  deleteItem: PropTypes.func,
  changeTitle: PropTypes.func,
  changeCompleted: PropTypes.func,
  changeFavorite: PropTypes.func,
};

export default Item;
