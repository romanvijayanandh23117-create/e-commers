import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  productImage: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
});

const StatusHistorySchema = new mongoose.Schema({
  status: { type: String, required: true },
  timestamp: { type: String, default: () => new Date().toISOString() },
  note: { type: String, default: '' },
});

const ShippingAddressSchema = new mongoose.Schema({
  fullName: { type: String, default: 'Customer' },
  phoneNumber: { type: String, default: '' },
  email: { type: String, default: '' },
  streetAddress: { type: String, default: '' },
  apartment: { type: String, default: '' },
  city: { type: String, default: '' },
  state: { type: String, default: '' },
  pincode: { type: String, default: '' },
});

const OrderSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    orderNumber: { type: String, required: true, unique: true },
    userId: { type: String, default: 'guest' },
    items: { type: [OrderItemSchema], default: [] },
    shippingAddress: { type: ShippingAddressSchema, default: () => ({}) },
    paymentMethod: { type: String, default: 'upi' },
    paymentStatus: { type: String, default: 'pending' },
    subtotal: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    shippingFee: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'out_for_delivery', 'delivered', 'cancelled'],
      default: 'pending',
    },
    couponCode: { type: String },
    trackingNumber: { type: String },
    estimatedDelivery: { type: String },
    statusHistory: { type: [StatusHistorySchema], default: [] },
    createdAt: { type: String, default: () => new Date().toISOString() },
  },
  { timestamps: true }
);

export const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

