import axios from "axios";

const baseURL = process.env.REACT_APP_API_LINK;
const paginationLimit = Number(process.env.REACT_APP_PAGINATION_LIMIT);

const api = axios.create({ baseURL });

export const getTasks = ({
  isCompletedTasks,
  sortDate,
  sortName,
  filterCategory,
  start,
}) =>
  api.get(`/tasks`, {
    params: {
      isCompleted: isCompletedTasks,
      categoryId_like: `${filterCategory ? filterCategory : ""}`,
      _expand: "category",
      _sort: `isFavorite${sortDate ? ",date" : ""}${sortName ? ",title" : ""}`,
      _order: `desc${sortDate ? ",desc" : ""}${sortName ? ",asc" : ""}`,
      _start: start,
      _end: start + paginationLimit,
    },
  });

export const addTask = ({ title, categoryId, date }) =>
  api
    .post(`/tasks`, {
      title,
      categoryId,
      isCompleted: false,
      isFavorite: false,
      date,
    })
    .then((response) =>
      api.get(`/tasks/${response.data.id}`, {
        params: {
          _expand: "category",
        },
      })
    );

export const deleteTask = (id) => api.delete(`/tasks/${id}`);

export const changeTaskField = ({ id, fieldName, field }) =>
  api.patch(`/tasks/${id}`, { [fieldName]: field });
