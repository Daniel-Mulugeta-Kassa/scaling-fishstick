import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RootState, AppDispatch } from '@store/index';
import { fetchProducts, searchProducts } from '@store/productsSlice';

export const useProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, pageSize: 50 }));
  }, [dispatch]);

  const search = (query: string) => {
    dispatch(searchProducts(query));
  };

  const refetch = () => {
    dispatch(fetchProducts({ page: products.page, pageSize: products.pageSize }));
  };

  return {
    ...products,
    search,
    refetch,
  };
};
