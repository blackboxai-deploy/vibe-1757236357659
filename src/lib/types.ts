// Core data types for Reejh Mann Di Shopping App

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // For sale items
  category: string;
  images: string[];
  variants: ProductVariant[];
  stock: number;
  featured: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: string;
  name: string; // e.g., "Size", "Color"
  options: VariantOption[];
}

export interface VariantOption {
  id: string;
  value: string; // e.g., "Large", "Blue"
  stock: number;
  priceModifier?: number; // Additional cost for this variant
}

export interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
  image: string;
  productCount: number;
  parentId?: string; // For subcategories
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedVariants: { [key: string]: string }; // variant name -> selected option
  price: number; // Final price including variant modifiers
}

export interface Cart {
  id: string;
  userId?: string;
  items: CartItem[];
  total: number;
  itemCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: OrderStatus;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
  trackingNumber?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  addresses: Address[];
  phone?: string;
  avatar?: string;
  createdAt: string;
  lastLogin: string;
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
}

export interface AdminStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  lowStockProducts: number;
  recentOrders: Order[];
  topProducts: Product[];
  salesData: SalesDataPoint[];
}

export interface SalesDataPoint {
  date: string;
  revenue: number;
  orders: number;
}

export interface ProductFilters {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  inStock?: boolean;
  featured?: boolean;
  rating?: number;
  tags?: string[];
  search?: string;
  sortBy?: 'name' | 'price' | 'rating' | 'newest' | 'popular';
  sortOrder?: 'asc' | 'desc';
}

// Enums
export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  RETURNED = 'returned'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded'
}

export enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin'
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ProductForm {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  stock: number;
  featured: boolean;
  tags: string[];
  variants: ProductVariant[];
}

export interface CheckoutForm {
  shippingAddress: Omit<Address, 'id' | 'isDefault'>;
  billingAddress: Omit<Address, 'id' | 'isDefault'>;
  paymentMethod: string;
  saveAddresses: boolean;
}