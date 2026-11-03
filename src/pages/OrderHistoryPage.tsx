import React from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Calendar,
  Truck,
  RotateCcw,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShoppingBag,
  CreditCard,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { OrderStatus } from '../types';

export const OrderHistoryPage: React.FC = () => {
  const { orders, addToCart, products, showToast } = useStore();

  const handleReorder = (order: typeof orders[0]) => {
    order.items.forEach((item) => {
      const prod = products.find((p) => p.id === item.productId);
      if (prod) {
        addToCart(prod, item.quantity);
      }
    });
    showToast('success', 'Items added back to your cart for reorder!');
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5" /> Delivered
          </span>
        );
      case 'shipped':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">
            <Truck className="w-3.5 h-3.5" /> Shipped & In Transit
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
            <Clock className="w-3.5 h-3.5" /> Packing at Warehouse
          </span>
        );
      case 'out_for_delivery':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800">
            <Truck className="w-3.5 h-3.5" /> Out for Delivery
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-100 text-red-800">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-800">
            <Clock className="w-3.5 h-3.5" /> Pending
          </span>
        );
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Order History & Invoices
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Review previous purchases, download tax receipts, and track active deliveries.
            </p>
          </div>
          <Link
            to="/order-tracking"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 shadow-xs hover:bg-slate-50 transition"
          >
            <Truck className="w-4 h-4 text-brand" />
            <span>Track Any Order</span>
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900">No past orders found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
              Once you place an order, its details and shipment status will appear here.
            </p>
            <Link to="/shop" className="px-5 py-2.5 bg-brand text-slate-950 font-bold text-xs rounded-xl">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden"
              >
                {/* Header strip */}
                <div className="bg-slate-50/80 p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-6">
                    <div>
                      <span className="text-slate-400 font-medium block">Order Placed</span>
                      <span className="font-bold text-slate-800">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 font-medium block">Total Amount</span>
                      <span className="font-black text-slate-900">₹{order.total.toLocaleString('en-IN')}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 font-medium block">Ship To</span>
                      <span className="font-bold text-slate-800 truncate max-w-[140px] block">
                        {order.shippingAddress?.fullName || 'Customer'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-slate-400 font-medium block">Order Number</span>
                      <span className="font-mono font-bold text-slate-900">{order.orderNumber}</span>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                </div>

                {/* Items in order */}
                <div className="p-6 divide-y divide-slate-100">
                  {(order.items || []).map((item, idx) => (
                    <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          className="w-16 h-16 object-cover rounded-xl border border-slate-200 shrink-0"
                        />
                        <div>
                          <Link
                            to={`/product/${item.productId}`}
                            className="text-xs font-bold text-slate-900 hover:text-brand line-clamp-1"
                          >
                            {item.productName}
                          </Link>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Qty: {item.quantity} &bull; ₹{item.price.toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-black text-slate-900">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer Actions */}
                <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Truck className="w-4 h-4 text-brand" />
                    <span>Estimated: <strong className="text-slate-800">{order.estimatedDelivery}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleReorder(order)}
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg transition flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Reorder Items
                    </button>

                    <Link
                      to={`/order-tracking?orderId=${encodeURIComponent(order.orderNumber)}`}
                      className="px-3.5 py-1.5 bg-brand hover:bg-brand-hover text-slate-950 font-bold rounded-lg transition flex items-center gap-1"
                    >
                      <span>Track Shipment</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      to={`/order-confirmation/${order.id}`}
                      className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition"
                    >
                      View Invoice
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

