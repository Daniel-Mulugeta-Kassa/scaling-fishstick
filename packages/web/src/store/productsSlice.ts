import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '@types/index';
import { apiClient } from '@services/api';
import { OfflineStorageService } from '@services/storage';

interface ProductsState {
  items: Product[];
  loading: boolean;
  error?: string;
  total: number;
  page: number;
  pageSize: number;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  total: 0,
  page: 1,
  pageSize: 50,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page = 1, pageSize = 50 }, { rejectWithValue }) => {
    try {
      const response = await apiClient.getProducts(page, pageSize);
      // Cache products locally
      response.data?.forEach((product) => OfflineStorageService.saveProduct(product));
      return response;
    } catch (error: any) {
      // Try to get from cache if offline
      try {
        const cached = await OfflineStorageService.getAllProducts();
        return { data: cached, total: cached.length };
      } catch {
        return rejectWithValue('Failed to fetch products');
      }
    }
  }
);

export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async (query: string, { rejectWithValue }) => {
    try {
      if (query.length < 2) return { data: [], total: 0 };
      const response = await apiClient.searchProducts(query);
      return response;
    } catch (error: any) {
      try {
        const cached = await OfflineStorageService.searchProducts(query);
        return { data: cached, total: cached.length };
      } catch {
        return rejectWithValue('Search failed');
      }
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data || [];
        state.total = action.payload.total || 0;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data || [];
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productsSlice.reducer;
