import ordersIcon from "../../../assets/images/icons/cart-black-icon.svg"
import activeOrdersIcon from "../../../assets/images/icons/cart-arrow-down-icon.svg"
import completedOrdersIcon from "../../../assets/images/icons/check-out-icon.svg"
import cancelledOrdersIcon from "../../../assets/images/icons/cart-minus-icon.svg"

export default function OrdersOverview() {
    const ordersData = [
        {
            title: "Total Orders",
            totalValue: "11000",
            growthValue: "20",
            numberOfOrders: "125",
            icon: ordersIcon,
        },
        {
            title: "Active Orders",
            totalValue: "2500",
            growthValue: "20",
            numberOfOrders: "20",
            icon: activeOrdersIcon,
        },
        {
            title: "Completed Orders",
            totalValue: "7500",
            growthValue: "20",
            numberOfOrders: "100",
            icon: completedOrdersIcon,
        },
        {
            title: "Cancelled Orders",
            totalValue: "1000",
            growthValue: "20",
            numberOfOrders: "5",
            icon: cancelledOrdersIcon,
        },
    ];
    return (
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
            {ordersData.map((data, index) => {
                return (
                    <div key={index} className="shadow-lg shadow-teal-200/70 p-5 lg:p-2 xl:p-5 rounded-xl flex flex-col justify-between gap-5 bg-white">
                        <div className="font-semibold text-xl">
                            <h2>{data.title}</h2>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="bg-slate-100 w-12 p-2 rounded-md shadow-lg xl:me-2"> <img src={data.icon} alt="" /></div>
                            <div className="flex-1"> {data.totalValue} EGP</div>
                            <div>
                                <span className="text-green-500">+{data.growthValue}%</span>
                            </div>
                        </div>
                        <div className="text-xl font-semibold ps-3"> {data.numberOfOrders} orders</div>
                    </div>
                );
            })}
        </div>
    );
}
