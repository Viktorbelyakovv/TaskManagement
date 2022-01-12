import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addTaskServer,
  changeCompletedServer,
  changeFavoriteServer,
  changeTitleServer,
  deleteTaskServer,
  getListServer,
} from "../../utils/api";

export const getListAsync = createAsyncThunk("categories/getListAsync", () =>
  getListServer().then(({ data }) => data)
);

export const addTaskAsync = createAsyncThunk(
  "categories/addTaskAsync",
  (title) => addTaskServer(title).then(({ data }) => data)
);

export const deleteTaskAsync = createAsyncThunk(
  "categories/deleteTaskAsync",
  (id) => deleteTaskServer(id)
);

export const changeTitleAsync = createAsyncThunk(
  "categories/changeTitleAsync",
  ({ id, title }) => changeTitleServer({ id, title }).then(({ data }) => data)
);

export const changeCompletedAsync = createAsyncThunk(
  "categories/changeCompletedAsync",
  ({ id, isCompleted }) =>
    changeCompletedServer({ id, isCompleted }).then(({ data }) => data)
);

export const changeFavoriteAsync = createAsyncThunk(
  "categories/changeFavoriteAsync",
  ({ id, isFavorite }) =>
    changeFavoriteServer({ id, isFavorite }).then(({ data }) => data)
);

export const slice = createSlice({
  name: "list",

  initialState: {
    tasks: [],
  },

  reducers: {},

  extraReducers(builder) {
    builder.addCase(getListAsync.fulfilled, (state, { payload }) => {
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

export default slice.reducer;
