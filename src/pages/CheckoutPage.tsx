import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Smartphone,
  Building,
  Banknote,
  AlertCircle,
  ChevronLeft,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ShippingAddress } from '../types';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    shippingFee,
    cartTax,
    cartTotal,
    activeCoupon,
    createOrder,
    currentUser,
    showToast,
  } = useStore();

  // Redirect if cart is empty
  if (cart.length === 0) {
    navigate('/cart');
  }

  // Address form
  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: currentUser?.name || 'Vijay Anand',
    phoneNumber: currentUser?.phone || '+91 80725 45558',
    email: currentUser?.email || 'vijay.anand@example.com',
    streetAddress: currentUser?.addresses[0]?.streetAddress || 'Flat 402, Green Glen Layout, Outer Ring Road',
    apartment: currentUser?.addresses[0]?.apartment || 'Tower B, Silicon Residency',
    city: currentUser?.addresses[0]?.city || 'Bengaluru',
    state: currentUser?.addresses[0]?.state || 'Karnataka',
    pincode: currentUser?.addresses[0]?.pincode || '560103',
  });

  const [deliverySpeed, setDeliverySpeed] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');

  // Simulated payment inputs
  const [upiId, setUpiId] = useState('vijayanand@okaxis');
  const [cardNumber, setCardNumber] = useState('4532 8921 4452 9012');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('321');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  const [isProcessing, setIsProcessing] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full Name is required';
    if (!formData.phoneNumber.trim()) errors.phoneNumber = 'Valid phone number is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Valid email is required';
    if (!formData.streetAddress.trim()) errors.streetAddress = 'Street address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.state.trim()) errors.state = 'State is required';
    if (!formData.pincode.trim() || formData.pincode.length !== 6) errors.pincode = 'Valid 6-digit Indian PIN Code is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast('error', 'Please fill in all required shipping fields correctly.');
      return;
    }

    setIsProcessing(true);

    // Simulate payment gateway verification
    setTimeout(() => {
      const orderItems = cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        productImage: item.product.images[0],
        price: item.product.price,
        quantity: item.quantity,
      }));

      const newOrder = createOrder({
        userId: currentUser?.id || 'guest-user',
        items: orderItems,
        shippingAddress: formData,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
        subtotal: cartSubtotal,
        discount: cartDiscount,
        shippingFee: deliverySpeed === 'express' ? shippingFee + 49 : shippingFee,
        tax: cartTax,
        total: deliverySpeed === 'express' ? cartTotal + 49 : cartTotal,
        status: 'pending',
        couponCode: activeCoupon?.code,
        trackingNumber: `TRK-BD-${Math.floor(1000000 + Math.random() * 9000000)}`,
        estimatedDelivery: deliverySpeed === 'express' ? 'Tomorrow by 2:00 PM' : '2-3 Business Days',
      });

      setIsProcessing(false);

      // Trigger celebration confetti!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        // Safe fallback
      }

      showToast('success', `Order #${newOrder.orderNumber} placed successfully!`, 'Payment Confirmed');
      navigate(`/order-confirmation/${newOrder.id}`);
    }, 1500);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-xs text-slate-500 gap-2 mb-6">
          <Link to="/cart" className="hover:text-slate-800 flex items-center gap-1 font-semibold">
            <ChevronLeft className="w-4 h-4" /> Return to Cart
          </Link>
          <span>/</span>
          <span className="font-bold text-slate-800">Secure Checkout</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Checkout Form: 7 cols */}
          <div className="lg:col-span-7 space-y-6">
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              {/* Step 1: Contact & Shipping Address */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-brand text-slate-950 text-xs font-black flex items-center justify-center shadow-xs">
                      1
                    </span>
                    <h2 className="text-base font-bold text-slate-900">Contact & Shipping Address</h2>
                  </div>
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <Lock className="w-3 h-3" /> SSL Encrypted
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Vijay Anand"
                      className={`w-full px-3 py-2 text-xs rounded-xl border ${formErrors.fullName ? 'border-red-500' : 'border-slate-300'} focus:outline-none focus:border-brand`}
                    />
                    {formErrors.fullName && <span className="text-[10px] text-red-500 mt-0.5 block">{formErrors.fullName}</span>}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number (For Delivery OTP) *</label>
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      placeholder="+91 80725 45558"
                      className={`w-full px-3 py-2 text-xs rounded-xl border ${formErrors.phoneNumber ? 'border-red-500' : 'border-slate-300'} focus:outline-none focus:border-brand`}
                    />
                    {formErrors.phoneNumber && <span className="text-[10px] text-red-500 mt-0.5 block">{formErrors.phoneNumber}</span>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 block mb-1">Email Address (For Invoice & Tracking) *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className={`w-full px-3 py-2 text-xs rounded-xl border ${formErrors.email ? 'border-red-500' : 'border-slate-300'} focus:outline-none focus:border-brand`}
                    />
                    {formErrors.email && <span className="text-[10px] text-red-500 mt-0.5 block">{formErrors.email}</span>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 block mb-1">Street Address, House/Flat No., Area *</label>
                    <input
                      type="text"
                      value={formData.streetAddress}
                      onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                      placeholder="Flat 402, Green Glen Layout, Bellandur"
                      className={`w-full px-3 py-2 text-xs rounded-xl border ${formErrors.streetAddress ? 'border-red-500' : 'border-slate-300'} focus:outline-none focus:border-brand`}
                    />
                    {formErrors.streetAddress && <span className="text-[10px] text-red-500 mt-0.5 block">{formErrors.streetAddress}</span>}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Apartment, Landmark, Suite (Optional)</label>
                    <input
                      type="text"
                      value={formData.apartment}
                      onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                      placeholder="Near Central Mall"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-brand"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">6-Digit PIN Code *</label>
                    <input
                      type="text"
                      maxLength={6}
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      placeholder="560103"
                      className={`w-full px-3 py-2 text-xs rounded-xl border ${formErrors.pincode ? 'border-red-500' : 'border-slate-300'} focus:outline-none focus:border-brand`}
                    />
                    {formErrors.pincode && <span className="text-[10px] text-red-500 mt-0.5 block">{formErrors.pincode}</span>}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">City *</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Bengaluru"
                      className={`w-full px-3 py-2 text-xs rounded-xl border ${formErrors.city ? 'border-red-500' : 'border-slate-300'} focus:outline-none focus:border-brand`}
                    />
                    {formErrors.city && <span className="text-[10px] text-red-500 mt-0.5 block">{formErrors.city}</span>}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">State *</label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      placeholder="Karnataka"
                      className={`w-full px-3 py-2 text-xs rounded-xl border ${formErrors.state ? 'border-red-500' : 'border-slate-300'} focus:outline-none focus:border-brand`}
                    />
                    {formErrors.state && <span className="text-[10px] text-red-500 mt-0.5 block">{formErrors.state}</span>}
                  </div>
                </div>
              </div>

              {/* Step 2: Delivery Speed Options */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <span className="w-6 h-6 rounded-full bg-brand text-slate-950 text-xs font-black flex items-center justify-center shadow-xs">
                    2
                  </span>
                  <h2 className="text-base font-bold text-slate-900">Select Delivery Method</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between ${
                      deliverySpeed === 'standard' ? 'border-brand bg-brand/5' : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="speed"
                          checked={deliverySpeed === 'standard'}
                          onChange={() => setDeliverySpeed('standard')}
                          className="accent-brand"
                        />
                        <span className="text-xs font-bold text-slate-900">Standard Delivery</span>
                      </div>
                      <span className="text-xs font-bold text-emerald-600">FREE</span>
                    </div>
                    <p className="text-[11px] text-slate-500">Estimated Delivery: 2 to 3 Business Days via BlueDart</p>
                  </label>

                  <label
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between ${
                      deliverySpeed === 'express' ? 'border-brand bg-brand/5' : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="speed"
                          checked={deliverySpeed === 'express'}
                          onChange={() => setDeliverySpeed('express')}
                          className="accent-brand"
                        />
                        <span className="text-xs font-bold text-slate-900">Express Priority</span>
                      </div>
                      <span className="text-xs font-bold text-slate-900">+₹49</span>
                    </div>
                    <p className="text-[11px] text-slate-500">Guaranteed Tomorrow by 2:00 PM with Priority Hub Dispatch</p>
                  </label>
                </div>
              </div>

              {/* Step 3: Payment Method */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-brand text-slate-950 text-xs font-black flex items-center justify-center shadow-xs">
                      3
                    </span>
                    <h2 className="text-base font-bold text-slate-900">Secure Payment Options</h2>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">100% Encrypted</span>
                </div>

                {/* Payment Option Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-xl border text-center transition flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'upi' ? 'border-brand bg-brand/10 font-bold text-slate-950' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-brand" />
                    <span className="text-xs">UPI / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-center transition flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'card' ? 'border-brand bg-brand/10 font-bold text-slate-950' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-brand" />
                    <span className="text-xs">Debit / Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-3 rounded-xl border text-center transition flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'netbanking' ? 'border-brand bg-brand/10 font-bold text-slate-950' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Building className="w-5 h-5 text-brand" />
                    <span className="text-xs">Net Banking</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border text-center transition flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'cod' ? 'border-brand bg-brand/10 font-bold text-slate-950' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Banknote className="w-5 h-5 text-brand" />
                    <span className="text-xs">Cash on Delivery</span>
                  </button>
                </div>

                {/* Sub-fields for payment */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                  {paymentMethod === 'upi' && (
                    <div className="space-y-3">
                      <p className="text-slate-600">
                        Pay instantly via any UPI App (Google Pay, PhonePe, Paytm, BHIM).
                      </p>
                      <div>
                        <label className="font-bold text-slate-800 block mb-1">Enter your UPI ID / VPA</label>
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="e.g. yourname@okaxis"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-brand bg-white"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-3">
                          <label className="font-bold text-slate-800 block mb-1">Card Number</label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="4532 8921 4452 9012"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-brand bg-white"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-slate-800 block mb-1">Expiry</label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="MM/YY"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-brand bg-white"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-slate-800 block mb-1">CVV</label>
                          <input
                            type="password"
                            maxLength={4}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            placeholder="123"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-brand bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'netbanking' && (
                    <div className="space-y-3">
                      <label className="font-bold text-slate-800 block mb-1">Choose Bank</label>
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-brand bg-white font-medium"
                      >
                        <option value="HDFC Bank">HDFC Bank</option>
                        <option value="State Bank of India">State Bank of India (SBI)</option>
                        <option value="ICICI Bank">ICICI Bank</option>
                        <option value="Axis Bank">Axis Bank</option>
                        <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                      </select>
                    </div>
                  )}

                  {paymentMethod === 'cod' && (
                    <div>
                      <p className="text-slate-700 font-medium">
                        Pay in cash or scan delivery agent’s QR code when your package arrives at your doorstep.
                      </p>
                      <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 mt-2 inline-block">
                        Zero extra convenience fee for Cash on Delivery.
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-brand hover:bg-brand-hover text-slate-950 font-black text-sm rounded-2xl shadow-xl transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Authorizing Payment & Confirming Order...</span>
                  </div>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-slate-950" />
                    <span>Pay ₹{(deliverySpeed === 'express' ? cartTotal + 49 : cartTotal).toLocaleString('en-IN')} & Place Order</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Sticky Order Review: 5 cols */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6 sticky top-28">
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs font-semibold text-slate-500">{cart.length} unique items</span>
            </h3>

            {/* Item List Thumbnails */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-14 h-14 object-cover rounded-xl border border-slate-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate">{item.product.name}</p>
                    <p className="text-[11px] text-slate-400">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-900">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-2.5 pt-3 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900">₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Coupon Discount ({activeCoupon?.code})</span>
                  <span>-₹{cartDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping ({deliverySpeed === 'express' ? 'Express' : 'Standard'})</span>
                <span>
                  {deliverySpeed === 'express' ? '₹49' : shippingFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${shippingFee}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span>₹{cartTax.toLocaleString('en-IN')}</span>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline text-sm">
                <span className="font-extrabold text-slate-900">Total Payable</span>
                <span className="text-2xl font-black text-slate-950">
                  ₹{(deliverySpeed === 'express' ? cartTotal + 49 : cartTotal).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Amazon SmartBiz Trust Highlights */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-[11px] text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero fraud guarantee with automated payment reconciliation.</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-brand shrink-0" />
                <span>Live SMS and WhatsApp dispatch notifications.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

