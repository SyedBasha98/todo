// src/features/todos/todoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('todos')) || [
  { text: 'Learn React', isCompleted: false },
  { text: 'Build a Todo App', isCompleted: false },
  { text: 'Write Unit Tests', isCompleted: false },
];

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.push({ text: action.payload, isCompleted: false });
    },
    removeTodo: (state, action) => {
      return state.filter((_, index) => index !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state[action.payload];
      todo.isCompleted = !todo.isCompleted;
    },
  },
});

export const { addTodo, removeTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
