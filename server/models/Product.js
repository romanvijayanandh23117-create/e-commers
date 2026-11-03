import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    slug: { type: String },
    description: { type: String, default: '' },
    shortDescription: { type: String, default: '' },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    discountPercentage: { type: Number, default: 0 },
    rating: { type: Number, default: 4.5 },
    reviewCount: { type: Number, default: 0 },
    category: { type: String, required: true },
    brand: { type: String, default: 'SmartBiz' },
    sku: { type: String },
    images: { type: [String], default: [] },
    inStock: { type: Boolean, default: true },
    stockCount: { type: Number, default: 10 },
    isFeatured: { type: Boolean, default: false },
    isBestseller: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    isDeal: { type: Boolean, default: false },
    specifications: { type: mongoose.Schema.Types.Mixed, default: {} },
    features: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    createdAt: { type: String, default: () => new Date().toISOString() },
  },
  { timestamps: true }
);

export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

