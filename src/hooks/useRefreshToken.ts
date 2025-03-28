// import { axiosInstance } from "../api/axiosInstance";
// import { useDispatch } from "react-redux";
// import { login, logout } from "../features/auth/authSlice";

// export const useRefreshToken = () => {
//   const dispatch = useDispatch();

//   const refresh = async () => {
//     try {
//       const response = await api.get("/auth/refresh", {
//         withCredentials: true,
//       });
//       dispatch(login({ user: response.data.user, token: response.data.token }));
//       return response.data.token;
//     } catch (error) {
//       dispatch(logout());
//       throw error;
//     }
//   };

//   return refresh;
// };
