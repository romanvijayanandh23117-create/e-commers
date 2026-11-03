import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Zap, ArrowRight, Tag, ShieldCheck, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const PromotionalBanners: React.FC = () => {
  const { applyCoupon } = useStore();

  // Flash deal countdown timer (hours, mins, secs)
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* 1. Flash Deal Spotlight Banner with Live Countdown */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100/70 text-slate-900 p-6 sm:p-10 shadow-md border border-amber-300/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Flash Deal Details */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 bg-brand text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Lightning Flash Deal of the Day</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 leading-tight">
                Super Festive Mega Sale: <span className="text-brand-dark underline decoration-brand/30">Flat 45% OFF</span> on Premium Audio & Watches
              </h3>

              <p className="text-xs sm:text-sm text-slate-700 max-w-lg leading-relaxed">
                Unlock deep discounts on top noise-canceling headphones, AMOLED smartwatches, and smart living purifiers with coupon code <strong className="text-slate-900 bg-white px-2 py-0.5 rounded border border-amber-300 shadow-2xs font-mono">SMARTBIZ10</strong>.
              </p>

              {/* Countdown Stepper */}
              <div className="flex items-center gap-3 pt-2">
                <div className="flex items-center gap-1.5 text-xs text-amber-900 font-bold uppercase tracking-wider">
                  <Clock className="w-4 h-4 text-brand-dark" />
                  <span>Ends In:</span>
                </div>

                <div className="flex items-center gap-2 font-mono">
                  <div className="bg-white border border-amber-300 rounded-lg px-2.5 py-1 text-center min-w-[44px] shadow-xs">
                    <span className="text-base sm:text-lg font-black text-slate-950">{String(timeLeft.hours).padStart(2, '0')}</span>
                    <span className="text-[9px] block text-slate-500 uppercase -mt-1">Hrs</span>
                  </div>
                  <span className="text-brand-dark font-black">:</span>
                  <div className="bg-white border border-amber-300 rounded-lg px-2.5 py-1 text-center min-w-[44px] shadow-xs">
                    <span className="text-base sm:text-lg font-black text-slate-950">{String(timeLeft.minutes).padStart(2, '0')}</span>
                    <span className="text-[9px] block text-slate-500 uppercase -mt-1">Min</span>
                  </div>
                  <span className="text-brand-dark font-black">:</span>
                  <div className="bg-white border border-amber-300 rounded-lg px-2.5 py-1 text-center min-w-[44px] shadow-xs">
                    <span className="text-base sm:text-lg font-black text-brand-dark">{String(timeLeft.seconds).padStart(2, '0')}</span>
                    <span className="text-[9px] block text-slate-500 uppercase -mt-1">Sec</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to="/shop?deal=true"
                  className="px-6 py-3 bg-brand hover:bg-brand-hover text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-md transition flex items-center gap-2"
                >
                  <span>Grab Limited Deals</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => applyCoupon('SMARTBIZ10')}
                  className="px-4 py-3 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl border border-amber-300 shadow-sm transition flex items-center gap-1.5"
                >
                  <Tag className="w-3.5 h-3.5 text-brand" />
                  <span>Copy Code: SMARTBIZ10</span>
                </button>
              </div>
            </div>

            {/* Right Graphic Preview */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800&auto=format&fit=crop"
                    alt="Flash Deal"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white text-slate-900 p-3 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Free 1-Year Guarantee</p>
                    <p className="text-[10px] text-slate-500">Pan-India doorstep warranty</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Split Dual Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Banner A: Smart Living */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-amber-50/80 via-white to-slate-50 text-slate-900 p-6 sm:p-8 flex flex-col justify-between min-h-[220px] group border border-slate-200 shadow-sm">
            <div className="absolute right-0 top-0 bottom-0 w-1/2 z-0 opacity-25 group-hover:opacity-35 transition-opacity">
              <img
                src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop"
                alt="Smart Lighting"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="relative z-10 space-y-2 max-w-sm">
              <span className="text-[10px] font-black text-brand-dark uppercase tracking-wider bg-brand/15 px-2 py-0.5 rounded border border-brand/30">
                Smart Home Tech
              </span>
              <h4 className="text-xl font-black text-slate-900">
                Intelligent RGB & Ambient Lighting
              </h4>
              <p className="text-xs text-slate-600">
                Sync lamps and purifiers with your voice via Alexa and Google Assistant.
              </p>
            </div>

            <div className="relative z-10 pt-4">
              <Link
                to="/shop?category=Smart%20Home%20%26%20Living"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-brand-dark transition group"
              >
                <span>Upgrade Your Home</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Banner B: Premium Leather & Fashion */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-orange-50/80 via-white to-amber-50/60 text-slate-900 p-6 sm:p-8 flex flex-col justify-between min-h-[220px] group border border-slate-200 shadow-sm">
            <div className="absolute right-0 top-0 bottom-0 w-1/2 z-0 opacity-25 group-hover:opacity-35 transition-opacity">
              <img
                src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop"
                alt="Leather craft"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="relative z-10 space-y-2 max-w-sm">
              <span className="text-[10px] font-black text-amber-900 uppercase tracking-wider bg-amber-200/60 px-2 py-0.5 rounded border border-amber-300">
                Artisan Crafted
              </span>
              <h4 className="text-xl font-black text-slate-900">
                Vegetable-Tanned Italian Leather
              </h4>
              <p className="text-xs text-slate-600">
                Handmade weekender bags, aviator sunglasses, and travel accessories.
              </p>
            </div>

            <div className="relative z-10 pt-4">
              <Link
                to="/shop?category=Fashion%20%26%20Lifestyle"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-brand-dark transition group"
              >
                <span>Shop Leather & Apparel</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
