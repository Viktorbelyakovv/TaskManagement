import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { getCategoriesThunk } from "../store/categories/reducer";
import { getTasksThunk } from "../store/tasks/reducer";

const useTaskPageHook = (isCompletedTasks) => {
  const dispatch = useDispatch();
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
      if (typeof categoryId === "number") return { categoryId };
      else return { categoryId: 0 };
    } catch (e) {
      return { categoryId: 0 };
    }
  };

  const { categoryId } = parseFilterString(
    decodeURIComponent(searchParams.toString().slice(0, -1))
  );

  const [sortDate, setSortDate] = useState(date);
  const [sortName, setSortName] = useState(name);
  const [filterCategory, setFilterCategory] = useState(categoryId);

  const setParams = () => {
    if ((sortDate || sortName) && filterCategory) {
      setSearchParams(
        JSON.stringify({
          sort: { date: sortDate, name: sortName },
          filter: { categoryId: filterCategory },
        })
      );
    }

    if ((sortDate || sortName) && !filterCategory) {
      setSearchParams(
        JSON.stringify({
          sort: { date: sortDate, name: sortName },
        })
      );
    }

    if (!(sortDate || sortName) && filterCategory) {
      setSearchParams(
        JSON.stringify({
          filter: { categoryId: filterCategory },
        })
      );
    }

    if (!(sortDate || sortName) && !filterCategory) {
      setSearchParams(createSearchParams());
    }
  };

  const resetParams = (date, name, category) => {
    if (!(date || name || category)) {
      setSearchParams(createSearchParams());
    }

    if ((date || name) && !category) {
      setSearchParams(
        JSON.stringify({
          sort: { date: sortDate, name: sortName },
        })
      );
    }

    if (!(date || name) && category) {
      setSearchParams(
        JSON.stringify({
          filter: { categoryId: filterCategory },
        })
      );
    }
  };

  const onApply = () => {
    setParams();
    dispatch(
      getTasksThunk({
        isCompletedTasks,
        sortDate,
        sortName,
        filterCategory,
      })
    );
  };

  const onResetSorting = () => {
    resetParams(false, false, !!filterCategory);
    setSortDate(false);
    setSortName(false);
    dispatch(
      getTasksThunk({
        isCompletedTasks,
        sortDate: false,
        sortName: false,
        filterCategory,
      })
    );
  };

  const onResetFiltering = () => {
    resetParams(sortDate, sortName, !!0);
    setFilterCategory(0);
    dispatch(
      getTasksThunk({
        isCompletedTasks,
        sortDate,
        sortName,
        filterCategory: 0,
      })
    );
  };

  useEffect(() => {
    dispatch(
      getTasksThunk({
        isCompletedTasks,
        sortDate: date,
        sortName: name,
        filterCategory: categoryId,
        start: 0,
      })
    );
    dispatch(getCategoriesThunk());
  }, [dispatch, isCompletedTasks, date, name, categoryId]);

  return {
    sortDate,
    setSortDate,
    sortName,
    setSortName,
    filterCategory,
    setFilterCategory,
    onApply,
    onResetSorting,
    onResetFiltering,
  };
};

export default useTaskPageHook;
