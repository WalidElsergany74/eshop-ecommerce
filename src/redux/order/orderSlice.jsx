import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 orderHistory : [],
 totalOrderAmount: 0,
}

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    STORE_ORDERS(state,action) {
        state.orderHistory = action.payload
        
        
    },
    CALC_TOTAL_ORDER_AMOUNT(state) {
      const totalAmount = state.orderHistory.reduce((acc, item) => acc + item.cartTotalPrice, 0);
      state.totalOrderAmount = totalAmount;
      console.log(totalAmount);
    },
  },
  
});

export const {STORE_ORDERS , CALC_TOTAL_ORDER_AMOUNT} = orderSlice.actions
export const selectOrderHistory = (state) => state.orders.orderHistory
export const selectTotalOrderAmount = (state) => state.orders.totalOrderAmount

export default orderSlice.reducer