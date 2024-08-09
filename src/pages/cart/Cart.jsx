import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../firebase/Config';
import { useDispatch, useSelector } from 'react-redux';
import {  ADD_TO_CART, APPLY_PROMO_CODE, DECREASE_QUANTITY, DELETE_ALL, DELETE_FROM_CART, loadCartFromFirestore, selectCartDiscount, selectCartItems, selectCartTotalPrice, selectPriceDiscount } from '../../redux/cart/cartSlice';
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Button } from 'flowbite-react';

export default function Cart() {
  const cartItems = useSelector(selectCartItems)
  const cartTotalPrice= useSelector(selectCartTotalPrice)
  const priceAfDiscount = useSelector(selectPriceDiscount)
  const cartDiscount = useSelector(selectCartDiscount)
  const [discount , setDiscount] = useState("")
  console.log(cartTotalPrice)

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
          const savedDiscount = cartDoc.data().discountCode;
          if (savedDiscount) {
            setDiscount(savedDiscount);
            dispatch(APPLY_PROMO_CODE(savedDiscount));
          }
        }
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

 

  const handleDiscount = async (e) => {
    e.preventDefault();
  
    // Dispatch the promo code action
    dispatch(APPLY_PROMO_CODE(discount));
  
    // Get the current user
    const user = auth.currentUser;
    if (!user) return;
  
    // Save the discount in Firestore
    const cartRef = doc(db, 'carts', user.uid);
    await setDoc(cartRef, { discountCode: discount }, { merge: true });
  };

  function deleteFromCart(item){
    dispatch(DELETE_FROM_CART(item))
  }

  function increaseQuantity(item) {
    dispatch(ADD_TO_CART(item))
  }
  function decreaseQuantity(item) {
    dispatch(DECREASE_QUANTITY(item))
  }

  

  return (
   <div className='pt-16'>
      
   {cartItems.length === 0 ? <h1 className='text-darkblue pt-28  pl-5 font-semibold text-2xl'>No Products Added To Cart .</h1> : 
  <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
  <div class="mx-auto container px-4 2xl:px-0">
   <div className='flex justify-between'>
   <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>
   <Button onClick={()=> dispatch(DELETE_ALL())} > Clear All</Button>
   </div>
    <div class="mt-6 sm:mt-8 md:gap-6 flex-1 flex flex-wrap items-start  gap-8">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full   lg:w-[70%]">
   <table class="w-full text-sm text-left rtl:text-right  text-gray-500 dark:text-gray-400">
       <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
           <tr>
              
               <th scope="col" class="px-6 py-3 w-[300px]">
                   Product
               </th>
               <th scope="col" class="px-6 py-3 w-[250px]">
                   Price
               </th>
               <th scope="col" class="px-6 py-3 w-[300px]">
                   Qty
               </th>
               <th scope="col" class="px-6 py-3 w-[250px]">
                   Total
               </th>
               <th scope="col" class="px-6 py-3 w-[250px]">
                   Action
               </th>
           </tr>
       </thead>
       {cartItems.map((item) => {
         return (
           <tbody>
         

           <td class="p-4 w-[300px] ">
            <span className='block mb-2 '>{item.name}</span>
                   <img src={item.imageUrl} class="w-[70px] md:w-32 max-w-full max-h-full" alt="Apple Watch"/>
               </td>
               <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white w-[250px]" >
                  ${item.price}
               </td>
               <td class="px-6 py-4 w-[300px] ">
                   <div class="flex items-center space-x-3">
                   <button onClick={() => decreaseQuantity(item)} className='py-1 px-2 rounded-md bg-gray-200 font-semiblod text-md'>-</button>
                       <div>
                         <span className='text-lg font-semibold'>{item.cartTotalQuantity}</span>
                       </div>
                       <button onClick={() => increaseQuantity(item)} className='py-1 px-2 rounded-md bg-gray-200 font-semibold text-md'>+</button>
                   </div>
               </td>
              
               <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white w-[250px]" >
                  ${item.cartTotalAmount}
               </td>
               <td class="px-6 py-4 w-[250px] ">
               <MdDelete className='cursor-pointer' onClick={() => deleteFromCart(item)} color='red' size={22} />
               </td>
          
             
       
         
       </tbody>
         )
       })}
       </table>
</div>

      <div className="mx-auto mt-6  flex-1 space-y-6 lg:mt-0 w-full   lg:w-[30%]">
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
          <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

          <div className="space-y-4">
            <div className="space-y-2">
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                <dd className="text-base font-medium text-gray-900 dark:text-white">${Number(cartTotalPrice).toFixed(2)}</dd>
              </dl>

              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Discount</dt>
                <dd className="text-base font-medium text-red-600">-${cartDiscount}</dd>
              </dl>

             

              
            </div>

            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
              <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
              <dd className="text-base font-bold text-gray-900 dark:text-white">${Number(priceAfDiscount).toFixed(2)}</dd>
            </dl>
          </div>

          <Link to={"/checkoutdetails"} className="flex w-full items-center justify-center rounded-lg py-3 px-5 text-white bg-cyan-700 hover:bg-orange-500 tracking-wider transition-colors ">Proceed to Checkout</Link>

          <div className="flex items-center justify-center gap-2">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
            <Link to={"/home/#products"} title="" className="inline-flex items-center gap-2 text-sm font-medium text-cyan-600 underline hover:no-underline ">
              Continue Shopping
              <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
          <form className="space-y-4" onSubmit={handleDiscount}>
            <div>
              <label for="voucher" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Do you have a voucher or gift card? </label>
              <input value={discount} onChange={(e) => setDiscount(e.target.value)} type="text" id="voucher" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="" required />
            </div>
            <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-cyan-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Apply Code</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
   }
  </div>
  )
}
