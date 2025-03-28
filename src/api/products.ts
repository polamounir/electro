import { api } from "./axiosInstance";

export const fetchDailyDeals = async () => {
  try {
    const { data } = await api.get(`/products?page=1&limit=8`);

    return data.items;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    return null;
  }
};

export const fetchTopProducts = async ( end: number) => {
  try {
    const { data } = await api.get(`/products?page=1&limit=18`);

    // console.log("Top Products:", data.items);
    const start = Math.max(0, end - 5);
    return data.items.slice(start, end);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    return null;
  }
};

export const fetchDiscountProducts = async () => {
  try {
    const { data } = await api.get(`/products?page=1&limit=12`);

    // console.log("Products:", data.items);

    return data.items;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    return null;
  }
};
export const fetchHomeProducts = async () => {
  try {
    const { data } = await api.get(`/products?page=1&limit=18`);

    // console.log("Products:", data.items);

    return data.items;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    return null;
  }
};
