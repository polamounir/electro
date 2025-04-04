import { Link } from "react-router-dom";


export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[75dvh] bg-gray-100 text-gray-800">
            <h1 className="text-9xl font-bold text-teal-500">404</h1>
            <h2 className="text-2xl font-semibold mt-4 text-red-600">Page Not Found</h2>
            <p className="mt-2 text-gray-600">Sorry, the page you are looking for does not exist.</p>
            <Link
                to="/"
                className="mt-6 px-6 py-3 text-lg font-medium text-white bg-teal-500 rounded-lg shadow-md hover:bg-teal-600 transition"
            >
                Go Home
            </Link>
        </div>

    )
}
