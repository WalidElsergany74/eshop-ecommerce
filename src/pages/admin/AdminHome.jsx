import React, { useEffect } from 'react'
import InfoBox from '../../components/InfoBox'
import { HiCurrencyDollar } from "react-icons/hi2";
import { TiShoppingCart } from "react-icons/ti";
import { FaCartPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { selectProduct, STORE_PRODUCTS } from '../../redux/products/productSlice';
import {  CALC_TOTAL_ORDER_AMOUNT, selectOrderHistory, selectTotalOrderAmount, STORE_ORDERS } from '../../redux/order/orderSlice';
import useFetchCollection from '../../customHooks/useFetchCollection';
import Chart from '../../components/Chart';
export default function Home() {
  const products = useSelector(selectProduct)
  const orderAmount = useSelector(selectTotalOrderAmount)
  const orders = useSelector(selectOrderHistory)
  const dispatch = useDispatch()
  const {data : fpProducts} = useFetchCollection("products")
  const {data } = useFetchCollection("orders")
  console.log(data)

  useEffect(() => {
   dispatch(STORE_PRODUCTS({products : fpProducts}))
   dispatch(STORE_ORDERS(data))
   dispatch(CALC_TOTAL_ORDER_AMOUNT())
  }, [dispatch , fpProducts , data])
 
  return (
    <div className='w-full py-8'>
    <div className='container p-8 '>
      <h1 className='text-darkblue font-bold mb-3 text-3xl'>Dashboard</h1>
    <div className='flex justify-between flex-wrap'>
    <InfoBox title={"Earining"} 
    count={`$ ${orderAmount}`}
    icon={<HiCurrencyDollar size={30} className='text-green-500' />}
    className={"max-w-sm w-full py-3 mt-4 border-b-4 border-b-green-400 "}
    />
    <InfoBox title={"Products"} 
    count={`${products.length}`}
    icon={<TiShoppingCart  size={30} className='text-indigo-700' />}
    className={"max-w-sm w-full py-3 mt-4 border-b-4 border-b-indigo-700 "}
    />
    <InfoBox title={"Orders"} 
    count={`${orders.length}`}
    icon={<FaCartPlus  size={30} className='text-orange-500' />}
    className={"max-w-sm w-full py-3 mt-4 border-b-4 border-b-orange-700 "}
    />
    <Chart/>
    </div>
    </div>
    </div>
  )
}
