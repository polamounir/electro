import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, ProductTypes } from "../../../types";

// Define the type for a cart item

// Define the cart state type
export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
}

// Initial state

const loadCartFromLocalStorage = (): CartState => {
  try {
    const cartData = localStorage.getItem("cart");
    return cartData ? JSON.parse(cartData) : initialState;
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return initialState;
  }
};

const initialState: CartState = loadCartFromLocalStorage();


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //  1
    addToCart: (state, action: PayloadAction<ProductTypes>) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity = existingItem.quantity + 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }

      state.totalQuantity += 1;
      state.totalAmount += newItem.price;
    },

    // -1
    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.id === itemId);

      if (existingItem) {
        if (existingItem.quantity > 1 && existingItem.quantity) {
          existingItem.quantity -= 1;
          state.totalQuantity -= 1;
          state.totalAmount -= existingItem.price;
        } else {
          state.items = state.items.filter((item) => item.id !== itemId);
          state.totalQuantity -= 1;
        }
      }
    },

    // Adjust item quantity
    adjustQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        // Recalculate total quantity and amount
        state.totalQuantity =
          state.totalQuantity - existingItem.quantity + quantity;
        state.totalAmount =
          state.totalAmount -
          existingItem.price * existingItem.quantity +
          existingItem.price * quantity;

        // Update item quantity
        existingItem.quantity = quantity;
      }
    },

    // Clear entire cart
    clearCart: () => initialState,
  },
});

// Export actions and reducer
export const { addToCart, removeFromCart, adjustQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
