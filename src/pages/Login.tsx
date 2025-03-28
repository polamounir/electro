import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../app/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loginUser } from "../app/features/slices/authSlice";
import { toast } from "sonner";

export default function Login() {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()
    const { user, loading, error } = useSelector((state: RootState) => state.auth);
    const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    console.log(error)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        try {
            await dispatch(loginUser(formData)).unwrap();
            // await dispatch(fetchUser());

            toast.success("Logged in successfully!");
            navigate("/dashboard")

        } catch (err: unknown) {
            console.error("Login failed:", err);

            let errorMessage = "An unknown error occurred";

            if (err instanceof Error) {
                errorMessage = err.message;
            } else if (typeof err === "string") {
                errorMessage = err;
            }

            toast.error(errorMessage);
        };
    };

    if (user) return <Navigate to="/dashboard" />;
    return (
        <div className="h-[75dvh] flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-2xl p-6 md:p-10 w-full max-w-sm border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-2 ">
                                <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                                <div className="flex flex-col gap-2 relative">
                                    <input
                                        type={isPasswordShown ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        required
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        onChange={handleChange}
                                    />
                                    <button className="absolute right-3  top-1/2 -translate-y-1/2 cursor-pointer" onClick={(e) => {
                                        e.preventDefault();
                                        setIsPasswordShown(!isPasswordShown)
                                    }
                                    }
                                    >{
                                            isPasswordShown ? <EyeOff /> : <Eye />
                                        }</button>
                                </div>
                            </div>
                            <small className="text-right text-sm text-teal-800 hover:underline">
                                <Link to="/forgot-password">Forgot password?</Link>
                            </small>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="cursor-pointer w-full bg-teal-600 text-white font-semibold py-2 rounded-lg transition hover:bg-teal-700 duration-300"
                        >
                            {loading ? "Wait ..." : "Login"}
                        </button>
                        <div className="text-center text-sm text-gray-600">
                            Don't have an account? <Link to="/register" className="text-teal-600 hover:underline">Register</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}