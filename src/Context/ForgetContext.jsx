import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const forgetContext  =  createContext()

export default function ForGetContextProvider(props) {



async function ForgetPass(email){
  return await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,email)
  .then(({data})=>
 console.log(data)
)
  .catch((err)=> err)

 }
async function VerifyCode(verify){
 let x=  await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,verify)
.then((x)=>x)
.catch((err)=> err)
 };
async function ResetPassward(newValue){
  return await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,newValue)
  .then((data)=>
 console.log(data)
)
  .catch((err)=> err)

 }


    return<>
    
    <forgetContext.Provider value={{ForgetPass,VerifyCode,ResetPassward}}>
        {props.children}
    </forgetContext.Provider>
    
    </>
    
}