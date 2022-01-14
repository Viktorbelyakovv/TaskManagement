import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addTask,
  changeTaskField,
  deleteTask,
  getTasks,
} from "../../utils/api";

export const getTasksThunk = createAsyncThunk(
  "categories/getTasks",
  (isCompletedTasks) => getTasks(isCompletedTasks).then(({ data }) => data)
);

export const addTaskThunk = createAsyncThunk("categories/addTask", (payload) =>
  addTask(payload).then(({ data }) => data)
);

export const deleteTaskThunk = createAsyncThunk("categories/deleteTask", (id) =>
  deleteTask(id)
);

export const changeTitleThunk = createAsyncThunk(
  "categories/changeTitle",
  ({ id, title }) =>
    changeTaskField({ id, fieldName: "title", field: title }).then(
      ({ data }) => data
    )
);

export const changeCompletedThunk = createAsyncThunk(
  "categories/changeCompleted",
  ({ id, isCompleted }) =>
    changeTaskField({ id, fieldName: "isCompleted", field: isCompleted }).then(
      ({ data }) => data
    )
);

export const changeFavoriteThunk = createAsyncThunk(
  "categories/changeFavorite",
  ({ id, isFavorite }) =>
    changeTaskField({ id, fieldName: "isFavorite", field: isFavorite }).then(
      ({ data }) => data
    )
);

export const tasksReducer = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getTasksThunk.fulfilled, (state, { payload }) => {
      state.tasks = payload.sort(({ isFavorite }) => (isFavorite ? -1 : 1));
    });

    builder.addCase(addTaskThunk.fulfilled, (state, { payload }) => {
      state.tasks.push(payload);
    });

    builder.addCase(deleteTaskThunk.fulfilled, (state, { payload }) => {
      state.tasks = state.tasks.filter(({ id }) => id !== payload);
    });

    builder.addCase(
      changeTitleThunk.fulfilled,
      (state, { payload: { title, id } }) => {
        state.tasks.find((item) => item.id === id).title = title;
      }
    );

    builder.addCase(changeCompletedThunk.fulfilled, (state, { payload }) => {
      state.tasks = state.tasks.filter(({ id }) => id !== payload.id);
    });

    builder.addCase(changeFavoriteThunk.fulfilled, (state, { payload }) => {
      const item = state.tasks.find(({ id }) => id === payload.id);
      item.isFavorite = !item.isFavorite;
      state.tasks.sort((item) => (item.isFavorite ? -1 : 1));
    });
  },
});

export default tasksReducer.reducer;
