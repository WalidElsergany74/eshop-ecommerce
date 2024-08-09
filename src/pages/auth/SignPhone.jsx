import { FileInput } from 'flowbite-react'
import React, { useState } from 'react'
import { dataBase, storage } from '../../firebase/Config'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { toast } from 'react-toastify'

export default function SignPhone() {
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
    <div>
      <form className='h-screen p-26' onSubmit={handleSubmit}> 
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <div className='text-center mb-4 mt-5 flex justify-between items-center'>
              <label className='bg-cyan-700 py-3 px-4 rounded-full text-white cursor-pointer' htmlFor='large-file-upload'>Upload Image</label>
              <img className='w-[50px] h-[50px] rounded-full border-2 border-cyan-700' src={photo} alt="Profile" />
            </div>    

            <FileInput
              className='hidden'
              accept='image/png, image/jpeg, image/jpg'
              id="large-file-upload"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-700 dark:hover:bg-blue-700 dark:focus:ring-blue-800 tracking-wider font-semibold">Edit</button>
      </form>
    </div>
  )
}
