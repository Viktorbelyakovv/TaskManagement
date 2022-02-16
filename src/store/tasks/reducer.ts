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
type MyError = {
  errorMessage: string;
};

type AddTaskParams = {
  addPayload: AddTaskParamsType;
  sortFilterPayload: GetTasksParamsType;
};

type ChangeTitleParams = {
  id: number;
  title: string;
  paramsGetTasks: GetTasksParamsType;
};

type ChangeCompletedParams = {
  id: number;
  isCompleted: boolean;
};
type ChangeFavoriteParams = {
  id: number;
  isFavorite: boolean;
  paramsGetTasks: GetTasksParamsType;
};

export const getTasksThunk = createAsyncThunk<
  ListItemType[],
  GetTasksParamsType,
  {
    rejectValue: MyError;
  }
>("categories/getTasks", async (payload, { rejectWithValue }) => {
  try {
    return await getTasks(payload).then(({ data }) => data);
  } catch (error) {
    return rejectWithValue(error as MyError);
  }
});

export const addTaskThunk = createAsyncThunk<
  ListItemType[],
  AddTaskParams,
  {
    rejectValue: MyError;
  }
>(
  "categories/addTask",
  async ({ addPayload, sortFilterPayload }, { rejectWithValue }) => {
    try {
      return await addTask(addPayload).then(() =>
        getTasks(sortFilterPayload).then(({ data }) => data)
      );
    } catch (error) {
      return rejectWithValue(error as MyError);
    }
  }
);

export const deleteTaskThunk = createAsyncThunk<
  number,
  number,
  {
    rejectValue: MyError;
  }
>("categories/deleteTask", async (id, { rejectWithValue }) => {
  try {
    return await deleteTask(id).then(() => id);
  } catch (error) {
    return rejectWithValue(error as MyError);
  }
});

export const changeTitleThunk = createAsyncThunk<
  ListItemType[],
  ChangeTitleParams,
  {
    rejectValue: MyError;
  }
>(
  "categories/changeTitle",
  async ({ id, title, paramsGetTasks }, { rejectWithValue }) => {
    try {
      return await changeTaskField({
        id,
        fieldName: "title",
        field: title,
      }).then(() => getTasks(paramsGetTasks).then(({ data }) => data));
    } catch (error) {
      return rejectWithValue(error as MyError);
    }
  }
);

export const changeCompletedThunk = createAsyncThunk<
  ListItemType,
  ChangeCompletedParams,
  {
    rejectValue: MyError;
  }
>(
  "categories/changeCompleted",
  async ({ id, isCompleted }, { rejectWithValue }) => {
    try {
      return await changeTaskField({
        id,
        fieldName: "isCompleted",
        field: String(isCompleted),
      }).then(({ data }) => data);
    } catch (error) {
      return rejectWithValue(error as MyError);
    }
  }
);

export const changeFavoriteThunk = createAsyncThunk<
  ListItemType[],
  ChangeFavoriteParams,
  {
    rejectValue: MyError;
  }
>(
  "categories/changeFavorite",
  async ({ id, isFavorite, paramsGetTasks }, { rejectWithValue }) => {
    try {
      return await changeTaskField({
        id,
        fieldName: "isFavorite",
        field: String(isFavorite),
      }).then(() => getTasks(paramsGetTasks).then(({ data }) => data));
    } catch (error) {
      return rejectWithValue(error as MyError);
    }
  }
);

type TasksState = {
  tasks: Array<ListItemType>;
  loading: string;
  error: string | null;
  hasMore: boolean;
  paginationLimit: number;
};

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
      .addCase(getTasksThunk.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message as string;
        }
      });

    builder
      .addCase(addTaskThunk.fulfilled, (state, { payload }) => {
        state.hasMore = true;
        state.error = null;
        state.tasks = payload;
      })
      .addCase(addTaskThunk.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message as string;
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
          state.error = action.error.message as string;
        }
      });

    builder
      .addCase(changeTitleThunk.fulfilled, (state, { payload }) => {
        state.hasMore = true;
        state.error = null;
        state.tasks = payload;
      })
      .addCase(changeTitleThunk.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message as string;
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
          state.error = action.error.message as string;
        }
      });

    builder
      .addCase(changeFavoriteThunk.fulfilled, (state, { payload }) => {
        state.hasMore = true;
        state.error = null;
        state.tasks = payload;
      })
      .addCase(changeFavoriteThunk.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message as string;
        }
      });
  },
});

export default tasksReducer.reducer;
