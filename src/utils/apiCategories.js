import axios from "axios";

const baseURL = process.env.REACT_APP_API_LINK;

const api = axios.create({ baseURL });

export const getCategories = () => api.get(`/categories`);

export const changeDefaultCategory = ({ oldId, newId }) => {
  const removeDefault = api.patch(`/categories/${oldId}`, {
    isDefault: false,
  });
  const addDefault = api.patch(`/categories/${newId}`, { isDefault: true });
  return Promise.all([removeDefault, addDefault]).then((values) => values[1]);
};

export const addCategory = ({ title, colorId, iconId }) =>
  api.post(`/categories`, {
    title,
    colorId,
    iconId,
    isDefault: false,
  });

export const deleteCategory = (id) => api.delete(`/categories/${id}`);

export const changeCategoryTitle = ({ id, title }) =>
  api.patch(`/categories/${id}`, { title });
