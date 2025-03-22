// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { alertList } from '../constants/alertConstants';

const initialState = {
    loaders: [],
    alerts: []
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
        },
        addAlerts: (state, action) => {
            // Add action.payload to the loaders array
            state.alerts.push(alertList[action.payload]);
        },
        removeAlerts: (state, action) => {
            // Remove action.payload from the loaders array
            state.alerts = state.alerts.filter(alert => alert.messageId !== action.payload);
        }
    },
});

export const { addLoader, removeLoader, addAlerts, removeAlerts } = systemSlice.actions;
export default systemSlice.reducer;
