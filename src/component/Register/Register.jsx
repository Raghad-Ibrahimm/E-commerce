import React, { useState } from 'react'
import style from "./Register.module.css"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { DotLoader, FadeLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'



export default function Register() {
  let [IsCallApi,setcallApi] = useState(false)
  let [Apierror,setApierror] = useState(null)
  let navigaate = useNavigate()

  const initialValues ={
    name:"",
    email:"",
    password:"",
    rePassword:"",
    phone:"",
  }
const validationSchema =Yup.object().shape({
  name:Yup.string().min(3,"Min length is 3").max(15,"Max length is 15").required("Required"),
  email:Yup.string().email("Invalid email").required("Required"),
  password:Yup.string().matches(new RegExp('^[A-Z][a-z0-9]{6,10}$'),"Invalid password").required('Required'),
  rePassword:Yup.string().oneOf([Yup.ref('password')],'RePassword should match password').required('Required'),
  phone:Yup.string().matches(new RegExp('^01[0125][0-9]{8}$'),"Invalid phone").required('Required'),
});
 const registerForm = useFormik({
    initialValues,
    validationSchema,
    onSubmit:onSubmitRegister

  });

async function onSubmitRegister(values){
try {
    
  setcallApi(true)
  setApierror(null)
let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values);
console.log(data);
setcallApi(false)
navigaate('/Login')
} catch (error) {
  setApierror(error.response.data.message )
  // console.log(error.response.data.message);
  setcallApi(false)
}

};


  return (
    <>
    <div className='bg-rose-50 dark:bg-gray-900'>
    <div className="container mx-auto py-12 ">
   
    <form onSubmit={registerForm.handleSubmit}  onChange={registerForm.handleChange} className="w-[80%] md:w-1/2 mx-auto bg-rose-50  px-5 py-6 rounded shadow-2xl dark:shadow-rose-300 ">
    {Apierror?   <div className="p-2 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-300 dark:bg-gray-800 dark:text-red-400" role="alert">
{Apierror}
</div>:null}
    <h1 className='text-2xl mb-8 font-bold'>Register Now :</h1>


  <div className="relative z-0 w-full mb-5 group">
    <input type="text" name="name" id="name" onBlur={registerForm.handleBlur} value={registerForm.values.name} onChange={registerForm.handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-rose-300 focus:outline-none focus:ring-0 focus:border-rose-300 peer" placeholder=" " required />
    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-600 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-rose-600 peer-focus:dark:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Name</label>
 {registerForm.errors.name && registerForm.touched.name?   <div className="p-2 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-300 dark:bg-gray-800 dark:text-red-400" role="alert">
{registerForm.errors.name}
</div>:null}
  </div>
  <div className="relative z-0 w-full mb-5 group">
    <input type="email" onBlur={registerForm.handleBlur} value={registerForm.values.email} onChange={registerForm.handleChange} name="email" id="email" className="block py-2.5 px-0  w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-rose-300 focus:outline-none focus:ring-0 focus:border-rose-300 peer" placeholder=" " required />
    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-600 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-rose-600 peer-focus:dark:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Email Address</label>
    {registerForm.errors.email && registerForm.touched.email?   <div className="p-2 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-300 dark:bg-gray-800 dark:text-red-400" role="alert">
{registerForm.errors.email}
</div>:null}
  </div>
  <div className="relative z-0 w-full mb-5 group">
    <input type="password" onBlur={registerForm.handleBlur} value={registerForm.values.password} onChange={registerForm.handleChange} name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-rose-300 focus:outline-none focus:ring-0 focus:border-rose-300 peer" placeholder=" " required />
    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-600 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-rose-600 peer-focus:dark:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Password</label>
    {registerForm.errors.password && registerForm.touched.password?   <div className="p-2 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-300 dark:bg-gray-800 dark:text-red-400" role="alert">
{registerForm.errors.password}
</div>:null}
  </div>
  <div className="relative z-0 w-full mb-5 group">
    <input type="password" onBlur={registerForm.handleBlur} value={registerForm.values.rePassword} onChange={registerForm.handleChange} name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-rose-300 focus:outline-none focus:ring-0 focus:border-rose-300 peer" placeholder=" " required />
    <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-600 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-rose-600 peer-focus:dark:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Confirm Password</label>
    {registerForm.errors.rePassword && registerForm.touched.rePassword?   <div className="p-2 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-300 dark:bg-gray-800 dark:text-red-400" role="alert">
{registerForm.errors.rePassword}
</div>:null}
  </div>
  <div className="relative z-0 w-full mb-5 group">
    <input type="tel" onBlur={registerForm.handleBlur} value={registerForm.values.phone} onChange={registerForm.handleChange} name="phone" id="phone" className="block py-2.5 px-0 w-full   text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-rose-300 focus:outline-none focus:ring-0 focus:border-rose-300 peer" placeholder=" " required />
 
    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-600 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-rose-600 peer-focus:dark:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">User Phone</label>
    {registerForm.errors.phone && registerForm.touched.phone?   <div className="p-2 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-300 dark:bg-gray-800 dark:text-red-400" role="alert">
{registerForm.errors.phone}
</div>:null}
  </div>
{IsCallApi?<div className=' flex justify-end  ' >
<div className='bg-rose-400 p-2 dark:bg-gray-600 rounded'>
<DotLoader
  size={30}
  speedMultiplier={3}
/>
</div>

</div>:  <button type="submit" className="text-white bg-rose-400 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm  block  ms-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-rose-400 dark:focus:ring-gray-500">Submit</button>
}

</form>

    </div>
    </div>




    </>
  )
}
