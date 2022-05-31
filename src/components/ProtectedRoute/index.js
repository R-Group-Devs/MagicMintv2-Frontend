import { useContext } from "react"
import { Navigate } from "react-router-dom";
import { myContext } from "../Context"

const ProtectedRoute = ({children}) => {
    const {user} = useContext(myContext);

    return user ? children : <Navigate to='/auth'/>;
}

export default ProtectedRoute;