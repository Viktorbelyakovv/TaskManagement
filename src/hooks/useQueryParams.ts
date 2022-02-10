import { useReducer } from "react";
import { useSearchParams } from "react-router-dom";
import { QueryParamsActionType } from "../types/types";

const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams({});

  const parseSortString = (sortString: string) => {
    try {
      const {
        sort: { date, name },
      } = JSON.parse(sortString);

      if (typeof date === "boolean" && typeof name === "boolean") {
        return { date, name };
      } else {
        return { date: false, name: false };
      }
    } catch (e) {
      return { date: false, name: false };
    }
  };

  const { date, name } = parseSortString(
    decodeURIComponent(searchParams.toString().slice(0, -1))
  );

  const parseFilterString = (filterString: string) => {
    try {
      const {
        filter: { categoryId },
      } = JSON.parse(filterString);
      if (typeof categoryId === "number") return { category: categoryId };
      else return { category: 0 };
    } catch (e) {
      return { category: 0 };
    }
  };

  const { category } = parseFilterString(
    decodeURIComponent(searchParams.toString().slice(0, -1))
  );

  const initialState = {
    sortDate: date,
    sortName: name,
    categoryId: category,
  };

  const [queryParams, dispatch] = useReducer(reducer, initialState);
  const { sortDate, sortName, categoryId } = queryParams;

  const updateQueryParams = (action: QueryParamsActionType) => {
    dispatch(action);
  };

  const updateURLParams = (resetStr: string) => {
    let params = undefined;

    if (!resetStr) {
      if (sortDate || sortName) {
        params = {
          sort: { date: sortDate, name: sortName },
        };
      }

      if (categoryId) {
        params = {
          ...params,
          filter: { categoryId },
        };
      }
    }

    if (resetStr === "resetSorting") {
      updateQueryParams(updateSortDateAC(false));
      updateQueryParams(updateSortNameAC(false));
      if (categoryId) {
        params = {
          filter: { categoryId },
        };
      }
    }
    if (resetStr === "resetFiltering") {
      updateQueryParams(updateCategoryIdAC(0));
      if (sortDate || sortName) {
        params = {
          sort: { date: sortDate, name: sortName },
        };
      }
    }

    setSearchParams(JSON.stringify(params));
  };

  return { queryParams, updateQueryParams, updateURLParams };
};

export const updateSortNameAC = (payload: boolean): QueryParamsActionType => ({
  type: "CHANGE_SORT_NAME",
  payload,
});

export const updateSortDateAC = (payload: boolean): QueryParamsActionType => ({
  type: "CHANGE_SORT_DATE",
  payload,
});

export const updateCategoryIdAC = (payload: number): QueryParamsActionType => ({
  type: "CHANGE_CATEGORY_ID",
  payload,
});

function reducer(state: any, action: QueryParamsActionType) {
  switch (action.type) {
    case "CHANGE_SORT_NAME": {
      return { ...state, sortName: action.payload };
    }
    case "CHANGE_SORT_DATE": {
      return { ...state, sortDate: action.payload };
    }
    case "CHANGE_CATEGORY_ID": {
      return { ...state, categoryId: action.payload };
    }
  }
}

export default useQueryParams;
