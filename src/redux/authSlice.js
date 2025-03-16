// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null, // user details will be stored here
    isAuthenticated: false, // state to check if the user is logged in
    fSUser: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
        setFireStoreUser: (state, action) => {
            state.fSUser = action.payload;
        },
    },
});

export const { login, logout, setFireStoreUser } = authSlice.actions;
export default authSlice.reducer;
