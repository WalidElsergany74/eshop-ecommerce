import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { useDispatch, useSelector } from "react-redux";
import { CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY, loadCartFromFirestore, selectCartItems, selectCartTotalPrice, selectShipping } from "../../redux/cart/cartSlice";
import selectEmail from "../../redux/auth/authSlice"
import { toast } from "react-toastify";
// import CheckoutForm from "../../components/CheckoutForm";
import CheckoutForm from "../../components/CheckoutForm"

const stripePromise = loadStripe("pk_test_51PlBkmCY5J8EEtmEAZIljVeq6wdLHNQVXj6uMGQSqW2aLxvYzXEIVslN1NS9VzWryD1c3O5Ea9EWoj3oSnAjxL3D000BSj5w9h");

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const [message, setMessage] = useState("initialzing checkout...");
  const dispatch = useDispatch();
    
  const cartItems = useSelector(selectCartItems);
  const shipping = useSelector(selectShipping);

   const description = `eShop Payment :  , A `


  useEffect(function(){
    dispatch(CALCULATE_SUBTOTAL())
    dispatch(CALCULATE_TOTAL_QUANTITY())
  } , [dispatch,cartItems])

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch( "http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        items: cartItems,
        shipping : shipping,
        description
      }),
    })
      .then((res) => {
        if(res.ok) {
        return  res.json()
        }
        return res.json().then((json) => Promise.reject(json))
      })
      .then((data) => {
        setClientSecret(data.clientSecret)
      })
      .catch(error => {
        setMessage("Failed  to initialize")
        toast.error("Something went wrong")
      }) 
  }, []);
  


 



  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <>
      <div className="py-8 w-full">
        <div className="container">
          {!clientSecret && <h3>{message}</h3>}
        </div>
      </div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}
