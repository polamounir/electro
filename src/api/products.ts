import { api } from "./axiosInstance";
import Cookies from "js-cookie";
export const fetchDailyDeals = async () => {
  try {
    const { data } = await api.get(`/products?page=1&limit=8`);

    return data.items;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    return null;
  }
};

export const fetchTopProducts = async (end: number) => {
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
// -----------------------------------------------
// CART LOGIC
export const addToCart = async (productId: string, cartId: string) => {
  console.log("Product:", productId);
  try {
    const res = await fetch(
      "https://ecommerce.zerobytetools.com/api/cart/add-to-cart",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjMmQ2Y2MxNy04MmQxLTQ0YjgtOWQ0MS0wOGRkNmQwOWY2Y2MiLCJGdWxsTmFtZSI6IlBvbGEgTW91bmlyIiwiZW1haWwiOiJwb3Bwb2xhMTAzQGdtYWlsLmNvbSIsIlVzZXJUeXBlIjoiVXNlciIsIm5iZiI6MTc0MzE0NzA2MywiZXhwIjoxODA3OTQ3MDYzLCJpYXQiOjE3NDMxNDcwNjN9.TMaEX0OS_8WO79YuPUdec3BUmZ2dyMhi_8mxJGrPLzc",
        },
        body: JSON.stringify({
          productId: productId,
          cartId: cartId,
        }),
      }
    );
    if (!res.ok) {
      throw new Error("Failed to add item to cart");
    }
    console.log(res);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCart = async (id: string) => {
  try {
    const res = await fetch(`https://ecommerce.zerobytetools.com/cart/${id}`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjMmQ2Y2MxNy04MmQxLTQ0YjgtOWQ0MS0wOGRkNmQwOWY2Y2MiLCJGdWxsTmFtZSI6IlBvbGEgTW91bmlyIiwiZW1haWwiOiJwb3Bwb2xhMTAzQGdtYWlsLmNvbSIsIlVzZXJUeXBlIjoiVXNlciIsIm5iZiI6MTc0MzE0NzA2MywiZXhwIjoxODA3OTQ3MDYzLCJpYXQiOjE3NDMxNDcwNjN9.TMaEX0OS_8WO79YuPUdec3BUmZ2dyMhi_8mxJGrPLzc",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to get cart");
    }
    const data = await res.json();
    // console.log(data.cart);
    return data.cart;
  } catch (error) {
    console.log(error);
  }
};

// -----------------------------------------------
// -----------------------------------------------

interface ShippingAddress {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}
interface OrderDetailTypes {
  cartId: string;
  couponCode: string | null;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  deliveryMethod: string;
}
export const createOrder = async (data: OrderDetailTypes) => {
  try {
    const res = await fetch(
      "https://ecommerce.zerobytetools.com/api/orders/create-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
        body: JSON.stringify(data),
      }
    );
    if (!res.ok) {
      throw new Error("Error creating order");
    }
    const order = await res.json();
    console.log(order);
    return order;
  } catch (error) {
    return error;
  }
};
