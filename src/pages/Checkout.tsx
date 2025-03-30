import { useSelector } from "react-redux"
import { AppDispatch, RootState } from "../app/store"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { fetchCartAsync } from "../app/features/slices/cartSlice"
import { Link } from "react-router-dom"
import { createOrder } from "../api/products"
import { toast } from "sonner"


interface ShippingAddress {
    firstName: string,
    lastName: string,
    street: string,
    city: string,
    state: string,
    zipCode: string
}
interface OrderDetailTypes {

    cartId: string,
    couponCode: string | null,
    shippingAddress: ShippingAddress,
    paymentMethod: string,
    deliveryMethod: string,

}
export default function Checkout() {
    const [orderDetail, setOrderDetail] = useState<OrderDetailTypes>(
        {
            cartId: "",
            couponCode: null,
            shippingAddress: {
                firstName: "",
                lastName: "",
                street: "",
                city: "",
                state: "",
                zipCode: "",
            },
            paymentMethod: "",
            deliveryMethod: "123543dc-4f2d-4ced-9e53-9efb2adac25c",
        }
    )
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => { dispatch(fetchCartAsync()) }, [dispatch])
    const { cartItems, subTotal, shippingPrice, id } = useSelector((state: RootState) => state.cart.cart)

    // console.log(cartItems)
    if (!cartItems.length) {
        return (
            <div>
                <h1>Your cart is empty</h1>
                <Link to="/">Go back to shop</Link>
            </div>
        )
    }

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOrderDetail(prev => ({
            ...prev,
            shippingAddress: {
                ...prev.shippingAddress,
                [e.target.name]: e.target.value
            }
        }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const updatedOrder = { ...orderDetail, cartId: id };
        setOrderDetail(updatedOrder);
        console.log(updatedOrder);
        const res = await createOrder(updatedOrder)

        console.log(res);
        if (res.isSuccess) {
            toast.success("Order created successfully!")
            window.location.href = res.paymentUrl;
        }
        else {
            toast.error("Failed to create order")
        }
    };
    return (
        <div className="min-h-[75dvh] pb-50">
            <div className="p-2 pt-5 md:p-10 xl:px-40 flex flex-col gap-5">
                <h2 className="font-bold text-xl">Order Details</h2>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start ">

                    <div className="lg:col-span-3 flex flex-col gap-5 text-xs md:text-sm lg:text-md">
                        <div className="border border-gray-300 rounded-2xl">
                            <div className="p-5 flex justify-between items-center">
                                <h2 className="font-semibold text-lg">Shipping Address</h2>
                                <button className="px-3 py-1 font-bold ">Edit</button>
                            </div>
                            <hr className="border-gray-300" />
                            <div className="text-md p-5 grid grid-cols-1 md:grid-cols-2 gap-2">
                                <div>
                                    <h2>First Name</h2>
                                    <input type="text" name="firstName"
                                        onChange={handleAddressChange}
                                        className="w-full border border-gray-400 rounded-sm py-1 px-5" />
                                </div>
                                <div>
                                    <h2>Last Name</h2>
                                    <input type="text" name="lastName"
                                        onChange={handleAddressChange}
                                        className="w-full border border-gray-400 rounded-sm py-1 px-5" />
                                </div>
                                <div>
                                    <h2>state</h2>
                                    <input type="text" name="state"
                                        onChange={handleAddressChange}
                                        className="w-full border border-gray-400 rounded-sm py-1 px-5" />
                                </div>
                                <div>
                                    <h2>City</h2>
                                    <input type="text" name="city"
                                        onChange={handleAddressChange}
                                        className="w-full border border-gray-400 rounded-sm py-1 px-5" />
                                </div>
                                <div>
                                    <h2>Street</h2>
                                    <input type="text" name="street"
                                        onChange={handleAddressChange}
                                        className="w-full border border-gray-400 rounded-sm py-1 px-5" />
                                </div>
                                <div>
                                    <h2>Zip Code</h2>
                                    <input type="text" name="zipCode"
                                        onChange={handleAddressChange}
                                        className="w-full border border-gray-400 rounded-sm py-1 px-5" />
                                </div>

                            </div>
                        </div>
                        <div className="border border-gray-300 rounded-2xl">
                            <div className="p-5 flex justify-between items-center">
                                <h2 className="font-semibold text-lg">Order Items</h2>
                                <Link to="/cart" className="px-3 py-1 font-bold ">Edit</Link>
                            </div>
                            <hr className="border-gray-300" />
                            <div className="text-md p-5 flex flex-col gap-3">
                                {
                                    cartItems.map(item => (
                                        <div key={item.id} className="flex items-center gap-5 ">
                                            <div className="flex justify-center bg-red self-center min-w-15 max-w-15 md:min-w-20 md:max-w-20 h-20">
                                                <img src={item.imageUrl} alt="" className=" object-contain" />
                                            </div>
                                            <div className="grow">
                                                <h2 className="">{item.title}</h2>
                                                <h2 className="">{item.price} EGP</h2>
                                                <h2 className="font-semibold">{item.quantity} x {item.price} = {item.quantity * item.price} EGP</h2>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="border border-gray-300 rounded-2xl">
                            <div className="p-5 flex justify-between items-center">
                                <h2 className="font-semibold text-lg">Payment Method</h2>

                            </div>
                            <hr className="border-gray-300" />
                            <div className="text-md p-5">
                                <div>
                                    <input type="radio" name="paymentMethod" value="Cash" onChange={() => setOrderDetail(prev => ({ ...prev, paymentMethod: "Cash" }))}
                                    /> <span> Cash on Delivery (Bank Card - E-wallet - Cash)</span>
                                </div>
                                <div>
                                    <input type="radio" name="paymentMethod" value="Online" onChange={() => setOrderDetail(prev => ({ ...prev, paymentMethod: "Online" }))}
                                    /> <span> Pay By Card</span>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="lg:col-span-2 p-10 flex flex-col gap-5 border border-gray-300 rounded-2xl">
                        <h2 className="font-bold text-lg">Order Summary </h2>
                        <div>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-gray-400">Subtotal</h2>
                                    <h2 className="">{subTotal - shippingPrice} EGP</h2>
                                </div>
                                <div className="flex items-center justify-between">
                                    <h2 className="text-gray-400">Delivery Fee</h2>
                                    <h2 className=""> {shippingPrice} EGP</h2>
                                </div>
                            </div>
                            <hr className="border-gray-300 my-2" />
                            <div className="font-bold flex items-center justify-between">
                                <h2 className="">Subtotal</h2>
                                <h2 className="">{subTotal} EGP</h2>
                            </div>
                        </div>
                        <div className="flex justify-between gap-3">
                            <input type="text" className="flex-1
                            onChange={handleAdderssChange}
                            px-5 py-2 rounded-full border border-gray-300 outline-none max-w-[70%] sm:max-w-[100%] text-sm focus:border-teal-500 duration-300" placeholder="🎟️ 🎫 Enter Promo code" />
                            <button className="block bg-black text-white px-5 py-2 rounded-full">Apply</button>
                        </div>
                        <button className="text-center font-semibold px-5 py-2 text-white bg-teal-500 hover:bg-teal-600 rounded-full duration-300" onClick={handleSubmit}>Confim Order</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
