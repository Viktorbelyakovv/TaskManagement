import React, { useState } from "react";
import { FormControlLabel, Switch } from "@mui/material";
import StyledButton from "../ui-kit/StyledButton";

const Filtering = () => {
  const [checkedDate, setCheckedDate] = useState(false);
  const [checkedName, setCheckedName] = useState(false);

  const onApplySorting = () => {
    console.log("apply");
    return 0;
  };

  const onResetSorting = () => {
    console.log("reset");
    return 0;
  };

  return (
    <div className="Filtering">
      <h3>Filtering</h3>
      <FormControlLabel
        control={
          <Switch
            checked={checkedDate}
            onChange={(e) => {
              setCheckedDate(e.target.checked);
            }}
          />
        }
        label="Date(priority)"
      />
      <FormControlLabel
        control={
          <Switch
            checked={checkedName}
            onChange={(e) => {
              setCheckedName(e.target.checked);
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

export default Filtering;
