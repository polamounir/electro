import axios from "axios";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function AccountConfirmation() {
    const [searchParams] = useSearchParams();

    const uid = searchParams.get("uid");
    const name = searchParams.get("name");
    // const email = searchParams.get("email");
    // console.log(uid, name, email);
    const userName = localStorage.getItem("fullName") || name
    const userId = localStorage.getItem("userId") || uid;


    const navigate = useNavigate()
    const [confirmationCode, setConfirmationCode] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setConfirmationCode(value);
        }
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!userId) {
            setError("User ID is missing. Please log in again.");
            toast.error("User ID is missing. Please log in again.");
            return;
        }

        try {
            await axios.post("https://ecommerce.zerobytetools.com/api/auth/confirm-email", {
                userId,
                code: parseInt(confirmationCode),
            });

            toast.success("Email confirmed successfully!");
            // localStorage.removeItem("fullName");
            // localStorage.removeItem("userId");
            // localStorage.removeItem("confirmationCode");
            localStorage.setItem("confirmed", "confimid");
            navigate("/login")
            // console.log(response.data);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const errorMessage =
                    error.response?.data?.detail ||
                    "Invalid confirmation code";

                setError(errorMessage);
                toast.error(errorMessage);
            } else {
                setError("An unexpected error occurred.");
                toast.error("An unexpected error occurred.");
            }
        }
    };
    if (!userId) {
        return (
            <div className="min-h-[90vh] flex flex-col justify-center items-center text-center">
                <p className="text-red-600 font-medium">User ID is missing. Please log in again.</p>
                <Link to="/login" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Login
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-[90dvh] flex justify-center items-center bg-gray-50 px-4 pb-40">
            <div className="max-w-md w-full p-6 md:p-8 bg-white shadow-lg rounded-2xl border border-gray-200 text-center">
                <h1 className="text-2xl font-semibold text-gray-800">Welcome, {userName}!</h1>
                <p className="mt-2 text-gray-600">Please check your email for a confirmation code.</p>
                <div className="my-5 w-[75%] mx-auto">
                    <hr />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center justify-center gap-5">
                        <input
                            type="text"
                            placeholder="Confirmation Code"
                            className="border px-3 py-2 rounded-lg"
                            value={confirmationCode}
                            onChange={handleChange}
                            inputMode="numeric"
                            pattern="[0-9]*"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                        >
                            Confirm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
