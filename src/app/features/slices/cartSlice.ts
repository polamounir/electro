import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  getCart,
  addToCart,
  deleteFromCart,
  changeProductQuantity,
} from "../../../api/products";
import { RootState } from "../../store";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

// Define types for cart items and cart
interface CartItem {
  category: string;
  id: string;
  imageUrl: string;
  price: number;
  quantity: number;
  title: string;
}

interface CartType {
  cartItems: CartItem[];
  clientSecret: string;
  deliveryMethodId: string;
  id: string;
  paymentIntnetId: string;
  shippingPrice: number;
  subTotal: number;
}

interface CartState {
  cart: CartType;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CartState = {
  cart: {
    cartItems: [],
    clientSecret: "",
    deliveryMethodId: "",
    id: "",
    paymentIntnetId: "",
    shippingPrice: 0,
    subTotal: 0,
  },
  status: "idle",
  error: null,
};

// ---------------------------
const getCartInitID = (): string => {
  let cartInitID = localStorage.getItem("cartInitID");
  if (!cartInitID) {
    cartInitID = uuidv4();
    localStorage.setItem("cartInitID", cartInitID);
  }
  return cartInitID;
};

// -------------------------
export const fetchCartAsync = createAsyncThunk<
  CartType,
  void,
  { rejectValue: string }
>("cart/fetchCart", async (_, { rejectWithValue, getState, dispatch }) => {
  dispatch(initAppCart());
  const state = getState() as RootState;
  try {
    const response = await getCart(state.cart.cart.id);
    return response;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
});

export const addToCartAsync = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  "cart/addToCart",
  async (productId, { rejectWithValue, dispatch, getState }) => {
    dispatch(initAppCart());
    const state = getState() as RootState;
    const cartId = state.cart.cart.id;
    console.log("Cart ID:", cartId);
    try {
      await addToCart(productId, cartId);
      dispatch(fetchCartAsync());
      return productId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

export const removeFromCartAsync = createAsyncThunk<
  string,
  { productId: string; quantity: number },
  { rejectValue: string }
>(
  "cart/removeFromCart",
  async ({ productId, quantity }, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const cartId = state.cart.cart.id;

      await deleteFromCart(productId, cartId, quantity);

      // Refresh cart after removing item
      dispatch(fetchCartAsync());

      return productId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

export const setProductQuantityAsync = createAsyncThunk<
  string,
  { productId: string; quantity: number },
  { rejectValue: string }
>(
  "cart/setProductQuantity",
  async ({ productId, quantity }, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const cartId = state.cart.cart.id;

      const res: {
        code: number;
        message: string;
      } = await changeProductQuantity(productId, cartId, quantity);

      if (res.code === 200) {
        toast.success("Quantity updated successfully");
      } else {
        toast.error(res.message || "Min quantity is 1");
      }
      // Refresh cart after removing item
      dispatch(fetchCartAsync());

      return productId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initAppCart: (state) => {
      state.cart.id = getCartInitID();
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCart cases
      .addCase(fetchCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCartAsync.fulfilled,
        (state, action: PayloadAction<CartType>) => {
          state.status = "succeeded";
          if (action.payload && action.payload.cartItems?.length > 0) {
            state.cart = action.payload;
          } else {
            state.cart = initialState.cart;
          }
          state.error = null;
        }
      )
      .addCase(fetchCartAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      // Add other async operations status handling
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      // .addCase(removeFromCartAsync.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(removeFromCartAsync.fulfilled, (state) => {
      //   state.status = "succeeded";
      //   state.error = null;
      // })
      // .addCase(removeFromCartAsync.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = action.payload as string;
      // });
      .addCase(setProductQuantityAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setProductQuantityAsync.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(setProductQuantityAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { initAppCart } = cartSlice.actions;

export default cartSlice.reducer;
