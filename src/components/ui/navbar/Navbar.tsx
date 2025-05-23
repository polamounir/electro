"use client";
// import { useState, useEffect } from "react";
import {
    Menu,
    X,
    ShoppingCart,
    Search,
    PhoneCall,
    CircleUserRound,
    MapPinCheck,
    LogOut,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
    closeAllMenus,
    toggleCartMenu,
    toggleSearchMenu,
    toggleSideMenu,
} from "../../../app/features/slices/navbarSlice";

import "./navbar.css";
import { SideMenu, CartMenu, SearchMenu } from "./NavMenus";
import { RootState } from "../../../app/store";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
    const { isSideMenuOpen, isCartMenuOpen, isSearchMenuOpen } = useSelector(
        (state: RootState) => state.navbar
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSideMenu = () => {
        dispatch(toggleSideMenu());
    };
    const handleSearchMenu = () => {
        dispatch(toggleSearchMenu());
    };
    const handleCartMenu = () => {
        dispatch(toggleCartMenu());
    };

    const handleCloseMenu = () => {
        dispatch(closeAllMenus());
    };

    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const user = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate(`/search?query=${searchTerm}`);
        // setSearchTerm("");
        console.log("Search term:", searchTerm);
    };
    return (
        <header
            className={`sticky ${isVisible ? "top-0" : "-top-22 lg:-top-19"
                } left-0 w-full z-50 bg-white duration-300 border-b border-teal-800 shadow-lg shadow-teal-400/15`}
        >
            <div className="bg-slate-100 text-black px-5 py-1">
                <div className="flex justify-between items-center">
                    {user ? (
                        <div className="logged-account-box relative pe-10 px-2">
                            <button className="logged-account-box-name capitalize">
                                Hi , {user?.fullName}
                            </button>
                            <div className="logged-account-content-box absolute start-0 top-full bg-gray-200 rounded border-gray-300 ">
                                <div className="logged-account-box-menu flex flex-col ">
                                    <Link
                                        to="/profile"
                                        className="logged-account-box-menu-link flex items-center gap-2 hover: px-3 py-1 mt-5"
                                    >
                                        <CircleUserRound />
                                        Profile
                                    </Link>
                                    <hr className="border-gray-300" />
                                    <Link
                                        to="/profile/addresses"
                                        className="logged-account-box-menu-link flex items-center gap-2 hover: px-3 py-1 "
                                    >
                                        <MapPinCheck />
                                        Addresses
                                    </Link>
                                    <hr className="border-gray-300" />

                                    <Link
                                        to="/logout"
                                        className="logged-account-box-menu-link flex items-center gap-2 hover: px-3 py-1  "
                                    >
                                        <LogOut />
                                        Logout
                                    </Link>
                                    <hr className="border-gray-300 mb-5" />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <button aria-label="User profile" className="hidde">
                                <Link to="/login">
                                    <CircleUserRound size={20} />
                                </Link>
                            </button>
                            <small className="flex gap-1">
                                <Link to="/login">login</Link>/
                                <Link to="/register">Rigister</Link>
                            </small>
                        </div>
                    )}
                    <div>
                        <h2 className="flex items-center gap-2 text-xs md:text-sm">
                            <PhoneCall size={15} />
                            01234567890
                        </h2>
                    </div>
                </div>
            </div>
            <nav
                className="h-[60px] flex items-center justify-center border-b shadow-md bg-white"
                role="navigation"
            >
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
                    <form
                        onSubmit={handleSearch}
                        className="hidden grow border border-teal-600 rounded-full md:flex justify-between overflow-hidden"
                    >
                        <input
                            type="text"
                            className="grow px-5 py-1 outline-0 text-md"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search for products..."
                            value={searchTerm}
                        />
                        <button type="submit" className="px-5 bg-teal-600 text-white">
                            Search
                        </button>
                    </form>

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
            <div
                className={`${isVisible ? "py-1" : "py-2"
                    } duration-100 px-5 md:px-10 lg:px-20  md:py-0  bg-black text-white font-bold`}
                onBlur={handleCloseMenu}
            >
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
                <div className="flex justify-center items-center md:hidden"></div>
                <ul
                    id="nav-menu"
                    className={`hidden md:flex items-center justify-center gap-5 w-full shadow-md md:shadow-none transition-all duration-300 ease-in-out uppercase`}
                >
                    <li className="py-2 relative nav-categories-link text-sm">
                        <button className="uppercase">Categories ▼</button>
                        <div className="nav-categories-box absolute z-[1]  top-[100%] left-[0] bg-white rounded-md shadow-md text-black ">
                            <div className="nav-categories-content">
                                <div className="grid grid-cols-3 gap-10 p-5 px-10">
                                    <div>
                                        <h2 className="border-b mb-2">Laptops</h2>
                                        <ul>
                                            <li>
                                                <Link to="/category?category=laptops&brand=all">All</Link>
                                            </li>
                                            <li>
                                                <Link to="/category?category=laptops&brand=mac">Mac</Link>
                                            </li>
                                            <li>
                                                <Link to="/category?category=laptops&brand=asus">Asus</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h2 className="border-b mb-2">Mobiles</h2>
                                        <ul>
                                            <li>
                                                <Link to="/category?category=mobile&brand=all">All</Link>
                                            </li>
                                            <li>
                                                <Link to="/category?category=mobile&brand=">IPhone</Link>
                                            </li>
                                            <li>
                                                <Link to="/category?category=mobile&brand=samsung">Samsung</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h2 className="border-b mb-2">Accessories</h2>
                                        <ul>
                                            <li>
                                                <Link to="/category?category=accessories&brand=all">All</Link>
                                            </li>
                                            <li>
                                                <Link to="/category?category=accessories&brand=">SanDisk</Link>
                                            </li>
                                            <li>
                                                <Link to="/category?category=accessories&brand=kingstone">Kingstone</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <Link to="/" className="nav-link">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/offers" className="nav-link">
                            Special Offers
                        </Link>
                    </li>
                    <li>
                        <Link to="/dicounts" className="nav-link">
                            Discounts
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact-us" className="nav-link">
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}
