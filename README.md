# SmartBiz Storefront | E-Commerce Platform

A modern, responsive, professional e-commerce storefront inspired by the clean layout, structure, and user experience of **Amazon SmartBiz** (https://smartcommerce.amazon.in/smartbiz/ecommerce-website-builder).

---

## 🌟 Key Highlights & Features

### 1. Design & UI
- **Professional Color Palette**: Premium white surfaces, dark navy blue (`#0b192c`), crisp slate text, and Amazon-inspired warm amber/orange accents (`#ff9900`).
- **Fully Responsive**: Optimized for desktop monitors, laptops, tablets, and mobile smartphones.
- **Modern Micro-interactions**: Smooth transitions, card hover elevation, animated badges, image zoom, slide-over cart drawer, and order celebration confetti.

### 2. Header & Navigation
- Store Logo with brand moniker and subtitle.
- Real-time product search bar with category filter dropdown and instant visual suggestions.
- Navigation links: Home, Shop All, Categories, Deals & Offers, About Us, Contact Us.
- Wishlist heart badge count, slide-over Shopping Cart drawer count, and Account dropdown.
- Mobile hamburger menu drawer with quick department navigation.

### 3. Hero & Homepage Sections
- **Hero Banner**: "Your One-Stop Destination for Quality Products", dual CTAs ("Shop Now" & "Explore Categories"), trust chips, and interactive top deal card.
- **Value Propositions Strip**: Free delivery on all orders, 100% genuine quality, 7-day easy returns, 24/7 dedicated support.
- **Product Categories**: Grid of department cards with hover zoom and product counters.
- **Tabbed Catalog**: Filter between Featured Picks, Bestsellers, Exclusive Deals, New Arrivals, and Trending.
- **Flash Sale Banner**: Live countdown timer (Hours : Mins : Secs) and coupon code spotlight (`SMARTBIZ10`).
- **Customer Testimonials**: Verified purchaser reviews with star ratings and feedback.

### 4. Product Details Page (`/product/:id`)
- High-resolution product gallery with multiple image thumbnails.
- Brand name, ₹ Price with original MRP strikethrough and discount percentage badge.
- Stock availability and PIN code delivery estimator (e.g. `560103`).
- Quantity selector, "Add to Cart", and "Buy Now" instant checkout button.
- Comprehensive technical specifications table.
- Verified customer reviews list + interactive "Write a Review" form.
- Related products recommendations.

### 5. Shopping Cart & Checkout
- **Cart Page (`/cart`)**: Itemized list, quantity adjustment, remove item, subtotal, GST (5%), and free shipping progress meter.
- **Coupon Codes**:
  - `SMARTBIZ10`: Flat 10% OFF
  - `WELCOME200`: Flat ₹200 OFF
  - `SUPER20`: Flat 20% OFF on orders above ₹2,000
- **Checkout Process (`/checkout`)**:
  - Customer contact and shipping address with complete validation.
  - Delivery speed choice (Standard Free vs Express Next-Day).
  - Secure payment simulation: UPI (GPay, PhonePe, Paytm), Debit/Credit Cards, Net Banking, and Cash on Delivery (COD).
  - Order celebration confetti upon successful payment.
- **Order Confirmation (`/order-confirmation/:id`)**: Order ID `#SB-XXXXXX`, delivery timeline, print invoice, and direct tracking link.
- **Order Tracking (`/order-tracking`)**: Real-time 5-stage shipment stepper (Order Placed -> Packed -> Shipped -> Out for Delivery -> Delivered).

### 6. Additional Pages
- **Shop All Products (`/shop`)**: Full sidebar filters (search query, categories, price range slider, rating filters, in-stock toggle, deals only toggle, and sorting).
- **Categories Directory (`/categories`)**: Detailed overview of all store departments.
- **Order History (`/orders`)**: Past customer orders, status pills, reorder button, and invoice view.
- **Saved Wishlist (`/wishlist`)**: Saved products with 1-click "Add All to Cart".
- **My Account (`/account`)**: User profile, saved addresses, edit info.
- **Authentication (`/login`, `/register`)**: Tabbed form with 1-click instant demo sign-in for Customer and Admin.
- **About Us (`/about`)**: Store story, Amazon SmartBiz inspired philosophy, 50,000+ customer milestone.
- **Contact Us (`/contact`)**: Contact form, office address, hotline, and interactive FAQ accordion.
- **Legal Policies (`/privacy`, `/terms`, `/returns`)**: Full compliance documentation.

### 7. Merchant Admin Dashboard (`/admin`)
- **KPI Metrics**: Total Gross Revenue (₹), Total Orders, Catalog Items, and Low Stock Warnings.
- **Product Inventory Management**: Add new product modal, edit live price/stock, delete product.
- **Order Management**: Change order status (Pending, Processing, Shipped, Delivered, Cancelled).
- **Customer CRM**: Customer purchase history and lifetime value.

---

## 🚀 Running the Project

### Prerequisites
- Node.js (v18+)
- npm or npx

### Start Development Server
```bash
# Start both Frontend and Backend concurrently (Recommended)
npm start

# Or using dev
npm run dev

# Or run frontend only
npm run dev:frontend

# Or run backend only
npm run dev:backend
```

- **Frontend URL**: [http://localhost:3000](http://localhost:3000)
- **Backend API URL**: [http://localhost:5000/api](http://localhost:5000/api)

---

## 🔑 Demo Credentials

- **Customer Demo**:
  - Email: `vijay.anand@example.com`
  - Name: `Vijay Anand`
  - Or use the 1-click button on the `/login` page
- **Merchant Admin Demo**:
  - Email: `admin@smartbizstore.in`
  - Or access directly at `/admin` or click "Merchant Admin Dashboard" in the header/footer

