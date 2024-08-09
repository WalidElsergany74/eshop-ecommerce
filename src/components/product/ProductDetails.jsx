import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { auth, db } from '../../firebase/Config';
import { Button, Card } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART, DECREASE_QUANTITY, selectCartTotalQuantity } from '../../redux/cart/cartSlice';
import useFetchCollection from '../../customHooks/useFetchCollection';
import StarsRating from 'react-star-rate';

export default function ProductDetails() {
  const dispatch = useDispatch()
 
  const {id} = useParams();
  const [product , setProduct] = useState("");
  
  const [cartQuantity, setCartQuantity] = useState(0);

  const {data} = useFetchCollection("reviews")


  const filteredReviews = data.filter((review) => review.prodctId=== id)
 

 
   useEffect(function() {
    getProduct()
  } , [])
   useEffect(function() {
    getProductCart()
  } , [])

  async function getProduct() {
    try{
      const docRef = doc(db, "products", id);
const docSnap = await getDoc(docRef);
 
if (docSnap.exists()) {
  const obj = {
    id : id,
    ...docSnap.data()
  }
  setProduct(obj)
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}
    }catch(error) {
      toast.message(error.message)
    }
  } 
  function getProductCart() {
    const user = auth.currentUser;
    if (!user) {
      console.log('User is not authenticated');
      return;
    }

    const docRef = doc(db, 'carts', user.uid);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const cartItems = docSnap.data().cartItems;

        if (Array.isArray(cartItems)) {
          const item = cartItems.find((item) => item.id === id);
          if (item) {
            setCartQuantity(item.cartTotalQuantity);
          } else {
            setCartQuantity(0);
          }
        } else if (typeof cartItems === 'object') {
          if (cartItems[id]) {
            setCartQuantity(cartItems[id].cartTotalQuantity);
          } else {
            setCartQuantity(0);
          }
        } else {
          console.log('Invalid cartItems structure');
          setCartQuantity(0);
        }
      } else {
        console.log('No such document!');
        setCartQuantity(0);
      }
    });

    return unsubscribe; // Return the unsubscribe function to clean up the listener
  }


  return (
    <div  className='details py-10 px-0 w-full '>
      <div className='container p-4 mt-4 flex-col flex    mx-auto'>
        <h2 className='font-bold text-4xl  text-darkblue'>Product Details</h2>
        <Link className='mt-5 block  t text-gray-500 font-semibold' to={"/home/#products"}>&larr; Back To Products</Link>
        <div className='flex pt-8 flex-col md:flex-row   gap-4   py-5 mt-5 '>
          
           
          <div className='w-full   td:w-[45%] '>
          <img className=' max-w-full border-[#ccc]  border ' src={product.imageUrl}/>
         
          </div>
          
          
          <div className='info w-full  td:w-[55%] p-y-0 px-1.5 space-y-3'>
            <h3 className='text-darkblue font-bold text-2xl tracking-wider mt-5'>{product.name}</h3>
            <span className='text-orange-500 font-semibold text-lg  block'>${product.price}</span>
            <p className='text-gray-500'>{product.desc}</p>

            <div className='flex  items-center space-x-2'>
              <span className='font-bold text-sm block'>SKU :</span>
              <span>{product.id}</span>
            </div>

            <div className='flex items-center space-x-2'>
              <span className='font-bold text-sm block'>Brand :</span>
              <span>{product.brand}</span>
            </div>
            <div className='count flex items-center space-x-6'>
              <button onClick={()=> dispatch(ADD_TO_CART(product))} className='py-1 px-2  font-bold bg-orange-500 rounded-lg text-white '>+</button>
              <p className='font-semibold'>{cartQuantity}</p>
              <button onClick={()=> dispatch(DECREASE_QUANTITY(product))} className='py-1 px-2 font-bold bg-orange-500 rounded-lg text-white' >-</button>
            </div>
            <div>
              <Button  onClick={() => dispatch(ADD_TO_CART(product))} className='mt-4 focus:ring-orange-400 enabled:hover:bg-orange-500'>ADD TO CART</Button>
            </div>
          </div>
        </div>
        <Card className='max-w-md mt-3' >
        <h3 className='text-darkblue text-2xl font-semiblod '>Product Reviews</h3>
          {filteredReviews.length === 0 ? <p>There are no reviews on this product</p> : 
          <>
          {filteredReviews.map((item,index) => {
            return(
              <div key={index} className='border-t-2'>
                <StarsRating  value={item.rate}/>
                <p className='font-medium text-lg text-gray-500'>{item.review}</p>
                <span className='block'>
                  <b>{item.reateDate}</b>
                </span>
                <span className='block'>
                 
                  <b> By : {item.userName}</b>
                </span>
              </div>
            )
          })}
          </>
          }
        </Card>
       
      </div>
    </div>
  )
}
