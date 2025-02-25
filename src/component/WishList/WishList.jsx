import React, { useContext, useEffect, useState } from 'react'
import style from "./WishList.module.css"
import { wishListContext } from '../../Context/WishListContext'
import { tokenContaxt } from '../../Context/TokenContext'
import { BeatLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
export default function WishList() {

const[isLoad,setLoad]=useState(false)
const {getWishList,item,wishCounter,deleteItem_WishList} =useContext(wishListContext)
const {token}=useContext(tokenContaxt)

async function getallWish() {
  setLoad(true)
 const res = await getWishList()
 setLoad(false)
 
}

async function delete_Wish(id) {
  try {
    setLoad(true)
 const res = await deleteItem_WishList(id);

  toast("Product removed successfully to your wishlist",{position:"top-left" });
  } catch (error) {
  }
  finally{
    setLoad(false)
  }
}


  useEffect(()=>{
  token && getallWish()
   },[item]);
  return (
    <>
 
    <div className="container mx-auto my-8">
         {isLoad != true ? <div className=' ms-90 w-[90%] '><BeatLoader color="#ffc4c4" size={20}/></div>:""} 
         {item?.length === 0 ? <div className='text-center shadow-rose-300 p-3 shadow-2xl mb-6'> <h1 className=' font-bold m-6 text-red-500'>Empty wish list Go shoping   <Link className='text-black italic font-light' to={'/Products'}>[ Shopping Now]</Link>   </h1> </div>
:  <><div className="mx-9 relative overflow-x-auto shadow-md sm:rounded-lg">
<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr>
      <th scope="col" className="px-16 py-3">
        <span className="sr-only">Image</span>
      </th>
      <th scope="col" className="px-6 py-3">
        Product
      </th>
  
      <th scope="col" className="px-6 py-3">
        Price
      </th>
      <th scope="col" className="px-6 py-3">
        Action
      </th>
    </tr>
  </thead>
 
  <tbody>

    {item?.map((item)=>  <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="p-4">
        <img src={item.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {item.title}
      </td>
     
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {item.priceAfterDiscount? <span className='text-red-500'>{item.priceAfterDiscount} Sale</span>:  <span>{item.price}$</span>}
     
       
       
      </td>
      <td className="px-6 py-4">
        <span onClick={()=>delete_Wish(item.id)}  className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</span>
      </td>
    </tr> )}
  
  </tbody>
</table>
</div>
<div className='ps-8'>
<p className='font-bold p-2'>Num Of Product  [{wishCounter}]</p>
</div>  </> } 


    </div>
    </>
  )
}
