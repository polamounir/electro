"use client";


// import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Search, PhoneCall, CircleUserRound } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCartMenu, toggleSearchMenu, toggleSideMenu } from "../../../app/features/slices/navbarSlice";

import "./navbar.css"
import {
    SideMenu,
    CartMenu,
    SearchMenu,
} from "./NavMenus"
import { RootState } from "../../../app/store";
import { Link } from "react-router-dom";

export default function Navbar() {
    const { isSideMenuOpen, isCartMenuOpen, isSearchMenuOpen } = useSelector((state: RootState) => state.navbar);
    const dispatch = useDispatch();

    const handleSideMenu = () => {
        dispatch(toggleSideMenu());
    };
    const handleSearchMenu = () => {
        dispatch(toggleSearchMenu());
    };
    const handleCartMenu = () => {
        dispatch(toggleCartMenu());
    };


    // const handleCloseMenu = () => {
    //     dispatch(closeAllMenus());
    // }
    return (
        <header>
            <div className="bg-slate-100 text-black px-5 py-2">
                <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                        <button aria-label="User profile" className="hidden md:block">
                            <Link to="/login" >
                                <CircleUserRound />
                            </Link>
                        </button>
                        <small className="flex gap-1">
                            <Link to="/login">
                                login
                            </Link>/
                            <Link to="/register">
                                Rigister
                            </Link>
                        </small>
                    </div>
                    <h2 className="flex items-center gap-2"><PhoneCall size={16} />33033099</h2>
                </div>
            </div>
            <nav className="h-[60px] flex items-center justify-center border-b shadow-md bg-white" role="navigation" >
                {/* ----------------- */}
                <SideMenu classNames={`${isSideMenuOpen ? "show" : "hide"}`} />
                <CartMenu classNames={`${isCartMenuOpen ? "show" : "hide"}`} />
                <SearchMenu classNames={`${isSearchMenuOpen ? "show" : "hide"}`} />
                {/* ----------------- */}
                <div className="container mx-auto px-5 md:px-10 flex justify-between items-center gap-10">

                    {/* Left: Mobile Menu Button */}
                    <div className="md:hidden">
                        <button aria-label="Search" onClick={handleSearchMenu}>
                            <Search size={24} />
                        </button>
                    </div>
                    {/* Logo */}
                    <h1 className="font-extrabold text-3xl text-teal-600">
                        <Link to="/">ELECTRO</Link>
                    </h1>

                    {/* Navigation Links */}
                    <div className="hidden grow border border-teal-600 rounded-full md:flex justify-between overflow-hidden">
                        <input type="text" className="grow px-3 py-1 outline-0" />
                        <button className="px-5 bg-teal-600 text-white ">Search</button>
                    </div>

                    {/* Right: Icons */}
                    <div className="flex gap-2 md:gap-5">

                        <button aria-label="Shopping cart" onClick={handleCartMenu}>
                            <ShoppingCart size={24} />
                        </button>
                        {/* <button aria-label="User profile" className="hidden md:block">
                            <Link to="/login" >
                                <User size={24} />
                            </Link>
                        </button> */}
                    </div>
                </div>
            </nav>
            <div className="px-5 md:px-10 lg:px-20 py-1 md:py-3  bg-black text-white ">
                <div className="flex md:hidden items-center justify-end ">
                    <button
                        onClick={handleSideMenu}
                        aria-label={isSideMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isSideMenuOpen}
                        aria-controls="nav-menu"
                        className="focus:outline-none "
                        tabIndex={0}
                    >
                        {isSideMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
                <div className="flex justify-center items-center md:hidden">
                </div>
                <ul
                    id="nav-menu"
                    // className={`md:flex gap-5 absolute md:static top-20 left-0 w-full shadow-md md:shadow-none p-5 md:p-0 transition-all duration-300 ease-in-out ${isSideMenuOpen ? "block" : "hidden"
                    //     }`}
                    className={`hidden md:flex gap-5 w-full shadow-md md:shadow-none transition-all duration-300 ease-in-out`}
                >
                    <li><Link to="/category" className="nav-link">Category</Link></li>
                    <li><Link to="/contact" className="nav-link">Contact</Link></li>
                    <li><Link to="/about" className="nav-link">About</Link></li>
                </ul>
            </div>
        </header >

    );
}
