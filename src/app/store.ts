import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./features/slices/navbarSlice";
import productModelReducer from "./features/slices/productModelSlice";
import authReducer from "./features/slices/authSlice";
import cartReducer from "./features/slices/cartSlice";
import cartMiddleware from "./features/middlewares/cartMiddleware";


export const makeStore = () => {
  return configureStore({
    reducer: {
     
      navbar: navbarReducer,
      productModel: productModelReducer,
      auth: authReducer,
      cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(cartMiddleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
