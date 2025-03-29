import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
    const scrollUp = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return (
        <button className="p-2 rounded-full bg-black text-white fixed bottom-5 left-5 z-10 hover:bg-white hover:text-teal-600 duration-400" onClick={scrollUp}>
            <ArrowUp /> 
        </button>
    )
}
