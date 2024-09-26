import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    isOpen: true,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    shrinkSidebar: (state) => {
      state.isOpen = false;
    },
  },
});

export const { toggleSidebar, shrinkSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
