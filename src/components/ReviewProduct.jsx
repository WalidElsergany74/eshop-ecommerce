import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { selectProduct } from '../redux/products/productSlice'
import { useSelector } from 'react-redux'
import { Card, Textarea } from 'flowbite-react'
import StarsRating from 'react-star-rate'
import { addDoc, collection, doc, getDoc, Timestamp } from 'firebase/firestore'
import { auth, db } from '../firebase/Config'
import { toast } from 'react-toastify'
import Spinner from './Spinner'

export default function ReviewProduct() {
    const {id} = useParams()
    const [rate,setRate] = useState(0)
    const [review , setReview] = useState("")
    const [product , setProduct] = useState(null) 
    console.log(product)
   
    // const product = products.find((item) => item.id === id)




useEffect(function(){
    getProductData()
} , [])

    async function getProductData() {
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
          toast.error(error.message)
        }
      } 

  async  function handleReview(e){
        e.preventDefault()
        const today = new Date()
        const date = today.toDateString()
        
        const reviewConfig = {
        userId : auth?.currentUser?.uid,
        userName: auth?.currentUser?.displayName,
        prodctId : id,
        rate,
        review,
        reateDate:date,
         createdAt : Timestamp.now().toDate()
        }

        try{
            await addDoc(collection(db, "reviews"), reviewConfig)
            toast.success("Rating Sumitted Successfully")
              setRate(0)
              setReview("")
              
             }
             catch(error){
              
                toast.error(error.message)
             }
    }
    
  return (
    <div className='w-full py-8'>
      <div className='container  flex-col flex p-10'>
        {product === null ? <Spinner/> : 
        <>
        <h2 className='text-darkblue font-bold text-3xl mb-3'>Rate This Product</h2>
        <p>
          Product Name :<b>{product.name}</b>
        </p>
        <img width={"150px"} className='max-w-full' src={product.imageUrl}/>
        <Card className='max-w-md'>
            <form onSubmit={handleReview}>
                <label className='block'>Rating:</label>
                <StarsRating
        value={rate}
        onChange={rate => {
          setRate(rate);
        }}
      />
      <label className='block my-2'>Review:</label>
      <Textarea className='bg-white' required  value={review} onChange={(e) => setReview(e.target.value)} cols={30} rows={10}/>
          <button className='py-3 px-4 mt-3 bg-blue-700 text-white rounded-lg'>Submit Rating</button>
            </form>
        </Card>
        </>
        }
      </div>
    </div>
  )
}
