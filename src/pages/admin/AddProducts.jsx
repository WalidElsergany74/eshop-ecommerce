import { Button, Card, FileInput, Label, Progress, Select, Textarea, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { db, storage } from '../../firebase/Config';
import { getDownloadURL, ref as StorageRef, uploadBytesResumable } from 'firebase/storage';
import { toast } from 'react-toastify';
import { addDoc, collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import Spinner from '../../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectProduct } from '../../redux/products/productSlice';
const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
];
export default function AddProducts() {
  const {id } = useParams()
  const products = useSelector(selectProduct);
  const productEdit = products.find((item) => item.id === id)
  
  

  const [productName , setProductName] = useState("");
  const [productImage , setProductImage] = useState("");
  const [productPrice , setProductPrice] = useState(0);
  const [productCategory , setProductCategory] = useState("");
  const [productBrand , setProductBrand] = useState("");
  const [productDes , setProductDesc] = useState("");
  const [progress, setProgress] = useState(0);
  const [isLoading , setIsLoading] = useState(false)
  const navigate = useNavigate()
 



  useEffect(() => {
    if (id && productEdit) {
      setProductName(productEdit.name);
      setProductImage(productEdit.imageUrl);
      setProductPrice(productEdit.price);
      setProductCategory(productEdit.category);
      setProductBrand(productEdit.brand);
      setProductDesc(productEdit.desc);
    }
  }, [id, productEdit]);


function detectForm(id, f1 , f2) {
  if(id === "add") {
    return f1;
  }
  return f2;
}

async function editProduct(e) {
  e.preventDefault();
  setIsLoading(true);
  try {
    await setDoc(doc(db, "products", id), {
      name: productName,
      imageUrl: productImage,
      price: Number(productPrice),
      category: productCategory,
      brand: productBrand,
      desc: productDes,
      createdAt: Timestamp.now().toDate()
    });
    toast.success("Product updated successfully");
    navigate("/admin/viewproducts");
  } catch (error) {
    toast.error(error.message);
  } finally {
    setIsLoading(false);
  }
}


  





  
 // Handle Image Change and Store in Firebase Storage
const handleImageChange = async (event) => {
  const file = event.target.files[0];
  console.log(file)
  if (file) {
    const storageReference = StorageRef(storage, `products/${file.name}`);
    const uploadTask = uploadBytesResumable(storageReference, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progressLabel = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progressLabel);
      },
      (error) => {
        toast.error("Failed to upload image");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // setProducts({ ...products, imageUrl: downloadURL });
          setProductImage(downloadURL)
          setProgress(100);
          toast.success("Image uploaded successfully");
        });
      }
    );
  }
};

  async function addProduct(e) {
    setIsLoading(true)
    e.preventDefault();
     try{
      
    
      
    const docRef = await addDoc(collection(db, "products" , id), {
    name : productName,
    imageUrl : productImage,
    price :Number(productPrice),
    category : productCategory,
    brand : productBrand,
    desc : productDes,
    createdAt:Timestamp.now().toDate()
})
setProductName('');
setProductImage('');
setProductPrice(0);
setProductCategory('');
setProductBrand('');
setProductDesc('');
setProgress(0);
setIsLoading(false)
    toast.success("Product is uploaded ")
    navigate("/admin/viewproducts")
     }
     catch(error){
      setIsLoading(false)
        toast.error(error.message)
     }
   
  }
  return (
    
  <>
  {isLoading && <Spinner/>}
    <section className='py-6 px-5'>
      
      <h1 className='font-semibold text-3xl  text-darkblue'>{detectForm(id , "Add New Product" , "Edit Product")}</h1>
    <div className='container'>
      <Card className='mt-4 max-w-lg w-full'>
        <form onSubmit={id ? editProduct : addProduct} className='flex items-left flex-col gap-5'>

         <div className='product-name'>
         <label className='text-md font-[600] tracking-wide block'>Product Name:</label>
         <TextInput required={!id}
          name='name'
           value={productName}  
            onChange={(e) => setProductName(e.target.value)} 
            placeholder='Product Name'
             type='text'
              className='mt-2'/>

         </div>


<div className='border p-4 border-gray-300'>
<label className='text-md font-[600] tracking-wide block'>Product image:</label>
        <div className='text-center mb-4 mt-5 flex justify-between items-center'>
        
          <Label className=' bg-cyan-700 py-3 px-4 rounded-full  text-white cursor-pointer  ' htmlFor='large-file-upload'>Upload Image</Label>
          <img  className='w-[50px]  h-[50px] rounded-full border-2 border-cyan-700' alt='Product Image' src={productImage}/>
        </div>
        <FileInput 
          className='hidden'
           accept='image/png image/jpeg image/jpg'
            id="large-file-upload"
            onChange={handleImageChange}
            required={!id}
              />
          
      </div>









         <div className='product-price'>
         <label className='text-md font-[600] tracking-wide block'>Product Price:</label>
         <TextInput 
          required={!id}
          name='price' 
          value={productPrice}
           onChange={(e) => setProductPrice(e.target.value)} 
           placeholder='Product Price'
            type='number'
             className='mt-2'/>
         </div>

         <div className='product-category'>
         <label className='text-md font-[600] tracking-wide block '>Product Category:</label>
         <Select required={!id} name='category' value={productCategory} onChange={(e) => setProductCategory(e.target.value)} className='mt-3'>
         <option value="" disabled>
                -- choose product category --
              </option>
              {categories.map((cat) => {
                return (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                );
              })}
         </Select>
         </div>


         <div className='product-brand'>
         <label className='text-md font-[600] tracking-wide block'>Product Brand/Company:</label>
         <TextInput required={!id} name='brand' value={productBrand} onChange={(e) => setProductBrand(e.target.value)} placeholder='Product Brand' type='text' className='mt-2'/>
         </div>

         <div className='product-desc'>
         <label className='text-md font-[600] tracking-wide block'>Product Description:</label>
         <Textarea cols={30} rows={10} required={!id} name='desc' value={productDes} onChange={(e) => setProductDesc(e.target.value)} placeholder='Product Brand' type='text' className='mt-2'/>
         </div>

         <div>
         <button type='submit' className='tracking-widest  bg-cyan-800 text-white px-3 py-2 rounded-lg transition-colors hover:bg-orange-500'>
          {detectForm(id , "Save Product", "Edit Product")}
         </button>
         </div>
         
        </form>
      </Card>
    </div>
    </section>
  </>
  )
}
