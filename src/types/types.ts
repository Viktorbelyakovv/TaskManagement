export type ListItemType = {
  id: number;
  title: string;
  categoryId: number;
  isCompleted: boolean;
  isFavorite: boolean;
  date: string;
  category: CategoryItemType;
};

export type CategoryItemType = {
  id: number;
  title: string;
  colorId: number;
  iconId: number;
  isDefault: boolean;
};

export type QueryParamsType = {
  sortDate: boolean;
  sortName: boolean;
  categoryId: number;
};

export type SortParamsActionType = {
  type: string;
  payload: boolean;
};

export type FilterParamsActionType = {
  type: string;
  payload: number;
};

export type GetTasksParamsType = {
  isCompletedTasks: boolean;
  queryParams: QueryParamsType;
  start: number;
};

export type AddTaskParamsType = {
  title: string;
  categoryId: number;
  date: string;
};
