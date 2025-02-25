import React from 'react'
import style from "./NotFound.module.css"
import img from "../../assets/images/err.gif"
export default function NotFound() {
  return (
      <div className='container mx-auto' >
        <img className=' w-full ' src={img} alt="page not faund" />
      </div>
    
  )
}
