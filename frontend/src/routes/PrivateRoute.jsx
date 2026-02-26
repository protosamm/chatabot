import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContexts";

function PrivateRoute() {
   
   const { user, userLoading } = useAuth();

   if(userLoading) {
        return <div>Loading...</div>;
   }
   
   return user ? <Outlet /> : <Navigate to="/login" replace />;
   
};

export default PrivateRoute