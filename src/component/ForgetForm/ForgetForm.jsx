import React, { useContext, useState } from 'react'
import style from "./ForgetForm.module.css"
import * as Yup from 'yup'
import { Formik, useFormik } from 'formik'
import { DotLoader } from 'react-spinners'
import { forgetContext } from '../../Context/ForgetContext'
import { useNavigate } from 'react-router-dom'
export default function ForgetForm() {

  
    let [IsCallApi,setcallApi] = useState(false)
    let [Apierror,setApierror] = useState(null)
    const{ForgetPass}=useContext(forgetContext)
  

let navigate = useNavigate()


    const initialValues ={
      email:"",
    }
  const validationSchema =Yup.object().shape({
    email:Yup.string().email("Invalid email").required("Required"),
  });
   const forgetform = useFormik({
      initialValues,
      validationSchema,
      onSubmit: callApi
  
    });
    

async function callApi(values){
setcallApi(true)
  return await ForgetPass(values) 
    .then((res)=>
     navigate("/Verify")
     )
       .catch((err)=> err)
           
    
  };
  
  
    return (
      <>
      <div className='bg-rose-50 dark:bg-gray-900'>
      <div className="container mx-auto py-[98px] ">
     
      <form onSubmit={forgetform.handleSubmit}  onChange={forgetform.handleChange} className="w-[80%] md:w-1/2 mx-auto bg-rose-50  px-5 py-6 rounded shadow-2xl dark:shadow-rose-300 ">
      {Apierror?   <div className="p-2 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-300 dark:bg-gray-800 dark:text-red-400" role="alert">
  {Apierror}
  </div>:null}
      <h1 className='text-2xl mb-8 font-bold'>Restart Password :</h1>
  
  
   
    <div className="relative z-0 w-full mb-5 group">
      <input type="email" onBlur={forgetform.handleBlur} value={forgetform.values.email} onChange={forgetform.handleChange} name="email" id="email" className="block py-2.5 px-0  w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-rose-300 focus:outline-none focus:ring-0 focus:border-rose-300 peer" placeholder=" " required />
      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-600 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-rose-600 peer-focus:dark:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Email Address</label>
      {forgetform.errors.email && forgetform.touched.email?   <div className="p-2 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-300 dark:bg-gray-800 dark:text-red-400" role="alert">
  {forgetform.errors.email}
  </div>:null}
    </div>
  

  
  {IsCallApi?<div className=' flex justify-end  ' >
  <div className='bg-rose-400 p-2 dark:bg-gray-600 rounded'>
  <DotLoader
    size={30}
    speedMultiplier={3}
  />
  </div>
  
  </div>: <button type="submit" className="text-white bg-rose-400 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm  block  ms-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-rose-400 dark:focus:ring-gray-500">OK</button>
  }
  
  </form>
  
      </div>
      </div>
      </>
    )
  }
  