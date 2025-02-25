import React, { useEffect, useState } from 'react'
import style from "./RelatedProduct.module.css"
import axios from 'axios';
import ProductItem from '../../../Shared/ProductItem/ProductItem';
import { GridLoader } from 'react-spinners';
export default function RelatedProduct(props) {
  let {catecoryId , id}= props;
  const [relatedProduct,setRelatedProduct]=useState([])
  const [isLoder,setIsLoder] =useState(false)
  
  function getProdects() {
setIsLoder(true)
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then(({data})=>{
     
     setRelatedProduct(data.data)
      let res =data.data.filter(product=> product.category._id ==catecoryId)
      
      setRelatedProduct(res)
      setIsLoder(false)
    })
    .catch(error =>{
      console.log(error);
      
    })
    
  }
  
  useEffect(()=>{
  getProdects()
  },[id]);
  return (<>
    <div className="contener mx-auto md:mx-4">

      {isLoder == true ? <div className='  flex justify-center items-center '> <GridLoader size={15} color="#FCE7C8" /></div>  :   <div className=' m-5  md:my-10 md:m-0 md:flex md:flex-wrap md:justify-center md:gap-8'>
    {relatedProduct.map(product => <ProductItem  product={product} key={product._id} />)}
    </div> }

    </div>

    </>
  )
}
