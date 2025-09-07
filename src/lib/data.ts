import { Product, Category, Order, User, AdminStats, OrderStatus, PaymentStatus, UserRole } from './types';

// Mock Categories
export const categories: Category[] = [
  {
    id: 'cat-1',
    name: 'Men\'s Collection',
    description: 'Premium men\'s clothing and accessories',
    slug: 'mens-collection',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/754d8eb4-8bd9-40d2-ae09-6794cfe6a3cd.png',
    productCount: 45
  },
  {
    id: 'cat-2', 
    name: 'Women\'s Collection',
    description: 'Elegant women\'s fashion and accessories',
    slug: 'womens-collection',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7e3f9253-da32-41d3-abb6-b97c8ff44ff3.png',
    productCount: 38
  },
  {
    id: 'cat-3',
    name: 'Traditional Wear',
    description: 'Authentic traditional clothing',
    slug: 'traditional-wear',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/42f27c8b-6b43-4167-997d-0a7bc61eca0e.png',
    productCount: 25
  },
  {
    id: 'cat-4',
    name: 'Accessories',
    description: 'Fashion accessories and jewelry',
    slug: 'accessories',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/72543961-c526-4d3d-9c64-0fa7e11ce671.png',
    productCount: 18
  }
];

// Mock Products
export const products: Product[] = [
  {
    id: 'prod-1',
    name: 'Premium Cotton Kurta',
    description: 'Handcrafted premium cotton kurta with intricate embroidery. Perfect for festive occasions and traditional events.',
    price: 2499,
    originalPrice: 2999,
    category: 'Traditional Wear',
    images: [
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/bf8ef42a-f348-4c41-8315-74eb50e93512.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c9761a56-7491-4c0a-a905-5f354119557e.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/75f8d38e-7d5b-4f94-a08e-42b0f018a492.png'
    ],
    variants: [
      {
        id: 'size-variant',
        name: 'Size',
        options: [
          { id: 'size-s', value: 'Small', stock: 10 },
          { id: 'size-m', value: 'Medium', stock: 15 },
          { id: 'size-l', value: 'Large', stock: 8 },
          { id: 'size-xl', value: 'Extra Large', stock: 5 }
        ]
      },
      {
        id: 'color-variant',
        name: 'Color',
        options: [
          { id: 'color-blue', value: 'Royal Blue', stock: 12 },
          { id: 'color-white', value: 'Ivory White', stock: 15 },
          { id: 'color-maroon', value: 'Maroon', stock: 11 }
        ]
      }
    ],
    stock: 38,
    featured: true,
    rating: 4.8,
    reviewCount: 124,
    tags: ['traditional', 'cotton', 'festive', 'embroidered'],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z'
  },
  {
    id: 'prod-2',
    name: 'Designer Silk Saree',
    description: 'Exquisite silk saree with zari work and traditional patterns. A timeless piece for special occasions.',
    price: 8999,
    originalPrice: 12999,
    category: 'Women\'s Collection',
    images: [
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/34d86848-bf82-4d7d-9958-a2f40bda6cfa.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9b747ee5-b840-41a2-893f-64331105b496.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f71ef9a0-3d77-4526-9924-5587870f6c7e.png'
    ],
    variants: [
      {
        id: 'color-variant',
        name: 'Color',
        options: [
          { id: 'color-red', value: 'Deep Red', stock: 8 },
          { id: 'color-green', value: 'Emerald Green', stock: 6 },
          { id: 'color-navy', value: 'Navy Blue', stock: 7 }
        ]
      }
    ],
    stock: 21,
    featured: true,
    rating: 4.9,
    reviewCount: 89,
    tags: ['silk', 'saree', 'zari', 'wedding', 'luxury'],
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-18T16:45:00Z'
  },
  {
    id: 'prod-3',
    name: 'Casual Denim Jacket',
    description: 'Trendy denim jacket with modern fit. Perfect for casual outings and layering.',
    price: 3499,
    category: 'Men\'s Collection',
    images: [
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/838eb44a-b1c0-4a78-a7b6-129ef34a838c.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/dde3046b-2383-488e-abf5-0a8de5e9859a.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/19d78028-fba2-4b69-ae2f-1829e264fe70.png'
    ],
    variants: [
      {
        id: 'size-variant',
        name: 'Size',
        options: [
          { id: 'size-s', value: 'Small', stock: 12 },
          { id: 'size-m', value: 'Medium', stock: 18 },
          { id: 'size-l', value: 'Large', stock: 14 },
          { id: 'size-xl', value: 'Extra Large', stock: 9 }
        ]
      }
    ],
    stock: 53,
    featured: false,
    rating: 4.5,
    reviewCount: 67,
    tags: ['denim', 'casual', 'jacket', 'street-style'],
    createdAt: '2024-01-12T12:00:00Z',
    updatedAt: '2024-01-22T11:20:00Z'
  },
  {
    id: 'prod-4',
    name: 'Elegant Evening Dress',
    description: 'Sophisticated evening dress with flowing silhouette. Perfect for formal events and celebrations.',
    price: 5999,
    originalPrice: 7999,
    category: 'Women\'s Collection',
    images: [
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4bdf5f80-91bd-471f-a072-25c8049a06d4.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/aff35ba0-ba8d-4999-a0c3-04bd9acfed2b.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ea45a532-c402-45aa-b7a9-7b6b6c3b7016.png'
    ],
    variants: [
      {
        id: 'size-variant',
        name: 'Size',
        options: [
          { id: 'size-xs', value: 'Extra Small', stock: 4 },
          { id: 'size-s', value: 'Small', stock: 8 },
          { id: 'size-m', value: 'Medium', stock: 10 },
          { id: 'size-l', value: 'Large', stock: 6 }
        ]
      },
      {
        id: 'color-variant',
        name: 'Color',
        options: [
          { id: 'color-black', value: 'Classic Black', stock: 15 },
          { id: 'color-navy', value: 'Midnight Navy', stock: 8 },
          { id: 'color-wine', value: 'Wine Red', stock: 5 }
        ]
      }
    ],
    stock: 28,
    featured: true,
    rating: 4.7,
    reviewCount: 143,
    tags: ['dress', 'evening', 'formal', 'elegant'],
    createdAt: '2024-01-08T14:00:00Z',
    updatedAt: '2024-01-25T09:15:00Z'
  },
  {
    id: 'prod-5',
    name: 'Handcrafted Leather Belt',
    description: 'Premium genuine leather belt with brass buckle. Handcrafted for durability and style.',
    price: 1999,
    category: 'Accessories',
    images: [
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5fe9506c-4d74-45e3-b7a5-65a48339a1f9.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/70e80088-f09b-4188-a03b-8d592d7bdf7f.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ef2acde5-9130-4a76-9b66-7309545decef.png'
    ],
    variants: [
      {
        id: 'size-variant',
        name: 'Size',
        options: [
          { id: 'size-32', value: '32 inches', stock: 8 },
          { id: 'size-34', value: '34 inches', stock: 12 },
          { id: 'size-36', value: '36 inches', stock: 15 },
          { id: 'size-38', value: '38 inches', stock: 10 },
          { id: 'size-40', value: '40 inches', stock: 6 }
        ]
      },
      {
        id: 'color-variant',
        name: 'Color',
        options: [
          { id: 'color-brown', value: 'Classic Brown', stock: 25 },
          { id: 'color-black', value: 'Jet Black', stock: 20 },
          { id: 'color-tan', value: 'Tan', stock: 6 }
        ]
      }
    ],
    stock: 51,
    featured: false,
    rating: 4.6,
    reviewCount: 78,
    tags: ['leather', 'belt', 'accessories', 'handcrafted'],
    createdAt: '2024-01-14T16:00:00Z',
    updatedAt: '2024-01-21T13:40:00Z'
  },
  {
    id: 'prod-6',
    name: 'Printed Cotton Shirt',
    description: 'Comfortable cotton shirt with unique print design. Perfect for casual and semi-formal occasions.',
    price: 2799,
    category: 'Men\'s Collection',
    images: [
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/155a07a5-6c48-4076-a7fa-42fcf72b5ecc.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e60aef61-68e4-41db-82b2-d68102a763d6.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9540c01d-d005-4486-b1d0-c575166a4794.png'
    ],
    variants: [
      {
        id: 'size-variant',
        name: 'Size',
        options: [
          { id: 'size-s', value: 'Small', stock: 14 },
          { id: 'size-m', value: 'Medium', stock: 20 },
          { id: 'size-l', value: 'Large', stock: 16 },
          { id: 'size-xl', value: 'Extra Large', stock: 8 }
        ]
      }
    ],
    stock: 58,
    featured: false,
    rating: 4.4,
    reviewCount: 92,
    tags: ['cotton', 'shirt', 'printed', 'casual'],
    createdAt: '2024-01-16T11:00:00Z',
    updatedAt: '2024-01-24T15:25:00Z'
  }
];

