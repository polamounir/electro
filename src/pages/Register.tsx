import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../app/features/slices/authSlice"; // Use the correct action
import { Eye, EyeOff } from "lucide-react";
interface FormData {
    fullName: string;
    phoneNumber: string;
    email: string;
    password: string;
}
export default function Register() {
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
    });

    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { loading } = useSelector((state: RootState) => state.auth);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData)
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await dispatch(registerUser(formData)).unwrap();
            toast.success("Account created successfully!");
            navigate(`/confirm-account?uid=${res.userId}&name=${res.name}&email=${res.userName}`);
        } catch (err: unknown) {
            console.error("Registration failed:", err);
            let errorMessage = "An unknown error occurred";

            if (err instanceof Error) {
                errorMessage = err.message;
            } else if (typeof err === "string") {
                errorMessage = err;

            }

            const allErrors = errorMessage.split("* ")
            for (let i = 0; i < allErrors.length; i++) {
                toast.error(allErrors[i]);

            }
        }
    };

    return (
        <div className="min-h-[100dvh] flex items-center justify-center bg-gray-100 p-4 pb-30">
            <div className="bg-white shadow-lg rounded-2xl p-6 md:p-10 w-full max-w-sm border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4">
                        {/* Full Name */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleChange}
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleChange}
                            />
                        </div>

                        {/* Phone */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleChange}
                            />
                        </div>



                        {/* Password */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                            <div className="relative">
                                <input
                                    type={isPasswordShown ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    required
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                    onClick={() => setIsPasswordShown(!isPasswordShown)}
                                >
                                    {isPasswordShown ? <EyeOff /> : <Eye />}
                                </button>
                            </div>
                        </div>
                        {/* Confirm Password */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={isConfirmPasswordShown ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    required
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                    }}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                    onClick={() => setIsConfirmPasswordShown(!isConfirmPasswordShown)}
                                >
                                    {isConfirmPasswordShown ? <EyeOff /> : <Eye />}
                                </button>
                            </div>
                            <div>
                                {
                                    confirmPassword !== formData.password && confirmPassword.length > 0 && (
                                        <div className="text-red-500 text-sm">Passwords do not match</div>
                                    )
                                }
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="cursor-pointer w-full bg-blue-600 text-white font-semibold py-2 rounded-lg transition hover:bg-blue-700 duration-300"
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>

                        {/* Redirect to Login */}
                        <div className="text-center text-sm text-gray-600">
                            Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
