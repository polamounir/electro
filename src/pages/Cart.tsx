
import CartProducts from "../components/cart/CartProducts"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchCartAsync } from "../app/features/slices/cartSlice"
import { AppDispatch, RootState } from "../app/store"
import { Link } from "react-router-dom"

export default function Cart() {


    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(fetchCartAsync())
    }, [dispatch])
    const { cart } = useSelector((state: RootState) => state.cart)


    if (!cart) return (
        <div className="lg:col-span-3 p-10 flex flex-col gap-5 border border-gray-300 rounded-2xl text-xs md:text-sm lg:text-md">
            <h2 className="text-center">Your cart is empty</h2>
            <div className="flex justify-center">
                <Link to="/" className="bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg transition hover:bg-teal-700 duration-300">Shop Now</Link>
            </div>
        </div>)
    return (
        <div className="min-h-[75dvh] pb-50">
            <div className="p-2 pt-5 md:p-10 xl:px-40 flex flex-col gap-5">
                <h2 className="flex gap-2 items-end">
                    <span className="text-3xl font-bold">
                        Your Cart
                    </span>
                    <span className="text-md">

                    </span>
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start ">
                    {/* items */}

                    <CartProducts cartItems={cart?.cartItems ?? []} />

                    {/* sammary */}
                    <div className="lg:col-span-2 p-10 flex flex-col gap-5 border border-gray-300 rounded-2xl">
                        <h2 className="font-bold text-lg">Order Summary </h2>
                        <div>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-gray-400">Subtotal</h2>
                                    <h2 className="">{(cart?.subTotal - cart?.shippingPrice) || 0} EGP</h2>
                                </div>
                                {/* <div className="flex items-center justify-between">
                                    <h2 className="text-gray-400">Discount</h2>
                                    <h2 className="text-red-500">{totalAmount * 0.02} EGP</h2>
                                </div> */}
                                <div className="flex items-center justify-between">
                                    <h2 className="text-gray-400">Delivery Fee</h2>
                                    <h2 className=""> {cart?.shippingPrice} EGP</h2>
                                </div>
                            </div>
                            <hr className="border-gray-300 my-2" />
                            <div className="font-bold flex items-center justify-between">
                                <h2 className="">Subtotal</h2>
                                <h2 className="">{cart?.subTotal} EGP</h2>
                            </div>
                        </div>
                        {/* <div className="flex justify-between gap-3">
                            <input type="text" className="flex-1 px-5 py-2 rounded-full border border-gray-300 outline-none max-w-[70%] sm:max-w-[100%] text-sm focus:border-teal-500 duration-300" placeholder="🎟️ 🎫 Enter Promo code" />
                            <button className="block bg-black text-white px-5 py-2 rounded-full">Apply</button>
                        </div> */}
                        <Link to="/checkout" className="text-center font-semibold px-5 py-2 text-white bg-teal-500 hover:bg-teal-600 rounded-full duration-300 ">Checkout</Link>
                    </div>
                </div>

            </div >
        </div >
    )
}
