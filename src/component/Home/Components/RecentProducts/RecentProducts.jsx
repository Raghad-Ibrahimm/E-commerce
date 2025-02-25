import React, { useContext, useEffect, useState } from 'react'
import style from "./RecentProducts.module.css"
import axios from 'axios'
import ProductItem from '../../../Shared/ProductItem/ProductItem';
import {  GridLoader } from 'react-spinners';
// import { cartContext } from '../../../../Context/CartContext';
import { toast } from 'react-toastify';
import { wishListContext } from '../../../../Context/WishListContext';
import { cartContext } from '../../../../Context/CartContext';
export default function RecentProducts() {
  const [products,setProduct] =useState([]);
  const [isLoder,setIsLoder] =useState(false)
  const {addToCart,NumOfCartItems ,setcount} = useContext(cartContext)
  const {addToWishList} = useContext(wishListContext)
  



function getProdects() {
  setIsLoder(true)
  axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  .then(({data})=>{
 
    setProduct(data.data)
    setIsLoder(false)
  })
  .catch(error =>{
    if (error.name == "AxiosError") {
      toast(`${error.message}`,{position:"top-center", type:"error" });
    }
   
    
  })
   
  
};

useEffect(()=>{
getProdects()
},[NumOfCartItems]);

async function addProductToWishCart(id) {

  const data = await addToWishList(id)

}



async function addProductToCart(id) {

  const data = await  addToCart(id)
 
    if (data.status == "success") {
     
      setcount(data)
      
    toast(`${data.message}`,{position:"top-center", type:"success" });
  
   }else{
      toast(`${data.message}`,{position:"top-center", type:"error" });
     }
  }


  return (
    <>
  <div className="container mx-auto">
<div className=' m-5  sm:my-10 md:m-0 flex flex-wrap  sm:justify-center sm:gap-6 '>

{ isLoder == true ?  <div className=' flex justify-center items-center py-35 '><GridLoader color="#FCE7C8" size={39}/></div> : null}
{ products.map(product =>


<ProductItem product={product}  addTowishCart={addProductToWishCart} addProductToCart={addProductToCart} key={product._id} /> 
) }



</div>
  </div>
    </>
  )
}
