import { Navigate } from "react-router-dom";

export function Auth(props) {
    if (localStorage.getItem("userToken")) {
        return <Navigate to={'/home'}/>
    }else{
        return props.children
    }



}