import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  grocery: {
    items: [],
    totalPrice: 0,
    totalItems: 0,
  },
  apartment: {
    items: [],
    totalPrice: 0,
    totalItems: 0,
  },
};

const updateCartTotals = (cartItems) => {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  return { totalItems, totalPrice };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity, type = 'grocery' } = action.payload;
      const cart = state[type];
      const existingItem = cart.items.find((item) => item.product.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product, quantity });
      }

      const totals = updateCartTotals(cart.items);
      cart.totalItems = totals.totalItems;
      cart.totalPrice = totals.totalPrice;
    },
    removeFromCart: (state, action) => {
      const { productId, type = 'grocery' } = action.payload;
      const cart = state[type];
      cart.items = cart.items.filter((item) => item.product.id !== productId);
      
      const totals = updateCartTotals(cart.items);
      cart.totalItems = totals.totalItems;
      cart.totalPrice = totals.totalPrice;
    },
    updateQuantity: (state, action) => {
      const { productId, quantity, type = 'grocery' } = action.payload;
      const cart = state[type];
      const item = cart.items.find((item) => item.product.id === productId);

      if (item) {
        item.quantity = Math.max(1, quantity);
      }

      const totals = updateCartTotals(cart.items);
      cart.totalItems = totals.totalItems;
      cart.totalPrice = totals.totalPrice;
    },
    clearCart: (state, action) => {
      const type = action.payload || 'grocery';
      state[type].items = [];
      state[type].totalPrice = 0;
      state[type].totalItems = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
