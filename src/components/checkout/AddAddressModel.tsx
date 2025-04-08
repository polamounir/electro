import { addAddress } from "@/api/user";
import { closeAddressModel } from "@/app/features/slices/addAddressModelSlice";
import { AppDispatch } from "@/app/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface formDataTypes {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  governorate: string;
}

export default function AddAddressModel() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<formDataTypes>({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    governorate: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await addAddress(formData);
      console.log(res);

      if (res?.status === 401) {
        toast.error("You must be logged in to add an address");
        navigate("/login");
        dispatch(closeAddressModel());
      } else if (res?.status === 200) {
        toast.success("Address added successfully");
        dispatch(closeAddressModel());
        window.location.reload();
      } else {
        toast.error("Please Check the data and try again later");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while adding the address");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 bottom-0 w-full bg-black/50 text-white z-50 overflow-scroll flex justify-center items-center">
      <div className="flex justify-center items-center p-2">
        <div className="w-full min-w-sm max-w-3xl bg-white text-black gap-10 px-5 py-10 rounded-md shadow-2xl shadow-teal-300/50 relative">
          <button
            className="bg-gray-100 hover:bg-gray-200 font-extrabold p-5 absolute right-5 top-5 h-10 w-10 flex justify-center items-center rounded-lg"
            onClick={() => {
              dispatch(closeAddressModel());
            }}
          >
            X
          </button>

          <div className="w-full">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1 mt-3">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-md"
                />
              </div>
              <div className="flex flex-col gap-1 mt-3">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-md"
                />
              </div>
              <div className="flex flex-col gap-1 mt-3">
                <label htmlFor="street">Street</label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  required
                  value={formData.street}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-md"
                />
              </div>
              <div className="flex flex-col gap-1 mt-3">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-md"
                />
              </div>
              <div className="flex flex-col gap-1 mt-3">
                <label htmlFor="governorate">Governorate</label>
                <input
                  type="text"
                  id="governorate"
                  name="governorate"
                  required
                  value={formData.governorate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-md"
                />
              </div>

              <hr className="border-gray-300 my-3" />

              <div className="flex flex-col gap-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full border border-gray-300 bg-teal-500 text-white p-2 rounded-lg disabled:opacity-60"
                >
                  {loading ? "Adding..." : "Add Address"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
