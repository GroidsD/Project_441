// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './contactSlice';

export default store = configureStore({
  reducer: {
    contacts: contactReducer,
  },
});