import { Link } from "react-router-dom";


export default function HomePromotion() {
    return (
        <div className="flex items-center justify-center gap-2 min-h-10 py-2 bg-black text-white text-xs md:text-sm text-center">
            <h2 className="leading-7">TAKE AN EXTRA 20% OFF Our Favorite Laptop Macbook 15: Use Code Mackbook_15
                <Link to="" className="px-5 py-1 bg-slate-100 hover:bg-slate-200 text-black rounded-sm duration-300 ms-5 mt-5 text-nowrap">
                    Shop now
                </Link></h2>
        </div>
    )
}
