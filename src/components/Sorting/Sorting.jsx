import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { getTasksThunk } from "../../store/tasks/reducer";
import { FormControlLabel, Switch } from "@mui/material";
import StyledButton from "../ui-kit/StyledButton";

const Sorting = ({
  isCompletedTasks,
  sortDate,
  setSortDate,
  sortName,
  setSortName,
}) => {
  const dispatch = useDispatch();

  const onApplySorting = () => {
    (sortDate || sortName) &&
      dispatch(
        getTasksThunk({
          isCompletedTasks,
          sortDate,
          sortName,
        })
      );
  };

  const onResetSorting = () => {
    if (sortDate || sortName) {
      setSortDate(false);
      setSortName(false);
      dispatch(
        getTasksThunk({ isCompletedTasks, sortDate: false, sortName: false })
      );
    }
  };

  return (
    <div className="Sorting">
      <h3>Sorting</h3>
      <FormControlLabel
        control={
          <Switch
            checked={sortDate}
            onChange={(e) => {
              setSortDate(e.target.checked);
            }}
          />
        }
        label="Date(priority)"
      />
      <FormControlLabel
        control={
          <Switch
            checked={sortName}
            onChange={(e) => {
              setSortName(e.target.checked);
            }}
          />
        }
        label="Name"
      />
      <StyledButton width="15%" variant="outlined" onClick={onApplySorting}>
        Apply
      </StyledButton>
      <StyledButton width="15%" variant="outlined" onClick={onResetSorting}>
        Reset
      </StyledButton>
    </div>
  );
};

Sorting.propTypes = {
  isCompletedTasks: PropTypes.bool,
  sortDate: PropTypes.bool,
  setSortDate: PropTypes.func,
  sortName: PropTypes.bool,
  setSortName: PropTypes.func,
};

export default Sorting;
