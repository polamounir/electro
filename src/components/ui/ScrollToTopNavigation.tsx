import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTopNavigation = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [pathname]); // Runs when the route changes

    return null;
};

export default ScrollToTopNavigation;
