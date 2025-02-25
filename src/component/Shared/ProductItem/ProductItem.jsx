import React, {  useState } from 'react'
import style from "./ProductItem.module.css"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { SyncLoader } from 'react-spinners'
import { toast } from 'react-toastify'


export default function ProductItem({product,addProductToCart ,addTowishCart}) {
 
let [isLoad,setLoad] = useState(false)
let [Load,setLodd] = useState(false)


async function add_wish_cart(_id) {
try {
  setLodd(true)
  const res = await addTowishCart(_id)
 setLodd(false)
  toast("Product added successfully to your wishlist",{position:"top-center" });
} catch (error) {

}
}

async function add_Product(_id) {
try {
  setLoad(true)
  const res = await addProductToCart(_id)
 setLoad(false)
} catch (error) {

}
}



const {_id}=product

  return (
    <>

    <div className=' bg-gray-100 rounded border-1 border-rose-300 my-4 sm:w-1/2 md:my-0  md:w-1/5 lg:w-1/5 xl:w-1/6 hover:shadow-xl shadow-rose-200'>
<Link to={`/ProductDetails/${product.id}/${product.category._id}`}>
 <div className="flex justify-between border-rose-300 border-b-1 p-1 px-3 ">
  <span className='text-rose-500 font-semibold'>{product.price} EGP</span>
  <span className='text-gray-400'>{product.ratingsAverage}  <span className='text-amber-400'><i className="fa-solid fa-star"></i></span></span>
 </div>
 <img src={product.imageCover} alt="" />
 <div className=' p-2 '>

 <span className='text-rose-500 font-bold block text-center border-b-1 border-rose-300'>{product.category.name}</span>
 <span className='border-b-2 border-rose-300 max-w-50 italic border-dotted my-2'>{product.title.split(" ").splice(0,2).join(" ")} </span>
 </div></Link>
  {/*  take 2 word from title  */}
<div className=' flex justify-between px-3 align-center pb-2'>  

{Load === true ?    
<button  className=' flex justify-center p-1.5 text-2xl rounded hover:bg-rose-400  duration-700 ' >  <SyncLoader size={5} /> </button>: 
<button onClick={()=>{ add_wish_cart(_id)}} className='rounded hover:bg-rose-400 p-1.5 duration-700' ><i className=" fa-regular fa-xl fa-heart"></i></button>}






{isLoad === true ? <button className=' flex justify-center text-2xl rounded hover:bg-rose-400  duration-700 ' >  <SyncLoader size={5} /> </button> : 
  <button onClick ={ ()=>add_Product(_id)}
   className='  flex justify-center text-2xl rounded hover:bg-rose-400 p-1.5 duration-700 ' >
    <i className="fa-solid fa-cart-plus"></i></button>}
    
</div>
</div>



    </>
  )
}
