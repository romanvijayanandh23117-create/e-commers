import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Package,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  Calendar,
  AlertCircle,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { OrderStatus } from '../types';

export const OrderTrackingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const queryOrderId = searchParams.get('orderId') || '';

  const { orders, getOrderById } = useStore();
  const [searchInput, setSearchInput] = useState(queryOrderId || (orders[0]?.orderNumber ?? 'SB-849201'));
  const [activeOrder, setActiveOrder] = useState<typeof orders[0] | null>(() => {
    return getOrderById(searchInput) || orders[0] || null;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    const found = getOrderById(searchInput.trim());
    setActiveOrder(found || null);
  };

  const steps: { key: OrderStatus; label: string; desc: string }[] = [
    { key: 'pending', label: 'Order Confirmed', desc: 'Payment verified & order recorded' },
    { key: 'processing', label: 'Packed at Warehouse', desc: 'Bengaluru Fulfillment Hub' },
    { key: 'shipped', label: 'In Transit with Courier', desc: 'BlueDart Air Express' },
    { key: 'out_for_delivery', label: 'Out for Delivery', desc: 'Arriving with delivery executive' },
    { key: 'delivered', label: 'Delivered', desc: 'Handed over to customer' },
  ];

  const getStepStatus = (stepKey: OrderStatus, currentStatus: OrderStatus) => {
    const orderRanks: Record<OrderStatus, number> = {
      pending: 1,
      processing: 2,
      shipped: 3,
      out_for_delivery: 4,
      delivered: 5,
      cancelled: 0,
    };

    const currentRank = orderRanks[currentStatus] || 1;
    const stepRank = orderRanks[stepKey] || 1;

    if (currentStatus === 'cancelled') return 'cancelled';
    if (stepRank < currentRank) return 'completed';
    if (stepRank === currentRank) return 'current';
    return 'upcoming';
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/10 text-brand-dark text-xs font-bold mb-3">
            <Truck className="w-3.5 h-3.5" />
            <span>SmartBiz Dispatch Network</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Track Your Shipment
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time updates on package location, warehouse packing, and estimated doorstep arrival.
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="mt-6 flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter Order ID (e.g. SB-849201)"
                className="w-full px-4 py-3 pl-10 text-xs sm:text-sm rounded-2xl border border-slate-300 focus:outline-none focus:border-brand shadow-sm bg-white"
              />
              <Package className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-brand hover:bg-brand-hover text-slate-950 text-xs sm:text-sm font-bold rounded-2xl shadow-md transition flex items-center gap-1.5 shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>Track</span>
            </button>
          </form>
        </div>

        {activeOrder ? (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-8">
            {/* Header info strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tracking Reference</span>
                <h3 className="text-xl font-black text-slate-900 mt-0.5">{activeOrder.orderNumber}</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Placed on {new Date(activeOrder.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>

              <div className="flex flex-col sm:items-end">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Estimated Arrival</span>
                <p className="text-sm font-black text-brand-dark flex items-center gap-1.5 mt-0.5">
                  <Calendar className="w-4 h-4 text-brand" />
                  <span>{activeOrder.estimatedDelivery}</span>
                </p>
                <span className="text-[10px] text-slate-400 mt-0.5">AWB: {activeOrder.trackingNumber || 'TRK-BD-9281745'}</span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="py-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-6">Live Dispatch Status</h4>
              <div className="relative">
                {/* Stepper items */}
                <div className="space-y-6">
                  {steps.map((st, idx) => {
                    const status = getStepStatus(st.key, activeOrder.status);
                    const isDone = status === 'completed';
                    const isCurrent = status === 'current';

                    return (
                      <div key={st.key} className="relative flex items-start gap-4">
                        {/* Vertical line indicator */}
                        {idx < steps.length - 1 && (
                          <div
                            className={`absolute left-4 top-8 w-0.5 h-10 ${
                              isDone ? 'bg-emerald-500' : 'bg-slate-200'
                            }`}
                          />
                        )}

                        {/* Icon Node */}
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-all ${
                            isDone
                              ? 'bg-emerald-500 text-white shadow-md'
                              : isCurrent
                              ? 'bg-brand text-slate-950 ring-4 ring-brand/20 shadow-md font-bold'
                              : 'bg-slate-100 text-slate-400 border border-slate-200'
                          }`}
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : isCurrent ? (
                            <Truck className="w-4 h-4" />
                          ) : (
                            <Clock className="w-3.5 h-3.5" />
                          )}
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h5 className={`text-xs font-bold ${isCurrent ? 'text-slate-900' : isDone ? 'text-slate-800' : 'text-slate-400'}`}>
                              {st.label}
                            </h5>
                            {isCurrent && (
                              <span className="bg-brand/20 text-brand-dark text-[10px] font-bold px-2 py-0.2 rounded-full uppercase">
                                In Progress
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">{st.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Destination Address & Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <h5 className="font-bold text-slate-800 flex items-center gap-1.5 mb-2">
                  <MapPin className="w-4 h-4 text-brand" /> Destination
                </h5>
                <p className="font-semibold text-slate-900">{activeOrder.shippingAddress?.fullName || 'Customer'}</p>
                <p className="text-slate-600">{activeOrder.shippingAddress?.streetAddress || ''}</p>
                <p className="text-slate-600">{activeOrder.shippingAddress ? `${activeOrder.shippingAddress.city}, ${activeOrder.shippingAddress.state} - ${activeOrder.shippingAddress.pincode}` : 'Standard Shipping'}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <h5 className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-brand" /> Items in Parcel ({(activeOrder.items || []).length})
                </h5>
                <div className="space-y-1.5">
                  {(activeOrder.items || []).map((it, i) => (
                    <div key={i} className="flex justify-between items-center text-slate-700">
                      <span className="truncate max-w-[200px]">{it.productName}</span>
                      <span className="font-bold">x{it.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900">No order found matching "{searchInput}"</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
              Please double check the order number from your confirmation email or order history list.
            </p>
            <Link to="/orders" className="px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl">
              Browse My Orders
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
