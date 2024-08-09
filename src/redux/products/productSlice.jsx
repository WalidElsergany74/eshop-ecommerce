import { createSlice } from '@reduxjs/toolkit'


const initialState = {
products : [],
maxPrice : null,
minPrice : null,
}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    STORE_PRODUCTS(state,action){
        state.products = action.payload.products
       
    },
    GET_PRICE(state , action) {
      const array = [];
      const  {products} =action.payload;

     products.map((product) => {
      const price = product.price
     return array.push(price)
    })

    const min = Math.min(...array)
    const max =Math.max(...array)
       state.maxPrice  = max;
       state.minPrice = min
        

    }
  }
});

export const {STORE_PRODUCTS , GET_PRICE} = productSlice.actions
export const selectProduct = (state) => state.product.products
export const selectMinPrice= (state) => state.product.minPrice
export const selectMaxPrice = (state) => state.product.maxPrice


export default productSlice.reducer