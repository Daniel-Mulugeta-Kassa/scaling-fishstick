import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@store/index';
import {
  addToCart,
  removeFromCart,
  updateCartItem,
  setDiscount,
  setCustomer,
  clearCart,
} from '@store/cartSlice';
import { CartItem, Customer } from '@types/index';

export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart);

  return {
    ...cart,
    addToCart: (item: CartItem) => dispatch(addToCart(item)),
    removeFromCart: (productId: string) => dispatch(removeFromCart(productId)),
    updateCartItem: (productId: string, quantity: number) =>
      dispatch(updateCartItem({ productId, quantity })),
    setDiscount: (discount: number) => dispatch(setDiscount(discount)),
    setCustomer: (customer: Customer | undefined) => dispatch(setCustomer(customer)),
    clearCart: () => dispatch(clearCart()),
  };
};