// Mock Users
export const users: User[] = [
  {
    id: 'user-1',
    email: 'admin@reejhmanndi.com',
    name: 'Admin User',
    role: UserRole.ADMIN,
    addresses: [
      {
        id: 'addr-1',
        name: 'Office Address',
        street: '123 Fashion Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        zipCode: '400001',
        country: 'India',
        phone: '+91 9876543210',
        isDefault: true
      }
    ],
    avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/589086a9-a5ea-4638-90c7-5a4cbecc0bdd.png',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-01-25T10:30:00Z'
  },
  {
    id: 'user-2',
    email: 'customer@example.com',
    name: 'John Doe',
    role: UserRole.CUSTOMER,
    addresses: [
      {
        id: 'addr-2',
        name: 'Home Address',
        street: '456 Customer Lane',
        city: 'Delhi',
        state: 'Delhi',
        zipCode: '110001',
        country: 'India',
        phone: '+91 9876543211',
        isDefault: true
      }
    ],
    createdAt: '2024-01-05T10:00:00Z',
    lastLogin: '2024-01-25T09:15:00Z'
  }
];

// Mock Orders
export const orders: Order[] = [
  {
    id: 'order-1',
    userId: 'user-2',
    orderNumber: 'RM-2024-0001',
    items: [
      {
        id: 'cart-item-1',
        productId: 'prod-1',
        product: products[0],
        quantity: 1,
        selectedVariants: { 'Size': 'Medium', 'Color': 'Royal Blue' },
        price: 2499
      }
    ],
    subtotal: 2499,
    shipping: 199,
    tax: 374.85,
    total: 3072.85,
    status: OrderStatus.DELIVERED,
    shippingAddress: {
      id: 'addr-2',
      name: 'Home Address',
      street: '456 Customer Lane',
      city: 'Delhi',
      state: 'Delhi',
      zipCode: '110001',
      country: 'India',
      phone: '+91 9876543211',
      isDefault: true
    },
    billingAddress: {
      id: 'addr-2',
      name: 'Home Address',
      street: '456 Customer Lane',
      city: 'Delhi',
      state: 'Delhi',
      zipCode: '110001',
      country: 'India',
      phone: '+91 9876543211',
      isDefault: true
    },
    paymentMethod: 'Credit Card',
    paymentStatus: PaymentStatus.PAID,
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-23T16:45:00Z',
    trackingNumber: 'RM123456789IN'
  }
];

// Mock Admin Statistics
export const adminStats: AdminStats = {
  totalProducts: products.length,
  totalOrders: 156,
  totalRevenue: 456789,
  lowStockProducts: 3,
  recentOrders: orders.slice(0, 5),
  topProducts: products.filter(p => p.featured).slice(0, 5),
  salesData: [
    { date: '2024-01-01', revenue: 12500, orders: 8 },
    { date: '2024-01-02', revenue: 15800, orders: 12 },
    { date: '2024-01-03', revenue: 18900, orders: 15 },
    { date: '2024-01-04', revenue: 22100, orders: 18 },
    { date: '2024-01-05', revenue: 19500, orders: 14 },
    { date: '2024-01-06', revenue: 25600, orders: 22 },
    { date: '2024-01-07', revenue: 28900, orders: 25 }
  ]
};

// Helper functions
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(category => category.slug === slug);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const getOrdersByUserId = (userId: string): Order[] => {
  return orders.filter(order => order.userId === userId);
};

export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};