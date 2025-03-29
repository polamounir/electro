import { Heart, LayoutGrid, LogOut, MapPin } from "lucide-react";
import { useState } from "react";
import UserDashboard from "../components/myAccount/UserDashboard";
import Addresses from "../components/myAccount/Addresses";
import WhishList from "../components/myAccount/WhishList";

export default function MyAccount() {
    const [viewedData, setViewedData] = useState("dashboard")

    return (
        <div className="pb-50">
            <h1 className="text-center text-3xl font-semibold py-15">MY ACCOUNT</h1>
            <hr />
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-10 p-3 md:px-15 md:py-10">
                <div className="md:col-span-1">
                    <div className="">
                        <button className="w-full bg-[#f8f6f6] border border-gray-200 p-2 flex gap-2" onClick={() => setViewedData("dashboard")}><LayoutGrid /> Dashboard</button>
                        <button className="w-full border border-gray-200 p-2 flex gap-2" onClick={() => setViewedData("addresses")}><MapPin /> Addresses (1)</button>
                        <button className="w-full border border-gray-200 p-2 flex gap-2" onClick={() => setViewedData("wishlist")}><Heart /> Wishlist (0)</button>
                        <button className="w-full border border-gray-200 p-2 flex gap-2" onClick={() => setViewedData("dashboard")}><LogOut /> Logout</button>
                    </div>
                </div>
                <div className="md:col-span-2 lg:col-span-3 ">
                    {viewedData === "dashboard" && <UserDashboard />}
                    {viewedData === "addresses" && <Addresses />}
                    {viewedData === "wishlist" && <WhishList />}

                </div>
            </div>
        </div>
    )
}
