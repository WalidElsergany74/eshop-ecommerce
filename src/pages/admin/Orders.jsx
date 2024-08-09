import React, { useEffect } from 'react'
import useFetchCollection from '../../customHooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectOrderHistory, STORE_ORDERS } from '../../redux/order/orderSlice'
import { selectPreviousUserId } from '../../redux/cart/cartSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { auth } from '../../firebase/Config'
import Spinner from '../../components/Spinner'

export default function Orders() {
  const {id} =useParams()
  const {data , isLoading} = useFetchCollection("orders")
   const orders = useSelector(selectOrderHistory)
   const userId = useSelector(selectPreviousUserId)
   const dispatch = useDispatch()
   const navigate = useNavigate()
  
   useEffect(() => {
     dispatch(STORE_ORDERS(data))
   }, [dispatch , data])

  





   function handleClick(id) {
    navigate(`/admin/orderdetails/${id}`)
   }

   
  return (
    <div className='w-full py-8'>
    <div className='container p-4 flex flex-col'>
      <h2 className='text-darkblue text-3xl font-bold'>All Orders</h2>
      <p className='text-gray-400 mt-4'>Open an order to  <b className='text-darkblue'>Change Order Status</b></p>
      <br/>
      {isLoading && <Spinner/>}
      <div>
        {orders.length === 0 ? <h3 className='text-darkblue text-xl font-bold'>No Orders Found.</h3> : 
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-cyan-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-2 py-1">
                       s/n
                    </th>
                    <th scope="col" className="px-6 py-3">
                       Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                       Order ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                    Order Amount
                    </th>
                    <th scope="col" className="px-6 py-3">
                    Order Status
                    </th>
                   
                </tr>
            </thead>
            {orders.map((order , index) =>{
              const{ cartTotalPrice , orderDate, id, orderStatus , orderTime} = order;
              return (
                <tbody>
                <tr onClick={() => handleClick(id)} key={id} className= "cursor-pointer bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  
                    <td scope="row" className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap ">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">
                       {orderDate} at {orderTime}
                    </td>
                    <td className="px-6 py-4">
                       {id}
                    </td>
                    <td className="px-6 py-4 font-medium text-darkblue">
                        {"$"} {cartTotalPrice}
                    </td>
                    <td className="px-6 py-4">
                      <p className={ `text-md font-medium ${orderStatus !== "Delivered" ? "text-red-600" : "text-green-400"}`}>
                        {orderStatus}
                      </p>
                    </td>
                    
                </tr>
                
                
            </tbody>
              )
            } )}
        </table>
    </div>
        }
      </div>
    </div>
  </div>
  )
}
