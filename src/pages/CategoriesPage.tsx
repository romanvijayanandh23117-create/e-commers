import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CategoriesPage: React.FC = () => {
  const { categories, products } = useStore();

  return (
    <div className="bg-[#f8fafc] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/10 text-brand-dark text-xs font-bold mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Store Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Browse All Categories
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Explore our curated departmental catalog engineered for authentic quality, verified manufacturer warranties, and prompt nationwide dispatch.
          </p>
        </div>

        {/* Categories Showcase */}
        <div className="space-y-12">
          {categories.map((cat) => {
            const catProducts = products.filter((p) =>
              p.category.toLowerCase().includes(cat.name.toLowerCase())
            );

            return (
              <div
                key={cat.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Category Card Overview */}
                  <div className="lg:col-span-4 relative rounded-2xl overflow-hidden aspect-[4/3] group shadow-md">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-brand text-slate-950 px-2 py-0.5 rounded">
                        {catProducts.length || cat.itemCount} Items
                      </span>
                      <h3 className="text-xl font-black text-white mt-1.5">{cat.name}</h3>
                      <p className="text-xs text-slate-300 mt-1 line-clamp-2">{cat.description}</p>
                      <Link
                        to={`/shop?category=${encodeURIComponent(cat.name)}`}
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:underline"
                      >
                        <span>View All in {cat.name.split('&')[0]}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Top Products in this category */}
                  <div className="lg:col-span-8">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-bold text-slate-900">Featured in this department</h4>
                      <Link
                        to={`/shop?category=${encodeURIComponent(cat.name)}`}
                        className="text-xs font-semibold text-brand-dark hover:underline flex items-center gap-1"
                      >
                        Explore all <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {catProducts.slice(0, 3).map((prod) => (
                        <Link
                          key={prod.id}
                          to={`/product/${prod.id}`}
                          className="group p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/60 transition flex flex-col justify-between"
                        >
                          <div className="aspect-square rounded-xl overflow-hidden bg-white mb-3 border border-slate-200">
                            <img
                              src={prod.images[0]}
                              alt={prod.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 font-semibold">{prod.brand}</span>
                            <h5 className="text-xs font-bold text-slate-800 line-clamp-2 group-hover:text-brand transition mt-0.5">
                              {prod.name}
                            </h5>
                          </div>
                          <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                            <span className="text-xs font-black text-slate-900">
                              ₹{prod.price.toLocaleString('en-IN')}
                            </span>
                            <span className="text-[10px] font-semibold text-brand-dark">
                              {prod.discountPercentage}% OFF
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

