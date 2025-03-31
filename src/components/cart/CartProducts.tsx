import { Minus, Plus, Trash2 } from "lucide-react";
import { AppDispatch } from "../../app/store";
import { useDispatch } from "react-redux";
import { addToCartAsync } from "../../app/features/slices/cartSlice";
import { Link } from "react-router-dom";

interface CartItem {
    category: string;
    id: string;
    imageUrl: string;
    price: number;
    quantity: number;
    title: string;
}


interface CartItemProps {
    cartItems: CartItem[];
}

export default function CartProducts({ cartItems }: CartItemProps) {
    const dispatch = useDispatch<AppDispatch>()
    const handleAddProduct = (id: string) => {
        dispatch(addToCartAsync(id))
    }

    if (cartItems.length === 0) return (
        <div className="lg:col-span-3 p-10 flex flex-col gap-5 border border-gray-300 rounded-2xl text-xs md:text-sm lg:text-md">
            <h2 className="text-center">Your cart is empty</h2>
            <div className="flex justify-center">
                <Link to="/" className="bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg transition hover:bg-teal-700 duration-300">Shop Now</Link>
            </div>
        </div>)
    return (
        <div className="lg:col-span-3 p-10 flex flex-col gap-5 border border-gray-300 rounded-2xl text-xs md:text-sm lg:text-md">
            {cartItems.map((item, index) => (
                <div className="flex flex-col gap-5" key={item.id}>
                    <div className="PRODUCT flex gap-5">
                        <div className="flex justify-center bg-red self-center min-w-20 max-w-20 md:min-w-30 md:max-w-30 h-35">
                            <img src={item.imageUrl} alt="" className=" object-contain" />
                        </div>
                        <div className="grow flex flex-col justify-between gap-5 relative overflow-hidden ">
                            <div className="pe-10 max-w-full flex flex-col justify-between gap-5">
                                <h3 className="">{item.title}</h3>
                                <h2 className="text-sm font-semibold md:text-lg">{item.price * item.quantity} EGP</h2>
                                {/* <p>{String(item.description).length > 100 ? item.description?.slice(0, 70) : item.description} {String(item.description).length > 100 && "..."}</p> */}
                                <button className="absolute end-0 top-0"><Trash2 color="#ff0000" /></button>
                            </div>
                            <div className="flex justify-end items-end pt-2">
                                <div className="bg-gray-200 rounded-full overflow-hidden ">
                                    <div className="flex items-center gap-3">
                                        <button className="p-1 lg:h-10 lg:w-12 flex justify-center items-center"><Minus /></button>
                                        <span className="flex justify-center items-center w-8">{item.quantity}</span>
                                        <button className="p-1 lg:h-10 lg:w-12 flex justify-center items-center" onClick={() => handleAddProduct(item.id)}><Plus /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {index < cartItems.length - 1 && <hr className="border-gray-300" />}
                </div>

            ))}
        </div>

    )
}
