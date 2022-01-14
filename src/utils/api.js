import axios from "axios";

const baseURL = process.env.REACT_APP_API_LINK;

const api = axios.create({ baseURL });

export const getTasks = async (isCompletedTasks) => {
  try {
    return await api.get(`/tasks`, {
      params: {
        isCompleted: isCompletedTasks,
        _expand: "category",
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addTask = async ({ title, categoryId }) => {
  try {
    return await api
      .post(`/tasks`, {
        title,
        categoryId,
        isCompleted: false,
        isFavorite: false,
      })
      .then((response) => {
        return api.get(`/tasks/${response.data.id}`, {
          params: {
            _expand: "category",
          },
        });
      });
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
    return await api.patch(`/tasks/${id}`, { [fieldName]: field });
  } catch (error) {
    throw new Error(error.message);
  }
};
