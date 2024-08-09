import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingBag, FaShoppingCart, FaUser } from 'react-icons/fa';
import { FiAlignRight } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { auth, dataBase } from '../../firebase/Config';
import {  ref , onValue } from 'firebase/database'
import Spinner from '../Spinner';
import { toast} from 'react-toastify';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { IS_ACTIVE, selectPhotoUrl, selectUserName, SET_ACTIVE_USER , SET_REMOVE_USER } from '../../redux/auth/authSlice';
import ShowOnLogin from '../HideLinks';
import ShowOnLogout from './ShowLinks';
import   AdminOnlyRoute, { AdminOnlyLink }   from "../AdminOnlyRoute"
import { data } from 'autoprefixer';
import { selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from '../../redux/cart/cartSlice';





const Header = () => {
  const pageNum = useSelector(selectCartItems)
  const numQua = useSelector(selectCartTotalQuantity)
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false);
   const [isLoading , setIsLoading] = useState(false)
   const [displayName , setDispalyName] =useState("")
   const [phone , setPhone ] = useState("")
   const [photo , setPhoto] = useState("")
   const [scroll , setScroll] =useState(false)
   const navigate = useNavigate()
   const username = useSelector(selectUserName)
   
  
   

   useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // استرجاع بيانات المستخدم من قاعدة البيانات Realtime
        const userRef = ref(dataBase, `user/${user.uid}`);
        onValue(userRef, (snapshot) => {
          const userData = snapshot.val();
          if (userData) {
            setDispalyName(userData.fristName  );
            setPhoto(userData.photo); // تعيين رابط الصورة
          }
        });
         setPhone(user.phoneNumber)
        dispatch(IS_ACTIVE())
        dispatch(SET_ACTIVE_USER({
          email : user.email,
          userName : user.displayName,
          userID : user.uid,
          photoURL : user.photoURL,
          phoneNumber : user.phoneNumber,
         
        }))
       
      
      } else {
       setDispalyName("")
       setPhoto("")
       dispatch(SET_REMOVE_USER())
      
      }
    });
    
   },[dispatch , displayName , photo , username ])




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

function fixedScroll() {
  if(window.scrollY > 50) {
    setScroll(true)
  }else{
setScroll(false)    
  }
  
}
window.addEventListener("scroll" , fixedScroll)




