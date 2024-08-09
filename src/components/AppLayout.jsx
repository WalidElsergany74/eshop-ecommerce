import React from 'react'
import Header from './header/Header'
import { Outlet } from 'react-router-dom'
import Footer2 from './footer/Footer'


export default function AppLayout() {
   
  return (
    <>
   
   <div className=' flex flex-col min-h-screen'>
   <Header/>
   
        <main className="flex-grow">
          <Outlet />
        </main>
        
      
     
      <Footer2/>
   </div>
  
</>
  )
}
