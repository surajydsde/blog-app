import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = ()=>{
    const user = localStorage.getItem('user')
    return user ? <Outlet /> : <Navigate to={"/login"} />
}

export default PrivateRoute