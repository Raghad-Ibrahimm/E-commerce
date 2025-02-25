import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { GridLoader } from 'react-spinners'
export default function Orders() {

const [order,setOrder]= useState([])
const [err,setErr]= useState("")
const [isload,setload]= useState(false)


async function allOrders() {

  try {
    setload(true)
    let {data} =await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/`)
    console.log(data.data);
    setOrder(data.data)
setErr("")
  } catch (error) {

    setErr(error.message)
    
  }
 finally{
  setload(false)
 }
}


useEffect(()=>{
allOrders()
},[]);


  return (
    <>
    <div className="container mx-auto">
{err && <>    <div className="flex justify-center items-center p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <span className="sr-only">Info</span>
  <div>
    <span className="font-medium">Danger alert!</span> {err}
  </div>
</div> </>}


{isload == true &&<div className='flex justify-center items-center mt-12 pt-12'>
<GridLoader color="#ffd4ea" size={35} /> 
</div> }



      <div className="flex justify-between  flex-wrap gap-2 my-4">
           
       {order?.map((order)=>  <div key={order._id} className="w-1/2 mx-auto sm:w-1/3 md:w-1/4 lg:1/5 bg-gray-100 hover:border-rose-300 hover:border-2 rounded-2xl">
       <div className='p-5'> 
       
          <h1 className='text-rose-500 font-bold'>TotalOrder : {order.totalOrderPrice} EGP</h1>
         {order.isPaid ==true?<span className='text-green-500'> Is paied  : <i className="fa-solid fa-check"></i></span> :<span className='text-red-500'>Is cash : <i className="fa-solid fa-xmark"></i></span>}
       <p className='text-gray-950 font-semibold'>Data_payment : {order?.createdAt.split("").splice(0,10).join("")}</p>
       <p>{order?.paymentMethodType == "card" ?<span className=''><i className="fa-regular fa-credit-card"></i></span>
         :<span className=''><i className="fa-solid fa-money-bills"></i></span>}</p>
        </div> </div> )} 
      
      </div>
    </div>
    </>
  )
}
