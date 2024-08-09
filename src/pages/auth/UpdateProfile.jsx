import { onAuthStateChanged } from 'firebase/auth';
import { Button, Card } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { auth, dataBase} from '../../firebase/Config';
import { useDispatch, useSelector } from 'react-redux';
import { selectPhoneNumber, SET_ACTIVE_USER, SET_REMOVE_USER } from '../../redux/auth/authSlice';
import { Link } from 'react-router-dom';
import { get, ref } from 'firebase/database';




export default function UpdateProfile() {
  const [fristName, setFristName] = useState("")
  const [lastName, setLastName] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [phone , setPhone] = useState(Number(""))
  const [photo , setPhoto] = useState("")
  const [email , setEmail] =useState("")
  const [profileData, setProfileData] = useState(null);
  const selectPhone = useSelector(selectPhoneNumber)
  const dispatch= useDispatch()

 


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setDisplayName(user.displayName)
        setEmail(user.email)
        setPhone(user.phoneNumber)
        
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
            user.phoneNumber = user?.phoneNumber?  user.phoneNumber    : data.phoneNumber
            setPhoto(data.photo || user.photoURL);
            dispatch(SET_ACTIVE_USER({
              email: data.email || user.email,
              userName: data.fristName + data.lastName || user.displayName,
              userID: user.uid,
              photoUrl: data.photo || user.photoURL,
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
    
   },[dispatch , fristName, lastName, phone, photo ])
  return ( 
       <section className='h-screen max-w-full m-16 '>
          <div className='container mx-auto flex justify-center '>
         <Card className='  '>
         <div className='md:w-[600px] lg:w-[700px] w-[250px] max-w-full'>
         <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
          <div className='grid-cols-5 text-center md:text-center mx-auto '>
           
           <img className='w-[200px] h-[200px]   rounded-full text-center' src={photo}/>
             <span className='mt-5  block text-center'>{email === "walidemad998@gmail.com" ? "Admin" : "Customer"}</span>
          </div>
          
          <div className='grid-cols-7 py-5  '>
          <div className='flex flex-col items-center justify-center gap-7 text-center md:text-left'>
             <span className='text-gray-500 min-w-[300px]     '>Username: <span className='text-black'>{displayName || `${fristName}  ${lastName}`}</span></span> 
             <span className='text-gray-500  min-w-[300px]   '>Email: <span className='text-black'>{email  }  </span></span> 
             <span className='text-gray-500 min-w-[300px]   '>Phone: <span className='text-black'>{phone}</span></span> 
           <Link to="/editprofile" className='text-white bg-cyan-700 px-4 py-3 rounded-lg'>Edit Profile</Link>
          </div>
          </div>
          </div>
         </div>
          </Card>
         </div>
          
       </section>

        
    
  )
}
