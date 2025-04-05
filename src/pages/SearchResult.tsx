import { fetchSearchProducts } from "@/api/products";
import { ProductTypes } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { Link } from "react-router-dom";

export default function SearchResult() {
    const [searchParams] = useSearchParams();
    const searchTerm: string = searchParams.get("query") || "";

    const { data: products, isLoading, isError } = useQuery({
        queryKey: ["products", "search", searchTerm],
        queryFn: () => fetchSearchProducts(searchTerm),
    });
    return (
        <div>
            <div>
                <div className="p-20">
                    <h2 className="text-lg font-bold mb-5">Search Result</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 gap-10">
                        {isLoading &&
                            Array.from({ length: 5 }).map((_, index) => (
                                <div key={index}>
                                    <div className="animate-pulse flex flex-col p-5 space-x-4">

                                        <div className="flex justify-center">
                                            <div className="rounded-full bg-gray-300 h-20 w-20"></div>
                                        </div>
                                        <div className="flex-1 space-y-3 py-1 mt-2">
                                            <div className="space-y-2">
                                                <div className="h-2 bg-gray-300 rounded"></div>
                                                <div className="h-2 bg-gray-300 rounded"></div>
                                            </div>
                                            <div className="h-2 bg-gray-300 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        {!isError && products?.map((product: ProductTypes) => (
                            <Link to={`/product/${product?.id}`} key={product?.id} className="border border-gray-300 shadow-md rounded p-2 py-5">
                                <div className="flex flex-col gap-5">
                                    <div className="flex justify-center">
                                        <img src={product?.images?.[0]} alt={product?.title} className="h-20" />
                                    </div>
                                    <div className="text-center text-sx md:text-xs">
                                        <h2>{product?.title}</h2>
                                        <p className="mt-2">{product?.price} EGP</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                        {
                            !isLoading && !isError && products?.length === 0 && <p>No Products Found</p>
                        }
                        {
                            isError && <p>Error While Searching ...</p>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}
