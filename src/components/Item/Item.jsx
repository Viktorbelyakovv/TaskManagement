import React, { useState } from "react";
import PropTypes from "prop-types";
import ClearIcon from "@mui/icons-material/Clear";
import StyledCheckbox from "./components/StyledCheckbox";
import StyledInput from "../StyledInput";
import StyledIconButton from "../StyledIconButton";
import "./Item.css";

const Item = ({
  item: { id, title, completed, favorite },
  deleteItem,
  changeTitle,
  changeCompleted,
  changeFavorite,
}) => {
  const [starSign, setStarSign] = useState(favorite ? "star" : "star_border");

  const ChangeStar = () => {
    setStarSign(favorite ? "star_border" : "star");
    changeFavorite(id);
  };

  return (
    <div className="Item">
      <StyledCheckbox
        checked={completed}
        onChange={() => changeCompleted(id)}
      />
      <StyledInput
        defaultValue={title}
        onBlur={(e) => changeTitle(id, e.target.value)}
        disabled={completed}
      />
      {!completed && (
        <span
          className="material-icons"
          onMouseOver={() => !favorite && setStarSign("star_half")}
          onMouseOut={() => !favorite && setStarSign("star_border")}
          onClick={() => ChangeStar()}
        >
          {starSign}
        </span>
      )}
      <StyledIconButton onClick={() => deleteItem(id)}>
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
