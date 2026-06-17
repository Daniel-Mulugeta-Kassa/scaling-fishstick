import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart, CartItem, Customer } from '@types/index';

const initialState: Cart = {
  items: [],
  subtotal: 0,
  tax: 0,
  discount: 0,
  total: 0,
};

const TAX_RATE = 0.15; // 15% tax

const calculateTotals = (state: Cart) => {
  state.subtotal = state.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  state.tax = state.subtotal * TAX_RATE;
  state.total = state.subtotal + state.tax - (state.discount || 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find((item) => item.productId === action.payload.productId);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      calculateTotals(state);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.productId !== action.payload);
      calculateTotals(state);
    },
    updateCartItem: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const item = state.items.find((item) => item.productId === action.payload.productId);
      if (item) {
        item.quantity = action.payload.quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i.productId !== action.payload.productId);
        }
      }
      calculateTotals(state);
    },
    setDiscount: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
      calculateTotals(state);
    },
    setCustomer: (state, action: PayloadAction<Customer | undefined>) => {
      state.customer = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
      state.customer = undefined;
      state.discount = 0;
      calculateTotals(state);
    },
  },
});

export const { addToCart, removeFromCart, updateCartItem, setDiscount, setCustomer, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
