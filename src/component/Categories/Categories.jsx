import React, { useEffect, useState } from 'react'
import style from "./Categories.module.css"
import axios from 'axios';
import Slider from 'react-slick';
export default function Categories() {


const [categories,setCategories]=useState(null)
const [Isload,setLoad]=useState(false)



function getCategory() {

      axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  .then(({data})=>{
   console.log(data.data);
   setCategories(data.data)

   

  })
  .catch(error =>{
    console.log(error);
    
  })
  }

 useEffect(()=>{
 getCategory()
 },[]);


 var settings = {
  dots: true,
  infinite: false,
  speed: 1000,
  slidesToShow: 3,
  slidesToScroll: 2,
  initialSlide: 0,
  arrows:false,
};
  return  ( 
<>
    <div className="container mx-auto">
      <div className='mx-auto w-[90%] p-7 my-12 border-2 border-rose-200  shadow-rose-200 shadow-2xl'>
      <Slider {...settings}>
        {categories?.map((cate)=> <div key={cate._id} className='p-3  text-center'>
          <img src={cate.image} className='sm:w-[500px] sm:h-[300px] w-[100px] h-[100px] ' alt="category imge" />
          <h3 className='font-bold my-2 mx-3 text-rose-400' >{cate.name}</h3>
          
        </div>
        )}
      </Slider>
      </div>

     <div className='flex flex-col sm:flex-row justify-between items-center p-12 mb-12'>

     <div>
      <h6 className='font-bold text-[1.5rem] text-rose-500 mb-7'>About our Location</h6>

          <ul>
            <li className='my-2'><i className="fa-solid fa-mobile-screen-button"></i> 0103387295</li>
            <li className='my-2'> <i className="fa-solid fa-location-dot"></i> Alexandria</li>
            <li className='my-2'><i className="fa-solid fa-phone"></i> Hot line</li>

          </ul>




     </div>
    <iframe className="shadow-2xl border-3 my-3.5 sm:w-[70%] sm:h-70 border-rose-300 shadow-rose-200" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3411.0495517990466!2d29.974500074343304!3d31.247051560596944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f5db8a16c3c77d%3A0x24c465e134255814!2sRoute%20IT%20Training%20Center!5e0!3m2!1sen!2seg!4v1739656445624!5m2!1sen!2seg" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />

     
     
     
     </div>
         










    </div>


          
      </>
  )
}
