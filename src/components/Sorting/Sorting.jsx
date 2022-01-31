import React from "react";
import PropTypes from "prop-types";
import { FormControlLabel, Switch } from "@mui/material";
import { updateSortDateAC, updateSortNameAC } from "../../hooks/useQueryParams";
import StyledButton from "../ui-kit/StyledButton";

const Sorting = ({
  queryParams: { sortDate, sortName },
  updateQueryParams,
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
                updateQueryParams(updateSortDateAC(e.target.checked));
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
                updateQueryParams(updateSortNameAC(e.target.checked));
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
  queryParams: PropTypes.shape({
    sortDate: PropTypes.bool,
    sortName: PropTypes.bool,
  }),
  updateQueryParams: PropTypes.func,
  onApplySorting: PropTypes.func,
  onResetSorting: PropTypes.func,
};

export default Sorting;
