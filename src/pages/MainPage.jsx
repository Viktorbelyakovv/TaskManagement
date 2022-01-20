import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTasksThunk } from "../store/tasks/reducer";
import { getCategoriesThunk } from "../store/categories/reducer";
import { createSearchParams, useSearchParams } from "react-router-dom";
import AddTaskForm from "../components/AddTaskForm";
import Sorting from "../components/Sorting";
import ListTasks from "../components/ListTasks";
import Filtering from "../components/Filtering/Filtering";

const MainPage = () => {
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

  const onApplySorting = () => {
    setParams();
    dispatch(
      getTasksThunk({
        isCompletedTasks: false,
        sortDate,
        sortName,
        filterCategory,
      })
    );
  };
  const onApplyFiltering = () => {
    setParams();
    dispatch(
      getTasksThunk({
        isCompletedTasks: false,
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
        isCompletedTasks: false,
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
        isCompletedTasks: false,
        sortDate,
        sortName,
        filterCategory: 0,
      })
    );
  };

  useEffect(() => {
    // лог
    dispatch(
      getTasksThunk({
        isCompletedTasks: false,
        sortDate: date,
        sortName: name,
        filterCategory: categoryId,
      })
    );
    dispatch(getCategoriesThunk());
  }, [dispatch, date, name, categoryId]);

  return (
    <>
      <h1>TO-DO LIST AND TASK MANAGEMENT</h1>
      <div>
        <AddTaskForm
          isCompletedTasks={false}
          sortDate={sortDate}
          sortName={sortName}
        />
        <Sorting
          sortDate={sortDate}
          setSortDate={setSortDate}
          sortName={sortName}
          setSortName={setSortName}
          onApplySorting={onApplySorting}
          onResetSorting={onResetSorting}
        />
        <Filtering
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          onApplyFiltering={onApplyFiltering}
          onResetFiltering={onResetFiltering}
        />
        <ListTasks
          isCompletedTasks={false}
          sortDate={sortDate}
          sortName={sortName}
        />
      </div>
    </>
  );
};

export default MainPage;
