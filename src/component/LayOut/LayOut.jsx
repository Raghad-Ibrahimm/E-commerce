import React from 'react'
import style from "./LayOut.module.css"
import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
export default function LayOut() {
  return (
    <>
<NavBar/>
<Outlet/>
<Footer/>

    </>
  )
}
