
import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ADD_TO_CART } from '../../redux/cart/cartSlice';
import { auth } from '../../firebase/Config';
import { toast } from 'react-toastify';
// import toast from 'react-toastify';




export default function ProductItem({product , id , name , imageUrl , desc , price , toGrid}) {
  const dispatch = useDispatch()
  const navigat = useNavigate()


  function addToCart(product) {
    const user = auth.currentUser;
    if (!user) {
      toast.error("You need to be logged in to add products to the cart");
      navigat("/login")
      return;
    }
   dispatch(ADD_TO_CART(product))    
    
   

  }








   const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };
  return (

    <>
    {toGrid ?  
  <div class="relative flex flex-col justify-between mt-9 text-gray-700 bg-white shadow-lg rounded-xl w-[17rem] h-96 bg-clip-border overflow-hidden">
  <Link to={`/productdetails/${id}`} class="relative p-3 bg-gray-100 mx-4 mt-4 overflow-hidden text-gray-700 rounded-xl h-2/3">
    <img
      src={imageUrl}
      alt="card-image" class="object-scale-down  w-full h-full rounded-xl bg-gray-100" />
  </Link>
  <div class="p-4 flex-grow">
    <div class="flex items-center justify-between mb-2">
      <p class="block font-sans text-base font-medium text-blue-gray-900">
        {name}
      </p>
      <p class="block font-sans text-base font-medium text-orange-500">
        ${price}
      </p>
    </div>
    <p class="block truncate font-sans text-sm font-normal text-gray-700 opacity-75">
      {desc}
    </p>
  </div>
  <div class="p-4">
    <button
    onClick={()=> addToCart(product)}
      className="bg-cyan-700 hover:bg-orange-500 text-white text-sm font-sans font-semibold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] block w-full"
      type="button">
      Add to Cart
    </button>
  </div>
</div>

    : 
    
<div class="relative mt-9 flex flex-col md:flex-row bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-[48rem] mx-auto">
  <Link to={`/productdetails/${id}`} className="relative w-full md:w-[250px] p-3 text-gray-700 bg-white rounded-t-xl md:rounded-t-none md:rounded-r-xl bg-clip-border shrink-0">
    <img src={imageUrl} alt="card-image" className="object-contain md:border-r-2 w-full h-full rounded-t-xl md:rounded-t-none md:rounded-r-xl" />
  </Link>
  <div className="p-6 flex-1 flex flex-col justify-between">
    <div>
      <h6 className="block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-orange-500 uppercase">
        ${price}
      </h6>
      <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
        {name}
      </h4>
      <p className="block mb-8 text-base antialiased font-normal leading-relaxed text-gray-700">
        {shortenText(desc, 200)}
      </p>
    </div>
    <button onClick={()=> addToCart(product)}  className="bg-cyan-700 px-6 py-3 text-sm font-semibold text-center text-white align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-orange-500 active:bg-orange-500">
      Add TO CART
    </button>
  </div>
</div>
 

    }
    </>


  )
}
