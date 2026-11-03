import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  SlidersHorizontal,
  X,
  Star,
  Check,
  RotateCcw,
  LayoutGrid,
  List,
  Search,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, categories } = useStore();

  // URL query params
  const paramSearch = searchParams.get('search') || '';
  const paramCat = searchParams.get('category') || 'All';
  const paramDeal = searchParams.get('deal') === 'true';

  // Filters state
  const [searchQuery, setSearchQuery] = useState(paramSearch);
  const [selectedCategory, setSelectedCategory] = useState(paramCat);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onlyDeals, setOnlyDeals] = useState(paramDeal);
  const [priceRange, setPriceRange] = useState<number>(15000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Sync params when URL changes
  useEffect(() => {
    if (paramSearch) setSearchQuery(paramSearch);
    if (paramCat) setSelectedCategory(paramCat);
    if (paramDeal) setOnlyDeals(true);
  }, [paramSearch, paramCat, paramDeal]);

  // Max price calculation
  const maxPriceInCatalog = useMemo(() => {
    return Math.max(...products.map((p) => p.price), 15000);
  }, [products]);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = p.name.toLowerCase().includes(q);
          const matchTag = p.tags.some((t) => t.toLowerCase().includes(q));
          const matchBrand = p.brand.toLowerCase().includes(q);
          if (!matchTitle && !matchTag && !matchBrand) return false;
        }

        // Category
        if (selectedCategory !== 'All' && !p.category.toLowerCase().includes(selectedCategory.toLowerCase())) {
          return false;
        }

        // Price
        if (p.price > priceRange) return false;

        // Rating
        if (selectedRating !== null && p.rating < selectedRating) return false;

        // In Stock
        if (inStockOnly && (!p.inStock || p.stockCount <= 0)) return false;

        // Only Deals
        if (onlyDeals && !p.isDeal && p.discountPercentage < 30) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return 0; // 'featured'
      });
  }, [products, searchQuery, selectedCategory, priceRange, selectedRating, inStockOnly, onlyDeals, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedRating(null);
    setInStockOnly(false);
    setOnlyDeals(false);
    setPriceRange(maxPriceInCatalog);
    setSortBy('featured');
    setSearchParams({});
  };

  const hasActiveFilters =
    searchQuery ||
    selectedCategory !== 'All' ||
    selectedRating !== null ||
    inStockOnly ||
    onlyDeals ||
    priceRange < maxPriceInCatalog;

  return (
    <div className="bg-[#f8fafc] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Title */}
        <div className="mb-6">
          <div className="flex items-center text-xs text-slate-500 gap-2 mb-2">
            <span>Home</span>
            <span>/</span>
            <span className="font-semibold text-slate-800">Shop Catalog</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {selectedCategory === 'All' ? 'Shop All Products' : selectedCategory}
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            {/* Mobile Filter Trigger */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-800 shadow-sm"
              >
                <SlidersHorizontal className="w-4 h-4 text-brand" />
                <span>Filters {hasActiveFilters ? '(Active)' : ''}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Layout: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-6 sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
                <SlidersHorizontal className="w-4 h-4 text-brand" />
                <span>Filter Products</span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs font-bold text-red-500 hover:text-red-700 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              )}
            </div>

            {/* Search Input Filter */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-2">Search Catalog</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Keywords, brands, specs..."
                  className="w-full text-xs py-2 pl-8 pr-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-2.5">Category</label>
              <div className="space-y-1.5">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center justify-between ${
                    selectedCategory === 'All'
                      ? 'bg-brand text-slate-950 font-bold shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span>All Categories</span>
                  <span>{products.length}</span>
                </button>
                {categories.map((c) => {
                  const isSelected = selectedCategory.toLowerCase() === c.name.toLowerCase();
                  const count = products.filter((p) => p.category.toLowerCase().includes(c.name.toLowerCase())).length;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.name)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center justify-between ${
                        isSelected
                          ? 'bg-brand text-slate-950 font-bold shadow-xs'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span className="truncate mr-2">{c.name}</span>
                      <span className="text-[11px] opacity-75">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-800">Max Price</label>
                <span className="text-xs font-black text-brand-dark">
                  ₹{priceRange.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="500"
                max={maxPriceInCatalog}
                step="500"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-brand cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>₹500</span>
                <span>₹{maxPriceInCatalog.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Minimum Rating */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-2">Customer Rating</label>
              <div className="space-y-1.5">
                {[4.5, 4.0, 3.5].map((stars) => (
                  <button
                    key={stars}
                    onClick={() => setSelectedRating(selectedRating === stars ? null : stars)}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition border ${
                      selectedRating === stars
                        ? 'border-brand bg-brand/10 text-slate-900 font-bold'
                        : 'border-slate-100 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                      </div>
                      <span>{stars} Stars & Above</span>
                    </div>
                    {selectedRating === stars && <Check className="w-3.5 h-3.5 text-brand" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Deals & Stock Toggles */}
            <div className="pt-2 border-t border-slate-100 space-y-3">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 font-medium">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-brand focus:ring-brand accent-brand w-4 h-4"
                />
                <span>In Stock Items Only</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 font-medium">
                <input
                  type="checkbox"
                  checked={onlyDeals}
                  onChange={(e) => setOnlyDeals(e.target.checked)}
                  className="rounded text-brand focus:ring-brand accent-brand w-4 h-4"
                />
                <span>Deals & Discounts Only</span>
              </label>
            </div>
          </aside>

          {/* Main Catalog View */}
          <main className="lg:col-span-3 space-y-6">
            {/* Control Bar: Sorting + View toggles */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-500">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 py-1.5 px-3 focus:outline-none focus:border-brand"
                >
                  <option value="featured">Featured Picks</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>

              {/* Active Filter Pills */}
              <div className="flex items-center gap-2">
                {selectedCategory !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory('All')}>
                      <X className="w-3 h-3 text-slate-500 hover:text-slate-900" />
                    </button>
                  </span>
                )}

                {selectedRating !== null && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200">
                    {selectedRating}★ & Above
                    <button onClick={() => setSelectedRating(null)}>
                      <X className="w-3 h-3 text-amber-700 hover:text-slate-900" />
                    </button>
                  </span>
                )}

                {onlyDeals && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-50 text-red-700 text-xs font-semibold border border-red-200">
                    Deals
                    <button onClick={() => setOnlyDeals(false)}>
                      <X className="w-3 h-3 text-red-500 hover:text-slate-900" />
                    </button>
                  </span>
                )}
              </div>
            </div>

            {/* Products Grid / Empty state */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-1">No products match your criteria</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
                  Try adjusting your price range, searching with different terms, or resetting category filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 bg-brand hover:bg-brand-hover text-slate-950 text-xs font-bold rounded-xl transition"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto lg:hidden">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setMobileFilterOpen(false)} />
          <div className="relative min-h-screen flex items-end">
            <div className="w-full bg-white rounded-t-3xl p-6 space-y-6 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">Filters</h3>
                <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category */}
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-2">Category</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className={`p-2 rounded-lg text-xs font-semibold ${selectedCategory === 'All' ? 'bg-brand text-slate-950 font-bold shadow-xs' : 'bg-slate-100 text-slate-700'}`}
                  >
                    All Categories
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.name)}
                      className={`p-2 rounded-lg text-xs font-semibold truncate ${selectedCategory.toLowerCase() === c.name.toLowerCase() ? 'bg-brand text-slate-950 font-bold shadow-xs' : 'bg-slate-100 text-slate-700'}`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span>Max Price</span>
                  <span className="text-brand-dark">₹{priceRange.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max={maxPriceInCatalog}
                  step="500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-brand"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  onClick={resetFilters}
                  className="flex-1 py-3 bg-slate-100 text-slate-800 text-xs font-bold rounded-xl"
                >
                  Reset
                </button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 py-3 bg-brand text-slate-950 text-xs font-black rounded-xl"
                >
                  Apply Filters ({filteredProducts.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

