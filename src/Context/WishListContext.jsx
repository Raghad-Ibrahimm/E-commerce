import { createContext, useContext, useEffect, useState } from "react";
import { tokenContaxt } from "./TokenContext";
import axios from "axios";

export const wishListContext =createContext()


export default function WishListContextProvider({children}) {
    const [wishCounter,setWishCouner]=useState(0)
const [item,setitem] = useState([])
   const {token} = useContext(tokenContaxt)

const API_URL_wish =`https://ecommerce.routemisr.com/api/v1/wishlist`
const headers ={
    token
}


async function addToWishList(productId) {
   const {data} = await axios.post(API_URL_wish,{productId},{
        headers
    })
    console.log(data);
    
}




async function getWishList() {
  try {
   const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
      headers
  })
   setitem(data.data)
   setWishCouner(data.count)
   
  } catch ({response}) {
    console.log(response.data);
    
  }
}
async function deleteItem_WishList(id) {
  try {
    const {data} = await axios.delete(`${API_URL_wish}/${id}`,{
      headers
  })
  console.log(data);

  } catch (error) {
    console.log(error);
    
  }

}

useEffect(()=>{
token && getWishList()
  },[]);
  



  return (
    <wishListContext.Provider value={{wishCounter,deleteItem_WishList,item,setitem,setWishCouner,getWishList,addToWishList}}>
        {children}
    </wishListContext.Provider>
  )
}
