import { doc, setDoc, Timestamp } from 'firebase/firestore'
import { Button, Card, Select } from 'flowbite-react'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { db } from '../../firebase/Config'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../../components/Spinner'

export default function UpdateStatus({order , id}) {
    
    const [status , setStatus] = useState("")
    const [isLoading,setIsLoading] = useState(false)
    const navigate = useNavigate()

    async function editOrder(e , id){
        
            e.preventDefault();
        
        setIsLoading(true)
        const orderConfig = {
          userId : order.userId,
         shipping : order.shipping,
         cartItems : order.cartItems,
         cartTotalPrice : order.cartTotalPrice,
         userName : order.userName,
         orderDate : order.orderDate,
         orderTime : order.orderTime,
         orderStatus : status,
         createdAt : order.createdAt,
         editAt : Timestamp.now().toDate()
        }

        try{
            await setDoc(doc(db, "orders" , id), orderConfig)
            toast.success("Order Status Updated Successfully")
            
            navigate("/admin/orders")
              setIsLoading(false)
             }
             catch(error){
                setIsLoading(false)
                toast.error(error.message)
             }
    }
  return (
  <>
  {isLoading && <Spinner/>}
  <Card className='max-w-md mt-4 border border-cyan-600'>
    <h2 className='text-darkblue text-xl font-bold mb-3'>Update Order Status</h2>
     <form onSubmit={(e) => editOrder(e,id)} >
     <Select className='mb-3' value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="" disabled>-- Select One -- </option>
        <option value="Order Placed" >Order Placed </option>
        <option value="Processing..." >Processing...</option>
        <option value="Shipped..." >Shipped...</option>
        <option value="Delivered" >Delivered</option>
    </Select>
    <Button className='mt-4' type='submit'>Update Status</Button>
     </form>
  </Card>
  </>
  )
}
