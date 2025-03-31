import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {  fetchInitCart, initAppCart } from "../app/features/slices/cartSlice";


const AppInitializer = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initAppCart());
        fetchInitCart()
        
    }, [dispatch]);
    
    return null;
};

export default AppInitializer;
