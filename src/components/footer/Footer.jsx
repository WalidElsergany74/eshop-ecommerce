import React from 'react'
import { Footer, FooterCopyright, FooterLink, FooterLinkGroup } from "flowbite-react";
export default function Footer2() {
  const date = new Date();
  const year = date.getFullYear()
  return (
    <div className='bg-darkblue text-white '>
      <div className='container mx-auto text-center flex items-center justify-center h-[70px] '>
     <FooterCopyright className='text-white'></FooterCopyright>
      {year}  All Rights Reserved
      </div>
        
    </div>
  )
}