return (
  <>
  
  {isLoading && <Spinner/>}
  <nav className={` bg-darkblue  text-white py-3 px-2 transition-all duration-500    w-full ${scroll ? "fixed top-0 z-[1000]" : null}`}>
  
  <div className='container flex-1  mx-auto flex justify-between items-center '>
    <div>
    <Link to={"/home"} className='text-orange-500 text-2xl font-bold  '>e<span className= 'text-white font-bold text-2xl'>Shop</span>.</Link>
    </div>
     
    <div className='left-header'>
    <ul className='items-center justify-center hidden md:flex space-x-5'>
      
    <li className='relative'><NavLink className={({isActive}) => (isActive ? "after:content[*] after:border-b-2 after:w-full after:h-[2px] after:absolute after:left-0 after:bottom-[-3px] text-orange-500   after:border-gray-100" : "hover:text-orange-400 ")} to={"/home"}>Home</NavLink></li>
    <li className='relative'><NavLink className={({isActive}) => (isActive ? "after:content[*] after:border-b-2 after:w-full after:h-[2px] after:absolute after:left-0 after:bottom-[-3px] text-orange-500   after:border-gray-100" : "hover:text-orange-400 ")} to={"/contact"}>Contact Us</NavLink></li>        
    <AdminOnlyLink>
    <li className='relative'>
      <NavLink className=" py-2 px-3 bg-cyan-700 rounded-md text-white hover:bg-orange-500" to={"/admin"}>
      Admin
      </NavLink>
    </li>        
    </AdminOnlyLink>
      </ul>
    </div>


  <div className='rigt-header'>
  <ul className='items-center justify-center hidden md:flex space-x-3'>
<ShowOnLogin>
  <li className='relative'><NavLink className=
  {({isActive}) => (isActive ?
     "after:content[*] after:border-b-2 after:w-full after:h-[2px] after:absolute after:left-0 after:bottom-[-3px] text-orange-500   after:border-gray-100" 
  : "hover:text-orange-400")}
   to={"/login"}>Login</NavLink>
   </li>
   </ShowOnLogin>

    <ShowOnLogout>
    <li className='lg:flex'>
    
     <NavLink  className={"flex justify-center items-center "} to={"/updateprofile"}>
        <img src={photo} className='w-[40px] h-[40px] rounded-full ' />
        <span className='ml-2'>Hi ,  {displayName || username || auth?.currentUser?.displayName  } </span>
     </NavLink>
    
     </li>
     </ShowOnLogout>

<ShowOnLogin>
  <li className='relative'>
    <NavLink className={({isActive}) => (isActive ? "after:content[*] after:border-b-2 after:w-full after:h-[2px] after:absolute after:left-0 after:bottom-[-3px] text-orange-500   after:border-gray-100" : "hover:text-orange-400")} to={"/register"}>
      Register
    </NavLink>
  </li>   
  </ShowOnLogin>
  <li className='relative'><NavLink className={({isActive}) => (isActive ? "after:content[*] after:border-b-2 after:w-full after:h-[2px] after:absolute after:left-0 after:bottom-[-3px] text-orange-500   after:border-gray-100" : "hover:text-orange-400")} to={"/orderhistory"}>My Orders</NavLink></li>  
 <ShowOnLogout>
  <li className='relative'>
  <NavLink onClick={handleLogout} className={" hover:text-orange-400"} to={"/home"}>
  Logout
  </NavLink>
  </li>      
  </ShowOnLogout>
     <li className='relative' >
     
     <NavLink className= {({isActive}) => (isActive ?
     "after:content[*] after:border-b-2 after:w-full after:h-[2px] after:absolute after:left-0 after:bottom-[-3px] text-orange-500   after:border-gray-100" 
  : "hover:text-orange-400")} to={"/cart"}>
   
   
   <div className='flex relative justify-center items-center'>
      Cart
      <FaShoppingCart/>
     <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-orange-500  rounded-full -top-2 -end-2 dark:border-gray-900">{pageNum.length}</div>

    </div>
      
      

     </NavLink>
       
      
    
     
    

    

      </li>  
     
     
      </ul>

 <div className='flex items-center gap-4   '>


  <div className='md:hidden flex justify-center space-x-1 md:space-x-4'>
    <ShowOnLogout>
     <NavLink  className={"flex justify-center items-center gap-2"} to={"/updateprofile"}>
        <img src={photo} className='w-[40px] h-[40px] rounded-full ' />
        <span className='hidden'>Hi ,  {displayName || username || auth?.currentUser?.displayName  } </span>
     </NavLink>
    
     
     </ShowOnLogout>
     <AdminOnlyLink>
   
      <NavLink className="py-2 rounded-full px-1 md:py-2 md:px-3 bg-cyan-700 md:rounded-md text-white hover:bg-orange-500" to={"/admin"}>
      Admin
      </NavLink>
        
    </AdminOnlyLink>
  </div>
  <Link to={"/cart"} className='flex items-center gap-2 relative md:hidden  hover:text-orange-400 active:text-orange-400  '>
       Cart
      <FaShoppingCart/>
      <div class="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-orange-500  rounded-full -top-2 -end-2 dark:border-gray-900">{pageNum.length}</div>
     
      </Link>
     <button className='md:hidden px-5  hover:text-orange-400 active:text-orange-400  ' onClick={toggleMenu}>
       {!isOpen ?  <FiAlignRight size={20} /> : <IoClose size={20} />}
    
      </button>
  </div>
  </div>

     
    
 
     
 

  </div>

 

 

  {/* MOBILE */}

  <ul className={`md:hidden space-y-5 mt-4 text-center  ${isOpen ? "block" : "hidden"}`}>
 
    {/* <ShowOnLogout>
   <li className='border-b-2 pb-1 border-gray-600'>
    <NavLink  className={"flex justify-center items-center gap-3"} to={"/updateprofile"}>
    <img src={photo} className='w-[30px] h-[30px] rounded-full '/>
    <span className=''>Hi , {auth?.currentUser?.displayName || displayName || username}</span>
     </NavLink>
     </li>
     </ShowOnLogout> */}
     
      <li className='border-b-2 pb-1 border-gray-600'><NavLink className={"space-x-5 px-6   hover:text-orange-400 active:text-orange-400  "}  to={"/"}>
      Home
      </NavLink>
      </li>

        <li className='border-b-2 pb-1 border-gray-600'>
          <NavLink className={"space-x-5 px-6  hover:text-orange-400 active:text-orange-400   "} to={"/Contact"}>
          Contact Us
          </NavLink>
        </li>
       <ShowOnLogin>
      <li className='border-b-2 pb-1 border-gray-600'><NavLink className={"space-x-5 px-6  hover:text-orange-400 active:text-orange-400  "}  to={"/login"}>
      Login</NavLink>
      </li>
      </ShowOnLogin>
      <ShowOnLogin>
        <li className='border-b-2 pb-1 border-gray-600'>
          <NavLink className={"space-x-5 px-6  hover:text-orange-400 active:text-orange-400  "} to={"/register"}>
          Register
          </NavLink>
        </li>
        </ShowOnLogin>
        <li className='border-b-2 pb-1 border-gray-600'><NavLink className={"space-x-5 px-6  hover:text-orange-400 active:text-orange-400  "} to={"/orderhistory"}>
        My Orders</NavLink>
        </li>

        <li className=''><NavLink onClick={handleLogout} className={"space-x-5 px-6  hover:text-orange-400 active:text-orange-400  "} to={"/home"}>
        Logout</NavLink>
        </li>
        
     
      </ul>

  </nav>
  </>
)
 

 }

export default Header;
