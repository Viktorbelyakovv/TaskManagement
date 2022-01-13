import axios from "axios";

const baseURL = process.env.REACT_APP_API_LINK;

const api = axios.create({ baseURL });

export const getTasks = async (isCompletedTasks) => {
  try {
    const response = await api.get(`/tasks`, {
      params: {
        isCompleted: isCompletedTasks,
      },
    });

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addTask = async (title) => {
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

export const deleteTask = async (id) => {
  try {
    await api.delete(`/tasks/${id}`);

    return id;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const changeTaskField = async ({ id, fieldName, field }) => {
  try {
    const response = await api.patch(`/tasks/${id}`, { [fieldName]: field });

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
