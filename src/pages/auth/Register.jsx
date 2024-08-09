import React, { useEffect, useState } from 'react'
import {  useForm } from 'react-hook-form';
import 'react-international-phone/style.css';
import { PhoneInput } from 'react-international-phone';
import { PhoneNumberUtil } from 'google-libphonenumber';
import 'react-international-phone/style.css';

import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import RegisterPic from "../../assets/register.png"
import { Button, Card,  FileInput, Label, TextInput } from "flowbite-react";

import { auth, dataBase, db, storage  } from '../../firebase/Config';

import { createUserWithEmailAndPassword,  onAuthStateChanged,  RecaptchaVerifier,  signInWithPhoneNumber,  updateProfile } from 'firebase/auth';
import Spinner from '../../components/Spinner';
import imagePrf from "../../assets/profile.png"
import { addDoc, collection, doc, setDoc ,  } from 'firebase/firestore';
import { ref , set  } from 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { selectPhoneNumber, SET_ACTIVE_USER, SET_REMOVE_USER } from '../../redux/auth/authSlice';
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';







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
export default function Register() {
 const [email , setEmail] = useState("")
const [password , setPassword] = useState("")
const [fristName , setFristName] =useState("")
const [lastName , setLastName] = useState("")
const [photo , setPhoto] = useState(imagePrf)
const [phone , setPhone] = useState("")
const isValid = isPhoneValid(phone);
const selectPhone = useSelector(selectPhoneNumber)
const [isLoading , setIsLoading] = useState(false)
const {handleSubmit , register , formState , getValues } = useForm()
const navigate = useNavigate()
const {errors} = formState;

// Handle Image Change and Store in Firebase Storage
const handleImageChange = async (event) => {
  const file = event.target.files[0];
  if (file) {
    const storageReference = storageRef(storage, `profileImages/${file.name}`);
    const uploadTask = uploadBytesResumable(storageReference, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Optionally handle upload progress
      },
      (error) => {
        toast.error("Failed to upload image");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setPhoto(downloadURL); // Use the URL for display and update in Firebase
        });
      }
    );
  }
};










const toggleMenu = () => {
  setIsOpen(!isOpen);
};

function handleLogout(){
setIsLoading(true)

signOut(auth).then(() => {
   toast.success("Logout is done successfully")
   
  setIsLoading(false)
 
 navigate("/home")

}).catch((error) => {
  toast.error(error.message)
});

}








































async function onSubmit() {

  setIsLoading(true) 
  try{
    // CREATE ACCOUNT BY EMAIL AND PASSWORD AND ALL DATA BY FIREBASE
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      const user = userCredential.user;
      user.phoneNumber =  user.phoneNumber ? selectPhone : phone
       updateProfile(user, {
        displayName: user.displayName ? user.displayName :  `${fristName} ${lastName}`,
        // photoURL: user.photoURL ? user.photoURL : photo,
        phoneNumber: user.phoneNumber ? user.phoneNumber : phone
      });

      // CREATE DATABASE IN FIREBASE AND STORE THE DATA IN THIS 
      set(ref(dataBase , `user/${user.uid}`) , {
        fristName : fristName , 
        lastName : lastName,
        email : email,
        photo : photo,
        phoneNumber : phone,
        password : password
      })


      })

      

      
      setIsLoading(false);
      toast.success("Register is done successfully");
      navigate("/home");
}catch (error) {
  setIsLoading(false);
  toast.error(error.message);
}
}


  
  

