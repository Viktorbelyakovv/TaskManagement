import React, { useState } from "react";
import PropTypes from "prop-types";
import ClearIcon from "@mui/icons-material/Clear";
import StyledCheckbox from "./components/StyledCheckbox";
import StyledListItem from "../StyledListItem";
import StyledIconButton from "../StyledIconButton";
import "./Item.css";

const Item = ({
  item: { id, title, isCompleted, isFavorite },
  onDeleteItem,
  onChangeTitle,
  onChangeCompleted,
  onChangeFavorite,
}) => {
  const [starSign, setStarSign] = useState(isFavorite ? "star" : "star_border");

  const ChangeStar = () => {
    setStarSign(isFavorite ? "star_border" : "star");
    onChangeFavorite(id);
  };

  return (
    <div className="Item">
      <StyledCheckbox
        checked={isCompleted}
        onChange={() => onChangeCompleted(id)}
      />
      <StyledListItem
        variant="standard"
        defaultValue={title}
        onBlur={(e) => onChangeTitle(id, e.target.value)}
        disabled={isCompleted}
      />
      {!isCompleted && (
        <span
          className="material-icons"
          onMouseOver={() => !isFavorite && setStarSign("star_half")}
          onMouseOut={() => !isFavorite && setStarSign("star_border")}
          onClick={() => ChangeStar()}
        >
          {starSign}
        </span>
      )}
      <StyledIconButton onClick={() => onDeleteItem(id)}>
        <ClearIcon />
      </StyledIconButton>
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.object,
  onDeleteItem: PropTypes.func,
  onChangeTitle: PropTypes.func,
  onChangeCompleted: PropTypes.func,
  onChangeFavorite: PropTypes.func,
};

export default Item;
