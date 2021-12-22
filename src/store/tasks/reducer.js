import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'list',
  
  initialState: {
    tasks: [],
  },

  reducers: {
    uploadListAction: (state, response) => {  
      state.tasks = response.payload
    },
    
    addTaskAction: (state, response) => {  
      state.tasks.push(response.payload)
    },

    deleteTaskAction: (state, id) => {
      const localID = state.tasks.findIndex(item => item.id === id.payload)
      
      if (state.tasks[localID]) {
        state.tasks.splice(localID, 1)
      }
      
    },

    changeTitleAction: (state, data) => { 
      const localID = state.tasks.findIndex(item => item.id === data.payload.id)

      if (state.tasks[localID]) {
        state.tasks[localID].title = data.payload.title
      }
          
    },

    changeCompletedAction: (state, id) => { 
      const localID = state.tasks.findIndex(item => item.id === id.payload)

      if (state.tasks[localID]) {
        state.tasks[localID].completed = !state.tasks[localID].completed
      }

    },

    changeFavoriteAction: (state, id) => { 
      const localID = state.tasks.findIndex(item => item.id === id.payload)

      if (state.tasks[localID]) {
        state.tasks[localID].favorite = !state.tasks[localID].favorite
      }

    },
  },
});

export const {
  uploadListAction, 
  addTaskAction, 
  deleteTaskAction, 
  changeTitleAction, 
  changeCompletedAction,
  changeFavoriteAction} = slice.actions;

export default slice.reducer;