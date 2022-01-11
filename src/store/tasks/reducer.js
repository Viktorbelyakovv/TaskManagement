import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addTaskServer,
  changeCompletedServer,
  changeFavoriteServer,
  changeTitleServer,
  deleteTaskServer,
  getListServer,
} from "../../utils/api";

export const getList = createAsyncThunk("categories/getList", getListServer);

export const addTask = createAsyncThunk("categories/addTask", (title) =>
  addTaskServer(title)
);

export const deleteTask = createAsyncThunk("categories/deleteTask", (id) =>
  deleteTaskServer(id)
);

export const changeTitle = createAsyncThunk(
  "categories/changeTitle",
  ({ id, title }) => changeTitleServer({ id, title })
);

export const changeCompleted = createAsyncThunk(
  "categories/changeCompleted",
  ({ id, isCompleted }) => changeCompletedServer({ id, isCompleted })
);

export const changeFavorite = createAsyncThunk(
  "categories/changeFavorite",
  ({ id, isFavorite }) => changeFavoriteServer({ id, isFavorite })
);

export const slice = createSlice({
  name: "list",

  initialState: {
    tasks: [],
  },

  reducers: {},

  extraReducers(builder) {
    builder.addCase(getList.fulfilled, (state, { payload: { data } }) => {
      state.tasks = data.sort(({ isFavorite }) => (isFavorite ? -1 : 1));
    });

    builder.addCase(addTask.fulfilled, (state, { payload: { data } }) => {
      state.tasks = state.tasks.concat(data);
    });

    builder.addCase(deleteTask.fulfilled, (state, { payload }) => {
      state.tasks = state.tasks.filter(({ id }) => id !== payload);
    });

    builder.addCase(
      changeTitle.fulfilled,
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
      changeCompleted.fulfilled,
      (state, { payload: { data } }) => {
        let list = [...state.tasks];
        const item = list.find(({ id }) => id === data.id);
        item.isCompleted = !item.isCompleted;
        state.tasks = list;
      }
    );

    builder.addCase(
      changeFavorite.fulfilled,
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
