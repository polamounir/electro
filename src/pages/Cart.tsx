import { Minus, Plus, Trash2 } from "lucide-react"
// import demoImg from "../assets/images/product_placeholder.webp"
import { useSelector } from "react-redux"
import { RootState } from "../app/store"
export default function Cart() {
    const { items, totalQuantity, totalAmount } = useSelector((state: RootState) => state.cart)
    // console.log(items)

    return (
        <div className="min-h-[75dvh] pb-50">
            <div className="p-2 pt-5 md:p-10 xl:px-40 flex flex-col gap-5">
                <h2 className="flex gap-2 items-end">
                    <span className="text-3xl font-bold">
                        Your Cart
                    </span>
                    <span className="text-md">
                        ({totalQuantity})
                    </span>
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start ">
                    {/* items */}
                    <div className="lg:col-span-3 p-10 flex flex-col gap-5 border border-gray-300 rounded-2xl text-xs md:text-sm lg:text-md">
                        {items.map((item, index) => (
                            <div className="flex flex-col gap-5" key={item.id}>
                                <div className="PRODUCT flex gap-5">
                                    <div className="flex bg-red self-center">
                                        <img src={item.images?.[0]} alt="" className="min-w-20 max-w-20 md:min-w-30 md:max-w-30" />
                                    </div>
                                    <div className="grow flex flex-col justify-between relative overflow-hidden">
                                        <div className="pe-10 max-w-full">
                                            <h3 className="text-nowrap overflow-ellipsis  overflow-hidden">{item.title}</h3>
                                            <p>{String(item.description).length > 100 ? item.description?.slice(0, 70) : item.description} {String(item.description).length > 100 && "..."}</p>
                                            <button className="absolute end-0 top-0"><Trash2 color="#ff0000" /></button>
                                        </div>
                                        <div className="flex justify-between items-end pt-2">
                                            <h2 className="text-sm font-semibold md:text-lg">{item.price * item.quantity} EGP</h2>
                                            <div className="bg-gray-200 rounded-full overflow-hidden ">
                                                <div className=" flex items-center gap-3">
                                                    <button className="p-1 lg:h-10 lg:w-12 flex justify-center items-center"><Minus /></button>
                                                    <span className="flex justify-center items-center w-8">{item.quantity}</span>
                                                    <button className="p-1 lg:h-10 lg:w-12 flex justify-center items-center"><Plus /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {index < items.length - 1 && <hr className="border-gray-300" />}
                            </div>

                        ))}


                    </div>


                    {/* sammary */}
                    <div className="lg:col-span-2 p-10 flex flex-col gap-5 border border-gray-300 rounded-2xl">
                        <h2 className="font-bold text-lg">Order Summary </h2>
                        <div>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-gray-400">Subtotal</h2>
                                    <h2 className="">{totalAmount} EGP</h2>
                                </div>
                                <div className="flex items-center justify-between">
                                    <h2 className="text-gray-400">Discount</h2>
                                    <h2 className="text-red-500">{totalAmount * 0.02} EGP</h2>
                                </div>
                                <div className="flex items-center justify-between">
                                    <h2 className="text-gray-400">Delivery Fee</h2>
                                    <h2 className="">30 EGP</h2>
                                </div>
                            </div>
                            <hr className="border-gray-300 my-2" />
                            <div className="font-bold flex items-center justify-between">
                                <h2 className="">Total</h2>
                                <h2 className="">{totalAmount + 30 - (totalAmount * 0.2)}</h2>
                            </div>
                        </div>
                        <div className="flex justify-between gap-3">
                            <input type="text" className="flex-1 px-5 py-2 rounded-full border border-gray-300 outline-none max-w-[70%] sm:max-w-[100%] text-sm focus:border-teal-500 duration-300" placeholder="🎟️ 🎫 Enter Promo code" />
                            <button className="block bg-black text-white px-5 py-2 rounded-full">Apply</button>
                        </div>
                        <button className="px-5 py-2 text-white bg-teal-500 hover:bg-teal-600 rounded-full duration-300 ">Checkout</button>
                    </div>
                </div>
            </div >
        </div >
    )
}
