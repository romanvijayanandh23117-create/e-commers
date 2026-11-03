import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Truck,
  Eye,
  Filter,
  DollarSign,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  X,
  Save,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product, OrderStatus } from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    categories,
    currentUser,
    login,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'customers'>('overview');

  // Modals for Products
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // New product form state
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState(categories[0]?.name || 'Electronics & Audio');
  const [newProdBrand, setNewProdBrand] = useState('SmartBiz Verified');
  const [newProdPrice, setNewProdPrice] = useState(1999);
  const [newProdOriginalPrice, setNewProdOriginalPrice] = useState(2999);
  const [newProdStock, setNewProdStock] = useState(25);
  const [newProdImage, setNewProdImage] = useState('https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800&auto=format&fit=crop');
  const [newProdDesc, setNewProdDesc] = useState('');

  // Orders filter
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | OrderStatus>('all');

  // Total metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'paid' ? o.total : 0), 0);
  const pendingOrdersCount = orders.filter((o) => o.status === 'pending').length;
  const lowStockCount = products.filter((p) => p.stockCount <= 10).length;

  // Handle Add Product submit
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) {
      showToast('error', 'Product name is required');
      return;
    }

    const discount = Math.max(0, Math.round(((newProdOriginalPrice - newProdPrice) / newProdOriginalPrice) * 100));

    addProduct({
      name: newProdName.trim(),
      slug: newProdName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: newProdDesc || 'Premium high-grade product engineered for durability and daily performance.',
      shortDescription: newProdDesc.slice(0, 100) || 'Verified quality with standard warranty.',
      price: newProdPrice,
      originalPrice: newProdOriginalPrice,
      discountPercentage: discount,
      rating: 4.8,
      reviewCount: 1,
      category: newProdCategory,
      brand: newProdBrand,
      sku: `SB-${Math.floor(1000 + Math.random() * 9000)}`,
      images: [newProdImage],
      inStock: newProdStock > 0,
      stockCount: newProdStock,
      isFeatured: true,
      specifications: {
        'Quality Standard': 'Verified Original',
        'Warranty': '1 Year Brand Replacement',
      },
      features: ['100% Genuine brand quality', 'Doorstep warranty support'],
      tags: [newProdCategory.toLowerCase(), 'new'],
    });

    setIsAddModalOpen(false);
    setNewProdName('');
    setNewProdDesc('');
  };

  // Handle Edit Product submit
  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    const discount = Math.max(0, Math.round(((editingProduct.originalPrice - editingProduct.price) / editingProduct.originalPrice) * 100));
    updateProduct(editingProduct.id, {
      ...editingProduct,
      discountPercentage: discount,
      inStock: editingProduct.stockCount > 0,
    });
    setEditingProduct(null);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Admin Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 text-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm border border-slate-200/90">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-brand-dark uppercase tracking-wider">
                Store Operations Hub
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950">Merchant Admin Portal</h1>
            <p className="text-xs text-slate-500">
              Manage inventory, change live prices, fulfill customer orders, and track revenue inspired by Amazon SmartBiz.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 bg-brand hover:bg-brand-hover text-slate-950 font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
            <Link
              to="/shop"
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 transition flex items-center gap-1.5"
            >
              <Eye className="w-4 h-4" />
              <span>View Live Storefront</span>
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'overview' ? 'bg-brand text-slate-950 font-black shadow-sm' : 'text-slate-600 hover:bg-white'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Store Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'products' ? 'bg-brand text-slate-950 font-black shadow-sm' : 'text-slate-600 hover:bg-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products & Stock ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'orders' ? 'bg-brand text-slate-950 font-black shadow-sm' : 'text-slate-600 hover:bg-white'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Customer Orders ({orders.length})</span>
            {pendingOrdersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                {pendingOrdersCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('customers')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'customers' ? 'bg-brand text-slate-950 font-black shadow-sm' : 'text-slate-600 hover:bg-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Customers & CRM</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-medium">Gross Sales (Settled)</span>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">
                    ₹{totalRevenue.toLocaleString('en-IN')}
                  </h3>
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                    <ArrowUpRight className="w-3.5 h-3.5" /> +18.4% this month
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-medium">Total Orders</span>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">{orders.length}</h3>
                  <span className="text-[11px] text-amber-600 font-semibold mt-1 block">
                    {pendingOrdersCount} awaiting packing
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-brand flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-medium">Active Catalog Items</span>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">{products.length}</h3>
                  <span className="text-[11px] text-blue-600 font-semibold mt-1 block">
                    Across {categories.length} departments
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Package className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-medium">Low Stock Alerts</span>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">{lowStockCount}</h3>
                  <span className="text-[11px] text-red-500 font-semibold mt-1 block">
                    Needs reorder &lt; 10 units
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Recent Orders in Store */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">Recent Customer Orders</h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-bold text-brand-dark hover:underline"
                >
                  View All Orders &rarr;
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Order #</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Items</th>
                      <th className="p-3">Total</th>
                      <th className="p-3">Payment</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {orders.slice(0, 5).map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-50 transition">
                        <td className="p-3 font-mono font-bold text-slate-900">{ord.orderNumber}</td>
                        <td className="p-3 text-slate-700">{ord.shippingAddress?.fullName || 'Guest Customer'}</td>
                        <td className="p-3 text-slate-500">{(ord.items || []).length} items</td>
                        <td className="p-3 font-bold text-slate-900">₹{(ord.total || 0).toLocaleString('en-IN')}</td>
                        <td className="p-3 capitalize">{ord.paymentMethod}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            ord.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' :
                            ord.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                            ord.status === 'processing' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-800'
                          }`}>
                            {ord.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => setActiveTab('orders')}
                            className="text-xs font-bold text-brand-dark hover:underline"
                          >
                            Manage
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGER */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Inventory Catalog Manager</h3>
                <p className="text-xs text-slate-500 mt-0.5">Edit live prices, stock levels, or delete and add items.</p>
              </div>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 bg-brand text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" /> Add Product
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Product</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Selling Price</th>
                    <th className="p-3">MRP</th>
                    <th className="p-3">Stock Units</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 transition">
                      <td className="p-3">
                        <div className="flex items-center gap-3 max-w-sm">
                          <img src={p.images[0]} alt="" className="w-10 h-10 object-cover rounded-lg border border-slate-200 shrink-0" />
                          <span className="font-bold text-slate-900 truncate">{p.name}</span>
                        </div>
                      </td>
                      <td className="p-3 text-slate-500">{p.category}</td>
                      <td className="p-3 font-bold text-slate-900">₹{p.price.toLocaleString('en-IN')}</td>
                      <td className="p-3 text-slate-400 line-through">₹{p.originalPrice.toLocaleString('en-IN')}</td>
                      <td className="p-3">
                        <span className={`font-bold ${p.stockCount <= 10 ? 'text-red-500' : 'text-slate-800'}`}>
                          {p.stockCount} in stock
                        </span>
                      </td>
                      <td className="p-3">
                        {p.inStock && p.stockCount > 0 ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Available
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
                            Out of Stock
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setEditingProduct({ ...p })}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS MANAGER */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Customer Orders Fulfillment</h3>
                <p className="text-xs text-slate-500 mt-0.5">Update shipment statuses and verify customer delivery addresses.</p>
              </div>

              {/* Status filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Filter:</span>
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value as any)}
                  className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-semibold"
                >
                  <option value="all">All Statuses ({orders.length})</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {orders
                .filter((o) => orderStatusFilter === 'all' || o.status === orderStatusFilter)
                .map((ord) => (
                  <div key={ord.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-slate-900 text-sm">{ord.orderNumber}</span>
                          <span className="text-slate-400">&bull;</span>
                          <span className="text-xs text-slate-600">{ord.shippingAddress?.fullName || 'Guest Customer'}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {ord.shippingAddress ? (
                            `${ord.shippingAddress.city || ''}, ${ord.shippingAddress.state || ''} - ${ord.shippingAddress.pincode || ''} | Phone: ${ord.shippingAddress.phoneNumber || 'N/A'}`
                          ) : (
                            'Standard Delivery Address'
                          )}
                        </p>
                      </div>

                      {/* Status changer */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">Status:</span>
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                          className="bg-white border border-slate-300 rounded-xl px-2.5 py-1 text-xs font-bold text-slate-800 focus:outline-none focus:border-brand"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing / Packing</option>
                          <option value="shipped">Shipped (In Transit)</option>
                          <option value="out_for_delivery">Out for Delivery</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Package className="w-4 h-4 text-brand" />
                        <span>{(ord.items || []).map((i) => `${i.productName} (x${i.quantity})`).join(', ') || 'No item details'}</span>
                      </div>
                      <span className="font-black text-slate-950 text-sm">₹{(ord.total || 0).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 4: CUSTOMERS CRM */}
        {activeTab === 'customers' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
              Customer Accounts & CRM
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                    VA
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Vijay Anand</h4>
                    <p className="text-xs text-slate-500">vijay.anand@example.com</p>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-200 text-xs text-slate-600 flex justify-between">
                  <span>Total Purchases: 2 orders</span>
                  <span className="font-bold text-slate-900">₹9,342 spent</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                    RS
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Rohan Sharma</h4>
                    <p className="text-xs text-slate-500">rohan.sharma@example.com</p>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-200 text-xs text-slate-600 flex justify-between">
                  <span>Total Purchases: 1 order</span>
                  <span className="font-bold text-slate-900">₹4,999 spent</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">Add New Inventory Item</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Product Title *</label>
                  <input
                    type="text"
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    placeholder="e.g. SmartFit Ultra Pulse Watch"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-brand"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Category</label>
                    <select
                      value={newProdCategory}
                      onChange={(e) => setNewProdCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Brand Name</label>
                    <input
                      type="text"
                      value={newProdBrand}
                      onChange={(e) => setNewProdBrand(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Price (₹)</label>
                    <input
                      type="number"
                      value={newProdPrice}
                      onChange={(e) => setNewProdPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">MRP Original (₹)</label>
                    <input
                      type="number"
                      value={newProdOriginalPrice}
                      onChange={(e) => setNewProdOriginalPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Stock Count</label>
                    <input
                      type="number"
                      value={newProdStock}
                      onChange={(e) => setNewProdStock(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Product Image URL</label>
                  <input
                    type="url"
                    value={newProdImage}
                    onChange={(e) => setNewProdImage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={newProdDesc}
                    onChange={(e) => setNewProdDesc(e.target.value)}
                    placeholder="Key specifications, battery, materials..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-brand text-slate-950 font-bold"
                  >
                    Publish to Storefront
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setEditingProduct(null)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">Edit Product Details</h3>
                <button onClick={() => setEditingProduct(null)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdateProduct} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Product Title</label>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Selling Price (₹)</label>
                    <input
                      type="number"
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">MRP Original (₹)</label>
                    <input
                      type="number"
                      value={editingProduct.originalPrice}
                      onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Stock Units</label>
                  <input
                    type="number"
                    value={editingProduct.stockCount}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stockCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                    required
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-brand text-slate-950 font-bold"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

