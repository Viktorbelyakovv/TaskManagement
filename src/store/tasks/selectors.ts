import type { RootState } from "../../store";

export const getTasks = (state: RootState) => state.tasks.tasks;

export const getTasksLoading = (state: RootState) => state.tasks.loading;

export const getTasksError = (state: RootState) => state.tasks.error;

export const getTasksHasMore = (state: RootState) => state.tasks.hasMore;

export const getPaginationLimit = (state: RootState) =>
  state.tasks.paginationLimit;
