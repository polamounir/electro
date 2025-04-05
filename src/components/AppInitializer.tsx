import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { fetchUser } from "../app/features/slices/authSlice";
import { useEffect } from "react";
import { fetchCartAsync } from "@/app/features/slices/cartSlice";


const AppInitializer = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchUser());
        dispatch(fetchCartAsync())
    }, [dispatch]);


    return null;
};

export default AppInitializer;
