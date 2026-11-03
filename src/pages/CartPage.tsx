import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Tag,
  ShieldCheck,
  Truck,
  RotateCcw,
  X,
  ChevronLeft,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount,
    cartSubtotal,
    cartDiscount,
    shippingFee,
    cartTax,
    cartTotal,
    activeCoupon,
    applyCoupon,
    removeCoupon,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput.trim());
      setCouponInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="bg-[#f8fafc] min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm max-w-lg w-full text-center">
          <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6 text-slate-400">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Your Shopping Cart is Empty</h2>
          <p className="text-xs sm:text-sm text-slate-500 mb-8 max-w-sm mx-auto">
            You haven't added any products yet. Discover top-rated tech, smart living, and lifestyle products curated for you.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand hover:bg-brand-hover text-slate-950 font-black text-xs sm:text-sm rounded-xl transition shadow-md"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Explore Store Catalog</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              You have {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs font-bold text-red-500 hover:text-red-700 transition flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear Cart
          </button>
        </div>

        {/* Free Shipping Banner */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 shadow-sm mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-xs text-emerald-900 font-bold">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Congratulations! All orders enjoy <strong>100% FREE Delivery</strong> across India.</span>
          </div>
          <span className="text-[11px] font-black uppercase tracking-wider bg-emerald-600 text-white px-2.5 py-0.5 rounded-full">
            FREE SHIPPING
          </span>
        </div>

        {/* Cart Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items Table: 8 cols */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6">
            <div className="divide-y divide-slate-100">
              {cart.map((item) => (
                <div key={item.product.id} className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  {/* Image & Title */}
                  <div className="flex items-center gap-4 flex-1">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-2xl border border-slate-200 shrink-0"
                    />
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-brand-dark uppercase tracking-wider">
                        {item.product.brand}
                      </span>
                      <Link
                        to={`/product/${item.product.id}`}
                        className="text-xs sm:text-sm font-bold text-slate-900 hover:text-brand line-clamp-2"
                      >
                        {item.product.name}
                      </Link>
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-sm font-black text-slate-950">
                          ₹{item.product.price.toLocaleString('en-IN')}
                        </span>
                        {item.product.originalPrice > item.product.price && (
                          <span className="text-xs text-slate-400 line-through">
                            ₹{item.product.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Controls & Total */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1.5 px-3 text-slate-600 hover:bg-slate-200 font-bold"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1.5 px-3 text-slate-600 hover:bg-slate-200 font-bold"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Subtotal for line */}
                    <div className="text-right min-w-[80px]">
                      <span className="text-sm font-black text-slate-900">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <Link to="/shop" className="font-bold text-slate-700 hover:text-brand flex items-center gap-1">
                <ChevronLeft className="w-4 h-4" /> Continue Shopping
              </Link>
              <span className="text-slate-400">All prices include applicable GST</span>
            </div>
          </div>

          {/* Order Summary: 4 cols */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6 sticky top-28">
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
              Order Summary
            </h3>

            {/* Calculations list */}
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-bold text-slate-900">₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Coupon Discount ({activeCoupon?.code})</span>
                  <span>-₹{cartDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span>
                  {shippingFee === 0 ? (
                    <strong className="text-emerald-600">FREE</strong>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated GST (5%)</span>
                <span>₹{cartTax.toLocaleString('en-IN')}</span>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline text-sm">
                <span className="font-extrabold text-slate-900">Grand Total</span>
                <span className="text-xl font-black text-slate-950">
                  ₹{cartTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Coupon Code Input */}
            <div className="pt-2">
              {activeCoupon ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-800">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span className="font-bold">{activeCoupon.code}</span> applied!
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-slate-400 hover:text-slate-700"
                    title="Remove coupon"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-700 block">Apply Promo / Coupon Code</label>
                  <div className="flex rounded-xl border border-slate-200 overflow-hidden focus-within:border-brand">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="e.g. SMARTBIZ10"
                      className="w-full px-3 py-2 text-xs text-slate-800 uppercase focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="bg-slate-900 hover:bg-slate-800 text-white px-4 text-xs font-bold transition"
                    >
                      Apply
                    </button>
                  </div>
                  <span className="text-[10px] text-slate-400 block">
                    Use code <strong className="text-slate-700">SMARTBIZ10</strong> for 10% off
                  </span>
                </form>
              )}
            </div>

            {/* Checkout Action */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 bg-brand hover:bg-brand-hover text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Trust Badges */}
            <div className="space-y-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>256-Bit Bank-Grade SSL Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-brand shrink-0" />
                <span>7 Days Hassle-Free Return Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-brand shrink-0" />
                <span>Direct Dispatch from Bengaluru Hub</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

