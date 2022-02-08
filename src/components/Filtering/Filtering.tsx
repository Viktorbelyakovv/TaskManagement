import React, { FC } from "react";
import { useSelector } from "react-redux";
import {
  getCategories,
  getCategoriesError,
  getCategoriesLoading,
} from "../../store/categories/selectors";
import { MenuItem } from "@mui/material";
/* import { getSvgIcon } from "../../helpers/getSvgIcon"; */
import Error from "../Error";
import Loader from "../Loader";
import { updateCategoryIdAC } from "../../hooks/useQueryParams";
import StyledButton from "../ui-kit/StyledButton";
import StyledSelect from "../ui-kit/StyledSelect";
import "./Filtering.css";

interface FilteringProps {
  queryParams: { categoryId: number };
  updateQueryParams: any;
  onApplyFiltering: any;
  onResetFiltering: any;
}

const Filtering: FC<FilteringProps> = ({
  queryParams: { categoryId },
  updateQueryParams,
  onApplyFiltering,
  onResetFiltering,
}) => {
  const categories = useSelector(getCategories);
  const loading = useSelector(getCategoriesLoading);
  const error = useSelector(getCategoriesError);

  if (error) return <Error message={"Error downloading"} />;

  if (loading === "pending" || !categories.length) return <Loader />;

  return (
    <>
      <h2>Filtering</h2>
      <div className="Sorting">
        <StyledSelect
          width="40%"
          value={categoryId}
          label="Category"
          /* onChange={(e) =>
            updateQueryParams(updateCategoryIdAC(e.target.value))
          } */
          displayEmpty
        >
          <MenuItem value={0} key={0}>
            {"No filter"}
          </MenuItem>
          {/* {categories.map(({ id, title, colorId, iconId }) => (
            <MenuItem value={id} key={id}>
              {getSvgIcon({ iconId, colorId, size: "30px" })}
              {title}
            </MenuItem>
          ))} */}
        </StyledSelect>
        <StyledButton width="15%" variant="outlined" onClick={onApplyFiltering}>
          Apply
        </StyledButton>
        <StyledButton width="15%" variant="outlined" onClick={onResetFiltering}>
          Reset
        </StyledButton>
      </div>
    </>
  );
};

export default Filtering;
