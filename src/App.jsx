import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/home/Home'
import Cart from './pages/cart/Cart'
import Contact from './pages/contact/Contact'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Admin from './pages/admin/Admin'
import OrderHistory from './pages/orderHistory/OrderHistory'

import AppLayout from './components/AppLayout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Reset from './pages/auth/Reset'

import UpdateProfile from './pages/auth/UpdateProfile';
import EditProfile from './pages/auth/EditProfile';

import AdminOnlyRoute from './components/AdminOnlyRoute';
import NotFound from './pages/NotFound';
import ProductDetails from "./components/product/ProductDetails"
import CheckoutDetails from './pages/checkout/CheckoutDetails';
import Checkout from './pages/checkout/Checkout';
import CheckoutSuccess from './components/CheckoutSuccess';
import OrderDetails from './pages/orderHistory/OrderDetails';
import ReviewProduct from './components/ReviewProduct';




export default function App() {
  return (
   <>
  
    
   <BrowserRouter>
  
   <ToastContainer  />
  
  <Routes>
  
    
    <Route element={<AppLayout/>}>
    
    <Route index element={<Navigate replace to={"/home"}/>}></Route>
    <Route  path='/home'  element={<Home/>}></Route>
    <Route path='/cart' element={<Cart/>}></Route>
    <Route path='/contact' element={<Contact/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/register' element={<Register/>}></Route>
    <Route path='/reset' element={<Reset/>}></Route>
    <Route path='/orderhistory' element={<OrderHistory/>}></Route>
    <Route path="/orderdetails/:id" element={<OrderDetails />} />
    <Route path="/reviewproduct/:id" element={<ReviewProduct />} />
    <Route path='/updateprofile' element={<UpdateProfile/>}></Route>
    <Route path='/editprofile' element={<EditProfile/>}></Route>
    <Route path='/productdetails/:id' element={<ProductDetails/>}></Route>
    <Route path='/checkoutdetails' element={<CheckoutDetails/>}></Route>
    <Route path='/checkout' element={<Checkout/>}></Route>
    <Route path='/checkout-success' element={<CheckoutSuccess/>}></Route>
    <Route path='/*' element={<NotFound/>}></Route>
    <Route path="/admin/*" element={
          <AdminOnlyRoute>
            <Admin/>
          </AdminOnlyRoute>
        } />


     </Route>




   </Routes>
   
   </BrowserRouter>
   
  
   
   </>
  )
}
