import axios from 'axios';

const api = process.env.REACT_APP_API_LINK;

export const UploadList = () => {
  return axios.get(`${api}/tasks`)
  .then(list => {
   return list.data
  })
  .catch(function (error) {
    console.log(error);
  })    
}

export const AddTask = (title) => {
  axios.post(`${api}/tasks`, {
    completed: false,
    title
  })
  .then((response) => {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })      
}

export const DeleteTask = (id) => {
  axios.delete(`${api}/tasks/${id}`)
  .then((response) => {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })       
}

export const ChangeTitle = (id, title) => {
  axios.patch(`${api}/tasks/${id}`, {
    title
  })
  .then(response => {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })      
}

export const ChangeCompleted = (id, completed) => {
  axios.patch(`${api}/tasks/${id}`, {
    completed
  })
  .then(response => {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })    
}