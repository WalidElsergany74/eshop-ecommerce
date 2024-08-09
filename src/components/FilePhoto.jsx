import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import React, { useState } from 'react'
import { storage } from '../firebase/Config'
import { FileInput } from 'flowbite-react'

export default function FilePhoto() {
    const [photo, setPhoto] = useState("")
    const [photoFile, setPhotoFile] = useState(null)
    const handleImageChange = (event) => {
        const file = event.target.files[0]
        if (file) {
          setPhotoFile(file) // Store the file
          setPhoto(URL.createObjectURL(file)) // Display the image
        }
      }


      const handleSubmit = async (event) => {
        event.preventDefault()
    
        if (photoFile) {
          try {
            const storageRef = ref(storage, `profileImages/${photoFile.name}`)
            await uploadBytes(storageRef, photoFile)
            const photoURL = await getDownloadURL(storageRef)
          
    
    
            // Store photoURL in the database
            const userRef = ref(dataBase, `users/${userId}/photo`);
            await set(userRef, photoURL);
    
    
    
    
    
    
    
            setPhoto(photoURL) // Update the photo URL to the uploaded image
    
            toast.success("Image uploaded successfully!")
          } catch (error) {
            console.error("Error uploading image: ", error)
            toast.error("Failed to upload image. Please try again.")
          }
        }
      }
  return (
    <div className='text-center mb-4 mt-5 flex justify-between items-center'>
    <label className=' bg-cyan-700 py-3 px-4 rounded-full  text-white cursor-pointer  ' htmlFor='large-file-upload'>Upload Image</label>
    <img  className='w-[50px]  h-[50px] rounded-full border-2 border-cyan-700' src={photo} />
    <FileInput
          className='hidden'
         
           accept='image/png image/jpeg image/jpg'
            id="large-file-upload"
            value={photo}
            onChange={handleImageChange}
              />
  </div>    
  )
}
