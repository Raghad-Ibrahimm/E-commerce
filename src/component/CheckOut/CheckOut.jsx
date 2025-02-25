import React, { useContext, useEffect, useState } from 'react'
import style from "./CheckOut.module.css"
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup' 
import { DotLoader } from 'react-spinners'
import { cartContext } from '../../Context/CartContext'



export default function CheckOut() {
  
   
    let [IsCallApi,setcallApi] = useState(false)
    let [Apierror,setApierror] = useState(null)
 
    let {onLinePayment} = useContext(cartContext)

    const [isLoad,setLod]=useState(false)
  
  
    
  
    const initialValues ={
      details:"",
      phone:"",
      city:"",
    }
  const validationSchema =Yup.object().shape({
    details:Yup.string().required("Required"),
    phone:Yup.string().required("Required"),
    city:Yup.string().required("Required"),
  });
   const ShippingForm = useFormik({
      initialValues,
      validationSchema,
      onSubmit: callPayment
  
    });
    

  async function callPayment(values){
   let {data} = await onLinePayment(values);
   if (data.status == "success") 
  { window.location.href = data.session.url
    
   }
   console.log(values);
   
  };
  
  
    return (
      <>
      <div className='bg-rose-50 dark:bg-gray-900'>
      <div className="container mx-auto py-12 ">
     
      <form onSubmit={ShippingForm.handleSubmit}  onChange={ShippingForm.handleChange} className="w-[80%] md:w-1/2 mx-auto bg-rose-50  px-5 py-6 rounded shadow-2xl dark:shadow-rose-300 ">
      {Apierror?   <div className="p-2 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-300 dark:bg-gray-800 dark:text-red-400" role="alert">
  {Apierror}
  </div>:null}
      <h1 className='text-2xl mb-8 font-bold'>Shipping Info :</h1>
  
  
   
    <div className="relative z-0 w-full mb-5 group">
      <input type="text" onBlur={ShippingForm.handleBlur} value={ShippingForm.values.details} onChange={ShippingForm.handleChange} name="details" id="details" className="block py-2.5 px-0  w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-rose-300 focus:outline-none focus:ring-0 focus:border-rose-300 peer" placeholder=" " required />
      <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-600 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-rose-600 peer-focus:dark:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Details</label>
      {ShippingForm.errors.details && ShippingForm.touched.details?   <div className="p-2 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-300 dark:bg-gray-800 dark:text-red-400" role="alert">
  {ShippingForm.errors.details}
  </div>:null}
    </div>
   
    <div className="relative z-0 w-full mb-5 group">
      <input type="tel" onBlur={ShippingForm.handleBlur} value={ShippingForm.values.phone} onChange={ShippingForm.handleChange} name="phone" id="phone" className="block py-2.5 px-0  w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-rose-300 focus:outline-none focus:ring-0 focus:border-rose-300 peer" placeholder=" " required />
      <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-600 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-rose-600 peer-focus:dark:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">phone</label>
      {ShippingForm.errors.phone && ShippingForm.touched.phone?   <div className="p-2 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-300 dark:bg-gray-800 dark:text-red-400" role="alert">
  {ShippingForm.errors.phone}
  </div>:null}
    </div>
   
    <div className="relative z-0 w-full mb-5 group">
      <input type="text" onBlur={ShippingForm.handleBlur} value={ShippingForm.values.city} onChange={ShippingForm.handleChange} name="city" id="city" className="block py-2.5 px-0  w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-rose-300 focus:outline-none focus:ring-0 focus:border-rose-300 peer" placeholder=" " required />
      <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-600 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-rose-600 peer-focus:dark:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">City</label>
      {ShippingForm.errors.city && ShippingForm.touched.city?   <div className="p-2 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-300 dark:bg-gray-800 dark:text-red-400" role="alert">
  {ShippingForm.errors.city}
  </div>:null}
    </div>
  
   
 <div className="flex justify-between">
 {IsCallApi?<div className=' flex justify-end  ' >
  <div className='bg-rose-400 p-2 dark:bg-gray-600 rounded'>
  <DotLoader
    size={30}
    speedMultiplier={3}
  />
  </div>
  
  </div>:  <button type="submit" className="text-white bg-rose-400 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm  block  px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-rose-400 dark:focus:ring-gray-500">Pay Now</button>
  }

  </div> 
  {/* {IsCallApi?<div className=' flex justify-end  ' >
  <div className='bg-rose-400 p-2 dark:bg-gray-600 rounded'>
  <DotLoader
    size={30}
    speedMultiplier={3}
  />
  </div>
  
  </div>:  <button type="submit" className="text-white bg-rose-400 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm  block  ms-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-rose-400 dark:focus:ring-gray-500">Pay Now</button>
  }
  {IsCallApi?<div className=' flex justify-end  ' >
  <div className='bg-rose-400 p-2 dark:bg-gray-600 rounded'>
  <DotLoader
    size={30}
    speedMultiplier={3}
  />
  </div>
  
  </div>:  <button type="submit" className="text-white bg-rose-400 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm  block  ms-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-rose-400 dark:focus:ring-gray-500">Check Out</button>
  } */}

  
  </form>
  
      </div>
      </div>
  
  
  
  
      </>
  )
}
