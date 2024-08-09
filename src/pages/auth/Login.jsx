import React, { Children, useState } from 'react'
import "animate.css"
import LoginPic from "../../assets/login.png"
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import {  GoogleAuthProvider,  signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase/Config';
import Spinner from '../../components/Spinner';
import { toast } from 'react-toastify';



export default function Login() {
  const {handleSubmit , register , formState } = useForm()
  const navigte = useNavigate()
  const [isLoading ,setIsLoading] = useState(false)
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const [phone , setPhone] = useState(Number(""))
   const {errors} = formState;
   function onSubmit() {
    setIsLoading(true)

    // Firebase Register

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      setIsLoading(false)
      toast.success("Login is done successfully")
      const user = userCredential.user;
        user.phoneNumber = phone
        console.log(user.phoneNumber)
      console.log(user)
      navigte("/home")
    })
    .catch((error) => {
      setIsLoading(false)
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error("Email or Password is wrong")
    });


    
    
    }
    
    function onError() {
      setIsLoading(false)
      toast.error("Password or Email is wrong ")
    }
    //Sign in with Google //
const provider = new GoogleAuthProvider();
    function siginInWithGoogle() {
      
      signInWithPopup(auth, provider)
  .then((result) => {
    const user = result.user;
    toast.success("Login is done successfully")
    navigte("/home")
  }).catch((error) => {
     toast.error(error.message)
    
  });

    }
  return (
    <>
  
    {isLoading && <Spinner/>}
    <section className='min-h-[100vh] container mx-auto p-4 max-w-5xl'>
     
      <div className=''>
        <div className='grid grid-cols-1 md:grid-cols-2 mx-auto max-w-full gap-8 py-20   '>
          <div className='grid-cols-4 animate__animated animate__backInDown text-center mx-auto  '>
           <img src={LoginPic} className=' max-w-full w-[600px] hidden md:block '/>
          </div>
          <div className='grid-cols-8 mx-auto lg:mx-0 animate__animated animate__backInUp'>
            
          <Card className="max-w-sm w-[350px]">
      <form className="flex flex-col gap-4 " onSubmit={handleSubmit(onSubmit , onError)}>
        <h2 className='text-center font-bold text-3xl text-orange-500 tracking-wide'>Login</h2>
        <div>
        <TextInput
         id="email1"
          type="email"
           placeholder="name@email.com"
          //  value={email} 
          //  onChange={(e) => setEmail(e.target.value)}
            {...register("email" , 
        {required : "This Field is required" ,
           value : email , onChange : (e) => setEmail(e.target.value) , 
           pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Invalid email address',
          },
          } ) } 
        />
        
        {errors?.email?.message && <span
        className='text-red-600 block mt-2 text-sm'
        >{errors.email.message}</span>}
        
      </div>
      <div>
        <TextInput className='mb-2' id="password1" 
        type="password"
         placeholder='Password'
          {...register("password" , {required : "This Field is required" , 
            

          value : password , onChange : (e) => setPassword(e.target.value)
          
          } )} />
        {errors?.password?.message && <span
        className='text-red-600 block my-2 text-sm'
        >{errors.password.message}</span>}

         <Link to={"/reset"} className='block text-sm text-gray-500 mb-3 px-1 cursor-pointer '>Forgot Password</Link>


                <Button className='enabled:hover:bg-orange-500 w-full  mb-2 hover:bg-orange-500 visited:bg-orange-500' type="submit">Login</Button>
              </div>

        {/* <div>
        <span className='text-sm text-center flex items-center justify-center mt-0 text-gray-500'>--or--</span>

        <Button onClick={siginInWithGoogle}  className='  mt-5  mx-auto gap-15 flex justify-center items-center w text-center  w-full bg-orange-500 hover:bg-red-500' type="submit">
         <span className='flex items-center gap-2' >
         <FaGoogle />
         Login With Google
         </span>
        </Button>
      </div>

          
        <p className='text-center text-black font-meduim'>Don't have an account ? <Link to={"/register"} className='font-bold text-gray-700 underline'>Register</Link></p> */}
      </form>

      <div>
        <span className='text-sm text-center flex items-center justify-center mt-0 text-gray-500'>--or--</span>

        <Button onClick={siginInWithGoogle}  className='  mt-5  mx-auto gap-15 flex justify-center items-center w text-center  w-full bg-orange-500 hover:bg-red-500' type="submit">
         <span className='flex items-center gap-2' >
         <FaGoogle />
         Login With Google
         </span>
        </Button>
      </div>

          
        <p className='text-center text-black font-meduim'>Don't have an account ? <Link to={"/register"} className='font-bold text-gray-700 underline'>Register</Link></p>
    
    </Card>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
