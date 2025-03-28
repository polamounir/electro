import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashboard";
import Navbar from "../components/ui/navbar/Navbar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "../app/features/slices/authSlice";
import { AppDispatch } from "../app/store";
import Register from "../pages/Register";
import AccountConfirmation from "../pages/AccountConfirmation";
import Footer from "../components/ui/Footer";
import NotFound from "../pages/NotFound";




const AppRoutes = () => {
    const dispatch = useDispatch<AppDispatch>(); // Use correct dispatch type

    useEffect(() => {
        dispatch(fetchUser()); // Now TypeScript understands fetchUser is an async thunk
    }, [dispatch]);

    return (
        <Router>

            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/confirm-account/*" element={<AccountConfirmation />} />
                <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />

                
                <Route path="*" element={<NotFound />} />
                
            </Routes>
            <Footer />
        </Router>
    );
};

export default AppRoutes;
