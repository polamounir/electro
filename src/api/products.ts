import { AxiosError } from "axios";
import { api } from "./axiosInstance";
import Cookies from "js-cookie";

const token = Cookies.get("accessToken");

export const fetchDailyDeals = async () => {
  try {
    const res = await api.get(`/products?SearchQuery=sam&page=1&limit=8`);

    // console.log("Products:", res);

    return res.data.data.items;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    return null;
  }
};

export const fetchTopProducts = async (end: number) => {
  try {
    const { data } = await api.get(`/products?page=1&limit=24`);

    // console.log("Top Products:", data.items);
    const start = Math.max(0, end - 8);

    return data.data.items.slice(start, end);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    return null;
  }
};

export const fetchDiscountProducts = async () => {
  try {
    const { data } = await api.get(`/products?page=1&limit=12`);

    // console.log("Products:", data.items);

    return data.data.items;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    return null;
  }
};
export const fetchHomeProducts = async () => {
  try {
    const { data } = await api.get(`/products?page=1&limit=18`);

    // console.log("Products:", data.items);

    return data.data.items;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    return null;
  }
};
export const fetchCategoryProducts = async () => {
  try {
    const { data } = await api.get(`/products?page=1&limit=20`);
    return data.data.items;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    return null;
  }
};
export const fetchProductById = async (id: string) => {
  try {
    const { data } = await api.get(`/products/${id}`);

    // console.log("Product:", data);

    return data.data;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    return null;
  }
};
// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------
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
          Authorization: `Bearer ${token}`,
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

export const changeProductQuantity = async (
  productId: string,
  cartId: string,
  quantity: number
) => {
  console.log("Product:", productId);
  try {
    const res = await api.post("/cart/update-cart", {
      productId: productId,
      cartId: cartId,
      quantity: quantity,
    });
    console.log(res);
    return {
      code: res.status,
      message: res.data.message,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        code: error.response?.data.status,
        message: error.response?.data.detail,
      };
    }
    throw new Error("An unexpected error occurred");
  }
};
export const deleteFromCart = async (
  productId: string,
  cartId: string,
  quantity: number
) => {
  console.log("Product:", productId);
  try {
    const res = await api.post("/cart/update-cart", {
      productId: productId,
      cartId: cartId,
      quantity: quantity,
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// ------------------------------------------------
export const getCart = async (id: string) => {
  try {
    const { data } = await api.get(`/cart/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(data);
    return data.data.cart;
  } catch (error) {
    if (error instanceof AxiosError) {
      // console.log(error.response?.data);
      return {
        code: error.response?.data.status,
        message: error.response?.data.detail,
      };
    }

    // console.log(error);
  }
};

// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------

export const fetchDeliveryMethods = async () => {
  try {
    const { data } = await api.get(`/dms`);

    // console.log(data);

    // return data.data.deliveryMethods;
    return data.data;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    return null;
  }
};

// ----------------------------------------
interface CouponType {
  totalPrice: number;
  code: string;
}
export const validateCoupon = async (couponData: CouponType) => {
  console.log(couponData);
  try {
    const { data } = await api.post("/coupons/validate", couponData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // console.log(error);
      return {
        code: error.response?.data.status,
        message: error.response?.data.detail,
      };
    }

    console.error("Coupon validation failed:", error);
    throw new Error("Failed to validate coupon");
  }
};

// -----------------------------------------------------

// interface ShippingAddress {
//   id: string ;
//   firstName: string;
//   lastName: string;
//   street: string;
//   city: string;
//   governorate: string;
// }

export const getShippingAddress = async () => {
  try {
    const { data } = await api.get(`/addresses`);
    // console.log(data);
    return data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        code: error.response?.data.status,
        message: error.response?.data.detail,
      };
    }
    throw new Error("An unexpected error occurred");
  }
};

interface OrderDetailTypes {
  cartId: string;
  couponCode: string | null;
  address: string;
  paymentMethod: string;
  deliveryMethod: string;
}
export const createOrder = async (data: OrderDetailTypes) => {
  try {
    const res = await api.post(`/orders/create-order`, data);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        code: error.response?.data.status,
        message: error.response?.data.detail,
      };

      // if (error.status === 401) {
      //   console.log("Unauthorized");

      //   return { code: 401, message: "Please Login first" };
      // }

      // console.error(
      //   "Order creation failed:",
      //   error.response?.data || error.message
      // );

      // throw new Error(
      //   error.response?.data?.message || "Failed to create order"
      // );
    }
    console.error("Unexpected error:", error);
    throw new Error("An unexpected error occurred");
  }
};
