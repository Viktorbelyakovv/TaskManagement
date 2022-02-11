import axios, { AxiosResponse } from "axios";

const baseURL = process.env.REACT_APP_API_LINK;

const api = axios.create({ baseURL });

export const getCategories = (): Promise<AxiosResponse> =>
  api.get(`/categories`);

export const changeDefaultCategory = ({
  oldId,
  newId,
}: {
  oldId: number;
  newId: number;
}): Promise<AxiosResponse> => {
  const removeDefault = api.patch(`/categories/${oldId}`, {
    isDefault: false,
  });
  const addDefault = api.patch(`/categories/${newId}`, { isDefault: true });
  return Promise.all([removeDefault, addDefault]).then((values) => values[1]);
};

export const addCategory = ({
  title,
  colorId,
  iconId,
}: {
  title: string;
  colorId: number;
  iconId: number;
}): Promise<AxiosResponse> =>
  api.post(`/categories`, {
    title,
    colorId,
    iconId,
    isDefault: false,
  });

export const deleteCategory = (id: number): Promise<AxiosResponse> =>
  api.delete(`/categories/${id}`);

export const changeCategoryTitle = ({
  id,
  title,
}: {
  id: number;
  title: string;
}): Promise<AxiosResponse> => api.patch(`/categories/${id}`, { title });
