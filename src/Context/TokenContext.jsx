import { createContext, useState } from "react";

export let tokenContaxt = createContext();


export default function TokenContextProvider(props) {


const [token,setToken]=useState(null)

    return<>
    
    <tokenContaxt.Provider value={{token,setToken}}>
        {props.children}
    </tokenContaxt.Provider>
    
    </>
    
}