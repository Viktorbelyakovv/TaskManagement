import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  AddTaskParamsType,
  GetTasksParamsType,
  ListItemType,
} from "../../types/types";
import {
  addTask,
  changeTaskField,
  deleteTask,
  getTasks,
} from "../../utils/api";

export const getTasksThunk = createAsyncThunk(
  "categories/getTasks",
  async (payload: GetTasksParamsType, { rejectWithValue }) => {
    try {
      return await getTasks(payload).then(({ data }) => data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addTaskThunk = createAsyncThunk(
  "categories/addTask",
  async (
    {
      addPayload,
      sortFilterPayload,
    }: { addPayload: AddTaskParamsType; sortFilterPayload: GetTasksParamsType },
    { rejectWithValue }
  ) => {
    try {
      return await addTask(addPayload).then(() =>
        getTasks(sortFilterPayload).then(({ data }) => data)
      );
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteTaskThunk = createAsyncThunk(
  "categories/deleteTask",
  async (id: number, { rejectWithValue }) => {
    try {
      return await deleteTask(id).then(() => id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const changeTitleThunk = createAsyncThunk(
  "categories/changeTitle",
  async (
    {
      id,
      title,
      payload,
    }: { id: number; title: string; payload: GetTasksParamsType },
    { rejectWithValue }
  ) => {
    try {
      return await changeTaskField({
        id,
        fieldName: "title",
        field: title,
      }).then(() => getTasks(payload).then(({ data }) => data));
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const changeCompletedThunk = createAsyncThunk(
  "categories/changeCompleted",
  async (
    { id, isCompleted }: { id: number; isCompleted: boolean },
    { rejectWithValue }
  ) => {
    try {
      return await changeTaskField({
        id,
        fieldName: "isCompleted",
        field: isCompleted + "",
      }).then(({ data }) => data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const changeFavoriteThunk = createAsyncThunk(
  "categories/changeFavorite",
  async (
    {
      id,
      isFavorite,
      payload,
    }: { id: number; isFavorite: boolean; payload: GetTasksParamsType },
    { rejectWithValue }
  ) => {
    try {
      return await changeTaskField({
        id,
        fieldName: "isFavorite",
        field: isFavorite + "",
      }).then(() => getTasks(payload).then(({ data }) => data));
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface TasksState {
  tasks: Array<ListItemType>;
  loading: string;
  error: string | null;
  hasMore: boolean;
  paginationLimit: number;
}

const initialState: TasksState = {
  tasks: [],
  loading: "idle",
  error: null,
  hasMore: true,
  paginationLimit: Number(process.env.REACT_APP_PAGINATION_LIMIT),
};

export const tasksReducer = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        getTasksThunk.pending,
        (
          state,
          {
            meta: {
              arg: { start },
            },
          }
        ) => {
          if (state.loading === "idle") {
            state.loading = "pending";
          }

          if (start === 0) {
            state.hasMore = true;
            state.tasks = [];
          }
        }
      )
      .addCase(getTasksThunk.fulfilled, (state, { payload }) => {
        state.error = null;
        state.tasks = state.tasks.concat(payload);

        if (payload.length < state.paginationLimit) {
          state.hasMore = false;
        }

        if (state.loading === "pending") {
          state.loading = "idle";
        }
      })
      .addCase(getTasksThunk.rejected, (state, action: any) => {
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
      });

    builder
      .addCase(addTaskThunk.fulfilled, (state, { payload }) => {
        state.hasMore = true;
        state.error = null;
        state.tasks = payload;
      })
      .addCase(addTaskThunk.rejected, (state, action: any) => {
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
      .addCase(deleteTaskThunk.rejected, (state, action: any) => {
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
      });

    builder
      .addCase(changeTitleThunk.fulfilled, (state, { payload }) => {
        state.hasMore = true;
        state.error = null;
        state.tasks = payload;
      })
      .addCase(changeTitleThunk.rejected, (state, action: any) => {
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
      .addCase(changeCompletedThunk.rejected, (state, action: any) => {
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
      });

    builder
      .addCase(changeFavoriteThunk.fulfilled, (state, { payload }) => {
        state.hasMore = true;
        state.error = null;
        state.tasks = payload;
      })
      .addCase(changeFavoriteThunk.rejected, (state, action: any) => {
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export default tasksReducer.reducer;
