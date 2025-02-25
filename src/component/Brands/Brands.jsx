import React, { useEffect, useState } from 'react'
import style from "./Brands.module.css"
import axios from 'axios'
import { GridLoader } from 'react-spinners'

export default function Brands() {
const [brands,setBrands] =useState([])
const [isload,setload] =useState(false)
const [errormes,setmes] =useState("")
async function getAllBrand() {
  try {
    setload(true)
 let {data} =  await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)

 setBrands(data.data)

 setmes("")
  } catch (error) {
    setmes(error.message)
   
    
  }
  finally{
    setload(false)
  }
}

useEffect(()=>{
  getAllBrand()
   },[]);

  return (
    <> 
    <div className="container mx-auto my-12">
      
{errormes ? <p className='text-red-500 font-bold ms-78 w-[50%] '>{errormes}</p> :null}

    {isload == true &&  <div className='flex justify-center items-center py-35'> <GridLoader color="#ffb9b9"size={29}/>   </div>}
      <div className="flex flex-wrap gap-7 m-3">

    {brands?.map((brand)=><div key={brand._id} className=" w-[80%] mx-auto max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
  <div className="flex justify-end px-4 pt-4">
  </div>
  <div className="flex flex-col  items-center pb-10">
    <img className="w-full h-50 mb-3 rounded shadow-lg" src={brand.image} alt="Bonnie image" />
    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{brand.name}</h5>
  </div>
</div>   )}  


      </div>
    </div>




    
    </>
  )
}
