import {configureStore ,combineReducers} from "@reduxjs/toolkit"
import authReducer from "./auth/authSlice"
import sliderReducer from "./slider/SliderSlice"
import productReducer from "./products/productSlice"
import filterReducer from "./products/filterSlice"
import cartReducer from "./cart/cartSlice"
import ordersReducer from "./order/orderSlice"

const rootReducer = combineReducers({
    auth : authReducer,
    slider : sliderReducer,
    product : productReducer,
    filter : filterReducer,
    cart : cartReducer,
     orders : ordersReducer
});

const store = configureStore({
    reducer : rootReducer,
    middleware : (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck : false
        })
})
export default store;