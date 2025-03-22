// src/redux/categorySlice.js
import { createSlice } from '@reduxjs/toolkit';
import { cart } from '../constants/cartConstants';

const initialState = {
    cart: [],
    status: cart.notStart
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            state.cart = [
                ...state.cart,
                {
                    ...action.payload,
                    qnt: 0,
                }

            ]
            state.status = cart.inProgress
        },
        changeQty: (state, action) => {
            const { pName, qnt } = action.payload;

            const productIndex = state.cart.findIndex(item => item.pName === pName);

            if (productIndex !== -1) {
                // Update the quantity of the found product
                state.cart[productIndex].qnt = qnt;
            }
        },
        removeItemFromCart: (state, action) => {
            const { pName } = action.payload;
            state.cart = state.cart.filter((cart) => cart.pName !== pName);
        },
        clearCartReducer: (state, action) => {
            state.cart = [];
        }
    }
});

export const { addItemToCart, changeQty, removeItemFromCart, clearCartReducer } = cartSlice.actions;
export default cartSlice.reducer;
