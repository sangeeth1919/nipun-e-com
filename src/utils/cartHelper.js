

import { addItemToCart, changeQty, clearCartReducer, removeItemFromCart } from '../redux/cartSlice';
import store from '../redux/store';

export const addItemToCartService = (product) => {

    store.dispatch(addItemToCart(product));
};

export const changeQtyService = ({ pName, qnt }) => {
    store.dispatch(changeQty({
        pName,
        qnt
    }));
};

export const removeItemFromCartService = (pName) => {
    store.dispatch(removeItemFromCart({
        pName
    }));
};


export const clearCartService = () => {
    store.dispatch(clearCartReducer());
};

