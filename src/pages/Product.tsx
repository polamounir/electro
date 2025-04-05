import { fetchProductById } from "@/api/products"
import { addToCartAsync } from "@/app/features/slices/cartSlice"
import { AppDispatch } from "@/app/store"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router"
import { Link } from "react-router-dom"

export default function Product() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>()
  const [displayedImage, setDisplayedImage] = useState("")

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ["products", "product", id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
  })
  console.log(product)
  useEffect(() => {
    setDisplayedImage(product?.images?.[0])
  }, [product])

  const handleImageClick = (image: string) => {
    setDisplayedImage(image)
  }

  const handleAddProduct = () => {
    dispatch(addToCartAsync(id!))
  }

  if (isLoading) return <h2>loading</h2>

  if (isError) return <div>Error fetching product</div>
  return (
    <div className="pb-30 pt-10 p-3 md:px-20">
      <div className="w-full bg-white text-black grid grid-cols-1 md:grid-cols-2 gap-10 px-5 py-10 rounded-md items-start  relative" >
        <div className="pt-5 flex flex-col md:flex-row-reverse items-center justify-center md:justify-end
        gap-5">
          <div className="h-50 md:h-auto  grow flex justify-center items-center p-10 md:p-0">
            {displayedImage &&
              <div>
                <img src={displayedImage} alt={product?.title} className="h-45 md:h-auto max-h-65" />
              </div>
            }
          </div>
          <div className="flex  md:flex-col gap-2 h-10 px-5 justify-center">
            {

              product?.images?.map((image: string, index: number) => (
                <button key={index} className="flex justify-center items-center border">

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
              {product?.description}
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
      <hr />
      <div className="mt-10">
        <h2>Related Products</h2>
        <div>

        </div>
      </div>
    </div>
  )
}
