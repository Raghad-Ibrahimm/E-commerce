import React, { useContext } from 'react'
import style from "./NavBar.module.css"

import { Link, NavLink, useNavigate } from 'react-router-dom'

import { tokenContaxt } from '../../Context/TokenContext'

import { wishListContext } from '../../Context/WishListContext'
import { cartContext } from '../../Context/CartContext'

export default function NavBar() {
  const {wishCounter} =useContext(wishListContext)
  const {token,setToken} =useContext(tokenContaxt)
  const {NumOfCartItems} =useContext(cartContext)

 
let navigate = useNavigate()
  function LogOut() {
    //remove localstorage
    localStorage.removeItem("userToken")
    //set token null
    setToken(null)
    //navigate login
    navigate("/Login")
  }

 


  return (
<>







<nav className="bg-rose-300 border-gray-200 dark:bg-slate-600 ">
  <div className="container mx-auto">
  <div className="max-w-screen-xl flex flex-wrap items-center gap-4 justify-evenly mx-auto py-3">
    <div>
    <NavLink to={"home"} className="flex items-center space-x-3 rtl:space-x-reverse">
    <i className="fa-solid fa-cart-shopping text-white fa-2xl fa-fade"></i>
        <span className="self-center text-white text-2xl font-semibold whitespace-nowrap dark:text-white">R&A Store</span>
    </NavLink>
    </div>
<div> 
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">

      {token?   <ul className="font-medium flex absolute start-0 top-[50px] z-[999]  md:relative md:top-0 mx-8 a  s p-2 end-0  flex-col  md:p-0  border bg-gray-600 md:bg-transparent border-gray-600 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-rose-200 md:dark:bg-transparent dark:border-rose-400">
      <li>
        <NavLink to={"home"} className="block py-2 px-3 text-rose-400 hover:bg-gray-300 md:hover:bg-transparent rounded-sm md:bg-transparent  md:text-white md:p-0   md:hover:text-gray-700 dark:text-gray-700 md:dark:hover:text-rose-400 md:dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" aria-current="page">Home</NavLink>
      </li>
      <li>
        <NavLink to={"Cart"} className="block py-2 px-3 text-rose-400 rounded-sm hover:bg-gray-300 md:hover:bg-transparent md:border-0 md:text-white md:hover:text-gray-700 md:p-0 dark:text-gray-700 md:dark:hover:text-rose-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:text-white md:dark:hover:bg-transparent ">
 Cart  </NavLink>
      </li>
  
      <li>
        <NavLink to={"Brands"}  className="block py-2 px-3 text-rose-400 rounded-sm hover:bg-gray-300 md:hover:bg-transparent md:border-0  md:text-white md:hover:text-gray-700 md:p-0 dark:text-gray-700 md:dark:hover:text-rose-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:text-white md:dark:hover:bg-transparent ">Brands</NavLink>
      </li>
  
      <li>
        <NavLink to={"allorders"}  className="block py-2 px-3 text-rose-400 rounded-sm hover:bg-gray-300 md:hover:bg-transparent md:border-0  md:text-white md:hover:text-gray-700 md:p-0 dark:text-gray-700 md:dark:hover:text-rose-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:text-white md:dark:hover:bg-transparent ">Order</NavLink>
      </li>
      <li>
        <NavLink to={"Categories"} className="block py-2 px-3 text-rose-400 rounded-sm hover:bg-gray-300 md:hover:bg-transparent md:border-0 md:text-white md:hover:text-gray-700 md:p-0 dark:text-gray-700 md:dark:hover:text-rose-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:text-white md:dark:hover:bg-transparent">Categories</NavLink>
      </li>
      <li>
        <NavLink to={"Products"} className="block py-2 px-3 text-rose-400 rounded-sm hover:bg-gray-300 md:hover:bg-transparent md:border-0 md:text-white md:hover:text-gray-700 md:p-0 dark:text-gray-700 md:dark:hover:text-rose-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:text-white md:dark:hover:bg-transparent">Products</NavLink>
      </li>
    </ul>:""}
 
  </div></div>

    {/* done registration */}
    <div>
      <ul className='flex gap-x-3'>
        {token?     <>
         
           <Link to={'/wishlist'} className='relative mx-1'><span  className={"dark:text-white    text-white hover:text-gray-600 dark:hover:text-rose-400"} ><i className="fa-solid fa-heart fa-2xl fa-fade "></i> 
            <span className='text-rose-500 font-semibold absolute top-[-7px] right-[-9px] shadow-red-800 bg-gray-00  shadow px-1.5 rounded-2xl'> {wishCounter} </span>
            </span></Link>
         
           <Link to={'Cart'} className='relative'><span  className={"dark:text-white    text-white hover:text-gray-600 dark:hover:text-rose-400"} ><i className="fa-solid fa-bag-shopping fa-2xl fa-shake"></i> 
            <span className='text-rose-500 font-semibold absolute top-[-7px] right-[-9px] shadow-red-800 bg-gray-00  shadow px-1.5 rounded-2xl'> {NumOfCartItems} </span>
            </span></Link>
           <li><span onClick={LogOut} className={"dark:text-white    text-white hover:text-gray-600 dark:hover:text-rose-400"} >SignOut </span></li></>
: <>
        <li><NavLink to={"Register"} className={"dark:text-white   text-white hover:text-gray-600 dark:hover:text-rose-400"} >Register </NavLink></li>
        <li><NavLink to={"login"} className={"dark:text-white   text-white hover:text-gray-600 dark:hover:text-rose-400"} >Login </NavLink></li>
</>}
      </ul>
    </div>
 {/*  */}
    <button data-collapse-toggle="navbar-default" type="button" className="my-m mx-0.5 inline-flex items-center  w-75h-7 sm:w-10 sm:h-10 sm:p-2 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-3 h-3 sm:w-5 sm:h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
  
  </div>


</nav>



</>
  )
}

