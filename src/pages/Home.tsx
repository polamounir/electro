import { useSelector } from "react-redux";
import AllProducts from "../components/home/AllProducts";
import DailyDeals from "../components/home/DailyDeals";
import HomeAds from "../components/home/HomeAds";
import HomeDiscount from "../components/home/HomeDiscount";
import HomePromotion from "../components/home/HomePromotion";
import MainSlider from "../components/home/MainSlider";
import TopProuducts from "../components/home/TopProuducts";
import { RootState } from "../app/store";
import ProductModel from "../components/home/ProductModel";
import { getUserData } from "@/api/user";



export default function Home() {
    const isModelOpen = useSelector((state: RootState) => state.productModel.isOpen)


    return (
        <div>
            {isModelOpen && <ProductModel />}
            <MainSlider />
            <DailyDeals />
            <HomePromotion />
            <div className="p-5 lg:w-[90%] m-auto">
                <TopProuducts />
                <HomeAds />
                <HomeDiscount />
                <AllProducts />
            </div>
            <div>
                <button onClick={() => getUserData()}>FETCH </button>
            </div>
        </div>
    )
}
