import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addTask,
  changeTaskField,
  deleteTask,
  getTasks,
} from "../../utils/api";

export const getTasksAsync = createAsyncThunk(
  "categories/getTasksAsync",
  (isCompletedTasks) => getTasks(isCompletedTasks).then(({ data }) => data)
);

export const addTaskAsync = createAsyncThunk(
  "categories/addTaskAsync",
  (title) => addTask(title).then(({ data }) => data)
);

export const deleteTaskAsync = createAsyncThunk(
  "categories/deleteTaskAsync",
  (id) => deleteTask(id)
);

export const changeTitleAsync = createAsyncThunk(
  "categories/changeTitleAsync",
  ({ id, title }) =>
    changeTaskField({ id, fieldName: "title", field: title }).then(
      ({ data }) => data
    )
);

export const changeCompletedAsync = createAsyncThunk(
  "categories/changeCompletedAsync",
  ({ id, isCompleted }) =>
    changeTaskField({ id, fieldName: "isCompleted", field: isCompleted }).then(
      ({ data }) => data
    )
);

export const changeFavoriteAsync = createAsyncThunk(
  "categories/changeFavoriteAsync",
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
    builder.addCase(getTasksAsync.fulfilled, (state, { payload }) => {
      state.tasks = payload.sort(({ isFavorite }) => (isFavorite ? -1 : 1));
    });

    builder.addCase(addTaskAsync.fulfilled, (state, { payload }) => {
      state.tasks.push(payload);
    });

    builder.addCase(deleteTaskAsync.fulfilled, (state, { payload }) => {
      state.tasks = state.tasks.filter(({ id }) => id !== payload);
    });

    builder.addCase(
      changeTitleAsync.fulfilled,
      (state, { payload: { title, id } }) => {
        state.tasks.find((item) => item.id === id).title = title;
      }
    );

    builder.addCase(changeCompletedAsync.fulfilled, (state, { payload }) => {
      const item = state.tasks.find(({ id }) => id === payload.id);
      item.isCompleted = !item.isCompleted;
    });

    builder.addCase(changeFavoriteAsync.fulfilled, (state, { payload }) => {
      const item = state.tasks.find(({ id }) => id === payload.id);
      item.isFavorite = !item.isFavorite;
      state.tasks.sort((item) => (item.isFavorite ? -1 : 1));
    });
  },
});

export default tasksReducer.reducer;
