


import { Eye, Heart, ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";

// import { useState } from "react";

import ProductCardSkeleton from "../ui/ProductCardSkeleton";
import { fetchHomeProducts } from "../../api/products";
import { useQuery } from "@tanstack/react-query";
import { openProductModel } from "../../app/features/slices/productModelSlice";
import { addToCart, removeFromCart } from "../../app/features/slices/cartSlice";
import { ProductTypes } from "../../types";
import { toast } from "sonner";

export default function AllProducts() {
    const dispatch = useDispatch();



    const previewProduct = (id: string) => {
        dispatch(openProductModel(id));
    };

    const { data: products, isLoading, isError } = useQuery({
        queryKey: ["products", "homeProducts"],
        queryFn: () => fetchHomeProducts(),
    });


    const addProductToCart = (product: ProductTypes) => {
        dispatch(addToCart(product));
        toast.success(`Product Added !`);
    }

    const deleteProductToCart = (id: string) => {
        dispatch(removeFromCart(id));
        toast.success(`Product Removed !`);
    }

    return (
        <div className="products py-10">
            <div className="flex flex-col gap-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">All Products</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 md:gap-5 overflow-hidden">

                    {isLoading && [...Array(6)].map((_, index) => <ProductCardSkeleton key={index} />)}

                    {Array.isArray(products) && products.map((product, i) => (
                        <div
                            className="product  p-2 py-5 rounded-md border border-gray-200 overflow-hidden"
                            key={product.id || i}
                        >

                            <div className="h-25 md:h-50 overflow-hidden">

                                {/* Product Image */}
                                <img
                                    src={product.images[0]}
                                    alt={product.title}
                                    className="h-25 md:h-40 max-w-full mx-auto"

                                />
                            </div>

                            {/* Buttons */}
                            <div className="my-3 p-3 px-5  border-t border-b border-gray-200 ">
                                <div className="flex justify-between">

                                    <button className="" onClick={() => addProductToCart(product)}>
                                        <ShoppingCart />
                                    </button>
                                    <button className="" onClick={() => previewProduct(product.id)}>
                                        <Eye />
                                    </button>
                                    <button className="" onClick={() => deleteProductToCart(product.id)}>
                                        {product.isWishlisted ? (
                                            <Heart color="#ff0000" fill="#ff0000" />
                                        ) : (
                                            <Heart />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className="text-center text-xs md:text-sm">
                                {/* <h3 className="text-gray-400">{product.categoryId}</h3> */}
                                <div className="w-full px-3 overflow-hidden">
                                    <p className=" font-bold text-ellipsis text-nowrap">{product.title}</p>
                                </div>
                                <div className="price flex justify-center gap-5">
                                    {/* <p className="old line-through text-gray-400">${product.originalPrice}</p> */}
                                    <p className="new font-bold text-gray-500">${product.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}


                    {isError && <div className="text-red-500">Error fetching products</div>}
                </div>

                {/* Load More Button */}
                <div className="flex justify-center">
                    <button
                        className="bg-black text-white px-10 py-3 rounded-md font-semibold disabled:opacity-50"
                    // onClick={handleLoadMore}
                    // disabled={loadingMore}
                    >
                        {/* {loadingMore ? "Loading..." : "Load More"} */}

                        Load More
                    </button>
                </div>
            </div>
        </div>
    );
}
