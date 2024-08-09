import { Card } from 'flowbite-react'
import React from 'react'
import { HiCurrencyDollar } from "react-icons/hi2";
// import { AiFillDollarCircle } from "react-icons/ai";

export default function InfoBox({className , count , title , icon}) {
  return (
    <Card className={className}>
       <h2 className='text-darkblue font-semibold text-xl'>{title}</h2>
        <div className='flex justify-between items-center'>
            <span className='text-darkblue font-medium text-lg'>{count}</span>
            {icon}
        </div>
    </Card>
  )
}
