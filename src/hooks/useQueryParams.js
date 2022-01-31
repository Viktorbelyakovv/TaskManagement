import { useReducer } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";

const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams({});

  const parseSortString = (sortString) => {
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

  const parseFilterString = (filterString) => {
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
    sortDate: false,
    sortName: false,
    categoryId: 0,
  };

  const init = () => ({
    sortDate: date,
    sortName: name,
    categoryId: category,
  });

  const [queryParams, dispatch] = useReducer(reducer, initialState, init);
  const { sortDate, sortName, categoryId } = queryParams;

  const updateQueryParams = (payload) => {
    dispatch(payload);
  };

  const setParams = () => {
    let params = createSearchParams();

    if ((sortDate || sortName) && categoryId) {
      params = JSON.stringify({
        sort: { date: sortDate, name: sortName },
        filter: { categoryId },
      });
    } else if ((sortDate || sortName) && !categoryId) {
      params = JSON.stringify({
        sort: { date: sortDate, name: sortName },
      });
    } else if (!(sortDate || sortName) && categoryId) {
      params = JSON.stringify({
        filter: { categoryId },
      });
    }
    setSearchParams(params);
  };

  const resetParams = (date, name, category) => {
    let params = createSearchParams();

    if ((date || name) && !category) {
      params = JSON.stringify({
        sort: { date: sortDate, name: sortName },
      });
    } else if (!(date || name) && category) {
      params = JSON.stringify({
        filter: { categoryId },
      });
    }
    setSearchParams(params);
  };

  return { queryParams, updateQueryParams, setParams, resetParams };
};

export const updateSortNameAC = (payload) => ({
  type: "CHANGE_SORT_NAME",
  payload,
});

export const updateSortDateAC = (payload) => ({
  type: "CHANGE_SORT_DATE",
  payload,
});

export const updateCategoryIdAC = (payload) => ({
  type: "CHANGE_CATEGORY_ID",
  payload,
});

function reducer(state, action) {
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
