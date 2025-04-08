import { createSlice } from "@reduxjs/toolkit";

type NavbarState = {
  isSideMenuOpen: boolean;
  isCartMenuOpen: boolean;
  isSearchMenuOpen: boolean;
};

const initialState: NavbarState = {
  isSideMenuOpen: false,
  isCartMenuOpen: false,
  isSearchMenuOpen: false,
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    toggleSideMenu: (state) => {
      state.isSideMenuOpen = !state.isSideMenuOpen;
      state.isCartMenuOpen = false;
      state.isSearchMenuOpen = false;
    },
    toggleCartMenu: (state) => {
      state.isCartMenuOpen = !state.isCartMenuOpen;
      state.isSideMenuOpen = false;
      state.isSearchMenuOpen = false;
    },
    toggleSearchMenu: (state) => {
      state.isSearchMenuOpen = !state.isSearchMenuOpen;
      state.isSideMenuOpen = false;
      state.isCartMenuOpen = false;
    },
    closeAllMenus: (state) => {
      state.isSideMenuOpen = false;
      state.isCartMenuOpen = false;
      state.isSearchMenuOpen = false;
      // console.log("allMenus closed");
    },
    setSideMenu: (state, action) => {
      state.isSideMenuOpen = action.payload;
      state.isCartMenuOpen = false;
      state.isSearchMenuOpen = false;
    },
    setCartMenu: (state, action) => {
      state.isCartMenuOpen = action.payload;
      state.isSideMenuOpen = false;
      state.isSearchMenuOpen = false;
    },
    setSearchMenu: (state, action) => {
      state.isSearchMenuOpen = action.payload;
      state.isSideMenuOpen = false;
      state.isCartMenuOpen = false;
    },
  },
});

export const {
  toggleSideMenu,
  toggleCartMenu,
  toggleSearchMenu,
  closeAllMenus,
  setCartMenu,
  setSideMenu,
  setSearchMenu,
} = navbarSlice.actions;
export default navbarSlice.reducer;
