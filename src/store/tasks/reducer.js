import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addTask,
  changeTaskField,
  deleteTask,
  getTasks,
} from "../../utils/api";

export const getTasksThunk = createAsyncThunk(
  "categories/getTasks",
  async (payload, { rejectWithValue }) => {
    try {
      return await getTasks(payload).then(({ data }) => data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addTaskThunk = createAsyncThunk(
  "categories/addTask",
  async ({ addPayload, sortPayload }, { rejectWithValue }) => {
    try {
      return await addTask(addPayload).then(() =>
        getTasks(sortPayload).then(({ data }) => data)
      );
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTaskThunk = createAsyncThunk(
  "categories/deleteTask",
  async (id, { rejectWithValue }) => {
    try {
      return await deleteTask(id).then(() => id);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const changeTitleThunk = createAsyncThunk(
  "categories/changeTitle",
  async ({ id, title }, { rejectWithValue }) => {
    try {
      return await changeTaskField({
        id,
        fieldName: "title",
        field: title,
      }).then(({ data }) => data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const changeCompletedThunk = createAsyncThunk(
  "categories/changeCompleted",
  async ({ id, isCompleted }, { rejectWithValue }) => {
    try {
      return await changeTaskField({
        id,
        fieldName: "isCompleted",
        field: isCompleted,
      }).then(({ data }) => data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const changeFavoriteThunk = createAsyncThunk(
  "categories/changeFavorite",
  async ({ id, isFavorite, payload }, { rejectWithValue }) => {
    try {
      return await changeTaskField({
        id,
        fieldName: "isFavorite",
        field: isFavorite,
      }).then(() => getTasks(payload).then(({ data }) => data));
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const tasksReducer = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: "idle",
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTasksThunk.pending, (state) => {
        if (state.loading === "idle") {
          state.loading = "pending";
        }
      })
      .addCase(getTasksThunk.fulfilled, (state, { payload }) => {
        state.error = null;
        state.tasks = payload;
        if (state.loading === "pending") {
          state.loading = "idle";
        }
      })
      .addCase(getTasksThunk.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
      });

    builder
      .addCase(addTaskThunk.fulfilled, (state, { payload }) => {
        state.error = null;
        state.tasks = payload;
      })
      .addCase(addTaskThunk.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
      });

    builder
      .addCase(deleteTaskThunk.fulfilled, (state, { payload }) => {
        state.error = null;
        state.tasks = state.tasks.filter(({ id }) => id !== payload);
      })
      .addCase(deleteTaskThunk.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
      });

    builder
      .addCase(
        changeTitleThunk.fulfilled,
        (state, { payload: { title, id } }) => {
          state.error = null;
          state.tasks.find((item) => item.id === id).title = title;
        }
      )
      .addCase(changeTitleThunk.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
      });

    builder
      .addCase(changeCompletedThunk.fulfilled, (state, { payload }) => {
        state.error = null;
        state.tasks = state.tasks.filter(({ id }) => id !== payload.id);
      })
      .addCase(changeCompletedThunk.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
      });

    builder
      .addCase(changeFavoriteThunk.fulfilled, (state, { payload }) => {
        state.error = null;
        state.tasks = payload;
      })
      .addCase(changeFavoriteThunk.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export default tasksReducer.reducer;
