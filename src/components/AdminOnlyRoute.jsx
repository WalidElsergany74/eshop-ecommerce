
import { useSelector } from 'react-redux'
import { selectEmail } from '../redux/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom'


const AdminOnlyRoute = ({ children }) => {
   const userEmail = useSelector(selectEmail);
 
   if (userEmail === "walidemad998@gmail.com") {
     return children;
   }
   return (
     <section className='h-[90vh] pt-12 pl-16 text-left'>
       <div className="container">
         <h2 className='text-2xl font-semibold'>Permission Denied.</h2>
         <p className='text-lg '>This page can only be view by an Admin user.</p>
         <br />
         <Link to="/">
           <button className="py-3 px-3 text-white bg-cyan-700">&larr; Back To Home</button>
         </Link>
       </div>
     </section>
   );
 };
 
 export const AdminOnlyLink = ({ children }) => {
   const userEmail = useSelector(selectEmail);
 
   if (userEmail === "walidemad998@gmail.com") {
     return children;
   }
   return null;
 };
 
 export default AdminOnlyRoute;


