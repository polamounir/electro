import { Heart, LayoutGrid, LogOut, MapPin, Package } from "lucide-react";

import UserDashboard from "../components/myAccount/UserDashboard";
import Addresses from "../components/myAccount/Addresses";
import WhishList from "../components/myAccount/WhishList";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";

export default function MyAccount() {

    return (
        <div className="pb-50">
            <h1 className="text-center text-3xl font-semibold py-15">MY ACCOUNT</h1>
            <hr />
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-10 p-3 md:px-15 md:py-10">
                <div className="md:col-span-1">
                    <div className="">
                        <Link to="/profile/dashboard" className="w-full bg-[#f8f6f6] border border-gray-200 p-2 flex gap-2" ><LayoutGrid /> Dashboard</Link>
                        <Link to="/profile/dashboard" className="w-full bg-[#f8f6f6] border border-gray-200 p-2 flex gap-2" ><Package /> Orders</Link>
                        <Link to="/profile/addresses" className="w-full border border-gray-200 p-2 flex gap-2" ><MapPin /> Addresses (1)</Link>
                        <Link to="/profile/wishlist" className="w-full border border-gray-200 p-2 flex gap-2" ><Heart /> Wishlist (0)</Link>
                        <Link to="logout" className="w-full border border-gray-200 p-2 flex gap-2" ><LogOut /> Logout</Link>
                    </div>
                </div>
                <div className="md:col-span-2 lg:col-span-3 ">
                    <Routes>
                        <Route path="/" element={<UserDashboard />} />
                        <Route path="dashboard" element={<UserDashboard />} />
                        <Route path="orders" element={<UserDashboard />} />
                        <Route path="addresses" element={<Addresses />} />
                        <Route path="wishlist" element={<WhishList />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}
