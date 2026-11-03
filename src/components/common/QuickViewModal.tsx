import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Star, Heart, ShoppingBag, Check, ShieldCheck, Truck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    isInWishlist,
    toggleWishlist,
  } = useStore();

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const wishlisted = isInWishlist(product.id);

  const handleClose = () => {
    setQuickViewProduct(null);
    setSelectedImageIdx(0);
    setQuantity(1);
  };

  const handleAdd = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-100">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-700 bg-white/90 rounded-full shadow-sm hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Gallery Column */}
            <div className="p-6 bg-slate-50 flex flex-col justify-between">
              <div className="aspect-square rounded-xl overflow-hidden bg-white border border-slate-200 shadow-inner mb-4">
                <img
                  src={product.images[selectedImageIdx] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIdx(idx)}
                      className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition ${
                        selectedImageIdx === idx ? 'border-brand' : 'border-slate-200 opacity-70'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info Column */}
            <div className="p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                  {product.brand} &bull; {product.category}
                </span>

                <h3 className="text-lg font-bold text-slate-900 mt-1 leading-snug">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center bg-amber-50 text-amber-800 px-2 py-0.5 rounded text-xs font-bold border border-amber-200">
                    <span>{product.rating}</span>
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 ml-1" />
                  </div>
                  <span className="text-xs text-slate-500">
                    ({product.reviewCount} customer reviews)
                  </span>
                </div>

                {/* Pricing */}
                <div className="flex items-baseline gap-3 mt-4">
                  <span className="text-2xl font-black text-slate-950">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-slate-400 line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  {product.discountPercentage > 0 && (
                    <span className="text-xs font-bold bg-brand text-slate-950 px-2 py-0.5 rounded">
                      {product.discountPercentage}% OFF
                    </span>
                  )}
                </div>

                {/* Short description */}
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  {product.shortDescription || product.description.slice(0, 160)}
                </p>

                {/* Key features bullets */}
                <ul className="mt-3 space-y-1 text-xs text-slate-600">
                  {product.features.slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Guarantees */}
                <div className="flex items-center gap-4 text-[11px] text-slate-500 mt-4 pt-3 border-t border-slate-100">
                  <span className="flex items-center gap-1 text-emerald-700 font-medium">
                    <Truck className="w-3.5 h-3.5" /> Free Delivery Eligible
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-400" /> 1-Year Warranty
                  </span>
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-slate-600 hover:bg-slate-200 font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 py-2 text-xs font-bold text-slate-800">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-slate-600 hover:bg-slate-200 font-bold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAdd}
                    className="flex-1 py-2.5 px-4 bg-brand hover:bg-brand-hover text-slate-950 font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Cart
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-2.5 rounded-xl border transition ${
                      wishlisted
                        ? 'border-red-200 bg-red-50 text-red-500'
                        : 'border-slate-200 text-slate-500 hover:text-red-500 hover:bg-slate-50'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${wishlisted ? 'fill-red-500' : ''}`} />
                  </button>
                </div>

                <Link
                  to={`/product/${product.id}`}
                  onClick={handleClose}
                  className="block text-center text-xs font-semibold text-slate-600 hover:text-brand underline"
                >
                  View full specifications & customer reviews &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

