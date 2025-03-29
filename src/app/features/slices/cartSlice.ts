import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductTypes } from "../../../types";

// Define the type for a cart item
export interface CartItem extends ProductTypes {
  quantity: number;
}

// Define the cart state type
export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
}

// Initial state
const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const loadCartFromLocalStorage = (): CartState => {
  try {
    const cartData = localStorage.getItem("cart");
    return cartData ? JSON.parse(cartData) : initialState;
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return initialState;
  }
};

// Save cart to localStorage middleware
const saveCartToLocalStorage = (state: CartState) => {
  try {
    localStorage.setItem("cart", JSON.stringify(state));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromLocalStorage(),
  reducers: {
    // Add item to cart
    addToCart: (state, action: PayloadAction<ProductTypes>) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }

      state.totalQuantity += 1;
      state.totalAmount += newItem.price;

      saveCartToLocalStorage(state);
    },

    // Remove item from cart
    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.id === itemId);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          state.totalQuantity -= 1;
          state.totalAmount -= existingItem.price;
        } else {
          state.items = state.items.filter((item) => item.id !== itemId);
          state.totalQuantity -= 1;
          state.totalAmount -= existingItem.price; // Fixed: Missing total amount reduction
        }

        saveCartToLocalStorage(state);
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

        // Remove item if quantity is 0
        if (quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== id);
        }

        saveCartToLocalStorage(state);
      }
    },

    // Clear entire cart
    clearCart: (state) => {
      Object.assign(state, initialState);
      localStorage.removeItem("cart");
    },
  },
});

// Export actions and reducer
export const { addToCart, removeFromCart, adjustQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
