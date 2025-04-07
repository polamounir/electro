import { ChevronRight, Minimize2, Minus, Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
    closeAllMenus,
    setCartMenu,
    toggleCartMenu,
    toggleSearchMenu,
    toggleSideMenu,
} from "../../../app/features/slices/navbarSlice";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { addToCartAsync, removeFromCartAsync, setProductQuantityAsync } from "@/app/features/slices/cartSlice";
import { fetchSearchProducts } from "@/api/products";



interface SideMenuProps {
    classNames: string;
}

export function CartMenu({ classNames }: SideMenuProps) {
    const dispatch = useDispatch<AppDispatch>();
    const handleCloseSideMenu = () => dispatch(toggleCartMenu());

    const { cart } = useSelector((state: RootState) => state.cart)
    // console.log(cart)
    const addProductToCart = (id: string) => {
        dispatch(addToCartAsync(id));
    }

    const handleProductQuantity = (id: string, qun: number) => {
        dispatch(setProductQuantityAsync({ productId: id, quantity: qun }))
    }
    const handleRemoveProduct = (id: string, qun: number) => {
        const newqun = qun - 1
        dispatch(removeFromCartAsync({ productId: id, quantity: newqun }))
    }

    return (
        <div
            className={`nav-cart-menu ${classNames} duration-300 w-xs sm:w-sm lg:w-md`}
            role="dialog"
            aria-labelledby="cart-menu-title"
            aria-modal="true"
            onFocus={() => dispatch(setCartMenu(true))}
        >
            <div className="relative p-2 pt-15 h-full">
                <button
                    className="absolute right-5 top-5"
                    onClick={handleCloseSideMenu}
                    aria-label="Close cart menu"
                    name="closeCartMenu"
                >
                    <Minimize2 size={25} />
                </button>
                <div className="h-[90dvh] flex flex-col justify-between gap-10 overflow-hidden">
                    <div className="flex flex-col gap-5 h-[75%] grow overflow-hidden">
                        <div className="flex items-end justify-between">
                            <h2 id="cart-menu-title" className="text-3xl font-semibold">
                                Cart Menu
                            </h2>
                            <Link
                                to="/cart"
                                className="text-teal-600 px-2 hover:underline capitalize"
                                onClick={() => dispatch(closeAllMenus())}
                            >
                                view all
                            </Link>
                        </div>
                        <div className="flex flex-col gap-3 overflow-y-auto">
                            {cart.cartItems.map((product) => (
                                <div key={product.id} className="flex  bg-gray-100 rounded-md shadow">
                                    <div className="flex justify-center bg-red self-center min-w-20 max-w-20 md:min-w-30 md:max-w-30 h-20">
                                        <img src={product.imageUrl} alt="" className=" object-contain" />
                                    </div>
                                    <div className="flex flex-col gap-3 justify-between grow p-3 overflow-hidden">
                                        <div className="flex flex-col gap-2 text-sm">

                                            <div className="overflow-hidden">
                                                <h2 className="text-nowrap text-ellipsis overflow-hidden">{product.title}</h2>
                                            </div>
                                            <div className="font-semibold">
                                                <span>Price : </span>
                                                <span>{product.price * product.quantity} EGP</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center gap-1 max-w-full">
                                            <button className=" text-center bg-red-600 hover:bg-red-500 text-white rounded duration-300 " aria-label="remove product from the cart"
                                                name="removeProduct"
                                                onClick={() => handleRemoveProduct(product.id, product.quantity)}
                                            >
                                                <Minus strokeWidth={1.25} />
                                            </button>
                                            <div className="max-w-20 flex justify-center items-center">
                                                <input
                                                    type="number"
                                                    name="productQun"
                                                    value={product.quantity}
                                                    onChange={(e) => handleProductQuantity(product.id, parseInt(e.target.value))}
                                                    min={1}
                                                    className="max-w-full text-center border-none rounded-md focus:outline-none focus:ring-emerald-500"
                                                />
                                            </div>

                                            <button className="text-center bg-green-600 hover:bg-green-500 text-white rounded duration-300 " aria-label="add product to the cart" name="addProduct"
                                                onClick={() => addProductToCart(product.id)}
                                            >
                                                <Plus strokeWidth={1.25} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --------------------- */}
                    <div className="flex flex-col gap-2 items-center border-t pt-5">
                        <div className="flex justify-between items-center w-full font-semibold">
                            <h2>Total</h2>
                            <h2>{cart.subTotal.toFixed(2)} $</h2>
                        </div>

                        <Link to="/checkout" className="w-full text-center py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl duration-300">
                            Checkout
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
// ------------------------------------------------------
// Search
// ------------------------------------------------------
export function SearchMenu({ classNames }: SideMenuProps) {
    const dispatch = useDispatch();
    const handleCloseSideMenu = () => dispatch(toggleSearchMenu());
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await fetchSearchProducts(searchTerm);
        console.log(res);
        setSearchResults(res);
    }
    const searchProducts = async () => {
        const res = await fetchSearchProducts(searchTerm);
        setSearchResults(res);
    }

    useEffect(() => {
        if (searchTerm.length > 0) {
            searchProducts()
        } else {
            setSearchResults([])
        }
    }, [searchTerm])
    return (
        <div
            className={`nav-search-menu ${classNames} duration-300 w-xs sm:w-sm lg:w-md`}
            role="dialog"
            aria-labelledby="search-menu-title"
            aria-modal="true"
        >
            <div className="relative p-8 pt-15">
                <button
                    className="absolute right-5 top-5"
                    onClick={handleCloseSideMenu}
                    aria-label="Close search menu"
                    name="closeSearchMenu"
                >
                    <Minimize2 size={25} />
                </button>
                <h2 id="search-menu-title" className="sr-only">
                    Search Menu
                </h2>
                <div>
                    {/* Search form */}
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="w-full py-2 px-4 text-sm border rounded-md focus:outline-none focus:ring-emerald-500"
                            placeholder="Search..."
                            name="searchInput"
                            aria-label="search input field"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus={true}
                        />
                        <button
                            className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-md duration-300 px-4 py-2"
                            aria-label="search submission button"
                            name="searchSubmit"
                            type="submit"
                        >
                            Search
                        </button>
                    </form>

                </div>
                <div className="mt-5 flex flex-col justify-between items-center max-h-[70dvh] overflow-y-auto">
                    {
                        searchResults?.length > 0 &&
                        <div className="flex flex-col gap-2 overflow-y-auto">
                            {
                                searchResults?.map((product: { id: string, title: string, images: string[], price: number }) => (
                                    <Link to={`/product/${product.id}`} key={product?.id} className="flex flex-col justify-center gap-2 border border-gray-200 p-2 rounded-xl shadow-lg">
                                        <div className="flex items-center gap-3 h-28">
                                            <div className="min-w-25 max-w-25 flex justify-center">
                                                <img src={product.images[0]} alt={product.title} className="h-22" />
                                            </div>
                                            <div className="text-sm max-h-22 overflow-ellipsis">
                                                <h2>{product.title}</h2>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                    }
                    {
                        searchResults?.length === 0 &&
                        <div className="flex flex-col gap-2">
                            <h2>No results found</h2>
                        </div>
                    }
                </div>
                {
                    searchResults?.length >= 1 &&
                    <div className="mt-3 text-center">
                            <Link to={`/search?query=${searchTerm}`}  className="text-teal-600 px-2 capitalize py-2 hover:bg-gray-100 hover:shadow-xl rounded-lg duration-300">
                            view all
                        </Link>
                    </div>
                }
            </div>
        </div>
    );
}
// -------------------------------
// Side Menu
// ------------------------------------------------------
export function SideMenu({ classNames }: SideMenuProps) {
    const dispatch = useDispatch();
    const handleCloseSideMenu = () => dispatch(toggleSideMenu());

    const [submenu, setSubmenu] = useState<string>("");
    const handleSubMenu = (sub: string) => {
        if (submenu !== sub) {
            setSubmenu(sub);
        } else {
            setSubmenu("");
        }
    };

    const user = useSelector((state: RootState) => state.auth.user);
    return (
        <div
            className={`nav-side-menu ${classNames} duration-300 w-xs sm:w-sm lg:w-md`}
            role="dialog"
            aria-label="side-menu-title"
            aria-modal="true"
        >
            <div className="relative p-8 pt-15">
                <button
                    className="absolute right-5 top-5"
                    onClick={handleCloseSideMenu}
                    aria-label="Close side menu"
                    name="closeSideMenu"
                >
                    <Minimize2 size={25} />
                </button>

                <div>
                    <ul>
                        <li>
                            <Link
                                to="/"
                                onClick={() => dispatch(closeAllMenus())}
                                className="block px-4 py-3 text-sm text-gray-700 hover:text-gray-900"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <button
                                name="categoryExtend"
                                className="flex items-center justify-between  w-full"
                                onClick={() => {
                                    handleSubMenu("category");
                                }}
                            >
                                <span className="block px-4 py-3 text-sm text-gray-700 hover:text-gray-900">
                                    Category
                                </span>
                                <ChevronRight
                                    size={20}
                                    className={`ml-auto duration-300 ${submenu == "category" && "rotate-90"
                                        }`}
                                />
                            </button>
                            <ul
                                className={`ml-6 subcat ${submenu == "category" ? "show" : ""}`}
                            >
                                <ul className="subcat-box">
                                    <li>
                                        <Link
                                            to="/category?category=laptops"
                                            onClick={() => dispatch(closeAllMenus())}
                                            className="block px-6 py-3 text-xs text-gray-700 hover:text-gray-900"
                                        >
                                            Laptops
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/category?category=mobile"
                                            onClick={() => dispatch(closeAllMenus())}
                                            className="block px-6 py-3 text-xs text-gray-700 hover:text-gray-900"
                                        >
                                            Mobile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/category?category=accessories"
                                            onClick={() => dispatch(closeAllMenus())}
                                            className="block px-6 py-3 text-xs text-gray-700 hover:text-gray-900"
                                        >
                                            Accessories
                                        </Link>
                                    </li>
                                </ul>
                            </ul>
                        </li>
                        <li>
                            <Link
                                to="/cart"
                                onClick={() => dispatch(closeAllMenus())}
                                className="block px-4 py-3 text-sm text-gray-700 hover:text-gray-900"
                            >
                                Cart
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="#"
                                onClick={() => dispatch(closeAllMenus())}
                                className="block px-4 py-3 text-sm text-gray-700 hover:text-gray-900"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="#"
                                onClick={() => dispatch(closeAllMenus())}
                                className="block px-4 py-3 text-sm text-gray-700 hover:text-gray-900"
                            >
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact-us"
                                onClick={() => dispatch(closeAllMenus())}
                                className="block px-4 py-3 text-sm text-gray-700 hover:text-gray-900"
                            >
                                Contact
                            </Link>
                        </li>
                        <li>
                            {user ? (
                                <Link
                                    to="/profile"
                                    onClick={() => dispatch(closeAllMenus())}
                                    className="block px-4 py-3 text-sm text-gray-700 hover:text-gray-900"
                                >
                                    Profile
                                </Link>
                            ) : (
                                <div className="flex items-center">
                                    <Link
                                        to="/login"
                                        onClick={() => dispatch(closeAllMenus())}
                                        className="block px-4 py-3 text-sm text-gray-700 hover:text-gray-900"
                                    >
                                        Sign In
                                    </Link>
                                    <span>/</span>
                                    <Link
                                        to="/register"
                                        onClick={() => dispatch(closeAllMenus())}
                                        className="block px-4 py-3 text-sm text-gray-700 hover:text-gray-900"
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
