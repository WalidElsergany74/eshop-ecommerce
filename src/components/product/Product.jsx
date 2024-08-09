import React, { useEffect, useState } from 'react'
import ProductFilter from './ProductFilter'
import ProductList from './ProductList'
import { useDispatch, useSelector } from 'react-redux'
import { GET_PRICE, selectProduct,  STORE_PRODUCTS } from '../../redux/products/productSlice'
import useFetchCollection from '../../customHooks/useFetchCollection'
// import { Spinner } from 'flowbite-react'
import Spinner from "../Spinner"
import { FaAccessibleIcon } from 'react-icons/fa'
export default function Product() {
    const {isLoading , data } = useFetchCollection("products")
    const products = useSelector(selectProduct)
    
    const [showFilter, setShowFilter] = useState(false)

    
    const dispatch = useDispatch()
   
  
    useEffect(()=> {
      dispatch(STORE_PRODUCTS({
                products : data,
                
               
              }))
    } , [dispatch , data])


    useEffect(()=> {
      dispatch(GET_PRICE({
                products : data,
                
               
              }))
    } , [dispatch , data])


   function toggleShow() {
    setShowFilter(!showFilter)
   }


  return (
    <section className='py-24 w-full '>
        <div className='container mx-auto my-0  max-w-7xl  '>
           <div className='grid grid-cols-12 relative '>

           
                    <aside 
                        className={`   ${showFilter ? " col-span-12 md:col-span-3  h-full transition-all duration-300 p-4 ease-in-out bg-[#fff] rounded-lg left-[0] w-1/2  absolute z-[999] lg:p-0 lg:relative lg:w-full    " : "col-span-12 md:col-span-3 w-full hidden lg:block  "}`}
                    >
                        <ProductFilter />
                    </aside>

                    
                    {isLoading && <Spinner />}

                   
                    <div className={`col-span-12 md:col-span-9 ${showFilter ? 'md:col-span-9' : 'md:col-span-12'}`}>
                        <ProductList showFilter={showFilter} toggleShow={toggleShow} products={products} />
                    </div>
          
           </div>
            
        </div>
    </section>
  )
}
