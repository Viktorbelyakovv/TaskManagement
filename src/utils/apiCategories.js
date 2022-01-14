import axios from "axios";

const baseURL = process.env.REACT_APP_API_LINK;

const api = axios.create({ baseURL });

export const getCategories = async () => {
  try {
    return await api.get(`/categories`);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const changeDefaultCategory = async ({ oldId, newId }) => {
  try {
    const removeDefault = api.patch(`/categories/${oldId}`, {
      isDefault: false,
    });
    const addDefault = api.patch(`/categories/${newId}`, { isDefault: true });
    return await Promise.all([removeDefault, addDefault]);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addCategory = async ({ title, colorId, iconId }) => {
  try {
    return await api.post(`/categories`, {
      title,
      colorId,
      iconId,
      isDefault: false,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteCategory = async (id) => {
  try {
    await api.delete(`/categories/${id}`);

    return id;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const changeCategoryTitle = async ({ id, title }) => {
  try {
    return await api.patch(`/categories/${id}`, { title });
  } catch (error) {
    throw new Error(error.message);
  }
};
