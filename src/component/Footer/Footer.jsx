import React from 'react'
import style from "./Footer.module.css"
import { Link } from 'react-router-dom'
export default function Footer() {
  return (
    <footer>
<div className='bg-[#FFA1AD] text-center' >
<ul className='flex gap-7 justify-center items-center py-8 ' >
  <Link className='text-white hover:text-rose-600' to={'https://www.facebook.com/share/1BHUNMPRQ4/'}><i className="fa-brands fa-2xl fa-facebook-f"></i></Link>
  <Link className='text-white hover:text-rose-600' to={'https://www.instagram.com/raghad_alrfaey?igsh=MW95dzFiMTVhMGJ4NA=='} ><i className="fa-brands fa-2xl fa-instagram"></i></Link>
  <Link className='text-white hover:text-rose-600' to={'https://www.tiktok.com/@raghadalrfaey?_t=ZS-8u1YxHnioC8&_r=1'}>  <i className="fa-brands fa-2xl fa-tiktok"></i></Link>
  <Link className='text-white hover:text-rose-600' to={'https://www.snapchat.com/add/raghad7582?share_id=MQhIU-S2TCU&locale=en-US'}>   <i className="fa-brands fa-2xl fa-snapchat"></i></Link>
</ul>
<div className='pb-5'>
<h1 className='text-gray-800 font-semibold'>All right reserved for "Raghad_Alrfeay"</h1>
</div>
</div>
    </footer>
  )
}
