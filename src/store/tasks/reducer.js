import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addTaskServer,
  changeCompletedServer,
  changeFavoriteServer,
  changeTitleServer,
  deleteTaskServer,
  getListServer,
} from "../../utils/api";

export const getListAsync = createAsyncThunk(
  "categories/getListAsync",
  getListServer
);

export const addTaskAsync = createAsyncThunk(
  "categories/addTaskAsync",
  (title) => addTaskServer(title)
);

export const deleteTaskAsync = createAsyncThunk(
  "categories/deleteTaskAsync",
  (id) => deleteTaskServer(id)
);

export const changeTitleAsync = createAsyncThunk(
  "categories/changeTitleAsync",
  ({ id, title }) => changeTitleServer({ id, title })
);

export const changeCompletedAsync = createAsyncThunk(
  "categories/changeCompletedAsync",
  ({ id, isCompleted }) => changeCompletedServer({ id, isCompleted })
);

export const changeFavoriteAsync = createAsyncThunk(
  "categories/changeFavoriteAsync",
  ({ id, isFavorite }) => changeFavoriteServer({ id, isFavorite })
);

export const slice = createSlice({
  name: "list",

  initialState: {
    tasks: [],
  },

  reducers: {},

  extraReducers(builder) {
    builder.addCase(getListAsync.fulfilled, (state, { payload: { data } }) => {
      state.tasks = data.sort(({ isFavorite }) => (isFavorite ? -1 : 1));
    });

    builder.addCase(addTaskAsync.fulfilled, (state, { payload: { data } }) => {
      state.tasks = state.tasks.concat(data);
    });

    builder.addCase(deleteTaskAsync.fulfilled, (state, { payload }) => {
      state.tasks = state.tasks.filter(({ id }) => id !== payload);
    });

    builder.addCase(
      changeTitleAsync.fulfilled,
      (
        state,
        {
          payload: {
            data: { id, title },
          },
        }
      ) => {
        const list = [...state.tasks];
        const item = list.find((item) => item.id === id);
        item.title = title;
        state.tasks = list;
      }
    );

    builder.addCase(
      changeCompletedAsync.fulfilled,
      (state, { payload: { data } }) => {
        let list = [...state.tasks];
        const item = list.find(({ id }) => id === data.id);
        item.isCompleted = !item.isCompleted;
        state.tasks = list;
      }
    );

    builder.addCase(
      changeFavoriteAsync.fulfilled,
      (state, { payload: { data } }) => {
        let list = [...state.tasks];
        const item = list.find(({ id }) => id === data.id);
        item.isFavorite = !item.isFavorite;
        state.tasks = list.sort((item) => (item.isFavorite ? -1 : 1));
      }
    );
  },
});

export default slice.reducer;
