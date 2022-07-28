import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { reduxState } from "../redux/reducers";

export default function ProtectedRoute({children}:{children: any}){
    const auth = useSelector((state: reduxState)=> state.auth)
    if(!auth.user){
         return <Navigate to="/" />;
    }
    return children;
}