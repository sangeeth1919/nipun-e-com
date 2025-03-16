// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import sustemReducer from './systemSlice';
import categoryReducer from './categorySlice';
import cartReducer from './cartSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    system: sustemReducer,
    category: categoryReducer,
    cart: cartReducer
  },
});

export default store;
