import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import ScrollToTopNavigation from "../components/ui/ScrollToTopNavigation";
import Navbar from "../components/ui/navbar/Navbar";
import Footer from "../components/ui/Footer";
import Logout from "@/pages/Logout";
import CheckoutSuccess from "@/pages/CheckoutSuccess";
import Loader from "@/components/ui/Loader";
import Tester from "@/pages/Tester";
import { useDispatch } from "react-redux";
import { closeAllMenus } from "@/app/features/slices/navbarSlice";
import { useLocation } from "react-router";


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
const Product = lazy(() => import("../pages/Product"));
const SearchResult = lazy(() => import("../pages/SearchResult"));

const Loading = () => <Loader />;

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
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const redirectPath = params.get("redirect");
        if (redirectPath) {
            navigate(`/${redirectPath}`);
        }
    }, [location.search]);

    const handleCloseMenu = () => {
        dispatch(closeAllMenus());
    }
    return (
        <Router>

            <ScrollToTopNavigation />
            <Navbar />
            <Suspense fallback={<Loading />}>
                <div onClick={handleCloseMenu}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/confirm-account/*" element={<AccountConfirmation />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/checkout-success" element={<CheckoutSuccess />} />

                        <Route path="/category/*" element={<Category />} />
                        <Route path="/product/:id" element={<Product />} />
                        <Route path="/search/*" element={<SearchResult />} />
                        <Route path="/profile/*" element={<MyAccount />} />
                        <Route path="/logout" element={<Logout />} />
                        {/* <Route path="/dashboard/*" element={<Dashboard />} /> */}
                        {/* <Route path="/forbidden" element={<Forbidden />} /> */}
                        <Route path="/test" element={<Tester />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Footer />
                </div>
            </Suspense>

        </Router>
    );
};

export default AppRoutes;
