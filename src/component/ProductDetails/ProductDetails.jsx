import React, { useContext, useEffect, useState } from 'react'
import style from "./ProductDetails.module.css"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import RelatedProduct from './component/RelatedProduct/RelatedProduct'
import Slider from 'react-slick'
import { GridLoader, SyncLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { wishListContext } from '../../Context/WishListContext'
import { cartContext } from '../../Context/CartContext'


export default function ProductDetails() {
  const [details,setDetails] =useState(null)
    const [isLoder,setIsLoder] =useState(false)
   const {addToCart} = useContext(cartContext) 
   const{addToWishList} = useContext(wishListContext)
  const {id,catecoryId} = useParams()
  const [isLod,setIsLod] =useState(false)

const[isllod,setlllod]= useState(false)





 async function addToWishlist(id) {
try {
  
  setlllod(true)
  await addToWishList(id)
  toast(`Product added successfully to your wishlist`,{position:"top-center"});
} catch (error) {
  
  console.log(error);
  
}
finally{
  setlllod(false)
}

  }

  async function addProductToCart(id) {
  setIsLod(true)
  const isState =  await addToCart(id)
  console.log(isState);
  setIsLod(false)
     if (isState.status == "success") {
           toast(`${isState.message}`,{position:"top-center", type:"success" });
     }else{
      toast(`${isState.message}`,{position:"top-center", type:"error" });
     }
  }

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: false,
  };


 async function getProductRelaterd() {
try {
  setIsLoder(true)
 let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
 setDetails(data.data)
} catch (error) {
  console.log(error);
  
}

finally{
  setIsLoder(false)
}
  }

 useEffect(()=>{
  getProductRelaterd()
 },[id]);

  return (
  <>
    <div className=' container mx-auto'>
   {isLoder == true ? <div className='flex justify-center items-center pt-30'><GridLoader color="#FCE7C8" size={39}/></div> : 
   
   <div className="flex mt-12   border-rose-400 border-2 flex-col sm:flex-row sm:items-center  rounded     shadow-2xl m-5 shadow-rose-200 ">
      <div className='w-1/3 container mx-auto'>

      <div className='w-full'> 
      <Slider {...settings}>
   {details?.images.map((sur,index)=> <img key={index}  src={sur} className='w-full mb-8 sm:mb-0' alt="" />  )}
   </Slider>
      </div>

      </div>
      <div className="w-full   px-5 mt-3 sm:mt-0 sm:p-5 md:py-4 lg:py-1">
      <div className=' flex justify-between items-center '>     
  <h5 className='inline-block  border-b-2  text-2xl font-bold italic text-rose-400 '>{details?.title}</h5>
    <span className='font-semibold'><i className=" text-amber-300 fa-solid fa-star"></i> {details?.ratingsAverage}</span>
   </div>
        <p className='font-medium text-gray-800 my-3 text-center lg:my-10 xl:my-12 lg:pt-12 text-[1.2rem] '>{details?.description}</p>
        <span className='text-rose-400 my-1 block italic text-2xl  '>{details?.category.name}</span>
       <div className='flex justify-between  mt-4 mb-2 p-1 items-center  lg:pt-8'>
       <span className='font-semibold'>{details?.price}  EGP</span>
       { isllod === true ? <button className=' flex justify-center text-2xl rounded hover:bg-rose-400 p-1.5 duration-700 ' >  <SyncLoader size={5} /> </button> :
       <button onClick={()=>addToWishlist(details.id)} className='rounded hover:bg-rose-400 p-1.5 duration-700' ><i className="fa-regular fa-xl fa-heart"></i></button>}
    
    
       { isLod === true ? <button className=' flex justify-center text-2xl rounded hover:bg-rose-400 p-1.5 duration-700 ' >  <SyncLoader size={5} /> </button> : 
  <button onClick ={ ()=>addProductToCart(details.id)}
   className='  flex justify-center text-2xl rounded hover:bg-rose-400 p-1.5 duration-700 ' >
    <i className="fa-solid fa-cart-plus"></i></button> }  
   </div>
  </div>
  </div>
   
   }
   
  
    </div>
    <h2 className=' mx-8 my-20 font-bold text-2xl italic text-rose-400 text-center'>Related Product :</h2>
    <RelatedProduct catecoryId={catecoryId} productId={id} />
  </>
  )
}
