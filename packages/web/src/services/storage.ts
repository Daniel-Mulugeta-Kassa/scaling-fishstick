import Dexie, { Table } from 'dexie';
import { Product, Transaction, Customer } from '@types/index';

export class EtiopianERPDB extends Dexie {
  products!: Table<Product>;
  transactions!: Table<Transaction>;
  customers!: Table<Customer>;

  constructor() {
    super('EthiopianERPDB');
    this.version(1).stores({
      products: '++id, code, barcode, category',
      transactions: '++id, receiptNumber, createdAt',
      customers: '++id, email, phone',
    });
  }
}

export const db = new EtiopianERPDB();

// Offline storage service
export class OfflineStorageService {
  // Products
  static async saveProduct(product: Product) {
    return db.products.put(product);
  }

  static async getProduct(id: string) {
    return db.products.get(id);
  }

  static async getAllProducts() {
    return db.products.toArray();
  }

  static async searchProducts(query: string) {
    return db.products
      .filter(
        (p) =>
          p.nameEn.toLowerCase().includes(query.toLowerCase()) ||
          p.code.includes(query) ||
          p.barcode.includes(query)
      )
      .toArray();
  }

  // Transactions
  static async saveTransaction(transaction: Transaction) {
    return db.transactions.put(transaction);
  }

  static async getTransaction(id: string) {
    return db.transactions.get(id);
  }

  static async getAllTransactions() {
    return db.transactions.toArray();
  }

  static async getPendingTransactions() {
    return db.transactions
      .filter((t) => t.paymentStatus === 'pending')
      .toArray();
  }

  // Customers
  static async saveCustomer(customer: Customer) {
    return db.customers.put(customer);
  }

  static async getCustomer(id: string) {
    return db.customers.get(id);
  }

  static async getAllCustomers() {
    return db.customers.toArray();
  }

  // Sync status tracking
  static async getSyncStatus() {
    const syncStatus = localStorage.getItem('syncStatus');
    return syncStatus ? JSON.parse(syncStatus) : { lastSync: null, pending: [] };
  }

  static async setSyncStatus(status: any) {
    localStorage.setItem('syncStatus', JSON.stringify(status));
  }

  static async addPendingSync(item: any) {
    const status = await this.getSyncStatus();
    status.pending.push(item);
    await this.setSyncStatus(status);
  }

  static async clearCache() {
    await db.products.clear();
    await db.transactions.clear();
    await db.customers.clear();
  }
}

// Local storage helpers
export class LocalStorageService {
  static setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static getItem(key: string) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  static removeItem(key: string) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }
}
