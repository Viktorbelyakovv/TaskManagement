import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "list",

  initialState: {
    tasks: [],
  },

  reducers: {
    uploadListAction: (state, { payload }) => {
      state.tasks = payload.sort((item) => (item.favorite ? -1 : 1));
    },

    addTaskAction: (state, { payload }) => {
      state.tasks = state.tasks.concat(payload);
    },

    deleteTaskAction: (state, { payload }) => {
      state.tasks = state.tasks.filter((item) => item.id !== payload);
    },

    changeTitleAction: (state, { payload: { id, title } }) => {
      let list = [...state.tasks];
      const item = list.find((item) => item.id === id);
      item.title = title;
      state.tasks = list;
    },

    changeCompletedAction: (state, { payload }) => {
      let list = [...state.tasks];
      const item = list.find((item) => item.id === payload);
      item.completed = !item.completed;
      state.tasks = list;
    },

    changeFavoriteAction: (state, { payload }) => {
      let list = [...state.tasks];
      const item = list.find((item) => item.id === payload);
      item.favorite = !item.favorite;
      state.tasks = list.sort((item) => (item.favorite ? -1 : 1));
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
