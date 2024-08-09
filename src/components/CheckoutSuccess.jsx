import React from 'react'
import { Link } from 'react-router-dom'

export default function CheckoutSuccess() {
  return (
    <section className='lg:p-10 '>
      <div className='container p-3 flex flex-col'>
        <h2 className='text-3xl text-darkblue font-bold mb-3'>Checkout Successful</h2>
        <p className='mb-4 text-gray-400 '>Thank you for your purchase</p>
        <Link to={"/orderhistory"}>
        <button className='py-3 px-4 bg-cyan-700 text-white rounded-lg hover:bg-orange-500 transition-colors'>View Order Status</button>
        </Link>
      </div>
    </section>
  )
}
