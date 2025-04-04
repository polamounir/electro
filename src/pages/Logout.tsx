import { logoutUser } from "@/app/features/slices/authSlice";
import { AppDispatch } from "@/app/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export default function Logout() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(logoutUser());
        navigate("/")
    }, [dispatch]);

    return null
}
