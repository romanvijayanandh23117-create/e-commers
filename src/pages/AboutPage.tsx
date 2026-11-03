import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Users,
  Award,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#f8fafc] min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-amber-50/80 via-white to-amber-100/60 rounded-3xl p-8 sm:p-14 text-slate-900 text-center relative overflow-hidden border border-amber-200/90 shadow-sm">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand/10 rounded-full blur-3xl pointer-events-none" />
          <span className="text-xs font-bold text-brand-dark uppercase tracking-wider bg-brand/15 px-3.5 py-1 rounded-full border border-brand/30">
            About SmartBiz Store
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-4 max-w-2xl mx-auto leading-tight text-slate-950">
            Empowering Modern Commerce Across India
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mt-4 leading-relaxed">
            Inspired by the intuitive simplicity and robust merchant infrastructure of Amazon SmartBiz, our store brings top-tier electronics, smart home tech, and lifestyle goods directly from certified manufacturers to your doorstep.
          </p>
        </div>

        {/* Core Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 text-center border border-slate-200/80 shadow-sm">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 block">50,000+</span>
            <span className="text-xs text-slate-500 font-medium mt-1 block">Happy Shoppers Across India</span>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center border border-slate-200/80 shadow-sm">
            <span className="text-3xl sm:text-4xl font-black text-brand-dark block">19,000+</span>
            <span className="text-xs text-slate-500 font-medium mt-1 block">PIN Codes Covered with BlueDart</span>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center border border-slate-200/80 shadow-sm">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 block">99.8%</span>
            <span className="text-xs text-slate-500 font-medium mt-1 block">On-Time Order Fulfillment</span>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center border border-slate-200/80 shadow-sm">
            <span className="text-3xl sm:text-4xl font-black text-brand-dark block">4.8★</span>
            <span className="text-xs text-slate-500 font-medium mt-1 block">Average Verified Rating</span>
          </div>
        </div>

        {/* Our Story & Philosophy */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold text-brand-dark uppercase tracking-wider">Our Origin</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Built on Trust, Precision, and Customer Centricity
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We started with a fundamental realization: modern Indian shoppers deserve more than generic marketplaces crowded with counterfeit goods. They deserve verified authentic products, direct manufacturer guarantees, and transparent doorstep fulfillment.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Leveraging next-generation digital storefront architecture inspired by Amazon SmartBiz, we cut out middlemen to pass savings directly to you, backed by our 7-day hassle-free replacement promise.
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-md aspect-square border-4 border-slate-100">
            <img
              src="https://images.unsplash.com/photo-1556742049-0a67e5572240?q=80&w=800&auto=format&fit=crop"
              alt="Our Fulfillment Center"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 4 Pillars */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-2xl font-black text-slate-900">The 4 Pillars of SmartBiz Store</h3>
            <p className="text-xs text-slate-500 mt-1">Our guiding principles that shape every package we pack.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">100% Genuine Inventory</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Every single item in our catalog is vetted with brand-authorized serial numbers and official manufacturer warranties.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-brand flex items-center justify-center font-bold">
                <Truck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Hyper-Fast Fulfillment</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Automated order dispatch within 2 hours of payment confirmation, paired with tier-1 air express logistics partners.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <RotateCcw className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">No-Questions 7-Day Returns</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                If you aren't completely thrilled with your purchase, our courier will pick it up at your doorstep with rapid refunds.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">24/7 Human Support</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Direct access to our dedicated customer delight team based in Bengaluru, reachable via phone, WhatsApp, or email.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 bg-gradient-to-r from-amber-50 via-white to-amber-100/70 border border-amber-300 text-slate-900 rounded-3xl text-center space-y-4 shadow-sm">
          <h3 className="text-2xl font-black text-slate-950">Experience Modern Commerce Today</h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Use code <strong className="text-brand-dark font-mono font-bold">SMARTBIZ10</strong> at checkout for 10% off your entire first purchase.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-md hover:bg-brand-hover transition"
          >
            <span>Explore Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
