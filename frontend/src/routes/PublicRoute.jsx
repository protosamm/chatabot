import { Navigate, Outlet } from "react-router-dom";

function PublicRoute() {
    const token = localStorage.getItem('chatabot-token');
    
    return token ? <Navigate to="/" replace /> : <Outlet />
}

export default PublicRoute