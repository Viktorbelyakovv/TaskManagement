import type { RootState } from "../../store";
import { ListItemType } from "../../types/types";

export const getTasks = (state: RootState): ListItemType[] => state.tasks.tasks;

export const getTasksLoading = (state: RootState): string =>
  state.tasks.loading;

export const getTasksError = (state: RootState): string | null =>
  state.tasks.error;

export const getTasksHasMore = (state: RootState): boolean =>
  state.tasks.hasMore;

export const getPaginationLimit = (state: RootState): number =>
  state.tasks.paginationLimit;
