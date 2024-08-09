import { onAuthStateChanged,  PhoneAuthProvider,  RecaptchaVerifier, sendEmailVerification, sendSignInLinkToEmail, signInWithPhoneNumber, updateEmail, updateProfile , updatePhoneNumber } from 'firebase/auth'
import { Button, FileInput, TextInput } from 'flowbite-react'
import React, { useEffect, useId, useState } from 'react'
import { auth, dataBase, db, storage } from '../../firebase/Config'
import { current } from '@reduxjs/toolkit'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { selectPhotoUrl, SET_ACTIVE_USER } from '../../redux/auth/authSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import Spinner from '../../components/Spinner'
import { get, ref, set } from 'firebase/database'
import { data } from 'autoprefixer'
// import PhoneInput from 'react-phone-input-2'
import { PhoneNumberUtil } from 'google-libphonenumber'
import { PhoneInput } from 'react-international-phone'
import { getDownloadURL, uploadBytes , ref as refStorage } from 'firebase/storage'




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
export default function EditProfile() {
    const [email, setEmail] = useState("")
    const [fristName, setFristName] = useState("")
    const [lastName, setLastName] = useState("")
    const [photo, setPhoto] = useState("")
    const [phone, setPhone] = useState("")
    const [user, setUser] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoading , setIsLoading] = useState(false)
    const [profileData, setProfileData] = useState(null);
    const isValid = isPhoneValid(phone);
    const [photoFile, setPhotoFile] = useState(null)

    const { handleSubmit, register, formState, getValues } = useForm()
    const { errors } = formState

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setPhotoFile(file)
          setPhoto(URL.createObjectURL(file));
        }
      };

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // GET DATA FROM DATABASE
          const userRef = ref(dataBase, `user/${user.uid}`) ;
          get(userRef).then((snapshot) => {
            if(snapshot.exists()) {
              const data = snapshot.val();
              console.log(data)
              setProfileData(data)
              setFristName(data.fristName)
              setLastName(data.lastName)
              setEmail(data.email || user.email);
              setPhone(data.phoneNumber || user.phoneNumber);
              setPhoto(photo || data.photo || user.photoURL);
              dispatch(SET_ACTIVE_USER({
                email: data.email || user.email,
                userName: data.fristName || user.displayName,
                userID: user.uid,
                photoURL: data.photo || user.photoURL,
                phoneNumber: data.phone || user.phoneNumber,
              }))
            }else {
              console.log('No data available');
            }
          })
        } else {
          
         dispatch(SET_REMOVE_USER())
        
        }
      });
      
     },[dispatch , photo  ])

    const onSubmit = async () => {
      let photoURL = photo
        try {
          setIsLoading(true)
           // Update profile in Firebase Authentication
            await updateProfile(auth.currentUser, {
                displayName: `${fristName}  ${lastName}`,
                photoURL:  photoURL || photo || selectPhotoUrl 
            })
         // GET IMAGE FROM DATABASE STORAEG
      if (photoFile) {
        const fileRef = refStorage(storage, `profileImages/${auth.currentUser.uid}/${photoFile.name}`)
        await uploadBytes(fileRef, photoFile)
        photoURL = await getDownloadURL(fileRef)
      }

           // Update profile in Realtime Database
           const userRef = ref(dataBase, `user/${auth.currentUser.uid}`);
           await set(userRef, {
               fristName : fristName,
               lastName : lastName,
               email: email,
               photo:  photoURL ,
               phoneNumber: phone
           });
         
            dispatch(SET_ACTIVE_USER({ fristName, selectPhotoUrl: photo }));
            toast.success("Profile updated successfully!")
            setIsLoading(false)
            navigate("/updateprofile")
        } catch (error) {
            console.error("Error updating profile: ", error)
            toast.error("Failed to update profile. Please try again.")
        }
    }
  
  return (
    <>
 { isLoading && <Spinner/>}
    <div className='h-screen pt-16'>
     

<form class="max-w-lg mx-auto gap-8 " onSubmit={handleSubmit(onSubmit)}>
  <div class="grid md:grid-cols-2 md:gap-6">
    <div class="relative z-0 w-full mb-5 group">
        <input value={fristName}
        onChange={(e) => setFristName(e.target.value)}
         type="text" name="floating_first_name" 
         id="floating_first_name" 
         class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlfor="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> FristName</label>
    </div>
    <div class="relative z-0 w-full mb-5 group">
        <input value={lastName}
        onChange={(e) => setLastName(e.target.value)}
         type="text" name="floating_first_name" 
         id="floating_last_name" 
         class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlfor="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last Name</label>
    </div>
  </div>
  <Link className='underline mt-3' to={"/reset"}>Forget Password ?</Link>
  <div class="grid md:grid-cols-2 md:gap-6">
    <div class="relative z-0 w-full mb-5 group">
    <div className='text-center mb-4 mt-5 flex justify-between items-center'>
          <label className=' bg-cyan-700 py-3 px-4 rounded-full  text-white cursor-pointer  ' htmlFor='large-file-upload'>Change Image</label>
          <img  className='w-[50px]  h-[50px] rounded-full border-2 border-cyan-700' src={photo} />
        </div>    
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
       </div>
        <FileInput
          className='hidden'
         
           accept='image/png image/jpeg image/jpg'
            id="large-file-upload"
            {...register("photoProfile" , { 
                value : photo , onChange : handleImageChange
              })}
              />
    </div>
    <div>
   
    </div>

    
  </div>
  <button  type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-700 dark:hover:bg-blue-700 dark:focus:ring-blue-800 tracking-wider font-semibold">Edit</button>
  
</form>

    </div>
    </>
  )
}
