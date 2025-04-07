import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./features/slices/navbarSlice";
import productModelReducer from "./features/slices/productModelSlice";
import addressModelReducer from "./features/slices/addAddressModelSlice";
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
      addressModel: addressModelReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(cartMiddleware),
  });
};


export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
