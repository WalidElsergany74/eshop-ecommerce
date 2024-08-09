import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Card } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { selectOrderHistory } from '../redux/order/orderSlice';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: false,
      text: 'Chart.js Bar Chart - Stacked',
    },
  },
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
      ticks: {
        autoSkip: false
      }
    },
    y: {
      stacked: true,
    },
  },
  animations: {
    tension: {
      duration: 1000,
      easing: 'linear',
      from: 1,
      to: 0,
      loop: true
    }
  },
};

export default function Chart() {

  const order = useSelector(selectOrderHistory)

  // CREATE NEW ARRAY 
  let array = []
  order.map((item) => {
    const {orderStatus} = item
     array.push(orderStatus)
  })
  
  function getOrderCount(arr,value) {
    return arr.filter((n) => n === value).length
  }

  const [q1,q2,q3,q4] = ["Order Placed..." , "Processing..." , "Shipped..." , "Delivered"]
  



  const placed = getOrderCount(array , q1);
  const processing = getOrderCount(array,q2);
  const shipped = getOrderCount(array,q3);
  const delivered = getOrderCount(array,q4);

  const data = {
    labels: ["Placed Orders", "Processing", "Shipped", "Delivered"],
    datasets: [
      {
        label: 'Order Count',
        data: [placed, processing, shipped, delivered],
        backgroundColor: 'rgb(255, 99, 132)',
        stack: 'Stack 0',
        barThickness: 50, 
        
        maxBarThickness: 100,
      },
    ],
  };

  return (
    <div className='w-full py-8'>
      <Card className='max-w-xl '>
        <h3>Order Status Chart</h3>
        <Bar options={options} data={data} />
      </Card>
    </div>
  )
}