function onError() {
  toast.error("Something is wrong please follow the steps ")
}



  
  return (
    <>
    {isLoading && <Spinner/>  }
    <section className='min-h-[100vh] container mx-auto p-4 max-w-5xl '>
     
    <div className=' '>
      <div className='grid grid-cols-1 md:grid-cols-2 mx-auto max-w-full gap-8 py-20   '>
        
        <div className='grid-cols-7 mx-auto lg:mx-0 animate__animated animate__backInUp'>
          
        <Card className="max-w-md w-[350px] lg:w-[400px]">
    <form className="flex flex-col gap-4 " onSubmit={handleSubmit(onSubmit , onError )}>
      <h2 className='text-center font-bold text-3xl text-orange-500 tracking-wide'>Register</h2>
       <div>
        <TextInput
         id="email1"
          type="email"
           placeholder="name@email.com"
         
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
        <TextInput type='text' className='mb-1' id='name' placeholder='Frist Name' {...register("fristName" 
          , {required : "This Field is required", maxLength : {
            value : 15,
              message: "User Name cannot exceed 15 characters",
          },

          value : fristName , onChange : (e) => setFristName(e.target.value)
          })}/>
          {errors?.fristName?.message && <span className='text-red-600 block mt-2 text-sm'>{errors.fristName.message}</span>}
      </div>

      <div>
        <TextInput type='text' className='mb-1' id='name' placeholder='Last Name' {...register("lastName" 
          , {required : "This Field is required", maxLength : {
            value : 15,
              message: "User Name cannot exceed 15 characters",
          },

          value : lastName , onChange : (e) => setLastName(e.target.value)
          })}/>
          {errors?.lastName?.message && <span className='text-red-600 block mt-2 text-sm'>{errors.lastName.message}</span>}
      </div>
     

      <div>
        <TextInput className='mb-3' id="password1" 
        type="password"
         placeholder='Password'
          {...register("password" , {required : "This Field is required" , 
             validate : {
            maxLength: value => 
              value.length <= 15 || 'Password cannot exceed 15 characters',
            minLength : value => value.length > 10 || "Password should be 10 charachters " ,
            hasUpperCase: value => 
              /[A-Z]/.test(value) || 'Password must have at least one uppercase letter',
            hasLowerCase: value => 
              /[a-z]/.test(value) || 'Password must have at least one lowercase letter',
            hasNumber: value => 
              /\d/.test(value) || 'Password must have at least one number',
            hasSpecialChar: value => 
              /[!@#$%^&*(),.?":{}|<>]/.test(value) || 'Password must have at least one special character',
          },

          value : password , onChange : (e) => setPassword(e.target.value)
          
          } )} 
          />
        {errors?.password?.message && <span
        className='text-red-600 block my-2 text-sm'
        >{errors.password.message}</span>}

        <TextInput className='mb-1' id='password2' type='password' placeholder='Confirm Password' 
        {...register("confirmPassword" , {required : "This Field is required" , 
          validate : value => value === getValues().password || "Passwords do not match"})}
        />
         {errors?.confirmPassword?.message && (
          <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>
        )}

<div className='mt-3'>
<PhoneInput

countrySelectorStyleProps={{buttonClassName : "rounded-xl py-5 px-3"}}
         inputClassName='w-full'
         inputStyle={{padding : "20px  15px"  , }}
         
        defaultCountry="eg"
        value={phone}
        onChange={(phone) => setPhone(phone)}
      />
           {!isValid && <span style={{ color: 'red' }}>Phone is not valid</span>}
        {/* {errors?.phone?.message && (
          <span className="text-red-500 text-sm">{errors.phone.message}</span>
        )} */}
        
      
       </div>

<div>
        <div className='text-center mb-4 mt-5 flex justify-between items-center'>
          <Label className=' bg-cyan-700 py-3 px-4 rounded-full  text-white cursor-pointer  ' htmlFor='large-file-upload'>Upload Image</Label>
          <img  className='w-[50px]  h-[50px] rounded-full border-2 border-cyan-700' src={photo}/>
        </div>
        <FileInput 
          className='hidden'
           accept='image/png image/jpeg image/jpg'
            id="large-file-upload"
            {...register("photoProfile" , {required : "This Field is required" , 
              value : photo , onChange : handleImageChange
            })}
              />
               {errors?.photoProfile?.message && (
          <span className="text-red-500 text-sm">{errors.photoProfile.message}</span>
        )}
      </div>
                <Button className='enabled:hover:bg-orange-500 w-full  mb-2 hover:bg-orange-500 visited:bg-orange-500' type="submit">Register</Button>
       </div>

       
        
     
      
      
      <p className='text-center text-black font-meduim'>Already have an account ? <Link to={"/login"} className='font-bold text-gray-700 underline'>Login</Link></p>
    </form>


  </Card>
        </div>

        <div className='grid-cols-5 animate__animated  animate__backInDown text-center mx-auto '>
         <img src={RegisterPic} className=' max-w-full hidden md:block  w-[500px] '/>
        </div>
      </div>
    </div>
  </section>
  </>
  )
}
