import {  Route, Routes } from "react-router"
// import { RootState } from "../app/store";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MainData from "../components/dashboard/main/MainData";
import MainProducts from "../components/dashboard/products/MainProducts";
import MainCategories from "../components/dashboard/category/MainCategories";
import MainUsers from "../components/dashboard/users/MainUsers";
import MainOrders from "../components/dashboard/orders/MainOrders";

export default function Dashboard() {
  // const user = useSelector((state: RootState) => state.auth.user);
  // if (!user) {
  //   return <Navigate to="/login" /> 
  // } else if (user?.UserType !== "Admin"){
  //   return <Navigate to="/forbidden" />
  // }
  return (
    <div className="min-h-[75dvh]">
      <div className="flex flex-col gap-10 px-2 md:px-5 2xl:px-10 pb-30">
        <div className="relative border-b py-10 md:py-15 font-semibold">
          <h2 className="text-2xl md:text-5xl text-center uppercase">admin dashboard</h2>
          <Link to="/" className="absolute end-0 bottom-5 bg-gray-100 px-5 py-2 rounded-md hover:bg-gray-200 duration-300 ">Back To App</Link>
        </div>
        <div className="grid lg:grid-cols-11 xl:grid-cols-12 gap-5 items-start">
          {/* SIde Menu */}
          <div className="lg:col-span-3  2xl:col-span-2 bg-gray-50 rounded-2xl border border-gray-300 p-2 md:p-5 lg:p-10">
            <ul>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/dashboard/products">Products</Link>
                <ul className="ps-5">
                  <li>
                    <Link to="">View Product</Link>
                  </li>
                  <li>
                    <Link to="">Add Product</Link>
                  </li>
                  <li>
                    <Link to="">Edit Product</Link>
                  </li>
                  <li>
                    <Link to="">Delete Product</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/dashboard/categories">categories</Link>
                <ul className="ps-5">
                  <li>
                    <Link to="">View Categories</Link>
                  </li>
                  <li>
                    <Link to="">Add Category</Link>
                  </li>
                  <li>
                    <Link to="">Edit Category</Link>
                  </li>
                  <li>
                    <Link to="">Delete Category</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/dashboard/orders">Orders</Link>
                <ul className="ps-5">
                  <li>
                    <Link to="">View Orders</Link>
                  </li>

                  <li>
                    <Link to="">Edit Order</Link>
                  </li>

                </ul>
              </li>
              <li>
                <Link to="/dashboard/users">Users</Link>
                <ul className="ps-5">
                  <li>
                    <Link to="">View Users</Link>
                  </li>
                  <li>
                    <Link to="">Add User</Link>
                  </li>
                  <li>
                    <Link to="">Edit User</Link>
                  </li>
                  <li>
                    <Link to="">Delete User</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          {/* Main Container */}
          <div className="lg:col-span-8 xl:col-span-9 2xl:col-span-10 bg-gray-50 rounded-2xl border border-gray-300 p-2 md:p-5 lg:p-10">
            <Routes>
              <Route path="/" element={<MainData />} />
              <Route path="products" element={<MainProducts />} />
              <Route path="categories" element={<MainCategories />} />
              <Route path="orders" element={<MainOrders />} />
              <Route path="users" element={<MainUsers />} />
            </Routes>

          </div>
        </div>
      </div>
    </div>
  )
}
