// ordersReducer.js
import {SET_ALL_ORDERS, CANCEL_ORDER}  from '../actions/actionTypes';
import Swal from 'sweetalert2';

const initialState = {
  orders: [],
};

const ordersReducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case SET_ALL_ORDERS:
      return {
        ...state,
        orders: action.payload,
        
      };

    case CANCEL_ORDER:
        const canceledOrderId = action.payload;
        return {
          ...state,
          orders: state.orders.filter(order => order.id !== canceledOrderId),
        };

    default:
      return state;
  }
};

export default ordersReducer;
