// store.js
import { createStore, combineReducers } from 'redux';
import ordersReducer from './reducers/index';

const rootReducer = combineReducers({
  orders: ordersReducer,
  // Add other reducers as needed
});

const store = createStore(rootReducer);

export default store;
