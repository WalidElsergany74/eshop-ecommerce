
import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import ChecoutSummary from "../pages/checkout/ChecoutSummary";
import { Card } from "flowbite-react";
import Spinner from "./Spinner"
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_ALL, selectCartDiscount, selectCartItems, selectCartTotalAmount, selectCartTotalPrice, selectPreviousUserId, selectPriceDiscount, selectShipping } from "../redux/cart/cartSlice";
import { auth, db } from "../firebase/Config";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const cartItems = useSelector(selectCartItems)
    const cartTotalPrice = useSelector(selectPriceDiscount) 
    const shipping = useSelector(selectShipping)
    const userId = useSelector(selectPreviousUserId)
    const dispatch = useDispatch()
  
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
  
    useEffect(() => {
      if (!stripe) {
        return;
      }
  
      const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      );
  
      if (!clientSecret) {
        return;
      }
  
     
    }, [stripe]);
    

    async function saveOrder(){
        const today = new Date()
        const date = today.toDateString()
        const time = today.toLocaleTimeString()
        const orderConfig = {
          userId,
         shipping,
         cartItems,
         cartTotalPrice,
         userName : auth?.currentUser?.displayName,
         orderDate : date,
         orderTime : time,
         orderStatus : "Order Placed...",
         createdAt : Timestamp.now().toDate()
        }

        try{
            await addDoc(collection(db, "orders"), orderConfig)
            toast.success("Order Saved")
            dispatch(DELETE_ALL())
            navigate("/checkout-success")
              
             }
             catch(error){
              
                toast.error(error.message)
             }
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setMessage(null)
  
      if (!stripe || !elements) {
        // Stripe.js hasn't yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }
  
      setIsLoading(true);
  
      const confirmPayment = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: "http://localhost:5173/checkout-success",
        },
        redirect : "if_required"
      }).then((result) => {
        if(result.error){
            toast.error(result.error.message)
            setMessage(result.error.message)
            return;
        }
        if(result.paymentIntent) {
            if(result.paymentIntent.status === "succeeded" ) {
                setIsLoading(false)
                toast.success("Payment Successful")
                saveOrder()
            }
        }
      })
  


    
  
      setIsLoading(false);
    };
  
    const paymentElementOptions = {
      layout: "tabs"
    }
  
    return (
    <div className="w-full py-10  ">
        <div className="container flex flex-col mx-auto p-4  lg:p-10 ">
            <h2 className="text-darkblue  mb-5 text-3xl font-bold">Checkout</h2>
            <div className="flex flex-wrap ">
               <div className="w-full lg:w-[60%]">
               <ChecoutSummary/>
               </div>

               <div className="w-full lg:w-[40%]  ">
               
                <form className="max-w-md mt-5  bg-white p-5 shadow-xl rounded-lg  border border-gray-200" onSubmit={handleSubmit}>
                    <h3>Stripe Checkout </h3>
                    <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button className="py-3  px-2 hover:bg-orange-500 transition-colors w-full mt-4 bg-cyan-700 text-white rounded-lg" disabled={isLoading || !stripe || !elements} id="submit">
        <button className="" id="button-text">
          {isLoading ? <Spinner/> : "Pay now"}
        </button>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
                </form>
              
               </div>


        
            </div>
        </div>
    </div>
    );
  }
