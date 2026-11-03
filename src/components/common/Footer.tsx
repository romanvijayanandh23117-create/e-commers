import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  CheckCircle2,
  Lock,
  CreditCard,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Footer: React.FC = () => {
  const { showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('error', 'Please enter a valid email address.');
      return;
    }
    setSubscribed(true);
    showToast('success', 'Coupon WELCOME200 unlocked! Use code at checkout for ₹200 off.', 'Subscribed!');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-white text-slate-600 pt-16 pb-8 border-t border-slate-200">
      {/* 1. Value Proposition Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-brand flex items-center justify-center shrink-0 border border-amber-200/60">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-slate-900 font-bold text-sm">Free Express Delivery</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Across 19,000+ PIN codes in India on all orders.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200/60">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-slate-900 font-bold text-sm">100% Verified Quality</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Direct from trusted brands with manufacturer warranty.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200/60">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-slate-900 font-bold text-sm">7-Day Easy Replacement</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Hassle-free doorstep pickup & instant refund policy.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-200/60">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-slate-900 font-bold text-sm">24/7 Dedicated Support</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Instant resolution via call, WhatsApp, or email ticket.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main 4-Column Navigation & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand to-amber-400 flex items-center justify-center text-slate-950 font-black text-lg shadow-xs">
                <span>S</span>
                <span>B</span>
              </div>
              <span className="text-xl font-black text-slate-900 tracking-tight">
                Smart<span className="text-brand">Biz</span> Store
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Inspired by the seamless commerce infrastructure of Amazon SmartBiz, delivering premium shopping experiences with curated products, rapid fulfillment, and trusted customer care across India.
            </p>

            <div className="space-y-2 pt-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand shrink-0" />
                <span>Tech Park Blvd, Outer Ring Road, Bengaluru, Karnataka 560103</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand shrink-0" />
                <a href="tel:+918072545558" className="hover:text-brand-dark transition font-medium">
                  +91 80725 45558 (Mon - Sat, 9 AM - 8 PM IST)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand shrink-0" />
                <span>support@smartbizstore.in</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider">Explore Store</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link to="/" className="hover:text-brand-dark transition">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-brand-dark transition">All Products</Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-brand-dark transition">Browse Categories</Link>
              </li>
              <li>
                <Link to="/shop?deal=true" className="hover:text-brand-dark transition text-brand-dark font-bold">Special Deals & Offers</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-dark transition">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-dark transition">Contact & Helpdesk</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Policies */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider">Customer Care</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link to="/order-tracking" className="hover:text-brand-dark transition">Track Your Shipment</Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-brand-dark transition">Order History & Invoices</Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-brand-dark transition">Saved Wishlist</Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-brand-dark transition">Return & Refund Policy</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-brand-dark transition">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-brand-dark transition">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Exclusive Code */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider">Stay In The Loop</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Subscribe to unlock an exclusive <strong className="text-slate-900 font-bold">₹200 instant voucher</strong> on your first order.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>You are subscribed! Use coupon code <strong>WELCOME200</strong>.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="space-y-2">
                <div className="flex rounded-xl overflow-hidden border border-slate-300 bg-white focus-within:border-brand shadow-xs">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 text-xs text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-brand hover:bg-brand-hover text-slate-950 px-3.5 flex items-center justify-center transition font-bold"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-[10px] text-slate-400 block">
                  By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
                </span>
              </form>
            )}

            <div className="pt-2">
              <span className="text-[11px] text-slate-500 font-semibold block mb-1">Store Admin:</span>
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200 transition"
              >
                <Lock className="w-3 h-3 text-amber-700" /> Merchant Admin Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Bar: Payments, Copyright, Security */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-200 text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          &copy; {new Date().getFullYear()} SmartBiz Storefront. Built for modern merchants with professional e-commerce architecture.
        </div>

        {/* Payment badges */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-slate-600 font-medium flex items-center gap-1">
            <Lock className="w-3 h-3 text-emerald-600" /> 256-Bit SSL Secured
          </span>
          <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
            <CreditCard className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-[10px] font-bold text-slate-700">UPI &bull; Cards &bull; NetBanking &bull; COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
