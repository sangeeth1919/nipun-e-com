// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loaders:[]
};

const systemSlice = createSlice({
    name: 'system',
    initialState,
    reducers: {
        addLoader: (state, action) => {
            // Add action.payload to the loaders array
            state.loaders.push(action.payload);
        },
        removeLoader: (state, action) => {
            // Remove action.payload from the loaders array
            state.loaders = state.loaders.filter(loader => loader !== action.payload);
        }
    },
});

export const { addLoader, removeLoader } = systemSlice.actions;
export default systemSlice.reducer;
