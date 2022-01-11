import React, { useState } from "react";
import PropTypes from "prop-types";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch } from "react-redux";
import {
  deleteTaskAsync,
  changeTitleAsync,
  changeCompletedAsync,
  changeFavoriteAsync,
} from "../../store/tasks/reducer";
import StyledCheckbox from "./components/StyledCheckbox";
import StyledListItem from "../StyledListItem";
import StyledIconButton from "../StyledIconButton";
import "./Item.css";

const Item = ({ item: { id, title, isCompleted, isFavorite } }) => {
  const dispatch = useDispatch();

  const [starSign, setStarSign] = useState(isFavorite ? "star" : "star_border");

  const onChangeTitle = (id, title) => {
    dispatch(changeTitleAsync({ id, title }));
  };

  const onChangeCompleted = (id, isCompleted, isFavorite) => {
    dispatch(changeCompletedAsync({ id, isCompleted: !isCompleted }));
    if (isFavorite) {
      dispatch(changeFavoriteAsync({ id, isFavorite: !isFavorite }));
    }
  };

  const onChangeStar = () => {
    dispatch(changeFavoriteAsync({ id, isFavorite: !isFavorite }));
    setStarSign(isFavorite ? "star_border" : "star");
  };

  return (
    <div className="Item">
      <StyledCheckbox
        checked={isCompleted}
        onChange={() => onChangeCompleted(id, isCompleted, isFavorite)}
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
          onClick={() => onChangeStar()}
        >
          {starSign}
        </span>
      )}
      <StyledIconButton onClick={() => dispatch(deleteTaskAsync(id))}>
        <ClearIcon />
      </StyledIconButton>
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.object,
};

export default Item;
