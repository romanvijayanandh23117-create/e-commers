import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Package,
  Printer,
  ArrowRight,
  Truck,
  MapPin,
  Calendar,
  CreditCard,
  Phone,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OrderConfirmationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getOrderById } = useStore();

  const order = getOrderById(id || '');

  if (!order) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <Package className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-slate-800">Order not found</h2>
          <p className="text-xs text-slate-500 mt-1 mb-4">Please check your order ID or view your order history.</p>
          <Link to="/orders" className="px-4 py-2 bg-brand text-slate-950 font-bold text-xs rounded-xl">
            View Order History
          </Link>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Celebration Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-sm animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
            Payment Confirmed &bull; Order Received
          </span>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-3">
            Thank you for your order!
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-2">
            We have sent a full confirmation receipt and GST invoice to <strong className="text-slate-800">{order.shippingAddress?.email || 'your email address'}</strong>.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-700">
            <span>Order Reference:</span>
            <strong className="text-slate-950 text-sm">{order.orderNumber}</strong>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <Link
              to={`/order-tracking?orderId=${encodeURIComponent(order.orderNumber)}`}
              className="px-5 py-2.5 bg-brand hover:bg-brand-hover text-slate-950 text-xs font-bold rounded-xl shadow-md transition flex items-center gap-1.5"
            >
              <Truck className="w-4 h-4" />
              <span>Track Real-Time Shipment</span>
            </Link>

            <button
              onClick={handlePrint}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition flex items-center gap-1.5 print:hidden"
            >
              <Printer className="w-4 h-4" />
              <span>Print Tax Invoice</span>
            </button>
          </div>
        </div>

        {/* Invoice & Shipping Overview Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
            <div>
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Fulfillment Timeline</span>
              <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-4 h-4 text-brand" />
                <span>Estimated Delivery: {order.estimatedDelivery}</span>
              </p>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Payment</span>
              <p className="text-sm font-bold text-emerald-600 flex items-center gap-1 mt-0.5 capitalize">
                <CreditCard className="w-4 h-4 text-emerald-500" />
                <span>{order.paymentMethod} ({order.paymentStatus.toUpperCase()})</span>
              </p>
            </div>
          </div>

          {/* Delivery Address Details */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5 mb-1.5">
              <MapPin className="w-4 h-4 text-brand" /> Shipping Address
            </h4>
            <p className="font-semibold text-slate-900">{order.shippingAddress?.fullName || 'Customer'}</p>
            <p className="text-slate-600">{order.shippingAddress?.streetAddress || ''}{order.shippingAddress?.apartment ? `, ${order.shippingAddress.apartment}` : ''}</p>
            <p className="text-slate-600">{order.shippingAddress ? `${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}` : 'Standard Shipping'}</p>
            {order.shippingAddress?.phoneNumber && (
              <p className="text-slate-500 pt-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" /> {order.shippingAddress.phoneNumber}
              </p>
            )}
          </div>

          {/* Itemized Products */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Ordered Items</h4>
            <div className="divide-y divide-slate-100 border rounded-2xl border-slate-200 overflow-hidden">
              {(order.items || []).map((item, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between gap-4 bg-white">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-14 h-14 object-cover rounded-xl border border-slate-200 shrink-0"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-900">{item.productName}</p>
                      <p className="text-[11px] text-slate-500">Qty: {item.quantity} &bull; ₹{item.price.toLocaleString('en-IN')} each</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-900">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="space-y-2 pt-2 text-xs text-slate-600 border-t border-slate-100">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-slate-900">₹{order.subtotal.toLocaleString('en-IN')}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Coupon Discount ({order.couponCode})</span>
                <span>-₹{order.discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping Charges</span>
              <span>{order.shippingFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${order.shippingFee}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes (GST 5%)</span>
              <span>₹{order.tax.toLocaleString('en-IN')}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline text-sm">
              <span className="font-black text-slate-900">Total Paid</span>
              <span className="text-xl font-black text-slate-950">
                ₹{order.total.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Continue Shopping CTA */}
        <div className="mt-8 text-center print:hidden">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-brand"
          >
            <span>Continue Shopping in Store</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

