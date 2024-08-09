import { Card } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadCartFromFirestore, selectCartItems, selectCartTotalPrice, selectPriceDiscount } from '../../redux/cart/cartSlice'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../../firebase/Config'
import { doc, getDoc } from 'firebase/firestore'

export default function ChecoutSummary() {
    const [total , setTotal] =useState("")
    const cartItems = useSelector(selectCartItems)
    
    
    const dispatch = useDispatch()

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          // Load cart from Firestore
          dispatch(loadCartFromFirestore());
  
          // Load discount from Firestore
          const cartRef = doc(db, 'carts', user.uid);
          const cartDoc = await getDoc(cartRef);
          if (cartDoc.exists()) {
            const savedTotal = cartDoc.data().cartTotalPrice

            console.log(savedTotal)
            if (savedTotal) {
              setTotal(savedTotal);
            
            }
          }
        }
      });
  
      return () => unsubscribe();
    }, [dispatch]);
  return (
    <Card className='w-full max-w-md'>
        <h3 className='text-xl font-semibold text-darkblue mb-2 '>Checkout Summary</h3>
        <div className='flex justify-between items-center'>
            <span className='text-xl text-darkblue font-semibold'>subtotal :</span>
            <span className='text-orange-500 text-lg font-semibold'>${total}</span>
           

        </div>

        {cartItems.length === 0 ? 
            <h1 className='text-2xl font-bold text-darkblue '>No Products Added</h1>
             :
             cartItems.map((item) => {
                return (
                    <div className='border-cyan-600  m-0 bg-white shadow-md border-2 rounded-lg p-3'>
                     <span className='block text-darkblue font-semibold text-lg '>{item.name}</span>
                     <span className='block text-gray-500'>Quantity : {item.cartTotalQuantity}</span>
                     <span className='block text-gray-500'>Unit Price : {item.price}</span>
                     <span className='block text-gray-500'>Set Price : {item.cartTotalAmount}</span>
                    </div>
                )
             })
        }
    </Card>
  )
}
