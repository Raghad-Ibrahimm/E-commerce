import { createContext, useContext, useEffect, useState } from "react";
import { tokenContaxt } from "./TokenContext";
import axios from "axios";
import { toast } from "react-toastify";

export const cartContext =createContext()




export default function CartContextProvider({children}) {

    const [NumOfCartItems,setNumOfCartItems] = useState(0)
    const [totalCartPrice,settotalCartPrice]=useState(0)
    const [count,setcount] = useState(null)
   
    const [cart,setcart] = useState(null)
    const [cartId,setCartId] = useState("")
    
    const {token} = useContext(tokenContaxt)

const API_URL_cart =`https://ecommerce.routemisr.com/api/v1/cart`
const API_URL_order =`https://ecommerce.routemisr.com/api/v1/orders`
const headers ={
    token
}




async function addToCart(productId) {
   
try {
  let {data} = await axios.post(API_URL_cart,{productId},{ headers });

  if (data.status == "success") {
    setNumOfCartItems(data.numOfCartItems)
    }

  setCartId(data.data._id)
    
  
   
    return data;
} catch (error) {
  
}
}


async function getCart() {
  try {

const data = await axios.get(API_URL_cart,{headers})

if (data.data.status == "success") {
  setcart(data.data.data.products)
setcount(data.data)

setNumOfCartItems(data.data.numOfCartItems)
settotalCartPrice(data.data.data.totalCartPrice)

}
  } catch (res) {
    if (res.response.data.message) {
        toast(`${res.response.data.message}`,{position:"top-center" });
   
    }
  
  }
}


useEffect(()=>{
   token && getCart()
  },[]);
  

async function onLinePayment(shippingAddress) {

return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5174`,{
    shippingAddress
   },{headers})
.then((res)=>res)
.catch((erro)=>erro)

  
}

async function cash(shippingAddress) {
try {
  
 let {data} =await axios.post(`${API_URL_order}/${cartId}`,{
    shippingAddress
   },{headers})
   console.log(data);
  
  if (data.status == 'success') {
    getCart()
  }
} catch (error) {
  
}


  
   
}

async function deleteProduct(id) {

  const {data} = await axios.delete(`${API_URL_cart}/${id}`,{ headers });

  
  if (data.status == "success") {
    setNumOfCartItems(data.numOfCartItems)
    
    }


  return data;
  
  
}

async function clearProduct() {

  const {data} = await axios.delete(API_URL_cart,{ headers });
  
  return data;
  
}
async function upDateProduct(id ,count) {

  const {data} = await axios.put(`${API_URL_cart}/${id}`,{

    count : count
  },{ headers });

  
  if (data.status == "success") {
  
setNumOfCartItems(data.numOfCartItems)
    
   getCart()

    }

}

  return (
    <cartContext.Provider value={{NumOfCartItems,totalCartPrice,setcart,cart,count,setcount,onLinePayment,cash,clearProduct, upDateProduct, setNumOfCartItems,addToCart,getCart,deleteProduct}}>


      {children}


    </cartContext.Provider>
  )
}
