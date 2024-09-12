// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './components/Todo/todoSlice'

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});
