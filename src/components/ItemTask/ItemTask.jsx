import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTaskThunk,
  changeTitleThunk,
  changeCompletedThunk,
  changeFavoriteThunk,
} from "../../store/tasks/reducer";
import { getPaginationLimit } from "../../store/tasks/selectors";
import StyledCheckbox from "../ui-kit/StyledCheckbox";
import StyledListItem from "../ui-kit/StyledListItem";
import StyledIconButton from "../ui-kit/StyledIconButton";
import { getSvgIcon } from "../../helpers/getSvgIcon";
import "./ItemTask.css";

const ItemTask = ({
  item: {
    id,
    title,
    isCompleted,
    isFavorite,
    date,
    category: { colorId, iconId },
  },
  payload,
  setStartTask,
}) => {
  const dispatch = useDispatch();
  const [starSign, setStarSign] = useState(isFavorite ? "star" : "star_border");
  const [taskTitle, setTaskTitle] = useState(title);
  const isError = taskTitle.trim().length < 1 || taskTitle.trim().length > 50;
  const paginationLimit = useSelector(getPaginationLimit);

  const onChangeTitle = (payload) => {
    dispatch(changeTitleThunk(payload));
    setStartTask(paginationLimit);
  };

  const onChangeCompleted = () => {
    dispatch(changeCompletedThunk({ id, isCompleted: !isCompleted }));

    if (isFavorite) {
      dispatch(
        changeFavoriteThunk({
          id,
          isFavorite: !isFavorite,
          payload,
        })
      );
    }
  };

  const onChangeStar = () => {
    dispatch(
      changeFavoriteThunk({
        id,
        isFavorite: !isFavorite,
        payload,
      })
    );
    setStartTask(paginationLimit);
  };

  useEffect(() => {
    setStarSign(isFavorite ? "star" : "star_border");
  }, [isFavorite]);

  return (
    <div className="Item">
      <StyledCheckbox
        checked={isCompleted}
        onChange={() => onChangeCompleted()}
      />
      <StyledListItem
        variant="standard"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        onBlur={(e) =>
          !isError && onChangeTitle({ id, title: e.target.value, payload })
        }
        error={isError}
        helperText={
          isError ? "Task name must be between 1 and 50 characters" : ""
        }
        disabled={isCompleted}
      />
      {date}
      {getSvgIcon({ iconId, colorId, size: "30px" })}
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
      <StyledIconButton onClick={() => dispatch(deleteTaskThunk(id))}>
        <ClearIcon />
      </StyledIconButton>
    </div>
  );
};

ItemTask.propTypes = {
  item: PropTypes.object,
  payload: PropTypes.shape({
    isCompletedTasks: PropTypes.bool,
    sortDate: PropTypes.bool,
    sortName: PropTypes.bool,
    filterCategory: PropTypes.number,
    start: PropTypes.number,
    end: PropTypes.number,
  }),
  setStartTask: PropTypes.func,
};

export default ItemTask;
