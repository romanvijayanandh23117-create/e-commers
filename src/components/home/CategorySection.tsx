import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const CategorySection: React.FC = () => {
  const { categories } = useStore();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-dark text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-brand" />
              <span>Curated Departments</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Explore Popular Categories
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              Browse top-tier electronics, smart gadgets, active wear, and artisan essentials handpicked for daily quality.
            </p>
          </div>

          <Link
            to="/categories"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-brand-dark transition group shrink-0"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group relative h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-card-hover border border-slate-200/70 transition-all duration-300 flex flex-col justify-end p-6"
            >
              {/* Background Image with Dark Gradient Overlay */}
              <div className="absolute inset-0 z-0">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b192c] via-[#0b192c]/60 to-transparent" />
              </div>

              {/* Category Info */}
              <div className="relative z-10 space-y-1.5 transform group-hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-300 bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur-sm border border-slate-700/60">
                    {cat.itemCount}+ Products
                  </span>
                  <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>

                <h3 className="text-lg font-black text-white group-hover:text-brand transition-colors">
                  {cat.name}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

