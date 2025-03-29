import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

interface PrivateRouteProps {
    element: React.ReactElement;  
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    
    return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
