import { Card, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import ResetPic from "../../assets/forgot.png"
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../../components/Spinner'
import { onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../firebase/Config'
export default function Reset() {
  const [email , setEmail] =useState("")
  
  const {handleSubmit , register , formState , getValues } = useForm()
  const navigte = useNavigate()
  const [isLoading , setIsLoading] = useState(false)
   const {errors} = formState;

   

  function onSubmit() {
    setIsLoading(true)
     sendPasswordResetEmail(auth, email)
  .then(() => {
    setIsLoading(false)
    toast.success("Check your email for a reset link")
    navigte("/home")
  })
  .catch((error) => {
   toast.error(error.message)
  });
  }
  function onError(){
    toast.error("Reset Password is wrong please follow the steps")
  }


 
  return (
    <>
     {isLoading && <Spinner/>  }
   
    <section className='min-h-[100vh] py-2 px-0'>
     
      <div className=''>
        <div className='grid grid-cols-1 md:grid-cols-2 mx-auto max-w-full gap-8 py-20   '>
          <div className='grid-cols-4 animate__animated animate__backInDown text-center mx-auto pl-8'>
           <img src={ResetPic} className='  w-[350px] max-w-full   text-center '/>
          </div>
          <div className='grid-cols-8 mx-auto lg:mx-0 animate__animated animate__backInUp'>
            
          <Card className="max-w-sm">
      <form className="flex flex-col gap-4 " onSubmit={handleSubmit(onSubmit , onError)}>
        <h2 className='text-center font-bold text-3xl text-orange-500 tracking-wide'>Reset Password</h2>
        <div>
          <TextInput id="email1" type="email" placeholder="name@email.com" {...register("email" , 
          {required : "This Field is required" , value : email , onChange : (e) => setEmail(e.target.value) })} 
          
          />
          {errors?.email?.message && <span
          className='text-red-600 block mt-2 text-sm'
          >{errors.email.message}</span>}
        </div>

        <button  type='submit' className='bg-cyan-700 text-white block py-2 px-3 rounded-lg hover:bg-orange-500 transition-colors duration-200 focus:bg-cyan-600 '>Reset Password</button>
         <div className='flex justify-between items-center'>
          <Link to={"/login"} className='text-sm text-gray-500'>- Login</Link>
          <Link to={"/register"} className='text-sm text-gray-500'>- Register</Link>
         </div>
        

       

          
      </form>
    </Card>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
