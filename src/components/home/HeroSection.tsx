import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, ShieldCheck, Zap, Truck, Star, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const HeroSection: React.FC = () => {
  const { products, addToCart } = useStore();
  const featuredHeroProduct = products.find((p) => p.id === 'prod-001') || products[0];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/70 via-white to-slate-50 text-slate-900 py-12 md:py-20 border-b border-slate-200/60">
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & CTA */}
          <div className="lg:col-span-7 space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-amber-200/90 text-xs font-semibold text-slate-800 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
              <span>Amazon SmartBiz Inspired Experience</span>
              <span className="text-slate-400">&bull;</span>
              <span className="text-brand-dark font-black">Season 2026</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 leading-[1.15]">
              Your One-Stop Destination for <span className="text-brand underline decoration-brand/40 decoration-4">Quality Products</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
              Explore meticulously verified audio, smart gadgets, active lifestyle essentials, and home appliances. Direct-to-consumer prices, lightning-fast dispatch across India, and guaranteed 7-day hassle-free replacements.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                to="/shop"
                className="px-6 py-3.5 bg-brand hover:bg-brand-hover text-slate-950 font-black text-sm rounded-xl shadow-md shadow-brand/20 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-slate-950" />
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </Link>

              <Link
                to="/categories"
                className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-xl border border-slate-300 shadow-sm transition-all"
              >
                Explore Categories
              </Link>
            </div>

            {/* Trust Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-200/80 max-w-lg">
              <div className="flex items-center gap-2 text-slate-700">
                <Truck className="w-4 h-4 text-brand shrink-0" />
                <span className="text-xs font-semibold">Free Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <ShieldCheck className="w-4 h-4 text-brand shrink-0" />
                <span className="text-xs font-semibold">100% Genuine</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Zap className="w-4 h-4 text-brand shrink-0" />
                <span className="text-xs font-semibold">Fast Dispatch</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Product Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xl backdrop-blur-sm">
              {/* Floating Deal Pill */}
              <div className="absolute -top-3.5 right-6 bg-brand text-slate-950 font-black text-xs px-3.5 py-1 rounded-full shadow-md flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>TODAY'S TOP PICK &bull; {featuredHeroProduct.discountPercentage}% OFF</span>
              </div>

              {/* Product Image Showcase */}
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 relative mb-4 border border-slate-200 group">
                <img
                  src={featuredHeroProduct.images[0]}
                  alt={featuredHeroProduct.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[11px] font-bold text-slate-800 border border-slate-200 shadow-xs">
                  {featuredHeroProduct.brand}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 bg-amber-50 text-amber-800 px-2 py-0.5 rounded text-xs font-bold border border-amber-200">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{featuredHeroProduct.rating}</span>
                    <span className="text-slate-500 text-[10px]">({featuredHeroProduct.reviewCount} reviews)</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    In High Demand
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 line-clamp-1 hover:text-brand transition">
                  <Link to={`/product/${featuredHeroProduct.id}`}>
                    {featuredHeroProduct.name}
                  </Link>
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2">
                  {featuredHeroProduct.shortDescription}
                </p>

                {/* Price & Action */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-slate-950">
                        ₹{featuredHeroProduct.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        ₹{featuredHeroProduct.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-bold">
                      Save ₹{(featuredHeroProduct.originalPrice - featuredHeroProduct.price).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(featuredHeroProduct, 1)}
                    className="px-4 py-2.5 bg-brand hover:bg-brand-hover text-slate-950 text-xs font-black rounded-xl transition shadow-sm flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Claim Deal</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
