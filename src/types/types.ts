export type ListItemType = {
  id: number;
  title: string;
  categoryId: number;
  isCompleted: boolean;
  isFavorite: boolean;
  date: string;
  category: { iconId: number; colorId: number };
};

export type QueryParamsType = {
  sortDate: boolean;
  sortName: boolean;
  categoryId: number;
};

export type QueryParamsActionType = {
  type: string;
  payload: boolean | number;
};
