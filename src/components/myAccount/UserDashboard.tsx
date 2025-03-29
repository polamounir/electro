import { MapPinHouse } from "lucide-react";
import { Link } from "react-router-dom";

export default function UserDashboard() {
    return (
        <div className="content flex flex-col gap-10 ">
            <div>

                <p>Hello <b>Pola Mounir</b> ( not <b>Pola Mounir?</b> <Link to="/" className="text-blue-400">Log out</Link> )</p>
            </div>
            <div className=" history ">
                <h3 className="font-semibold">Order History:</h3>
                <p className="flex gap-1">Make your first order You haven't placed any orders yet.</p>
            </div>
            <div className="details flex flex-col gap-10">
                <div className="flex flex-col gap-1">
                    <h3 className="font-semibold ">Account details :</h3>
                    <p className="">Pola Mounir</p>
                    <p className="flex items-center gap-2"><MapPinHouse size={16} color="#686363" /> <span>Egypt</span></p>
                </div>
                <table className="border-collapse border border-gray-400 w-full">
                    <tbody>
                        <tr>
                            <td className="border border-gray-300 p-2 font-semibold">Name:</td>
                            <td className="border border-gray-300 p-2">Pola Mounir</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 p-2 font-semibold">E-mail:</td>
                            <td className="border border-gray-300 p-2">Pola@gmail.com</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 p-2 font-semibold">Phone:</td>
                            <td className="border border-gray-300 p-2">01234567890</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 p-2 font-semibold">Main Address:</td>
                            <td className="border border-gray-300 p-2"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex justify-end">
                <button className="px-10 py-1 rounded-full me-5 text-xl font-semibold bg-teal-600 hover:bg-teal-500 text-white duration-300">Edit</button>
            </div>
        </div>
    )
}
