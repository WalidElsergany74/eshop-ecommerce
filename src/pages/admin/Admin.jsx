import React from 'react'
import AddProducts from './AddProducts'
import { Link, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import ViewProducts from './ViewProducts'
import Orders from './Orders'
import NotFound from '../NotFound'
import AdminHome from "./AdminHome"
import AdminLayout from './AdminLayout'
import OrderDetails from './OrderDetails'

export default function Admin() {
  return (
   <>
   <Routes>
   <Route  element={<AdminLayout />} >
   <Route index element={<Navigate replace to={"/admin/adminhome"}/>}></Route>
              <Route path="addproducts/:id" element={<AddProducts />} />
              <Route path="adminhome" element={<AdminHome />} />
              <Route path="viewproducts" element={<ViewProducts/>} />
              <Route path="orders" element={<Orders />} />
              <Route path="orderdetails/:id" element={<OrderDetails />} />
              <Route path="*" element={<NotFound />} />
              </Route>
   </Routes>
   </>
  )
}
