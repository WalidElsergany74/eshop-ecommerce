import React, { useEffect } from 'react'
import Slideitem from '../../components/Slideitem'
import Product from '../../components/product/Product'

export default function Home() {
  const url = window.location.href;
  useEffect(function(){
    scrollToProucts()
  } , [])

const scrollToProucts =  () => {


    if(url.includes("/home/#products")){
     window.scrollTo({
      top : 674.444,
      behavior : 'smooth'
     })
    
}
   
  }
  return (
    <div className=''>
    <Slideitem scroll={scrollToProucts}/>
    <Product/>
    </div>
  )
}
