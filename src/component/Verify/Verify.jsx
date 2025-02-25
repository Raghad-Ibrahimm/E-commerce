import React, { useContext, useState } from 'react'
import style from "./Verify.module.css"
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { DotLoader } from 'react-spinners'
import { forgetContext } from '../../Context/ForgetContext'
import { Link, useNavigate } from 'react-router-dom'
export default function Verify() {
  
const{VerifyCode}=useContext(forgetContext)
  let [IsCallApi,setcallApi] = useState(false)
    let [Apierror,setApierror] = useState(null)
    let navigate =useNavigate()
    const initialValues ={
      resetCode:"",
    }
  const validationSchema =Yup.object().shape({
    resetCode:Yup.string().required("Required"),
  });
   const verifyForm = useFormik({
      initialValues,
      validationSchema,
      onSubmit:verify
  
    });
   // navigate('/reset')

async function verify(values){
setcallApi(true)
 return await VerifyCode(values)
    .then((x)=> 
      
    navigate('/reset')
      
     )
       .catch((err)=> err)
        
         
  };



  return (
    <>
    <div className='bg-rose-50 dark:bg-gray-900'>
    <div className="container mx-auto py-[98px] ">
   
    <form onSubmit={verifyForm.handleSubmit}  onChange={verifyForm.handleChange} className="w-[80%] md:w-1/2 mx-auto bg-rose-50  px-5 py-6 rounded shadow-2xl dark:shadow-rose-300 ">
    {Apierror?   <div className="p-2 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-300 dark:bg-gray-800 dark:text-red-400" role="alert">
{Apierror}
</div>:null}
    <h1 className='text-2xl mb-8 font-bold'> Verify Code:</h1>

<p className='mb-7'> - Reset code sent to your email </p>
<Link className='text-red-500 inline-block mb-6 italic border-b-2' to={'https://mail.google.com/mail/u/0/#inbox'} >Check your email</Link>
 
  <div className="relative z-0 w-full mb-5 group">
    <input type="text" onBlur={verifyForm.handleBlur} value={verifyForm.values.resetCode} onChange={verifyForm.handleChange} name="resetCode" id="resetCode" className="block py-2.5 px-0  w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-rose-300 focus:outline-none focus:ring-0 focus:border-rose-300 peer" placeholder=" " required />
    <label htmlFor="resetCode" className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-600 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-rose-600 peer-focus:dark:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Code Verify</label>
    {verifyForm.errors.resetCode && verifyForm.touched.resetCode?   <div className="p-2 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-300 dark:bg-gray-800 dark:text-red-400" role="alert">
{verifyForm.errors.resetCode}
</div>:null}
  </div>

<Link to={'/forgotPasswords'} className='italic '>Send again</Link>

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
