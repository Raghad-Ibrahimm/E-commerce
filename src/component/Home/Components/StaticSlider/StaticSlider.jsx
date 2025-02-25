import React from 'react'
import style from "./StaticSlider.module.css"
import Slider from 'react-slick';
import slide1 from "../../../../assets/images/slider-image-1.jpeg"
import slide2 from "../../../../assets/images/slider-image-2.jpeg"
import slide3 from "../../../../assets/images/slider-image-3.jpeg"
export default function StaticSlider() {


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className='container mx-auto'>
   <div className='p-8  flex my-11'>
   <div className='w-full sm:w-[70%] mx-auto text-center'>
    <h1 className='text-2xl font-semibold text-rose-400 my-4'> From our product <i className="fa-regular fa-images"></i> </h1>
<Slider {...settings}>
<img src={slide1} alt="" />
<img src={slide2} alt="" />
<img src={slide3} alt="" />

</Slider>
</div>


   </div>

    </div>
  )
}
