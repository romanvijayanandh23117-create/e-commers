import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read mockData from compiled or extracted data
const dbData = {
  products: [
    {
      id: "prod-001",
      name: "AcousticPro ANC Wireless Headphones with 40H Playtime",
      slug: "acousticpro-anc-wireless-headphones",
      price: 4999,
      originalPrice: 8999,
      discountPercentage: 44,
      rating: 4.8,
      reviewCount: 342,
      category: "Electronics & Audio",
      brand: "SonicWave India",
      sku: "SW-ANC-401",
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop"
      ],
      inStock: true,
      stockCount: 18,
      isFeatured: true,
      isBestseller: true
    },
    {
      id: "prod-002",
      name: "AeroSync Ultrawatch 2 AMOLED 1.96\" Display with Bluetooth Calling",
      slug: "aerosync-ultrawatch-2-amoled",
      price: 3499,
      originalPrice: 6999,
      discountPercentage: 50,
      rating: 4.7,
      reviewCount: 512,
      category: "Smart Wearables & Watches",
      brand: "AeroSync",
      sku: "AS-WATCH-02",
      images: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop"
      ],
      inStock: true,
      stockCount: 24,
      isFeatured: true,
      isBestseller: true
    },
    {
      id: "prod-003",
      name: "LuminaSmart RGB Ambient Desk & Floor Lamp with Alexa/Google Sync",
      slug: "luminasmart-rgb-ambient-lamp",
      price: 2199,
      originalPrice: 3999,
      discountPercentage: 45,
      rating: 4.6,
      reviewCount: 189,
      category: "Smart Home & Living",
      brand: "LuminaTech",
      sku: "LT-LMP-90",
      images: [
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1000&auto=format&fit=crop"
      ],
      inStock: true,
      stockCount: 15,
      isNewArrival: true
    },
    {
      id: "prod-004",
      name: "Artisan Crafted Full-Grain Italian Leather Weekender Duffel Bag",
      slug: "artisan-leather-weekender-duffel-bag",
      price: 6499,
      originalPrice: 11999,
      discountPercentage: 46,
      rating: 4.9,
      reviewCount: 124,
      category: "Fashion & Lifestyle",
      brand: "Kavach Leathercraft",
      sku: "KL-DUF-TAN",
      images: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop"
      ],
      inStock: true,
      stockCount: 8,
      isNewArrival: true
    },
    {
      id: "prod-005",
      name: "BrewMaster Precision Italian Espresso Machine with Milk Steamer",
      slug: "brewmaster-precision-espresso-machine",
      price: 11499,
      originalPrice: 18999,
      discountPercentage: 39,
      rating: 4.8,
      reviewCount: 215,
      category: "Kitchen & Gourmet",
      brand: "BrewCraft",
      sku: "BC-ESP-20",
      images: [
        "/images/products/brewmaster-espresso.jpg",
        "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?q=80&w=1000&auto=format&fit=crop"
      ],
      inStock: true,
      stockCount: 11,
      isBestseller: true
    }
  ],
  orders: [
    {
      id: "ord-849201",
      orderNumber: "SB-849201",
      userId: "user-demo-1",
      paymentMethod: "upi",
      paymentStatus: "paid",
      total: 5668,
      status: "shipped",
      createdAt: "2026-10-27T10:15:00Z"
    }
  ],
  newsletter: ["vijay.anand@example.com"]
};

fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(dbData, null, 2), 'utf-8');
console.log('Seeded db.json successfully!');

