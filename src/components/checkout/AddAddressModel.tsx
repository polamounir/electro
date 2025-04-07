import { closeAddressModel } from "@/app/features/slices/addAddressModelSlice"
import { AppDispatch } from "@/app/store"
import { useDispatch } from "react-redux"

export default function AddAddressModel() {
  const dispatch = useDispatch<AppDispatch>()
  return (
    <div className="fixed top-0 left-0 bottom-0 w-full bg-black/50 text-white z-50 overflow-scroll flex justify-center items-center">
      <div className="flex justify-center items-center p-2 ">
        <div className="w-full min-w-sm max-w-3xl bg-white text-black grid grid-cols-1 md:grid-cols-2 gap-10 px-5 py-10 rounded-md shadow-2xl shadow-teal-300/50 relative" >
          <button className="bg-gray-100 hover:bg-gray-200 font-extrabold p-5 absolute right-5 top-5 h-10 w-10 flex justify-center items-center rounded-lg" onClick={() => {
            dispatch(closeAddressModel())
          }}>X</button>
          <div >
            <form>
              <div className="flex flex-col gap-5">
                <label htmlFor="name">First Name</label>
                <input type="text" id="firstName" className="w-full border border-gray-300 p-2 rounded-md" />
              </div>
              <div className="flex flex-col gap-5">

                <label htmlFor="name">Last Name</label>
                <input type="text" id="lastName" className="w-full border border-gray-300 p-2 rounded-md" />
              </div>
              <div className="flex flex-col gap-5">

                <label htmlFor="name">Street</label>
                <input type="text" id="street" className="w-full border border-gray-300 p-2 rounded-md" />
              </div>
              <div className="flex flex-col gap-5">
                <label htmlFor="name">City</label>
                <input type="text" id="city" className="w-full border border-gray-300 p-2 rounded-md" />
              </div>
              <div className="flex flex-col gap-5">
                <label htmlFor="name">Governorate</label>
                <input type="text" id="governorate" className="w-full border border-gray-300 p-2 rounded-md" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
