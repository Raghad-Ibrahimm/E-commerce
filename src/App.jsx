import { useContext, useEffect} from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider  } from 'react-router-dom'
import LayOut from './component/LayOut/LayOut'
import Brands from './component/Brands/Brands'
import Cart from './component/Cart/Cart'
import Categories from './component/Categories/Categories'
import Home from './component/Home/Home'
import Login from './component/Login/Login'
import NotFound from './component/NotFound/NotFound'
import Products from './component/Products/Products'
import Register from './component/Register/Register'
import { tokenContaxt } from './Context/TokenContext'
import ProtectedRoutes from './component/ProtectedRoutes/ProtectedRoutes'
import { Auth } from './component/Auth/Auth'
import ProductDetails from './component/ProductDetails/ProductDetails'
import { ToastContainer } from 'react-toastify'
import CheckOut from './component/CheckOut/CheckOut'

import WishList from './component/WishList/WishList'
import ForgetForm from './component/ForgetForm/ForgetForm'
import Verify from './component/Verify/Verify'
import ResetPassword from './component/ResetPassword/ResetPassword'
import Orders from './component/orders/Orders'


//roroibrahim1999@gmail.com
//Raghad123

function App() {

let {setToken} = useContext(tokenContaxt)
 useEffect(()=>{
if (localStorage.getItem("userToken")) {
  setToken(localStorage.getItem("userToken"))
}

 },[])

 let routs = createBrowserRouter([
  {path:"",element:<LayOut/>, children:[
    {path:"",element:<ProtectedRoutes>  <Home /></ProtectedRoutes> },
    {path:"home",element:<ProtectedRoutes>  <Home /></ProtectedRoutes> },
    {path:"Categories",element:<ProtectedRoutes>    <Categories/>  </ProtectedRoutes>},
    {path:"Cart",element:<ProtectedRoutes><Cart/></ProtectedRoutes> },
    {path:"ProductDetails/:id/:catecoryId",element:<ProtectedRoutes><ProductDetails /></ProtectedRoutes> },
    {path:"Brands",element:<ProtectedRoutes><Brands/></ProtectedRoutes>},
    {path:"Login",element:<Auth><Login/></Auth>},
    {path:"forgotPasswords",element:<Auth><ForgetForm /></Auth>},
    {path:"Register",element:<Auth><Register/></Auth> },
    {path:"Verify",element:<Auth><Verify/></Auth> },
    {path:"reset",element:<Auth><ResetPassword/></Auth> },
    {path:"Products",element:<ProtectedRoutes><Products/></ProtectedRoutes>},
    {path:"CheckOut",element:<ProtectedRoutes><CheckOut /></ProtectedRoutes>},
    {path:"allorders",element:<ProtectedRoutes> <Orders />  </ProtectedRoutes>},
    {path:"wishlist",element:<ProtectedRoutes><WishList /></ProtectedRoutes>},

   

    {path:"*",element:<ProtectedRoutes><NotFound/></ProtectedRoutes>},
  ]}
])
  return (
    <>

<RouterProvider router={routs}/>
<ToastContainer />
    </>
  )
}

export default App
