import { SET_ALL_ORDERS, CANCEL_ORDER } from './actionTypes';
export const setAllOrders = (orders) => {
  console.log(orders);
  return {
    type: SET_ALL_ORDERS,
    payload: orders,
  }
};

export const cancel_Order = (orderId) => ({
  type: CANCEL_ORDER,
  payload: orderId,
});