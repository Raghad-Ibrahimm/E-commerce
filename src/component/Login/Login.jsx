import React, { useContext, useState } from 'react'
import style from "./Login.module.css"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useFormik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { DotLoader } from 'react-spinners'
import { tokenContaxt } from '../../Context/TokenContext'

export default function Login() {
  let [IsCallApi,setcallApi] = useState(false)
  let [Apierror,setApierror] = useState(null)

  let {setToken}=useContext(tokenContaxt)
  let navigaate = useNavigate()

  const initialValues ={
    email:"",
    password:"",
  }
const validationSchema =Yup.object().shape({
  email:Yup.string().email("Invalid email").required("Required"),
  password:Yup.string().matches(new RegExp('^[A-Z][a-z0-9]{6,10}$'),"Invalid password").required('Required'),
});
 const LoginForm = useFormik({
    initialValues,
    validationSchema,
    onSubmit:callLogin

  });
  
async function callLogin(values){
try {
    
  setcallApi(true)
  setApierror(null)
let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values);

setcallApi(false)
localStorage.setItem("userToken",data.token)
setToken(data.token)
navigaate('/')
} catch (error) {
  setApierror(error.response.data.message )
 
  setcallApi(false)
}

};


  return (
    <>
    <div className='bg-rose-50 dark:bg-gray-900 py-10'>
    <div className="container mx-auto py-[55px] ">
   
    <form onSubmit={LoginForm.handleSubmit}  onChange={LoginForm.handleChange} className="w-[80%] md:w-1/2 mx-auto bg-rose-50  px-5 py-6 rounded shadow-2xl dark:shadow-rose-300 ">
    {Apierror?   <div className="p-2 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-300 dark:bg-gray-800 dark:text-red-400" role="alert">
{Apierror}
</div>:null}
    <h1 className='text-2xl mb-8 font-bold'>Login Now :</h1>


 
  <div className="relative z-0 w-full mb-5 group">
    <input type="email" onBlur={LoginForm.handleBlur} value={LoginForm.values.email} onChange={LoginForm.handleChange} name="email" id="email" className="block py-2.5 px-0  w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-rose-300 focus:outline-none focus:ring-0 focus:border-rose-300 peer" placeholder=" " required />
    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-600 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-rose-600 peer-focus:dark:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Email Address</label>
    {LoginForm.errors.email && LoginForm.touched.email?   <div className="p-2 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-300 dark:bg-gray-800 dark:text-red-400" role="alert">
{LoginForm.errors.email}
</div>:null}
  </div>

  <div className="relative z-0 w-full mb-5 group">
    <input type="password" onBlur={LoginForm.handleBlur} value={LoginForm.values.password} onChange={LoginForm.handleChange} name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-rose-300 focus:outline-none focus:ring-0 focus:border-rose-300 peer" placeholder=" " required />
    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-600 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-rose-600 peer-focus:dark:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Password</label>
    {LoginForm.errors.password && LoginForm.touched.password?   <div className="p-2 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-300 dark:bg-gray-800 dark:text-red-400" role="alert">
{LoginForm.errors.password}
</div>:null}
  </div>

  
  <Link to={'/forgotPasswords'} className='font-bold '> forget password? </Link>

{IsCallApi?<div className=' flex justify-end  ' >
<div className='bg-rose-400 p-2 dark:bg-gray-600 rounded'>
<DotLoader
  size={30}
  speedMultiplier={3}
/>
</div>

</div>:  <button type="submit" className="text-white bg-rose-400 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm  block  ms-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-rose-400 dark:focus:ring-gray-500">Login</button>
}

</form>

    </div>
    </div>




    </>
  )
}
