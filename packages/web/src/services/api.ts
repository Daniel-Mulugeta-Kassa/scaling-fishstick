import axios, { AxiosInstance, AxiosError } from 'axios';
import { ApiResponse, PaginatedResponse } from '@types/index';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor for adding auth token
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Handle unauthorized
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async login(username: string, password: string) {
    const response = await this.client.post<ApiResponse<{ token: string; user: any }>>(
      '/auth/login',
      { username, password }
    );
    return response.data;
  }

  async logout() {
    return this.client.post('/auth/logout');
  }

  async refreshToken() {
    const response = await this.client.post<ApiResponse<{ token: string }>>(
      '/auth/refresh'
    );
    return response.data;
  }

  // Product endpoints
  async getProducts(page = 1, pageSize = 50) {
    const response = await this.client.get<PaginatedResponse<any>>(
      '/products',
      { params: { page, pageSize } }
    );
    return response.data;
  }

  async getProduct(id: string) {
    const response = await this.client.get(`/products/${id}`);
    return response.data;
  }

  async createProduct(data: any) {
    const response = await this.client.post('/products', data);
    return response.data;
  }

  async updateProduct(id: string, data: any) {
    const response = await this.client.put(`/products/${id}`, data);
    return response.data;
  }

  async deleteProduct(id: string) {
    return this.client.delete(`/products/${id}`);
  }

  async searchProducts(query: string) {
    const response = await this.client.get('/products/search', {
      params: { q: query }
    });
    return response.data;
  }

  // Transaction endpoints
  async getTransactions(page = 1, pageSize = 50, filters?: any) {
    const response = await this.client.get<PaginatedResponse<any>>(
      '/transactions',
      { params: { page, pageSize, ...filters } }
    );
    return response.data;
  }

  async getTransaction(id: string) {
    const response = await this.client.get(`/transactions/${id}`);
    return response.data;
  }

  async createTransaction(data: any) {
    const response = await this.client.post('/transactions', data);
    return response.data;
  }

  async voidTransaction(id: string) {
    const response = await this.client.post(`/transactions/${id}/void`);
    return response.data;
  }

  // Customer endpoints
  async getCustomers(page = 1, pageSize = 50) {
    const response = await this.client.get<PaginatedResponse<any>>(
      '/customers',
      { params: { page, pageSize } }
    );
    return response.data;
  }

  async getCustomer(id: string) {
    const response = await this.client.get(`/customers/${id}`);
    return response.data;
  }

  async createCustomer(data: any) {
    const response = await this.client.post('/customers', data);
    return response.data;
  }

  async searchCustomers(query: string) {
    const response = await this.client.get('/customers/search', {
      params: { q: query }
    });
    return response.data;
  }

  // Inventory endpoints
  async getInventory(page = 1, pageSize = 50) {
    const response = await this.client.get('/inventory', {
      params: { page, pageSize }
    });
    return response.data;
  }

  async adjustInventory(productId: string, quantity: number, reason: string) {
    const response = await this.client.post('/inventory/adjust', {
      productId,
      quantity,
      reason,
    });
    return response.data;
  }

  // Reports
  async getSalesReport(startDate: string, endDate: string) {
    const response = await this.client.get('/reports/sales', {
      params: { startDate, endDate }
    });
    return response.data;
  }

  async getInventoryReport() {
    const response = await this.client.get('/reports/inventory');
    return response.data;
  }

  async getDashboardStats() {
    const response = await this.client.get('/dashboard/stats');
    return response.data;
  }
}

export const apiClient = new ApiClient();
