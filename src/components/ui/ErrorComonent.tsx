import { Link } from "react-router-dom";


export default function ErrorComponent() {
    return (
        <div className="flex flex-col items-center justify-center h-[500px] max-w-xl mx-auto text-gray-800 px-5 md:px-10">
            <div className="bg-white shadow-lg rounded-2xl p-6 text-center w-full py-20 flex flex-col">
                <h2 className="text-2xl font-bold text-red-600 mb-2">Something went Wrong</h2>
                <p className="text-gray-600 mb-4">An unexpected error occurred. Please try again later.</p>
                <Link
                    to="/"
                    className="bg-sky-600 text-white w-full py-3 rounded-lg shadow-md hover:bg-sky-700 transition"
                >
                    Go back to Homepage
                </Link>
            </div>
        </div>
    );
}
