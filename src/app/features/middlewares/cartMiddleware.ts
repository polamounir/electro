import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const cartMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  // Type guard to check if action is a valid Action with a type property
  if (
    typeof action === "object" &&
    action !== null &&
    "type" in action &&
    typeof action.type === "string" &&
    action.type.startsWith("cart/")
  ) {
    try {
      const state: RootState = store.getState();
      localStorage.setItem("cart", JSON.stringify(state.cart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }

  return result;
};

export default cartMiddleware;
