import React, { useContext, useEffect, useState } from 'react'
import style from "./Cart.module.css"

import { BeatLoader, GridLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { tokenContaxt } from '../../Context/TokenContext'
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext'





export default function Cart() {
 const {upDateProduct,totalCartPrice,deleteProduct,getCart,clearProduct,setcount}= useContext(cartContext)
 const {cart} =useContext(cartContext)
 const {token}=useContext(tokenContaxt)
 const {setNumOfCartItems,NumOfCartItems } =useContext(cartContext) 
 const [isLoder,setIsLoder] =useState(false)
 


async function getAllCart() {
  try {
    setIsLoder(true)
    const res = await getCart()
 
    setcount(res)
  } catch (error) {
    console.log(error);
    
  }
 
 finally{
  setIsLoder(false)
 }
}


async function clearAllCart() {
  try {
setIsLoder(true)
    let res = await clearProduct()


getAllCart()
  } catch (error) {
    console.log(error);
    
  }
  finally{
    setIsLoder(false)
  }
};

 useEffect(()=>{
 token && getAllCart()
 },[]);

async function deleteItem(id){
setIsLoder(true)
 const data = await deleteProduct(id)
 setNumOfCartItems(data?.numOfCartItems)


  if (data.status == "success") {
            toast("Product deleted successfully",{position:"bottom-left" });
            setIsLoder(false)
            getAllCart()
            setNumOfCartItems(data.numOfCartItems)
      } 
      else{
       toast("Error delete product",{position:"top-left", type:"error" });
      }

 }

async function upDateItem(id ,count){
  try {

    const res = await upDateProduct(id ,count)
   
toast("successfully",{position:"top-left" });

  } catch (error) {
    console.log(error);

  }

 }


  return (
    <>
<div className="container mx-auto my-10 px-6">







   {isLoder == true ?<div className=' flex justify-center items-center my-2'><BeatLoader color="#FCE7C8" size={20}/></div> :null}
 
   {cart?.length === 0 ? <div className='text-center shadow-rose-300 p-3 shadow-2xl mb-6'> <h1 className='text-2xl font-bold m-6 text-red-500'>Empty Cart Go shoping !!!   <Link className='text-black italic font-light' to={'/Products'}>Shopping Now</Link>   </h1> </div>
:  <> <div className="relative  overflow-x-auto shadow-md sm:rounded-lg">
<table className="w-full  mx-auto  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
  <thead className="text-xs    text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr>
      <th scope="col" className="px-16 py-3">
        <span className="sr-only">Image</span>
      </th>
      <th scope="col" className="px-6 py-3">
        Product
      </th>
      <th scope="col" className="px-6 py-3">
        Qty
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


  {cart?.map( item => <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
               <td className="p-4">
                  <img src={item?.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch"/>
             </td>
               <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item?.product.title}
               </td>
               <td className="px-6 py-4">
                   <div className="flex items-center">
                      <button  onClick={()=> upDateItem(item?.product.id,item.count - 1)}  className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                         <span className="sr-only">Quantity button</span>
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                               <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M1 1h16"/>
                          </svg>
                    </button>
                       <div>
                           <span>{item.count}</span>
                      </div>
                       <button onClick={()=> upDateItem(item?.product.id,item.count + 1)}  className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                           <span className="sr-only">Quantity button</span>
                           <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"  d="M9 1v16M1 9h16"/>                            </svg>
                       </button>
                   </div>
               </td>
               <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{item.price} $
              </td>
              <td className="px-6 py-4">
                   <span onClick={()=> deleteItem(item.product.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</span>
             </td>
          </tr>  )}
  </tbody>



</table>

  <div className="flex m-5 justify-between ">
   <h2 className=' font-bold '> Total product num :  <span className='text-rose-500'> [{NumOfCartItems}]</span></h2>
   <h2 className='font-bold '> Total price :  <span className='text-rose-500'> [{totalCartPrice}]</span></h2>

 </div >
 <div className=' flex justify-between py-5 px-3'>
 <button onClick={()=> clearAllCart()} className=' outline-2 outline-red-500 p-3 rounded font-bold hover:bg-red-500  '>Clear All Cart</button>
 <Link to={'/CheckOut'} className=' outline-2 outline-green-300 p-3 rounded font-bold hover:bg-green-200  '>Check out</Link>
 </div>  

</div> </> } 

  


</div>
    </>
  )
}

