import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GET_PRICE, selectMaxPrice, selectMinPrice, selectProduct } from '../../redux/products/productSlice'
import { FILTER_BRAND, FILTER_CATEGORIES, FILTER_PRICE, FILTER_PRODUCTS, SORT_PRODUCTS } from '../../redux/products/filterSlice'
import { set } from 'react-hook-form'

export default function ProductFilter() {
  const maxPrice = useSelector(selectMaxPrice)
  const minPrice = useSelector(selectMinPrice)
  const [category , setCategory] = useState("All")
  const [price, setPrice] = useState(Number(maxPrice))
  const [brand , setBrand] = useState("All")
  const products = useSelector(selectProduct)
  const [availableBrands, setAvailableBrands] = useState(["All"]) 
  const [sort, setSort] = useState("latest") // إضافة حالة الترتيب
  const dispatch = useDispatch()
 
    

  
  useEffect(() => {
    if (category === "All") {
      setAvailableBrands(["All", ...new Set(products.map((product) => product.brand))])
    } else {
      setAvailableBrands(["All", ...new Set(products.filter((product) => product.category === category).map((product) => product.brand))])
    }
  }, [category, products])


  useEffect(() => {
    dispatch(SORT_PRODUCTS({ sort , products }))
  }, [dispatch, sort , products])



  useEffect(function(){
    dispatch(FILTER_BRAND({products  , brand}))
   
   } , [dispatch , brand ,products])

  useEffect(function(){
    dispatch(FILTER_PRICE({products  , price}))
   
   } , [dispatch , price ,products])


   
  useEffect(function(){
    dispatch(FILTER_CATEGORIES({ category , products  , sort  }))
   } , [dispatch , category , products , sort  ])
 


  const allCategories = [
   "All" ,   ...new Set(products.map((product) => product.category ))
  ]


  
  



  function filterProducts(cat) {
   setCategory(cat)
   setBrand("All")
   setAvailableBrands(["All"])
   dispatch(FILTER_CATEGORIES({products , category : cat}))
  
  }
  function clearFilter() {
    setCategory("All")
    setPrice(maxPrice)
    setSort("latest")
    setAvailableBrands(["All"])
  }
  

  
  return (
   <div className='filter md:p-10  '>
    <h2 className='text-darkblue text-2xl font-bold'>Categories</h2>
    <div className='all  '>
      {allCategories.map((cat,index)=> {
        return (
            <div className='border-b-2 border-b-gray-300 '>
               <button onClick={() => filterProducts(cat)} key={index} className={`${category === cat ? "py-2 px-2 bg-slate-100 rounded-md relative before:absolute before:content[''] before:left-0 before:bg-orange-500 before:bottom-0 before:w-[3px]  before:h-full w-full text-left font-medium active:border-l-4   text-darkblue ": "py-2.5 px-1   w-full text-left font-medium hover:bg-gray-200 rounded-md   text-darkblue"}`}>{cat}</button>     
            </div>
        )
      })}
      
    </div>

      <h2 className='text-darkblue  mt-3 text-lg font-bold'>Brand</h2>
      
      <div>
      <select
          onChange={(e) => setBrand(e.target.value)}
          className='mt-3 rounded-md w-full border-1 border-slate-300'
          name='brand'
        >
          {availableBrands.map((bran, index) => (
            <option key={index} value={bran}>{bran}</option>
          ))}
        </select>
        <h4 className='text-darkblue text-lg mt-4 font-bold'>Price</h4>
        <p className='text-slate-500 mt-3'>${price || maxPrice}</p>
        <div className='range'>
          <input value={Number(price || maxPrice)} onChange={(e) => setPrice(e.target.value)} className='mt-1' name='price' type='range' min={minPrice} max={maxPrice}/>
          <br/>
          <button onClick={() => clearFilter()} className='py-2 px-2 mt-3 bg-orange-500 rounded-lg text-md font-medium tracking-wider transition-colors hover:bg-orange-600 duration-200  text-white'>Clear Filter</button>
        </div>
      </div>
  
   </div>
  )
}
