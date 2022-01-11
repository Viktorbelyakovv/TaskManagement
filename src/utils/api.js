import axios from "axios";

const baseURL = process.env.REACT_APP_API_LINK;

const api = axios.create({ baseURL });

export const getListServer = async () => {
  try {
    const response = await api.get(`/tasks`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addTaskServer = async (title) => {
  try {
    const response = await api.post(`/tasks`, {
      title,
      isCompleted: false,
      isFavorite: false,
    });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteTaskServer = async (id) => {
  try {
    await api.delete(`/tasks/${id}`);
    return id;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const changeTitleServer = async ({ id, title }) => {
  try {
    const response = await api.patch(`/tasks/${id}`, { title });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const changeCompletedServer = async ({ id, isCompleted }) => {
  try {
    console.log(id);
    console.log(isCompleted);
    const response = await api.patch(`/tasks/${id}`, { isCompleted });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const changeFavoriteServer = async ({ id, isFavorite }) => {
  try {
    const response = await api.patch(`/tasks/${id}`, { isFavorite });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
