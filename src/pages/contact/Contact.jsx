import { Card, Textarea } from 'flowbite-react'
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";
import { toast } from 'react-toastify';
export default function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(import.meta.env.REACT_APP_EMAILJS_API_KEY, 'template_kwsnn0d', form.current, {
        publicKey: '6vCK7HlpBQfiEIZ_E',
      })
      .then(
        () => {
          toast.success("Message sent sucessfully")
          console.log('SUCCESS!');
        },
        (error) => {
          toast.error(error.text)
          console.log('FAILED...', error.text);
        },
      );
      e.target.reset()
  };
  return (
    <div className='w-full py-8'>
       <div className='container max-w-7xl w-full mx-auto flex-col p-10'>
        <h1 className='text-darkblue text-3xl font-bold mb-3'>Contact Us</h1>
         <div className='flex w-full   justify-between flex-wrap'>
        <div className='lg:w-[60%]  w-full'>
        <Card className='max-w-md'>
          

          <form ref={form}  onSubmit={sendEmail} className="max-w-md ">
            <div className="mb-5">
              <label  htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name:</label>
              <input name='user_name' type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Full Name" required />
            </div>
            <div className="mb-5">
              <label htmlfor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
              <input name='user_email' type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required />
            </div>
            <div className="mb-5">
              <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject:</label>
              <input name='subjeect' type="text" id="subject" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Subject" required />
            </div>
            <div className="mb-5">
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Message:</label>
              <Textarea name='message'  cols={40} rows={10} type="text" id="message" className="bg-gray-50 border resize-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Message" required />
            </div>
           
            
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </form >
          
                  </Card>
        </div>
                  <div className='lg:w-[40%]  w-full mt-5 '>
                    <Card className='max-w-md  bg-blue-500 text-white'>
                      <div className='flex flex-col'>
                      <h1 className='text-xl font-medium tracking-wider mb-3'>Our Contact Information</h1>
                      <p className='text-md tracking-wide font-normal'>Fill the form or contact us via other channels listed below</p>
                      <div className='pt-16'>
                        <ul>
                          <li className='flex space-x-2  items-center'>
                          <FaPhone />
                          <span>+201008421723</span>
                          </li>
                          <li className='flex space-x-2 mt-4 items-center'>
                          <MdEmail />
                          <span>Support@eshop.com</span>
                          </li>
                          <li className='flex space-x-2 mt-4 items-center'>
                          <FaLocationDot />
                          <span>Mansoura,Egypt</span>
                          </li>
                          <li className='flex space-x-2 mt-4 items-center'>
                          <FaFacebookF />
                          <span>Walid Emad Elsergany</span>
                          </li>
                        </ul>
                      </div>
                      </div>
                    </Card>
                  </div>
         </div>
       </div>
    </div>
  )
}
