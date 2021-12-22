import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './tasks';

export default configureStore({
  reducer: {
    list: taskReducer,
  },
}); 