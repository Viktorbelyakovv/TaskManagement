import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "list",

  initialState: {
    tasks: [],
  },

  reducers: {
    uploadListAction: (state, { payload }) => {
      state.tasks = payload.sort(({ isFavorite }) => (isFavorite ? -1 : 1));
    },

    addTaskAction: (state, { payload }) => {
      state.tasks = state.tasks.concat(payload);
    },

    deleteTaskAction: (state, { payload }) => {
      state.tasks = state.tasks.filter(({ id }) => id !== payload);
    },

    changeTitleAction: (state, { payload: { id, title } }) => {
      const list = [...state.tasks];
      const item = list.find((item) => item.id === id);
      item.title = title;
      state.tasks = list;
    },

    changeCompletedAction: (state, { payload }) => {
      let list = [...state.tasks];
      const item = list.find(({ id }) => id === payload);
      item.isCompleted = !item.isCompleted;
      state.tasks = list;
    },

    changeFavoriteAction: (state, { payload }) => {
      let list = [...state.tasks];
      const item = list.find(({ id }) => id === payload);
      item.isFavorite = !item.isFavorite;
      state.tasks = list.sort((item) => (item.isFavorite ? -1 : 1));
    },
  },
});

export const {
  uploadListAction,
  addTaskAction,
  deleteTaskAction,
  changeTitleAction,
  changeCompletedAction,
  changeFavoriteAction,
} = slice.actions;

export default slice.reducer;
