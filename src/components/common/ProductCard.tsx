import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, isInWishlist, toggleWishlist, setQuickViewProduct, cart } = useStore();
  const wishlisted = isInWishlist(product.id);
  const inCart = cart.some((item) => item.product.id === product.id);

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/80 hover:border-slate-300 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col overflow-hidden">
      {/* Badges & Wishlist Overlay */}
      <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden">
        {/* Discount Badge */}
        {product.discountPercentage > 0 && (
          <div className="absolute top-3 left-3 z-10 bg-brand text-slate-950 text-[11px] font-black px-2 py-0.5 rounded-md shadow-sm">
            {product.discountPercentage}% OFF
          </div>
        )}

        {/* Status badges */}
        {product.isDeal && !product.discountPercentage && (
          <div className="absolute top-3 left-3 z-10 bg-red-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-sm">
            LIMITED DEAL
          </div>
        )}

        {product.isBestseller && (
          <div className="absolute top-3 right-12 z-10 bg-slate-900 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
            BESTSELLER
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            wishlisted
              ? 'bg-red-50 text-red-500 shadow-sm'
              : 'bg-white/90 backdrop-blur-sm text-slate-600 hover:text-red-500 shadow-sm hover:scale-110'
          }`}
          title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-red-500' : ''}`} />
        </button>

        {/* Main Product Image */}
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </Link>

        {/* Quick View Button (Desktop hover overlay) */}
        <div className="absolute inset-x-0 bottom-3 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
          <button
            onClick={() => setQuickViewProduct(product)}
            className="w-full py-2 bg-white/95 backdrop-blur text-slate-800 text-xs font-bold rounded-lg shadow-md hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" /> Quick View
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Brand */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium mb-1">
            <span className="truncate max-w-[120px]">{product.brand}</span>
            <span className="capitalize">{product.category.split('&')[0]}</span>
          </div>

          {/* Title */}
          <Link
            to={`/product/${product.id}`}
            className="block text-sm font-semibold text-slate-800 hover:text-brand line-clamp-2 leading-snug mb-2 group-hover:text-slate-950 transition-colors"
            title={product.name}
          >
            {product.name}
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex items-center bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded text-xs font-bold border border-amber-200/60">
              <span>{product.rating}</span>
              <Star className="w-3 h-3 fill-amber-500 text-amber-500 ml-0.5" />
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              ({product.reviewCount})
            </span>
            <span className="text-slate-300 text-xs">&bull;</span>
            <span className="text-[11px] text-emerald-600 font-semibold">
              {product.stockCount < 10 ? `Only ${product.stockCount} left!` : 'In Stock'}
            </span>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-black text-slate-950">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Add to Cart button */}
          <button
            onClick={() => addToCart(product, 1)}
            className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm ${
              inCart
                ? 'bg-slate-900 text-white hover:bg-slate-800'
                : 'bg-brand hover:bg-brand-hover text-slate-950'
            }`}
          >
            {inCart ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" /> Added to Cart (+1)
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

