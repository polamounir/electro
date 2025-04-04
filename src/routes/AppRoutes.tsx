import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import ScrollToTopNavigation from "../components/ui/ScrollToTopNavigation";
import Navbar from "../components/ui/navbar/Navbar";
import Footer from "../components/ui/Footer";
import Logout from "@/pages/Logout";
import CheckoutSuccess from "@/pages/CheckoutSuccess";

// Lazy Loaded Components
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const AccountConfirmation = lazy(() => import("../pages/AccountConfirmation"));
const NotFound = lazy(() => import("../pages/NotFound"));
const MyAccount = lazy(() => import("../pages/MyAccount"));
const Cart = lazy(() => import("../pages/Cart"));
const Checkout = lazy(() => import("../pages/Checkout"));
const Category = lazy(() => import("../pages/Category"));
// const Dashboard = lazy(() => import("../pages/Dashboard"));

const Loading = () => <div>Loading...</div>;

// const Layout = ({ children }: { children: React.ReactNode }) => {
//     const location = useLocation();
//     const hideLayout = location.pathname.startsWith("/dashboard"); // Adjust if needed

//     return (
//         <>

//             {!hideLayout && <Navbar />}
//             {children}
//             {!hideLayout && <Footer />}
//         </>
//     );
// };

const AppRoutes = () => {
    return (
        <Router>

            <ScrollToTopNavigation />
            <Navbar />
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/category/*" element={<Category />} />
                    <Route path="/confirm-account/*" element={<AccountConfirmation />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/checkout-success" element={<CheckoutSuccess />} />

                    <Route path="/profile/*" element={<MyAccount />} />
                    <Route path="/logout" element={<Logout />} />
                    {/* <Route path="/dashboard/*" element={<Dashboard />} /> */}
                    {/* <Route path="/forbidden" element={<Forbidden />} /> */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
            <Footer />

        </Router>
    );
};

export default AppRoutes;
