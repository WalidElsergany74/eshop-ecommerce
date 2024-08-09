
import { PhoneNumberUtil } from 'google-libphonenumber';
import React, { useState } from 'react'
import ReactFlagsSelect from "react-flags-select";
import { PhoneInput } from 'react-international-phone';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import { auth, db } from '../../firebase/Config';

import { toast } from 'react-toastify';
import { ADD_SHIPPING } from '../../redux/cart/cartSlice';
import ChecoutSummary from './ChecoutSummary';


// Phone Validation 

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};
//

export default function CheckoutDetails() {


    const [recipietient, setRecipietient] = useState("")
    const [address1, setAddress1] = useState("")
    const [address2, setAddress2] = useState("")
    const [city, setCity] = useState("")
    const [state, setstate] = useState("")
    const [postal, setPostal] = useState("")
    const [country, setCountry] = useState("")
    const [phone, setPhone] = useState("")
    const isValid = isPhoneValid(phone);
    const dispatch = useDispatch()
    const navigate = useNavigate()


   async function handleSubmit(e) {
    e.preventDefault()
    try{
        dispatch(ADD_SHIPPING({
            recipietient : recipietient,
            address1 : address1,
            address2: address2,
            city : city,
            state : state,
            postal : postal,
            country : country,
            phone: phone,
        }))

       

        
        navigate("/checkout")

        

    }catch(error){
        toast.error(error.message)
    }
      
      


        
    }
  return (
    <div className='w-full py-10 '>
        
      <div className='container flex flex-col   mx-auto p-2  '>
      <h1 className='text-3xl text-darkblue font-bold mb-3'>Checkout Details</h1>
      {/* <h1 className='text-3xl text-darkblue font-bold mb-5'>Checkout Details</h1> */}
      
 <div className='flex  justify-center flex-wrap   '>     

<div className='w-full md:w-[60%]'>

<form onSubmit={handleSubmit} class="max-w-md mt-5  bg-white p-5 shadow-xl rounded-lg  border border-gray-200  ">
    <h3 className='text-2xl font-semibold mb-4'>Shipping Address</h3>
  <div class="mb-5">
    <label htmlFor="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Recipitent Name :</label>
    <input value={recipietient} onChange={(e) => setRecipietient(e.target.value)} type="text" id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Recipitent Name" required />
  </div>
  <div class="mb-5">
    <label htmlFor="address1" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address Line 1 :</label>
    <input value={address1} onChange={(e) => setAddress1(e.target.value)} type="text" id="address1" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Address Line 1" required />
  </div>
  <div class="mb-5">
    <label htmlFor="address2" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address Line 2 :</label>
    <input value={address2} onChange={(e) => setAddress2(e.target.value)} type="text" id="address2" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Address Line 2"  />
  </div>
  <div class="mb-5">
    <label htmlFor="city" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City :</label>
    <input value={city} onChange={(e) => setCity(e.target.value)} type="text" id="city" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="City" required />
  </div>
  <div class="mb-5">
    <label htmlFor="state" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State :</label>
    <input value={state} onChange={(e) => setstate(e.target.value)} type="text" id="state" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="State" required />
  </div>
  <div class="mb-5">
    <label htmlFor="postalcode" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Postal Code :</label>
    <input value={postal} onChange={(e) => setPostal(e.target.value)} type="text" id="postalcode" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Postal Code" required />
  </div>
  <div class="mb-5">
    <label htmlFor="postalcode" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Postal Code :</label>
    <ReactFlagsSelect selected={country} onSelect={(e) => setCountry(e)} />
  </div>
  <div class="mb-5">
    <label htmlFor="postalcode" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Postal Code :</label>
    <PhoneInput
      countrySelectorStyleProps={{buttonClassName : "rounded-xl py-5 px-3"}}
         inputClassName='w-full'
         inputStyle={{padding : "20px  15px"  , }}
        defaultCountry="eg"
        value={phone}
        onChange={(phone) => setPhone(phone)}
      />
       {!isValid && <span style={{ color: 'red' }}>Phone is not valid</span>}
  </div>

 

  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Proceed Checkout</button>
</form>


</div>



            <div className='card-check mt-5 w-full md:w-[40%]'>
            <ChecoutSummary/>
            </div>
        </div>
      </div>


    </div>
  )
}
