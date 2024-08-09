import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db, storage } from '../../firebase/Config'
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import Spinner from '../../components/Spinner';
import { toast } from 'react-toastify';
import { deleteObject, ref } from 'firebase/storage';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { selectProduct, STORE_PRODUCTS } from '../../redux/products/productSlice';
import { Link } from 'react-router-dom';
import useFetchCollection from '../../customHooks/useFetchCollection';
import { FILTER_PRODUCTS, selectFilterProducts } from '../../redux/products/filterSlice';
import Pagination from '../../components/Pagination';

export default function ViewProducts() {
  const [search,setSearch] = useState("")
  const {isLoading , data } = useFetchCollection("products")
  const products = useSelector(selectProduct)
  const filteredProducts = useSelector(selectFilterProducts)
  const dispatch = useDispatch()


    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);
    // Get Current Products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
   

  useEffect(()=> {
    dispatch(STORE_PRODUCTS({
              products : data
            }))
  } , [dispatch , data])

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }));
   
  }, [dispatch, search, products]);

 


  async function deleteProduct(id , imageUrl){
  
    try{
    

      await deleteDoc(doc(db, "products", id));
      const storageRef = ref(storage , imageUrl)
      await deleteObject(storageRef)
      toast.success("Product  deleted sucessfully")
     
    }catch(error){
     
      toast.error(error.message)
    }
  }

  function confirmDelete(id , imageUrl) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "bg-red-600 hover:bg-red-700 py-3 px-4 rounded-lg mx-5 text-white",
        cancelButton: "bg-gray-600 hover:bg-gray-700 py-3 px-4 rounded-lg text-white"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You will delete this product",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      showConfirmButton : true,
      cancelButtonText: "Cancel",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your product has been deleted.",
          icon: "success"
        });
        deleteProduct(id , imageUrl)
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your product is safe :)",
          icon: "error"
        });
      }
    });
  }

 
  return (
    <>
    {isLoading && <Spinner/>}
    <div className='py-8 w-full'>
     <div className='container p-6'>
     <h1 className='text-darkblue font-bold text-4xl'>All Products</h1>
      <div className='w-full py-2'>
        <p>
          <b>{filteredProducts.length}</b> Products Found
        </p>
        <input  value={search} onChange={(e) => setSearch(e.target.value)} type="search" id="default-search" className="md:w-[40%] w-full block mt-4  p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search.."  />
      </div>
      {filteredProducts.length === 0 ? <h1>No products found</h1> : (
         

<div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white uppercase bg-cyan-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-2 py-1">
                   s/n
                </th>
                <th scope="col" className="px-6 py-3">
                   IMage
                </th>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                Category
                </th>
                <th scope="col" className="px-6 py-3">
                Price
                </th>
                <th scope="col" className="px-6 py-3">
                Actions
                </th>
            </tr>
        </thead>
        {currentProducts.map((product , index) =>{
          const{ id,name ,imageUrl , price , category} = product;
          return (
            <tbody>
            <tr key={id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              
                <th scope="row" className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {index + 1}
                </th>
                <td className="px-8 py-6">
                   <img className=' max-w-[100px] h-[100px]'  src={imageUrl} />
                </td>
                <td className="px-6 py-4">
                    {name}
                </td>
                <td className="px-6 py-4">
                    {category}
                </td>
                <td className="px-6 py-4">
                   {price}$
                </td>
                <td className="px-6 py-4">
                 <div className='flex items-center gap-2'>
                 <Link to={`/admin/addproducts/${id}`}>
                  <FaRegEdit  className='text-green-500 cursor-pointer' size={20} />
                  </Link>
                  <MdOutlineDelete onClick={() => confirmDelete(id, imageUrl)} className='text-red-600 cursor-pointer' size={20} />
                 </div>
                </td>
            </tr>
            
            
        </tbody>
          )
        } )}
    </table>
</div>
      )}
        <Pagination 
    currentPage={currentPage}
    productsPerPage={productsPerPage}
    setCurrentPage={setCurrentPage}
    totalProducts={filteredProducts.length}
    /> 
     </div>
    </div>
    </>
  )
}
