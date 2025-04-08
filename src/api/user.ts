import Cookies from "js-cookie";
import { api } from "./axiosInstance";
import { AxiosError } from "axios";

export function parseJwt() {
  const token = Cookies.get("accessToken");
  if (!token) {
    return null;
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    return null;
  }

  const base64Url = parts[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

  try {
    const jsonPayload = JSON.parse(atob(base64));

    return jsonPayload;
  } catch (e) {
    console.error("Error", e);
    return null;
  }
}

export const getUserData = async () => {
  try {
    const { data } = await api.get("/auth/me");
    // console.log(data);
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

interface addressDataTypes {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  governorate: string;
}
export const addAddress = async (address: addressDataTypes) => {
  console.log(address);
  
  try {
    const res = await api.post("/addresses", 
      address,
    );
    // console.log(data);
    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error);
      return error.response;
    }
  }
};
