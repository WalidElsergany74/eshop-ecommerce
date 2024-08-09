import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 filterProducts : [],
 
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_PRODUCTS(state , action) {
        const {search , products} = action.payload
        console.log(search)
        const tempProducts = products.filter((product) => product.name.toLowerCase().includes
        (search.toLowerCase()) || product.category.toLowerCase().includes(search.toLowerCase()) )
        state.filterProducts = tempProducts
    },
    SORT_PRODUCTS(state , action) {
       
        let tempProducts =[...state.filterProducts];
        const {sort  } = action.payload

        if(sort === "latest") {
            tempProducts =  tempProducts;
        }

        if(sort === "lowest-price") {
            tempProducts =  tempProducts.slice().sort((a, b ) => {
                return a.price - b.price
            })
        }

        if(sort === "highest-price") {
            tempProducts = tempProducts.slice().sort((a , b) => {
                return b.price - a.price
            })
        }

        if(sort === "a-z") {
            tempProducts =  tempProducts.slice().sort((a , b) => {
                return a.name.localeCompare(b.name)
            })
        }

        if(sort === "z-a") {
            tempProducts =  tempProducts.slice().sort((a , b) => {
                return b.name.localeCompare(a.name)
            })
        }

        state.filterProducts = tempProducts

    },
    FILTER_CATEGORIES(state, action) {
        let tempProducts = []
        const { products, category , sort } = action.payload
        if (category === "All") {
          tempProducts = products
        } else {
          tempProducts = products.filter((product) => product.category === category)
        }
        state.filterProducts = tempProducts
    },
    
    
    FILTER_BRAND(state , action) {
        let tempProducts = [];
        const {products , brand} = action.payload;
         if(brand === "All") {
            tempProducts = products;

         }else {
            tempProducts = products.filter((product) => product.brand === brand)
         }
         state.filterProducts = tempProducts
    },
    FILTER_PRICE(state , action) {
        let tempProducts = []
        const {products , price} = action.payload
        tempProducts = products.filter((product) => product.price <= price)
        state.filterProducts = tempProducts
    },
  }
});

export const {FILTER_PRODUCTS , SORT_PRODUCTS , FILTER_CATEGORIES , FILTER_BRAND, FILTER_PRICE} = filterSlice.actions
export const selectFilterProducts = (state) => state.filter.filterProducts

export default filterSlice.reducer