import React from 'react'
import Sidebar from '../../components/Sidebar'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <div className='grid grid-cols-12 min-h-screen  '>
    <div className='lg:col-span-2 md:col-span-2 col-span-2   '>
      <Sidebar />
    </div>
    <main className='lg:col-span-10 md:col-span-10  col-span-10 bg-[#f1f5f9] '>
      <Outlet />
    </main>
  </div>
  )
}
