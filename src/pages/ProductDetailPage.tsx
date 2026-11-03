import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  MapPin,
  Share2,
  ChevronRight,
  Sparkles,
  MessageSquare,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { SAMPLE_REVIEWS } from '../data/mockData';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    products,
    addToCart,
    isInWishlist,
    toggleWishlist,
    showToast,
  } = useStore();

  const product = products.find((p) => p.id === id) || products[0];
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('560103');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(
    'Fast Delivery Available in Bengaluru by Tomorrow 4 PM'
  );

  // Review submission state
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [localReviews, setLocalReviews] = useState(SAMPLE_REVIEWS);

  const wishlisted = isInWishlist(product.id);

  // Related products in same category
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeStatus(`Fast Express Delivery verified for PIN ${pincode} by Tomorrow evening.`);
      showToast('success', 'PIN Code serviceable for Free Delivery!');
    } else {
      setPincodeStatus('Please enter a valid 6-digit Indian PIN Code.');
      showToast('error', 'Invalid PIN Code format');
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) {
      showToast('error', 'Please enter your name and review details.');
      return;
    }
    const newRev = {
      id: `rev-${Date.now()}`,
      productId: product.id,
      userName: reviewName.trim(),
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120',
      rating: reviewRating,
      date: 'Just now',
      title: 'Verified Customer Feedback',
      comment: reviewComment.trim(),
      verifiedPurchase: true,
      helpfulCount: 0,
    };
    setLocalReviews([newRev, ...localReviews]);
    setReviewName('');
    setReviewComment('');
    showToast('success', 'Thank you! Your verified review has been published.', 'Review Submitted');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('success', 'Product link copied to clipboard!');
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-slate-500 gap-1.5 mb-6">
          <Link to="/" className="hover:text-slate-800">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/shop" className="hover:text-slate-800">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-slate-800">
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-800 truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Hero Grid */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Gallery: 5 cols */}
            <div className="lg:col-span-5 space-y-4">
              {/* Main Showcase Image */}
              <div className="aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 relative group shadow-inner">
                <img
                  src={product.images[selectedImgIdx] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.discountPercentage > 0 && (
                  <div className="absolute top-4 left-4 bg-brand text-slate-950 font-black text-xs px-2.5 py-1 rounded-md shadow-md">
                    {product.discountPercentage}% OFF
                  </div>
                )}
                <button
                  onClick={handleShare}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/90 text-slate-600 hover:text-slate-900 shadow-md backdrop-blur-sm transition"
                  title="Share product link"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImgIdx(idx)}
                      className={`w-18 h-18 w-20 h-20 rounded-xl overflow-hidden border-2 transition shrink-0 ${
                        selectedImgIdx === idx ? 'border-brand ring-2 ring-brand/20' : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Meta & Purchase: 7 cols */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                {/* Brand & Category */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-brand-dark uppercase tracking-wider">
                    {product.brand} &bull; {product.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">SKU: {product.sku}</span>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  {product.name}
                </h1>

                {/* Ratings & Reviews */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center bg-amber-50 text-amber-800 px-2 py-0.5 rounded text-xs font-bold border border-amber-200">
                    <span>{product.rating}</span>
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 ml-1" />
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    {product.reviewCount} Verified Customer Ratings
                  </span>
                  <span className="text-slate-300">&bull;</span>
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> {product.inStock ? 'In Stock (Ready to Dispatch)' : 'Pre-order'}
                  </span>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-3xl sm:text-4xl font-black text-slate-950">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice > product.price && (
                    <>
                      <span className="text-base text-slate-400 line-through">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2 py-1 rounded">
                        You save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')} ({product.discountPercentage}%)
                      </span>
                    </>
                  )}
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Inclusive of all taxes &bull; Free standard delivery on all orders
                </span>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-slate-600 mt-4 leading-relaxed">
                  {product.description}
                </p>

                {/* Key Bullet Features */}
                <div className="mt-5 space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Key Highlights</h4>
                  <ul className="space-y-1.5">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Purchase Box */}
              <div className="pt-6 border-t border-slate-200 space-y-4">
                {/* Quantity + CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  {/* Quantity */}
                  <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-slate-50 self-start sm:self-auto">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3.5 py-2.5 text-slate-700 hover:bg-slate-200 font-bold"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-xs font-bold text-slate-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3.5 py-2.5 text-slate-700 hover:bg-slate-200 font-bold"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3 px-5 bg-brand hover:bg-brand-hover text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>

                  {/* Buy Now */}
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 py-3 px-5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2"
                  >
                    <Zap className="w-4 h-4 text-brand" />
                    <span>Buy Now</span>
                  </button>

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-3 rounded-xl border transition flex items-center justify-center ${
                      wishlisted
                        ? 'border-red-200 bg-red-50 text-red-500'
                        : 'border-slate-300 text-slate-600 hover:bg-slate-50'
                    }`}
                    title="Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${wishlisted ? 'fill-red-500' : ''}`} />
                  </button>
                </div>

                {/* Pin Code Delivery Checker */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-brand" /> Delivery Options
                    </span>
                  </div>

                  <form onSubmit={handleCheckPincode} className="flex gap-2 max-w-sm">
                    <input
                      type="text"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="Enter 6-digit PIN code"
                      className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-brand bg-white"
                    />
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition"
                    >
                      Check
                    </button>
                  </form>

                  {pincodeStatus && (
                    <p className="text-[11px] text-emerald-700 font-medium mt-2 flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 shrink-0" /> {pincodeStatus}
                    </p>
                  )}
                </div>

                {/* Assurance row */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                  <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                    <Truck className="w-4 h-4 text-brand mx-auto mb-1" />
                    <span className="text-[10px] font-bold text-slate-700 block">Free Shipping</span>
                    <span className="text-[9px] text-slate-400">On all orders</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                    <RotateCcw className="w-4 h-4 text-brand mx-auto mb-1" />
                    <span className="text-[10px] font-bold text-slate-700 block">7-Day Returns</span>
                    <span className="text-[9px] text-slate-400">Doorstep pickup</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                    <ShieldCheck className="w-4 h-4 text-brand mx-auto mb-1" />
                    <span className="text-[10px] font-bold text-slate-700 block">Brand Warranty</span>
                    <span className="text-[9px] text-slate-400">100% Genuine</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specifications Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm mb-12">
          <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
            Technical Specifications & Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(product.specifications).map(([key, val]) => (
              <div key={key} className="flex py-2.5 px-3 rounded-lg bg-slate-50/70 text-xs">
                <span className="w-1/2 font-bold text-slate-600">{key}</span>
                <span className="w-1/2 text-slate-900 font-medium">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Reviews & Submit Review Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Verified Customer Reviews</h3>
              <p className="text-xs text-slate-500 mt-0.5">Based on ratings from customers who purchased this item</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-3xl font-black text-slate-900">{product.rating}</div>
              <div>
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] text-slate-400">{product.reviewCount} total reviews</span>
              </div>
            </div>
          </div>

          {/* Write a Review Section */}
          <div className="my-6 p-5 bg-slate-50 rounded-2xl border border-slate-200">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-brand" /> Share Your Experience
            </h4>
            <form onSubmit={handleAddReview} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  placeholder="Your Full Name (e.g. Rahul Verma)"
                  className="px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-brand bg-white"
                  required
                />
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-300 bg-white">
                  <span className="text-xs text-slate-500">Rating:</span>
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    className="text-xs font-bold text-slate-800 bg-transparent focus:outline-none"
                  >
                    <option value={5}>5 Stars - Excellent</option>
                    <option value={4}>4 Stars - Very Good</option>
                    <option value={3}>3 Stars - Average</option>
                    <option value={2}>2 Stars - Poor</option>
                    <option value={1}>1 Star - Very Bad</option>
                  </select>
                </div>
              </div>
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="What did you like or dislike about this product? (Build quality, performance, battery life, etc.)"
                rows={3}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-brand bg-white"
                required
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-brand hover:bg-brand-hover text-slate-950 font-bold text-xs rounded-xl transition"
              >
                Submit Verified Review
              </button>
            </form>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {localReviews.map((rev) => (
              <div key={rev.id} className="p-4 rounded-2xl bg-slate-50/60 border border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{rev.userName}</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                      Verified Buyer
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">{rev.date}</span>
                </div>
                <div className="flex items-center gap-1 mb-1.5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <h5 className="text-xs font-bold text-slate-800 mb-1">{rev.title}</h5>
                <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Customers Also Viewed</h3>
              <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="text-xs font-bold text-brand-dark hover:underline">
                View More &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

