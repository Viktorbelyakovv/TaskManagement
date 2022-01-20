import React from "react";
import PropTypes from "prop-types";
import { FormControlLabel, Switch } from "@mui/material";
import StyledButton from "../ui-kit/StyledButton";

const Sorting = ({
  sortDate,
  setSortDate,
  sortName,
  setSortName,
  onApplySorting,
  onResetSorting,
}) => {
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
  sortDate: PropTypes.bool,
  setSortDate: PropTypes.func,
  sortName: PropTypes.bool,
  setSortName: PropTypes.func,
  onApplySorting: PropTypes.func,
  onResetSorting: PropTypes.func,
};

export default Sorting;
