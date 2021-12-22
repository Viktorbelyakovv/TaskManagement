import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "list",

  initialState: {
    tasks: [],
  },

  reducers: {
    uploadListAction: (state, { payload }) => {
      state.tasks = payload.sort((a) => (a.favorite ? -1 : 1));
    },

    addTaskAction: (state, { payload }) => {
      state.tasks.push(payload);
    },

    deleteTaskAction: (state, { payload }) => {
      const localID = state.tasks.findIndex((item) => item.id === payload);

      if (state.tasks[localID]) {
        state.tasks.splice(localID, 1);
      }
    },

    changeTitleAction: (state, { payload }) => {
      const localID = state.tasks.findIndex((item) => item.id === payload.id);

      if (state.tasks[localID]) {
        state.tasks[localID].title = payload.title;
      }
    },

    changeCompletedAction: (state, { payload }) => {
      const localID = state.tasks.findIndex((item) => item.id === payload);

      if (state.tasks[localID]) {
        state.tasks[localID].completed = !state.tasks[localID].completed;
      }
    },

    changeFavoriteAction: (state, { payload }) => {
      const localID = state.tasks.findIndex((item) => item.id === payload);

      if (state.tasks[localID]) {
        state.tasks[localID].favorite = !state.tasks[localID].favorite;
        state.tasks.sort((a) => (a.favorite ? -1 : 1));
      }
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
