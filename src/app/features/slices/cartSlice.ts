import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getCart, addToCart } from "../../../api/products";
import { RootState } from "../../store";
import { v4 as uuidv4 } from "uuid";

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

// export const removeFromCartAsync = createAsyncThunk<
//   string,
//   string,
//   { rejectValue: string }
// >(
//   "cart/removeFromCart",
//   async (productId, { rejectWithValue, dispatch }) => {
//     try {
//       await removeFromCart(productId);
//       // Refresh cart after removing item
//       dispatch(fetchCartAsync());
//       return productId;
//     } catch (error) {
//       return rejectWithValue(error instanceof Error ? error.message : "An unknown error occurred");
//     }
//   }
// );

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
      .addCase(fetchCartAsync.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
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
      });

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
  },
});

export const { initAppCart } = cartSlice.actions;

export default cartSlice.reducer;
