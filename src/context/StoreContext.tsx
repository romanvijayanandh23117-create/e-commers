import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category, CartItem, Order, User, ToastMessage, OrderStatus } from '../types';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_ORDERS, DEMO_USER, DEMO_ADMIN } from '../data/mockData';
import { API_BASE_URL } from '../config/api';

interface StoreContextType {
  products: Product[];
  categories: Category[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  currentUser: User | null;
  activeCoupon: { code: string; discountPercent: number; discountAmount: number } | null;
  isCartDrawerOpen: boolean;
  quickViewProduct: Product | null;
  toasts: ToastMessage[];
  searchQuery: string;

  // Actions
  setSearchQuery: (query: string) => void;
  addToCart: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'statusHistory'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
  
  // Product management (Admin)
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // User auth
  login: (email: string, role?: 'customer' | 'admin') => void;
  logout: () => void;
  updateUserProfile: (profile: Partial<User>) => void;

  // UI helpers
  setIsCartDrawerOpen: (isOpen: boolean) => void;
  setQuickViewProduct: (product: Product | null) => void;
  showToast: (type: 'success' | 'error' | 'info', message: string, title?: string) => void;
  removeToast: (id: string) => void;

  // Calculations
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  shippingFee: number;
  cartTax: number;
  cartTotal: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load products from localStorage or fallback
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('smartbiz_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('smartbiz_cart');
      return saved ? JSON.parse(saved) : [
        { product: INITIAL_PRODUCTS[0], quantity: 1 }
      ];
    } catch {
      return [];
    }
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('smartbiz_wishlist');
      return saved ? JSON.parse(saved) : ['prod-002', 'prod-005'];
    } catch {
      return [];
    }
  });

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('smartbiz_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // User authentication
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('smartbiz_user');
      return saved ? JSON.parse(saved) : DEMO_USER;
    } catch {
      return DEMO_USER;
    }
  });

  // Coupon
  const [activeCoupon, setActiveCoupon] = useState<{
    code: string;
    discountPercent: number;
    discountAmount: number;
  } | null>(null);

  // UI state
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Initial fetch from MongoDB backend API
  useEffect(() => {
    fetch(`${API_BASE_URL}/products`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      })
      .catch((e) => console.log('[StoreContext] Products API sync fallback:', e.message));

    fetch(`${API_BASE_URL}/orders`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setOrders(data);
        }
      })
      .catch((e) => console.log('[StoreContext] Orders API sync fallback:', e.message));
  }, []);

  // Persist products
  useEffect(() => {
    try {
      localStorage.setItem('smartbiz_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('smartbiz_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Persist wishlist
  useEffect(() => {
    try {
      localStorage.setItem('smartbiz_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Persist orders
  useEffect(() => {
    try {
      localStorage.setItem('smartbiz_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Persist user
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('smartbiz_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('smartbiz_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  // Toast helper
  const showToast = (type: 'success' | 'error' | 'info', message: string, title?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message, title }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  
  // Calculate discount
  let cartDiscount = 0;
  if (activeCoupon) {
    if (activeCoupon.discountPercent > 0) {
      cartDiscount = Math.round((cartSubtotal * activeCoupon.discountPercent) / 100);
    } else {
      cartDiscount = activeCoupon.discountAmount;
    }
  }

  // Shipping: 100% Free delivery on all orders
  const shippingFee = 0;
  const taxableAmount = Math.max(0, cartSubtotal - cartDiscount);
  const cartTax = Math.round(taxableAmount * 0.05); // 5% GST
  const cartTotal = taxableAmount + shippingFee + cartTax;

  // Cart operations
  const addToCart = (product: Product, quantity: number = 1, selectedColor?: string, selectedSize?: string) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          selectedColor: selectedColor || updated[existingIndex].selectedColor,
          selectedSize: selectedSize || updated[existingIndex].selectedSize,
        };
        return updated;
      } else {
        return [...prevCart, { product, quantity, selectedColor, selectedSize }];
      }
    });

    showToast('success', `Added "${product.name.slice(0, 30)}..." to your cart!`, 'Cart Updated');
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('info', 'Item removed from your cart');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('info', 'Item removed from wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('success', 'Saved to your wishlist!', 'Wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Coupon handling
  const applyCoupon = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'SMARTBIZ10') {
      setActiveCoupon({ code: cleanCode, discountPercent: 10, discountAmount: 0 });
      showToast('success', 'Promo code SMARTBIZ10 applied! 10% discount on order.', 'Coupon Applied');
      return true;
    }
    if (cleanCode === 'SUPER20') {
      if (cartSubtotal < 2000) {
        showToast('error', 'SUPER20 is valid only on orders above ₹2,000.', 'Minimum Order Required');
        return false;
      }
      setActiveCoupon({ code: cleanCode, discountPercent: 20, discountAmount: 0 });
      showToast('success', 'SUPER20 applied! 20% flat discount.', 'Coupon Applied');
      return true;
    }
    if (cleanCode === 'WELCOME200') {
      setActiveCoupon({ code: cleanCode, discountPercent: 0, discountAmount: 200 });
      showToast('success', 'Flat ₹200 off your order with WELCOME200!', 'Coupon Applied');
      return true;
    }

    showToast('error', 'Invalid or expired coupon code. Try SMARTBIZ10 or WELCOME200', 'Coupon Error');
    return false;
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
    showToast('info', 'Coupon removed');
  };

  // Order creation
  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'statusHistory'>): Order => {
    const randNum = Math.floor(100000 + Math.random() * 900000);
    const orderId = `ord-${randNum}`;
    const orderNumber = `SB-${randNum}`;
    const now = new Date().toISOString();

    const newOrder: Order = {
      ...orderData,
      id: orderId,
      orderNumber,
      createdAt: now,
      statusHistory: [
        {
          status: 'pending',
          timestamp: now,
          note: `Order placed successfully via ${orderData.paymentMethod.toUpperCase()}`,
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setActiveCoupon(null);

    // Sync to MongoDB backend
    fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder),
    }).catch((e) => console.log('[API] Order save:', e.message));

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, note?: string) => {
    // Sync to MongoDB backend
    fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, note }),
    }).catch((e) => console.log('[API] Order status update:', e.message));

    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const now = new Date().toISOString();
          const defaultNotes: Record<OrderStatus, string> = {
            pending: 'Order pending review',
            processing: 'Order packed at central hub',
            shipped: 'Order in transit with courier',
            out_for_delivery: 'Delivery partner is arriving today',
            delivered: 'Successfully delivered to customer',
            cancelled: 'Order was cancelled',
          };
          return {
            ...order,
            status,
            statusHistory: [
              ...order.statusHistory,
              {
                status,
                timestamp: now,
                note: note || defaultNotes[status],
              },
            ],
          };
        }
        return order;
      })
    );
    showToast('success', `Order status updated to "${status.replace('_', ' ').toUpperCase()}"`);
  };

  const getOrderById = (orderId: string) => {
    return orders.find(
      (o) => o.id === orderId || o.orderNumber.toLowerCase() === orderId.toLowerCase()
    );
  };

  // Product CRUD (Admin)
  const addProduct = (productData: Omit<Product, 'id' | 'createdAt'>) => {
    const id = `prod-${Date.now().toString().slice(-6)}`;
    const newProduct: Product = {
      ...productData,
      id,
      createdAt: new Date().toISOString(),
    };
    setProducts((prev) => [newProduct, ...prev]);

    // Sync to MongoDB backend
    fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    }).catch((e) => console.log('[API] Product add:', e.message));

    showToast('success', `New product "${newProduct.name}" added successfully!`);
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );

    // Sync to MongoDB backend
    fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFields),
    }).catch((e) => console.log('[API] Product update:', e.message));

    showToast('success', 'Product details saved successfully');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));

    // Sync to MongoDB backend
    fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
    }).catch((e) => console.log('[API] Product delete:', e.message));

    showToast('info', 'Product removed from store inventory');
  };

  // Auth
  const login = (email: string, role: 'customer' | 'admin' = 'customer') => {
    if (role === 'admin' || email.includes('admin')) {
      setCurrentUser(DEMO_ADMIN);
      showToast('success', 'Logged in as Store Administrator', 'Admin Access Granted');
    } else {
      const user: User = {
        ...DEMO_USER,
        email,
        name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      };
      setCurrentUser(user);
      showToast('success', `Welcome back, ${user.name}!`, 'Signed In');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('info', 'You have been logged out.');
  };

  const updateUserProfile = (profile: Partial<User>) => {
    if (!currentUser) return;
    setCurrentUser({ ...currentUser, ...profile });
    showToast('success', 'Profile updated successfully');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        cart,
        wishlist,
        orders,
        currentUser,
        activeCoupon,
        isCartDrawerOpen,
        quickViewProduct,
        toasts,
        searchQuery,
        setSearchQuery,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        applyCoupon,
        removeCoupon,
        createOrder,
        updateOrderStatus,
        getOrderById,
        addProduct,
        updateProduct,
        deleteProduct,
        login,
        logout,
        updateUserProfile,
        setIsCartDrawerOpen,
        setQuickViewProduct,
        showToast,
        removeToast,
        cartCount,
        cartSubtotal,
        cartDiscount,
        shippingFee,
        cartTax,
        cartTotal,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

