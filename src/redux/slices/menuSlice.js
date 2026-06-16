import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuItems: [],
  loading: false,
};

const menuSlice = createSlice({
  name: "menu",

  initialState,

  reducers: {
    setMenuItems: (state, action) => {
      state.menuItems = action.payload;
    },

    addMenuItem: (state, action) => {
      state.menuItems.unshift(action.payload);
    },

    updateMenuItem: (state, action) => {
      state.menuItems = state.menuItems.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },

    deleteMenuItem: (state, action) => {
      state.menuItems = state.menuItems.filter(
        (item) => item.id !== action.payload
      );
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  setLoading,
} = menuSlice.actions;

export default menuSlice.reducer;