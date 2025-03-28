import { createSlice } from "@reduxjs/toolkit";

const productModelSlice = createSlice({
  name: "ui",
  initialState: {
    isOpen: false,
    id: "",
  },
  reducers: {
    openProductModel: (state, action) => {
      state.id = action.payload;
      state.isOpen = true;
    },
    closeProductModel: (state) => {
      state.isOpen = false;
      state.id = "";
    },
  },
});

export const { openProductModel, closeProductModel } = productModelSlice.actions;

export default productModelSlice.reducer;
