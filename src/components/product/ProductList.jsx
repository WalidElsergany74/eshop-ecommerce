import { Card } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import {BsFillGridFill }from "react-icons/bs"
import { FaFilter, FaListAlt } from 'react-icons/fa'
import { GrFilter } from "react-icons/gr";
import ProductItme from "./ProductItem"
import { useDispatch, useSelector } from 'react-redux'
import { FILTER_PRODUCTS, selectFilterProducts, SORT_PRODUCTS } from '../../redux/products/filterSlice'
import { set } from 'react-hook-form'
import Pagination from '../Pagination';
// import { STORE_PRODUCTS } from '../../redux/products/productSlice'
// import { STORE_PRODUCTS } from '../../redux/products/productSlice'
export default function ProductList({products , toggleShow , showFilter}) {
    const [toGrid , setToGrid] = useState(true)
    const [search,setSearch] = useState("")
    const [sort,setSort] = useState("latest")
    const filteredProducts = useSelector(selectFilterProducts)
    
    const dispatch = useDispatch()

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  // Get Current Products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

      
        

    useEffect(() => {
        dispatch(FILTER_PRODUCTS({ products, search }));
       
      }, [dispatch, search, products]);
      
      useEffect(() => {
        dispatch(SORT_PRODUCTS({ sort  }))
        
      }, [dispatch, sort])

      
    



  return (
   <div className=' py-16 md:py-0 '>
     <div className=''>
      <div className='top pb-2 space-y-6 md:space-y-1 px-4 lg:px-0  flex-wrap sm:flex-col justify-center md:flex-row lg:flex-row  w-full flex md:justify-between items-center border-b-2 border-gray-300'>
      <div className='icons flex justify-center items-center space-x-2'>
        <BsFillGridFill onClick={() => setToGrid(true)} className='text-orange-500 cursor-pointer' size={22} />
    <FaListAlt className='text-cyan-700 cursor-pointer' onClick={()=> setToGrid(false)} size={22}/>
        <p className='text-gray-500 font-medium '> <b className='font-bold text-black'>{filteredProducts.length}</b> Products found. </p>
      </div>
      <div className='search my-2 mx-0 max-w-full md:w-[350px] lg:w-[250px] '>
       
       <div className="relative">
           <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
               <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                   <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
               </svg>
           </div>
           <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" id="default-search" className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search.."  />
           
       </div>
          </div>
       <div className='sort my-2 flex items-center justify-around  '>
 <label  className="w-[100px] space-x-3 felx-grow font-meduim text-[16px] ">Sort By :</label>
  <select value={sort} onChange={(e) => setSort(e.target.value)}  className="block py-2.5 ml-5 px-0 w-full text-md text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
      
  <option value="latest" >Latest</option>
      <option value="lowest-price">Lowest Price</option>
      <option value="highest-price">Highest Price</option>
      <option value="a-z">A-Z</option>
      <option value="z-a">Z-A</option>
  </select>
  
       </div>
       <div>
       <button 
                        onClick={toggleShow} 
                        className='   lg:hidden p-2  flex space-x-2 border-2 border-slate-900 rounded-md'
                    >
                        <GrFilter  size={20} />
                       <span> {showFilter ? "Hide Filter" : " Show Filter"}</span>
                    </button>
       </div>
      </div>
      <div className={`${toGrid ? "grid  grid-cols-1 td:grid-cols-2  md:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-10 " : "p-5 md:p-0 space-y-5"}`}>
        {products.length === 0 ? (
            <p>No Products Found.</p>
        ) : (
            <>
            {currentProducts.map((product) => {
                return (
                    <div className='mt-0 mx-auto ' key={product.id}>
                        <ProductItme {...product} product={product} toGrid={toGrid}/>
                    </div>
                )
            })}
            </>
        )}
      </div>
    </div>
    <Pagination 
    currentPage={currentPage}
    productsPerPage={productsPerPage}
    setCurrentPage={setCurrentPage}
    totalProducts={filteredProducts.length}
    /> 
   </div>
  )
}
