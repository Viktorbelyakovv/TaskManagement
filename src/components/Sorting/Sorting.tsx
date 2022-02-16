import React, { FC } from "react";
import { FormControlLabel, Switch } from "@mui/material";
import { QueryParamsActionType, QueryParamsType } from "../../types/types";
import { updateSortDateAC, updateSortNameAC } from "../../hooks/useQueryParams";
import StyledButton from "../ui-kit/StyledButton";

type SortingProps = {
  queryParams: QueryParamsType;
  updateQueryParams: (action: QueryParamsActionType) => void;
  onApplySorting: () => void;
  onResetSorting: () => void;
};

const Sorting: FC<SortingProps> = ({
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

export default Sorting;
