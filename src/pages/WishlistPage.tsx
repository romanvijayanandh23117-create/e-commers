import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlist, products, addToCart, toggleWishlist, showToast } = useStore();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleAddAllToCart = () => {
    wishlistedProducts.forEach((p) => {
      addToCart(p, 1);
    });
    showToast('success', `Added ${wishlistedProducts.length} items to your cart!`);
  };

  if (wishlistedProducts.length === 0) {
    return (
      <div className="bg-[#f8fafc] min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm max-w-lg w-full text-center">
          <div className="w-20 h-20 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Your Wishlist is Empty</h2>
          <p className="text-xs sm:text-sm text-slate-500 mb-8 max-w-sm mx-auto">
            Save items you love by tapping the heart icon on any product to easily revisit them later.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand hover:bg-brand-hover text-slate-950 font-black text-xs sm:text-sm rounded-xl transition shadow-md"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Discover Products</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              My Saved Wishlist
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {wishlistedProducts.length} {wishlistedProducts.length === 1 ? 'product' : 'products'} saved
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAddAllToCart}
              className="px-5 py-2.5 bg-brand hover:bg-brand-hover text-slate-950 text-xs font-bold rounded-xl shadow-sm transition flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add All to Cart</span>
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

