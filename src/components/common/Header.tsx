import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  Heart,
  User as UserIcon,
  Menu,
  X,
  ChevronDown,
  Phone,
  ShieldCheck,
  Package,
  Sparkles,
  SlidersHorizontal,
  LogOut,
  Settings,
  ExternalLink,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    cartCount,
    wishlist,
    currentUser,
    logout,
    login,
    setIsCartDrawerOpen,
    products,
    categories,
    searchQuery,
    setSearchQuery,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [selectedSearchCat, setSelectedSearchCat] = useState('All');
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof products>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setAccountMenuOpen(false);
    setSearchFocused(false);
  }, [location.pathname]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter search results dynamically
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    const matches = products.filter((p) => {
      const matchCat = selectedSearchCat === 'All' || p.category.toLowerCase().includes(selectedSearchCat.toLowerCase());
      const matchText = p.name.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q)) || p.category.toLowerCase().includes(q);
      return matchCat && matchText;
    }).slice(0, 5);
    setSearchResults(matches);
  }, [searchQuery, selectedSearchCat, products]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}${selectedSearchCat !== 'All' ? `&category=${encodeURIComponent(selectedSearchCat)}` : ''}`);
      setSearchFocused(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop All', path: '/shop' },
    { name: 'Categories', path: '/categories' },
    { name: 'Deals & Offers', path: '/shop?deal=true', badge: 'HOT' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-sm transition-all duration-200">
      {/* 1. Top Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-50/90 via-white to-amber-50/90 text-slate-700 text-xs py-2 px-4 border-b border-amber-200/60 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 overflow-hidden">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-brand text-slate-950 shadow-xs">
              SMART SALE
            </span>
            <p className="truncate text-slate-700 font-medium text-[11px] sm:text-xs">
              Free Express Delivery on All Orders | Use Code <span className="text-brand-dark font-black">SMARTBIZ10</span> for 10% OFF
            </p>
          </div>

          <div className="hidden md:flex items-center space-x-6 text-xs text-slate-600 font-medium">
            <Link to="/order-tracking" className="hover:text-brand-dark transition flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-brand" />
              <span>Track Order</span>
            </Link>
            <div className="h-3 w-px bg-slate-300" />
            <Link to="/contact" className="hover:text-brand-dark transition flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-brand" />
              <span>24/7 Support</span>
            </Link>
            <div className="h-3 w-px bg-slate-300" />
            <Link to="/admin" className="text-amber-700 hover:text-amber-800 transition flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Header / Brand / Search / Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand to-amber-400 flex items-center justify-center text-slate-950 font-black text-xl shadow-sm group-hover:scale-105 transition-transform">
              <span className="text-slate-950 font-black">S</span>
              <span className="text-slate-900">B</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 leading-none">
                <span className="text-xl font-extrabold tracking-tight text-slate-900">Smart</span>
                <span className="text-xl font-extrabold tracking-tight text-brand">Biz</span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded ml-1 border border-amber-200/80">Store</span>
              </div>
              <span className="text-[10px] font-medium text-slate-500 tracking-wide mt-0.5">Powered E-Commerce Storefront</span>
            </div>
          </Link>

          {/* Search Bar (Desktop / Tablet) */}
          <div ref={searchRef} className="hidden md:flex flex-1 max-w-2xl relative">
            <form onSubmit={handleSearchSubmit} className="w-full flex rounded-lg border-2 border-slate-200 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20 transition-all bg-white overflow-hidden shadow-inner">
              {/* Category Selector */}
              <div className="relative bg-slate-50 border-r border-slate-200 flex items-center">
                <select
                  value={selectedSearchCat}
                  onChange={(e) => setSelectedSearchCat(e.target.value)}
                  className="bg-transparent text-xs text-slate-700 py-2.5 pl-3 pr-7 font-medium cursor-pointer focus:outline-none appearance-none"
                >
                  <option value="All">All Categories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 pointer-events-none" />
              </div>

              {/* Input */}
              <div className="flex-1 flex items-center px-3">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  placeholder="Search for headphones, watches, smart home, organic bags..."
                  className="w-full text-sm text-slate-800 placeholder-slate-400 focus:outline-none py-2 bg-transparent"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-slate-400 hover:text-slate-600 mr-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-brand hover:bg-brand-hover text-slate-950 px-5 flex items-center justify-center font-semibold transition-colors duration-150"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-slate-900" />
              </button>
            </form>

            {/* Instant Search Results Dropdown */}
            {searchFocused && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50 overflow-hidden">
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between border-b border-slate-100">
                  <span>Suggested Products</span>
                  <span>{searchResults.length} results</span>
                </div>
                {searchResults.map((p) => (
                  <Link
                    key={p.id}
                    to={`/product/${p.id}`}
                    onClick={() => setSearchFocused(false)}
                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 transition border-b border-slate-50 last:border-0"
                  >
                    <img src={p.images[0]} alt={p.name} className="w-11 h-11 object-cover rounded-lg border border-slate-200" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-900 truncate">{p.name}</p>
                      <p className="text-[11px] text-slate-500">{p.category} &bull; <span className="text-emerald-600 font-medium">In Stock</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-slate-900">₹{p.price.toLocaleString('en-IN')}</p>
                      <p className="text-[10px] text-slate-400 line-through">₹{p.originalPrice.toLocaleString('en-IN')}</p>
                    </div>
                  </Link>
                ))}
                <div className="px-3 pt-2 pb-1 bg-slate-50 text-center">
                  <button
                    onClick={handleSearchSubmit}
                    className="text-xs font-semibold text-brand-dark hover:underline flex items-center justify-center gap-1 mx-auto"
                  >
                    View all matching items <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action Icons: Wishlist, Account, Cart */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Wishlist Button */}
            <Link
              to="/wishlist"
              className="relative p-2 text-slate-700 hover:text-brand hover:bg-slate-100 rounded-full transition"
              title="View Wishlist"
            >
              <Heart className="w-6 h-6" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative p-2 text-slate-700 hover:text-brand hover:bg-slate-100 rounded-full transition flex items-center gap-1.5"
              title="Shopping Cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-brand text-slate-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              <span className="hidden xl:inline text-xs font-bold text-slate-800">
                Cart
              </span>
            </button>

            {/* Account Menu */}
            <div ref={accountRef} className="relative">
              <button
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition"
              >
                <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs overflow-hidden">
                  {currentUser?.avatar ? (
                    <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon className="w-4 h-4" />
                  )}
                </div>
                <div className="hidden lg:flex flex-col text-left">
                  <span className="text-[10px] text-slate-500 leading-none">
                    {currentUser ? 'Hello,' : 'Sign In'}
                  </span>
                  <span className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[100px]">
                    {currentUser ? currentUser.name.split(' ')[0] : 'Account'}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
              </button>

              {/* Account Dropdown */}
              {accountMenuOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {currentUser ? (
                    <>
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                        <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 capitalize">
                          {currentUser.role} Account
                        </span>
                      </div>

                      <div className="py-1">
                        <Link
                          to="/account"
                          onClick={() => setAccountMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-brand font-medium"
                        >
                          <UserIcon className="w-4 h-4 text-slate-400" /> My Profile & Addresses
                        </Link>
                        <Link
                          to="/orders"
                          onClick={() => setAccountMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-brand font-medium"
                        >
                          <Package className="w-4 h-4 text-slate-400" /> My Orders & Invoices
                        </Link>
                        <Link
                          to="/wishlist"
                          onClick={() => setAccountMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-brand font-medium"
                        >
                          <Heart className="w-4 h-4 text-slate-400" /> Wishlist ({wishlist.length})
                        </Link>
                        <Link
                          to="/admin"
                          onClick={() => setAccountMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-amber-700 bg-amber-50/60 hover:bg-amber-100/70"
                        >
                          <Settings className="w-4 h-4 text-amber-600" /> Merchant Admin Dashboard
                        </Link>
                      </div>

                      <div className="border-t border-slate-100 pt-1 mt-1">
                        <button
                          onClick={() => {
                            logout();
                            setAccountMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 font-medium"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-3">
                      <p className="text-xs text-slate-600 mb-2">Sign in to track orders, manage addresses, and save favorites.</p>
                      <Link
                        to="/login"
                        onClick={() => setAccountMenuOpen(false)}
                        className="w-full block text-center py-2 bg-brand hover:bg-brand-hover text-slate-950 text-xs font-bold rounded-lg transition"
                      >
                        Sign In / Register
                      </Link>
                      <div className="mt-2 text-center">
                        <button
                          onClick={() => {
                            login('admin@smartbizstore.in', 'admin');
                            setAccountMenuOpen(false);
                          }}
                          className="text-[11px] text-slate-500 hover:text-brand underline"
                        >
                          Quick 1-Click Demo Admin Sign In
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden">
          <form onSubmit={handleSearchSubmit} className="flex rounded-lg border border-slate-200 overflow-hidden bg-white shadow-sm">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, brands, categories..."
              className="flex-1 px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
            />
            <button type="submit" className="bg-brand px-3.5 text-slate-950 flex items-center justify-center">
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* 3. Navigation Bar (Desktop Links) */}
      <nav className="hidden md:block bg-slate-50/95 text-slate-800 border-t border-b border-slate-200/90 shadow-2xs backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Main Links */}
            <div className="flex items-center space-x-1">
              <Link
                to="/categories"
                className="flex items-center gap-2 px-4 py-2.5 bg-white text-slate-900 font-bold text-xs rounded-t border-t border-x border-slate-200 hover:bg-slate-100 transition shadow-2xs"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-brand" />
                <span>All Departments</span>
              </Link>

              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-3.5 py-2.5 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 ${
                      isActive
                        ? 'text-brand-dark font-black bg-brand/10 border border-brand/20 shadow-2xs'
                        : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/60'
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="bg-red-500 text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full uppercase">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Quick Highlights */}
            <div className="flex items-center space-x-4 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1.5 text-slate-700">
                <Sparkles className="w-3.5 h-3.5 text-brand" />
                <span>100% Verified Quality</span>
              </span>
              <span className="text-slate-300">|</span>
              <Link to="/returns" className="hover:text-brand-dark transition text-slate-600">
                Easy 7-Day Returns
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 4. Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 shadow-xl px-4 py-4 space-y-3 animate-in slide-in-from-top-3 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            <Link
              to="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 bg-slate-50 rounded-lg text-center font-semibold text-xs text-slate-800 border border-slate-200"
            >
              Shop All
            </Link>
            <Link
              to="/categories"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 bg-brand/10 rounded-lg text-center font-bold text-xs text-brand-dark border border-brand/20"
            >
              Categories
            </Link>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 text-sm font-medium text-slate-700 hover:text-brand"
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <Link
              to="/order-tracking"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 py-1.5 text-xs text-slate-600 font-medium"
            >
              <Package className="w-4 h-4 text-brand" /> Track Your Order
            </Link>
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 py-1.5 text-xs text-amber-700 font-semibold"
            >
              <ShieldCheck className="w-4 h-4 text-amber-600" /> Admin Management Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

