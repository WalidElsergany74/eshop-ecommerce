import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { db } from '../../firebase/Config';
import { toast } from 'react-toastify';
import { Spinner } from 'flowbite-react';

export default function OrderDetails() {
 const {id} = useParams()
 const [order,setOrder] = useState(null)





 useEffect(() => {
   getOrders()
 }, [])
 
 async function getOrders() {
    try{
      const docRef = doc(db, "orders", id);
const docSnap = await getDoc(docRef);
 
if (docSnap.exists()) {
  const obj = {
    id : id,
    ...docSnap.data()
  }
      setOrder(obj)
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}
    }catch(error) {
      toast.message(error.message)
    }
  } 
  return (
    <div className='w-full py-8' >
       <div className='container flex flex-col p-5'>
        <h2 className='text-darkblue text-3xl font-bold mb-3'>Order Details</h2>
        <div>
            <Link className='text-md text-gray-400' to={"/orderhistory"}>&larr; Back To Orders</Link>
        </div>
        <br/>
        {order === null ? <Spinner className='w-full '/> : 
         <>
         <p className='text-gray-500'>
            <b className='text-darkblue'>Order ID :</b> {order.id}
         </p>
         <p className='text-gray-500'>
            <b className='text-darkblue'>Order Amount :</b> ${order.cartTotalPrice}
         </p>
         <p className='text-gray-500'>
            <b className='text-darkblue'>Order Status :</b> {order.orderStatus}
         </p>
         <br/>

         <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white uppercase bg-cyan-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-2 py-1">
                   s/n
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3 w-[50px]">
                Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                Total
                </th>
                <th scope="col" className="px-6 py-3 ">
                Action
                </th>
            </tr>
        </thead>
        {order.cartItems.map((product , index) =>{
          const{ id,name ,imageUrl , price , cartTotalQuantity , cartTotalAmount} = product;
          return (
            <tbody>
            <tr key={id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              
                <th scope="row" className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {index + 1}
                </th>
                <td className="px-8 py-6">
                {name}
                   <img className=' max-w-[100px] h-[100px]'  src={imageUrl} />
                </td>
                <td className="px-6 py-4">
                     {price}$
                </td>
                <td className="px-6 py-4 w-[50px] text-center">
                     {cartTotalQuantity}
                </td>
                <td className="px-6 py-4">
                  {cartTotalAmount}$
                </td>
                <td className="px-6 py-4 ">
                  <Link to={`/reviewproduct/${id}`} className='bg-blue-700 text-white py-3 px-4 rounded-lg'>Review Product</Link>
                </td>
                
            </tr>
            
            
        </tbody>
          )
        } )}
    </table>
</div>

         </>
        }
       </div>
    </div>
  )
}
