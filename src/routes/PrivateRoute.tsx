import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import Cookies from "js-cookie";

interface PrivateRouteProps {
    element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const token = Cookies.get('accessToken');
    console.log(token)

    return user && token ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
