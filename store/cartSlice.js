// // import { createSlice } from '@reduxjs/toolkit';

// // const cartSlice = createSlice({
// //   name: 'cart',
// //   initialState: {
// //     items: [], // or item ids
// //   },
// //   reducers: {
// //     addToCart: (state, action) => {
// //       state.items.push(action.payload);
// //     },
// //     removeFromCart: (state, action) => {
// //       state.items = state.items.filter(id => id !== action.payload);
// //     },
// //     clearCart: (state) => {
// //       state.items = [];
// //     },
// //   },
// // });

// // export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
// // export const selectCartCount = (state) => state.cart.items.length;
// // export default cartSlice.reducer;

// // cartSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   cartItems: [],
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const existing = state.cartItems.find(item => item.id === action.payload.id);
//       if (existing) {
//         existing.quantity += 1;
//       } else {
//         state.cartItems.push({ ...action.payload, quantity: 1 });
//       }
//     },
//     removeFromCart: (state, action) => {
//       state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
//     },
//     clearCart: (state) => {
//       state.cartItems = [];
//     },
//     loadCart: (state, action) => {
//       state.cartItems = action.payload;
//     },
//   },
// });

// export const { addToCart, removeFromCart, clearCart, loadCart } = cartSlice.actions;
// export default cartSlice.reducer;


// ✅ cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cartItems.find(item => item.id === action.payload.id);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    increaseQuantity: (state, action) => {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item) {
        item.quantity++;
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cart");
    },
    loadCart: (state, action) => {
      state.cartItems = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  loadCart,
} = cartSlice.actions;

export default cartSlice.reducer;
