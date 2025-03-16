

import store from '../redux/store';
import { addLoader, removeLoader } from '../redux/systemSlice';

export const removeLoaderService = (loaderId) => {
  store.dispatch(removeLoader(loaderId));  // Dispatching the action with payload (loaderId)
};


export const addLoaderService = (loaderId) => {
    store.dispatch(addLoader(loaderId));  // Dispatching the action with payload (loaderId)
};


export const getRoundValue = (values) => {
  return Math.round(values * 100) / 100
};