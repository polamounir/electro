
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../app/store"
import { closeProductModel } from "../../app/features/slices/productModelSlice"
import { fetchProductById } from "@/api/products"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { addToCartAsync } from "@/app/features/slices/cartSlice"


export default function ProductModel() {
    const dispatch = useDispatch<AppDispatch>()
    const { id } = useSelector((state: RootState) => state.productModel)
    const [displayedImage, setDisplayedImage] = useState("")

    const { data: product, isLoading, isError } = useQuery({
        queryKey: ["products", "product", id],
        queryFn: () => fetchProductById(id),
    })
    console.log(product)
    useEffect(() => {
        setDisplayedImage(product?.images?.[0])
    }, [product])

    const handleImageClick = (image: string) => {
        setDisplayedImage(image)
    }

    const handleAddProduct = () => {
        dispatch(addToCartAsync(id))
    }

    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                dispatch(closeProductModel())
            }
        }
        document.addEventListener("keydown", handleEscapeKey)
        return () => {
            document.removeEventListener("keydown", handleEscapeKey)
        }
    }, [dispatch])


    if (isLoading) return <h2>loading</h2>

    if (isError) return <div>Error fetching product</div>

    return (
        <div className="fixed top-0 left-0 bottom-0 w-full bg-black/50 text-white z-50 overflow-scroll flex justify-center items-center">
            <div className="flex justify-center items-center p-2 ">
                <div className="w-full max-w-3xl bg-white text-black grid grid-cols-1 md:grid-cols-2 gap-10 px-5 py-10 rounded-md shadow-2xl shadow-teal-300/50 relative" >
                    <button className="bg-gray-100 hover:bg-gray-200 font-extrabold p-5 absolute right-5 top-5 h-10 w-10 flex justify-center items-center rounded-lg" onClick={() => {
                   
                        dispatch(closeProductModel())
                    }}>X</button>
                    <div className="flex flex-col items-center justify-center gap-10">
                        <div className="h-50 flex justify-center items-center p-10">
                            {displayedImage &&
                                <div>
                                    <img src={displayedImage} alt={product?.title} className="max-h-45" />
                                </div>
                            }
                        </div>
                        <div className="flex gap-2 h-10 px-5 justify-center">
                            {

                                product?.images?.map((image: string, index: number) => (
                                    <button key={index} className="flex justify-center items-center">

                                        <img
                                            src={image}
                                            alt={product?.title}
                                            onClick={() => handleImageClick(image)}
                                            className="h-10"
                                        />
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <Link to={`/`} className="text-xl font-bold">{product?.title}</Link>
                            <h2 className="font-semibold">{product?.price} EGP</h2>
                            <p className="text-sm">
                                {product?.description?.slice(0, 250)} ...
                            </p>
                        </div>
                        <div>
                            <button className="bg-teal-500 hover:bg-teal-400 duration-500  w-full px-5 py-2 rounded text-lg font-semibold text-white" onClick={handleAddProduct}>Add to Cart</button>
                        </div>
                        <div className="text-sm">
                            <h2>Category: {product?.category}</h2>
                            <h2>Tags: {product?.tags}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
