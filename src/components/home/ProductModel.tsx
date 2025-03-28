
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { closeProductModel } from "../../app/features/slices/productModelSlice"


export default function ProductModel() {
    const dispatch = useDispatch()
    const { id } = useSelector((state: RootState) => state.productModel)

    return (
        <div className="fixed top-0 left-0 bottom-0 w-full bg-black/50 text-white z-40">
            <div className="w-full h-full flex justify-center items-center">
                <button className="bg-red-500 p-5" onClick={() =>{
                    console.log("Product")
                    dispatch(closeProductModel())}}>close</button>
                <div>
                    <h2>
                        ProductID : {id}
                    </h2>
                </div>
            </div>
        </div>
    )
}
