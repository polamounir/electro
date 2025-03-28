import { ChevronRight, Minimize2, Minus, Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { closeAllMenus, toggleCartMenu, toggleSearchMenu, toggleSideMenu } from "../../../app/features/slices/navbarSlice";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { ProductTypes } from "../../../types";
import { addToCart, removeFromCart } from "../../../app/features/slices/cartSlice";
import { toast } from "sonner";


interface SideMenuProps {
    classNames: string;
}


export function CartMenu({ classNames }: SideMenuProps) {
    const dispatch = useDispatch();
    const handleCloseSideMenu = () => dispatch(toggleCartMenu());


    const { items, totalAmount, totalQuantity } = useSelector((state: RootState) => state.cart)
    const addProductToCart = (product: ProductTypes) => {
        dispatch(addToCart(product));
        toast.success(`Product Added !`);
    }

    const deleteProductToCart = (id: string) => {
        dispatch(removeFromCart(id));
        toast.success(`Product Removed !`);
    }

    return (
        <div className={`nav-cart-menu ${classNames} w-xs`} role="dialog" aria-labelledby="cart-menu-title" aria-modal="true">
            <div className="relative p-8 pt-15 h-full">
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
                        <h2 id="cart-menu-title" className="text-3xl">Cart Menu</h2>
                        <div className="flex flex-col gap-3 overflow-y-auto">
                            {items.map((product) => (
                                <div key={product.id} className="flex  bg-gray-100 rounded-md shadow">
                                    <div className="flex items-center justify-center bg-white p-3 h-full min-w-25 max-w-25 overflow-hidden aspect-square">
                                        <img src={product.images?.[0]} alt={product.title} width={80} height={80} className="max-w-20" />
                                    </div>
                                    <div className="flex flex-col justify-between grow p-3 overflow-hidden">
                                        <div>

                                            <div className="overflow-hidden">
                                                <h2 className="text-nowrap text-ellipsis overflow-hidden">{product.title}</h2>
                                            </div>
                                            <div>
                                                <span>Total Price : </span>
                                                <span>{product.price * product.quantity} $</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <button className=" text-center bg-red-600 hover:bg-red-500 text-white rounded-md duration-300 p-1" aria-label="remove product from the cart"
                                                name="removeProduct"
                                                onClick={() => deleteProductToCart(product.id)}
                                            >
                                                <Minus strokeWidth={1.25} />
                                            </button>
                                            <span>{product.quantity}</span>

                                            <button className="text-center bg-green-600 hover:bg-green-500 text-white rounded-md duration-300 p-1" aria-label="add product to the cart" name="addProduct"
                                                onClick={() => addProductToCart(product)}
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
                        <div className="flex justify-between items-center w-full">
                            <h2>Total</h2>
                            <h2>{totalAmount.toFixed(2)} $</h2>

                        </div>
                        <div className="flex justify-between items-center w-full">
                            <h2>Quantity</h2>
                            <h2>{totalQuantity} items</h2>

                        </div>
                        <button className="w-full text-center py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl duration-300">
                            Checkout
                        </button>
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
    return (
        <div className={`nav-search-menu ${classNames} w-xs`} role="dialog" aria-labelledby="search-menu-title" aria-modal="true">
            <div className="relative p-8 pt-15">
                <button
                    className="absolute right-5 top-5"
                    onClick={handleCloseSideMenu}
                    aria-label="Close search menu"
                    name="closeSearchMenu"
                >
                    <Minimize2 size={25} />
                </button>
                <h2 id="search-menu-title" className="sr-only">Search Menu</h2>
                <div>
                    {/* Search form */}
                    <form className="flex flex-col gap-4 ">
                        <input
                            type="text"
                            className="w-full py-2 px-4 text-sm border rounded-md focus:outline-none focus:ring-emerald-500"
                            placeholder="Search..."
                            name="searchInput"
                            aria-label="search input field"
                        />
                        <button className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-md duration-300 px-4 py-2"
                            aria-label="search submission button"
                            name="searchSubmit"
                        >
                            Search
                        </button>
                    </form>
                    {/* Categories */}
                </div>
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

    const [submenu, setSubmenu] = useState<string>("")
    const handleSubMenu = (sub: string) => {
        if (submenu !== sub) {
            setSubmenu(sub)
        } else {
            setSubmenu("")
        }
    }
    return (
        <div className={`nav-side-menu ${classNames} w-xs`} role="dialog" aria-label="side-menu-title" aria-modal="true"  >
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
                            <Link to="/" onClick={() => dispatch(closeAllMenus())} className="block px-4 py-3 text-sm text-gray-700 hover:text-gray-900">
                                Home
                            </Link>
                        </li>
                        <li>

                            <button name="categoryExtend" className=" cursor-pointer flex items-center justify-between  w-full" onClick={() => { handleSubMenu("category") }}>

                                <span className="block px-4 py-3 text-sm text-gray-700 hover:text-gray-900">
                                    Category
                                </span>
                                <ChevronRight size={20} className={`ml-auto duration-300 ${submenu == "category" && "rotate-90"}`} />
                            </button>
                            <ul className={`ml-6 subcat ${submenu == "category" ? "show" : ""}`}>
                                <ul className="subcat-box">
                                    <li>
                                        <Link to="#" onClick={() => dispatch(closeAllMenus())} className="block px-6 py-3 text-xs text-gray-700 hover:text-gray-900">
                                            Subcategory 1
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" onClick={() => dispatch(closeAllMenus())} className="block px-6 py-3 text-xs text-gray-700 hover:text-gray-900">
                                            Subcategory 2
                                        </Link>
                                    </li>
                                </ul>
                            </ul>
                        </li>
                        <li>
                            <Link to="/cart" onClick={() => dispatch(closeAllMenus())} className="block px-4 py-3 text-sm text-gray-700 hover:text-gray-900">
                                Cart
                            </Link>
                        </li>
                        <li>
                            <Link to="#" onClick={() => dispatch(closeAllMenus())} className="block px-4 py-3 text-sm text-gray-700 hover:text-gray-900">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="#" onClick={() => dispatch(closeAllMenus())} className="block px-4 py-3 text-sm text-gray-700 hover:text-gray-900">
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact-us" onClick={() => dispatch(closeAllMenus())} className="block px-4 py-3 text-sm text-gray-700 hover:text-gray-900">
                                Contact
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">

                                <Link to="/login" onClick={() => dispatch(closeAllMenus())} className="block px-4 py-3 text-sm text-gray-700 hover:text-gray-900">
                                    Sign In
                                </Link>
                                <span>/</span>
                                <Link to="/register" onClick={() => dispatch(closeAllMenus())} className="block px-4 py-3 text-sm text-gray-700 hover:text-gray-900">
                                    Sign Up
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
