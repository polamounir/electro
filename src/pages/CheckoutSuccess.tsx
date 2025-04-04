import { Car, LucideCheck, LucidePackage } from 'lucide-react';


export default function CheckoutSuccess() {
    return (
        <div className="flex justify-center items-center bg-white py-25  px-10">
            <div className="p-5 rounded-lg text-center w-full max-w-2xl">
                <h2 className="text-2xl md:text-3xl  ont-bold mb-10">Thank you for your order</h2>

                <div className="flex justify-center items-center mb-10 gap-10">
                    <div className="flex flex-col items-center">
                        <div className="bg-green-400 aspect-square flex justify-center items-center p-3 rounded-full">
                            <LucideCheck size={25} color='#fff' />
                        </div>
                        <p className="mt-1 text-sm font-semibold text-green-600">Order Confirmed</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="bg-gray-400 aspect-square flex justify-center items-center p-3 rounded-full">
                            <Car size={25} color='#fff' />
                        </div>
                        <p className="mt-1 text-sm font-semibold text-gray-600">Shipped</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="bg-gray-400 aspect-square flex justify-center items-center p-3 rounded-full">
                            <LucidePackage size={25} color='#fff' />
                        </div>
                        <p className="mt-1 text-sm font-semibold text-gray-600">Delivered</p>
                    </div>
                </div>

                <p className="text-sm text-gray-700">
                    Your order is being prepared. You'll receive another email once your order has shipped.
                </p>
            </div>
        </div>
    );
}
