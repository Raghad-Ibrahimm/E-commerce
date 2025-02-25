import React, { useEffect, useState } from 'react'
import style from "./PoplularCategory.module.css"
import axios from 'axios';
import Slider from 'react-slick';
import { BeatLoader, GridLoader } from 'react-spinners';
import { toast } from 'react-toastify';
export default function PoplularCategory() {
  const [isLoder,setIsLoder] =useState(false)
  const [categories,setCategories] =useState([])

 async function getCategory() {

try {
  setIsLoder(true)
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    console.log(data);
    setCategories(data?.data)
} catch (error) {

}
  
 finally{
  setIsLoder(false)
 }
  }

 useEffect(()=>{
 getCategory()
 },[]);

 const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnHover: true
};

  return (
    <>
    <div className="container mx-auto">

      <div className='p-7 my-11  mx-auto md:w-[95%] shadow-2xl '>
      <h1 className='mb-12  text-2xl font-bold text-rose-400 italic'> Shop Poplular Category <i className="fa-solid fa-bag-shopping"></i></h1>   
    

  
    <Slider className='mb-3.5' {...settings}>

    {isLoder == true && <BeatLoader color="#FCE7C8" size={15}/> }
 {categories?.map((image)=>
  
<div key={image._id} > 
<h3  className='text-rose-400 text-center my-3'>{image.name}</h3>
 <img   src={image.image} className={style.cateImg} alt="Product image" />  </div>)}
</Slider> 
      </div> 
    
    </div>

    </>
  )
}
