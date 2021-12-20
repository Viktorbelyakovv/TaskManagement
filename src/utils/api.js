import axios from "axios";

const api = process.env.REACT_APP_API_LINK;

export const UploadList = () => {
  return axios.get(`${api}/tasks`)
    .then(list => list.data)
    .catch(error => alert(error));
};

export const AddTask = title => {
  return axios.post(`${api}/tasks`, {
      completed: false,
      title,
    })
    .then(response => response)
    .catch(error => alert(error));
};

export const DeleteTask = id => {
  return axios.delete(`${api}/tasks/${id}`)
    .then(response => response)
    .catch(error => alert(error));
};

export const ChangeTitle = (id, title) => {
  return axios.patch(`${api}/tasks/${id}`, title)
    .then(response => response)
    .catch(error => alert(error));
};

export const ChangeCompleted = (id, completed) => {
  return axios.patch(`${api}/tasks/${id}`, completed)
    .then(response => response)
    .catch(error => alert(error));
};
