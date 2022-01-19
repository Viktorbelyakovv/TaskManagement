import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { createSearchParams, useSearchParams } from "react-router-dom";
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
  const [searchParams, setSearchParams] = useSearchParams({});

  const parseSortString = (sortString) => {
    try {
      const {
        sort: { date, name },
      } = JSON.parse(sortString);
      if (typeof date === "boolean" && typeof name === "boolean")
        return { date, name };
      else return { date: false, name: false };
    } catch (e) {
      return { date: false, name: false };
    }
  };

  const { date, name } = parseSortString(
    decodeURIComponent(searchParams.toString().slice(0, -1))
  );

  const onApplySorting = () => {
    dispatch(
      getTasksThunk({
        isCompletedTasks,
        sortDate,
        sortName,
      })
    );
    if (sortDate || sortName) {
      setSearchParams(
        JSON.stringify({
          sort: { date: sortDate, name: sortName },
        })
      );
    } else {
      setSearchParams(createSearchParams());
    }
  };

  const onResetSorting = () => {
    setSortDate(false);
    setSortName(false);
    setSearchParams(createSearchParams());
    dispatch(
      getTasksThunk({ isCompletedTasks, sortDate: false, sortName: false })
    );
  };

  useEffect(() => {
    setSortDate(date);
    setSortName(name);
  }, [setSortDate, setSortName, date, name]);

  return (
    <>
      <h2>Sorting</h2>
      <div className="Sorting">
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
    </>
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
