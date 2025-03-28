
// import { fetchProducts } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
// import { Eye, Heart, ShoppingCart } from "lucide-react";


// import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import ProductCardSkeleton from "../ui/ProductCardSkeleton";
// import { openProductModel } from "../../app/features/slices/productModelSlice";
import { fetchDiscountProducts } from "../../api/products";



export default function HomeDiscount() {
    // const dispatch = useDispatch()
    // const previewProduct = (id: string) => {
    //     console.log(`Product ${id}`)
    //     dispatch(openProductModel(id))

    // }



    const { data: products, isLoading, isError, } = useQuery({
        queryKey: ["products", "discountProducts"],
        queryFn: () => new Promise((resolve) =>
            setTimeout(() => resolve(fetchDiscountProducts()), 1000)
        ),

    })


    return (
        <div className="products py-10">
            <div className="flex flex-col gap-5">

                <h2 className="text-xl font-semibold text-gray-800 mb-2"> Discounts</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 overflow-hidden gap-1 md:gap-5">
                    {/* <div className="flex justify-center flex-wrap gap-3 md:gap-5"> */}
                    {
                        isLoading && [...Array(6)].map((_, index) => (
                            <ProductCardSkeleton key={index} />
                        ))
                    }
                    {

                        Array.isArray(products) && products.map((product, i) => (

                            <div className="product p-2 py-5 rounded-md border-2 border-solid border-[#eee] overflow-hidden relative" key={i}>
                                <div className="upper flex justify-between absolute top-2 left-2 rounded-full overflow-hidden">
                                    <span className="bg-red-500 pr-3 pl-3 text-white font-medium">-1%</span>
                                    <i className="far fa-heart"></i>
                                </div>
                                <div className="h-25 md:h-50 overflow-hidden">

                                    {/* Product Image */}
                                    <img
                                        src={product.images[0]}
                                        alt={product.title}
                                        className="h-25 md:h-40 max-w-full mx-auto"

                                    />
                                </div>
                                {/* <div className="my-3 p-3 px-5  border-t border-b border-gray-200 ">
                                    <div className="flex justify-between">

                                        <button className="cursor-pointer">
                                            <ShoppingCart />
                                        </button>
                                        <button className="cursor-pointer" onClick={() => previewProduct(product.id)}>
                                            <Eye />
                                        </button>
                                        <button className="cursor-pointer">
                                            {product.isWishlisted ? (
                                                <Heart color="#ff0000" fill="#ff0000" />
                                            ) : (
                                                <Heart />
                                            )}
                                        </button>
                                    </div>
                                </div> */}

                                <div className="text-center text-xs md:text-sm">
                                   
                                    <p className="font-bold">{product.title}</p>
                                    <div className="price flex justify-center gap-5">
                                        <p className="old line-through text-gray-400">{product.price}</p>
                                        <p className="new text-red-500 font-bold">{product.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    {
                        isError && (
                            <div>Error fetching data</div>
                        )
                    }
                </div>
                <div className="flex justify-center">
                    <Link to="/" className="cursor-pointer">
                        <button className=" bg-black text-white px-10 py-3 rounded-md font-semibold">View More</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
