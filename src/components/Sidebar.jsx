import React, { useEffect, useState } from 'react'
import image from "../assets/profile.png"
import { AiFillEye } from "react-icons/ai";
import { CiSquarePlus } from "react-icons/ci";
import { CiRead } from "react-icons/ci";
import { Link, NavLink } from 'react-router-dom';
import { TbDeviceAnalytics } from "react-icons/tb";
import { auth, dataBase } from '../firebase/Config';
import { onAuthStateChanged } from 'firebase/auth';
import { onValue, ref } from 'firebase/database';
export default function Sidebar() {
const [username , setUsername] = useState("");
const [photo , setPhoto] = useState("")
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            // استرجاع بيانات المستخدم من قاعدة البيانات Realtime
            const userRef = ref(dataBase, `user/${user.uid}`);
            onValue(userRef, (snapshot) => {
              const userData = snapshot.val();
              if (userData) {
                setUsername(userData.fristName);
                setPhoto(userData.photo); // تعيين رابط الصورة
              }
            });
            
          
           
          
          } else {
           setDispalyName("")
           setPhoto("")
           
          
          }
        });
        
       },[ photo , username ])
  return (
   <div className="relative py-10 w-full shadow-lg  h-full ">
    <div className='container p-3'>
    <div className="flex items-center  mb-5 flex-col text-center ">
    <img className="md:h-[90px] text-base  md:w-[90px] w-[40px] h-[40px] rounded-full" src={photo} alt={username}/>
    <div>
        <h4 className=" text-lg text-darkblue font-medium capitalize font-poppins tracking-wide mt-2">{username}</h4>
    </div>
</div>
<ul className="space-y-4 ">
    <li>
        <NavLink  to="adminhome"className={({isActive}) => (isActive ? "flex items-center ml-2 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 bg-gray-200 focus:shadow-outline" : "flex items-center ml-2 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200  focus:shadow-outline  ")}>
      <span className="text-gray-600 mx-auto my-0 md:mx-0 md:my-0">
            <TbDeviceAnalytics className="text-center" size={20} />
       </span>
            <span className="hidden my-0 md:mx-0 md:my-0 md:block truncate">Dashboard</span>
            
        </NavLink>
    </li>
    <li  >
        <NavLink to={"viewproducts"} className={({isActive}) => (isActive ? "flex items-center ml-2 p-2 text-gray-700  rounded-md font-medium hover:bg-gray-200 bg-gray-200 focus:shadow-outline" : "flex flex-grow items-center ml-2 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200  focus:shadow-outline  ")}>
            <span class="text-gray-600 mx-auto my-0 md:mx-0 md:my-0 ">
            <CiRead  size={20} />
            </span>
            <span className="hidden md:block truncate">View Products</span>
        </NavLink>
    </li>
    <li>
        <NavLink to={"addproducts/add"} className={({isActive}) => (isActive ? "flex items-center ml-2 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 bg-gray-200 focus:shadow-outline" : "flex items-center ml-2 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200  focus:shadow-outline  ")}>
        <CiSquarePlus className="mx-auto my-0 md:mx-0 md:my-0" size={20} />
            
            <span className="hidden md:block truncate ">Add Products</span>
        </NavLink>
    </li>
    <li>
        <NavLink to="orders" className={({isActive}) => (isActive ? "flex items-center ml-2 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 bg-gray-200 focus:shadow-outline" : "flex items-center ml-2 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200  focus:shadow-outline  ")}>
            <span className="text-gray-600 mx-auto my-0 md:mx-0 md:my-0">
                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path   d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            </span>
            <span className="hidden md:block">Orders</span>
        </NavLink>
    </li>
  
</ul>
    </div>
   </div>
  )
}
