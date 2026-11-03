import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Sparkles, TrendingUp, Tag, ArrowRight, Layers } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';

export const TabbedProducts: React.FC = () => {
  const { products } = useStore();
  const [activeTab, setActiveTab] = useState<'featured' | 'bestseller' | 'new' | 'trending' | 'deal'>('featured');

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'bestseller') return p.isBestseller;
    if (activeTab === 'new') return p.isNewArrival;
    if (activeTab === 'trending') return p.isTrending;
    if (activeTab === 'deal') return p.isDeal || p.discountPercentage >= 40;
    return true; // 'featured' shows all featured/top products
  });

  const tabs = [
    { id: 'featured', label: 'Featured Top Picks', icon: Layers },
    { id: 'bestseller', label: 'Bestsellers', icon: Flame },
    { id: 'deal', label: 'Exclusive Deals', icon: Tag },
    { id: 'new', label: 'New Arrivals', icon: Sparkles },
    { id: 'trending', label: 'Trending Now', icon: TrendingUp },
  ] as const;

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-brand uppercase tracking-wider bg-brand/10 px-3 py-1 rounded-full border border-brand/20">
            Handpicked Catalog
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-3">
            Explore Our Featured Collections
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Top-rated devices, wearable fitness trackers, and artisan home essentials with genuine customer warranties.
          </p>

          {/* Navigation Filter Tabs */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-6 overflow-x-auto pb-2 scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shadow-sm ${
                    isActive
                      ? 'bg-brand text-slate-950 font-black shadow-md'
                      : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white hover:bg-slate-900 text-slate-900 hover:text-white font-bold text-xs sm:text-sm rounded-xl border border-slate-300 hover:border-slate-900 transition-all shadow-sm group"
          >
            <span>View All {products.length} Products in Store</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

