import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Product } from './models/Product.js';
import { Order } from './models/Order.js';
import { Newsletter } from './models/Newsletter.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'db.json');
const INITIAL_PRODUCTS_FILE = path.join(__dirname, 'initialProducts.json');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/smartbiz';

const clientUrl = process.env.CLIENT_URL || '*';
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin)
      if (!origin || clientUrl === '*') return callback(null, true);
      const allowed = clientUrl.split(',').map((u) => u.trim());
      if (allowed.includes(origin) || origin.includes('localhost')) {
        return callback(null, true);
      }
      return callback(null, true); // Fallback to avoid breaking on new deployment domains
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '../public/images')));

// Track DB state
let isMongoConnected = false;
let mongoConnectionError = null;

// Fallback JSON DB helpers
function getLocalDatabase() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('[Fallback DB] Error reading db.json:', err.message);
  }
  return { products: [], orders: [], newsletter: [] };
}

function saveLocalDatabase(db) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('[Fallback DB] Error writing db.json:', err.message);
  }
}

// Seed initial products if DB empty & keep assets synced
async function seedInitialProducts() {
  try {
    const count = await Product.countDocuments();
    if (count === 0 && fs.existsSync(INITIAL_PRODUCTS_FILE)) {
      const initialData = JSON.parse(fs.readFileSync(INITIAL_PRODUCTS_FILE, 'utf-8'));
      await Product.insertMany(initialData);
      console.log(`[MongoDB] Seeded ${initialData.length} initial products successfully!`);
    } else if (fs.existsSync(INITIAL_PRODUCTS_FILE)) {
      // Upsert products to ensure latest catalog and images are synced
      const initialData = JSON.parse(fs.readFileSync(INITIAL_PRODUCTS_FILE, 'utf-8'));
      for (const item of initialData) {
        await Product.updateOne({ id: item.id }, { $set: item }, { upsert: true });
      }
      console.log(`[MongoDB] Synced ${initialData.length} products to database!`);
    }
  } catch (err) {
    console.error('[MongoDB] Error seeding initial products:', err.message);
  }
}

// Seed initial orders if DB empty
async function seedInitialOrders() {
  try {
    const count = await Order.countDocuments();
    if (count === 0 && fs.existsSync(DB_FILE)) {
      const local = getLocalDatabase();
      if (local.orders && local.orders.length > 0) {
        await Order.insertMany(local.orders);
        console.log(`[MongoDB] Seeded ${local.orders.length} initial orders successfully!`);
      }
    }
  } catch (err) {
    console.error('[MongoDB] Error seeding initial orders:', err.message);
  }
}

// Connect to MongoDB
async function connectToMongo() {
  try {
    console.log('[MongoDB] Connecting to:', MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    isMongoConnected = true;
    mongoConnectionError = null;
    console.log('[MongoDB] Connected successfully to MongoDB!');
    await seedInitialProducts();
    await seedInitialOrders();
  } catch (err) {
    isMongoConnected = false;
    mongoConnectionError = err.message;
    console.warn('[MongoDB] Connection failed, using local JSON fallback:', err.message);
  }
}

connectToMongo();

mongoose.connection.on('disconnected', () => {
  isMongoConnected = false;
  console.warn('[MongoDB] Disconnected. Running in fallback mode.');
});

mongoose.connection.on('reconnected', () => {
  isMongoConnected = true;
  console.log('[MongoDB] Reconnected successfully!');
});

// 0. Root & /api Welcome and API Index
const renderApiIndex = async (req, res) => {
  let productCount = 0;
  let orderCount = 0;
  if (isMongoConnected) {
    try {
      productCount = await Product.countDocuments();
      orderCount = await Order.countDocuments();
    } catch (e) {
      // ignore
    }
  } else {
    const local = getLocalDatabase();
    productCount = (local.products || []).length;
    orderCount = (local.orders || []).length;
  }

  const data = {
    message: 'SmartBiz E-Commerce Backend API is Running',
    database: {
      connected: isMongoConnected,
      mode: isMongoConnected ? 'MongoDB Atlas (Mongoose)' : 'Local JSON Fallback (db.json)',
      counts: {
        products: productCount,
        orders: orderCount,
      },
    },
    storefront: 'http://localhost:3000',
    endpoints: {
      dbStatus: '/api/db-status',
      products: '/api/products',
      orders: '/api/orders',
      stats: '/api/stats',
      newsletter: '/api/newsletter',
      health: '/api/health',
    },
  };

  // If request is from browser expecting HTML, render a clean status page
  if (req.accepts('html') && !req.xhr && !req.headers['sec-ch-ua']?.includes('Postman')) {
    const dbBadgeClass = isMongoConnected
      ? 'background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0;'
      : 'background: #fffbeb; color: #b45309; border: 1px solid #fde68a;';

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SmartBiz API &bull; Active</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
            background: #f8fafc;
            color: #0f172a;
            padding: 40px 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
          }
          .card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 24px;
            max-width: 680px;
            width: 100%;
            padding: 36px;
            box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.01);
          }
          .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 24px;
            padding-bottom: 20px;
            border-bottom: 1px solid #f1f5f9;
          }
          .logo {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .logo-icon {
            width: 44px;
            height: 44px;
            background: #ff9900;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
          }
          .logo h1 { font-size: 20px; font-weight: 800; color: #0f172a; letter-spacing: -0.5px; }
          .logo p { font-size: 12px; color: #64748b; font-weight: 600; }
          .badge {
            font-size: 12px;
            font-weight: 700;
            padding: 6px 14px;
            border-radius: 9999px;
            display: inline-flex;
            align-items: center;
            gap: 6px;
          }
          .pulse {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #10b981;
            animation: pulse 1.5s infinite;
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(1.2); }
          }
          .grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
            margin-bottom: 24px;
          }
          .stat-box {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            padding: 14px 18px;
            border-radius: 14px;
          }
          .stat-label { font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 700; letter-spacing: 0.5px; }
          .stat-val { font-size: 20px; font-weight: 800; color: #0f172a; margin-top: 4px; }
          h2 { font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; font-weight: 700; margin-bottom: 12px; }
          .endpoints {
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-bottom: 24px;
          }
          .ep-link {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            padding: 10px 14px;
            border-radius: 12px;
            text-decoration: none;
            color: #1e293b;
            font-family: 'JetBrains Mono', monospace;
            font-size: 13px;
            transition: all 0.2s;
          }
          .ep-link:hover {
            border-color: #ff9900;
            background: #fffdfa;
            transform: translateY(-1px);
          }
          .method {
            font-size: 10px;
            font-weight: 700;
            padding: 3px 8px;
            border-radius: 6px;
            background: #e0f2fe;
            color: #0369a1;
          }
          .btn-store {
            display: block;
            text-align: center;
            background: #ff9900;
            color: #0f172a;
            font-weight: 800;
            padding: 14px;
            border-radius: 12px;
            text-decoration: none;
            font-size: 14px;
            transition: all 0.2s;
          }
          .btn-store:hover {
            background: #f59000;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(255, 153, 0, 0.3);
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <div class="logo">
              <div class="logo-icon">📦</div>
              <div>
                <h1>SmartBiz API Server</h1>
                <p>Node.js &bull; Express &bull; MongoDB</p>
              </div>
            </div>
            <div class="badge" style="${dbBadgeClass}">
              <span class="pulse"></span>
              <span>${isMongoConnected ? 'MongoDB Atlas Live' : 'JSON Fallback Active'}</span>
            </div>
          </div>

          <div class="grid">
            <div class="stat-box">
              <div class="stat-label">Database Mode</div>
              <div class="stat-val" style="font-size: 15px; color: #047857;">${isMongoConnected ? 'MongoDB (Mongoose)' : 'Local File'}</div>
            </div>
            <div class="stat-box">
              <div class="stat-label">Products in DB</div>
              <div class="stat-val">${productCount} Products</div>
            </div>
          </div>

          <h2>Available API Endpoints</h2>
          <div class="endpoints">
            <a class="ep-link" href="/api/products" target="_blank">
              <span>GET /api/products</span>
              <span class="method">JSON</span>
            </a>
            <a class="ep-link" href="/api/db-status" target="_blank">
              <span>GET /api/db-status</span>
              <span class="method">STATUS</span>
            </a>
            <a class="ep-link" href="/api/orders" target="_blank">
              <span>GET /api/orders</span>
              <span class="method">JSON</span>
            </a>
            <a class="ep-link" href="/api/stats" target="_blank">
              <span>GET /api/stats</span>
              <span class="method">JSON</span>
            </a>
            <a class="ep-link" href="/api/health" target="_blank">
              <span>GET /api/health</span>
              <span class="method">HEALTH</span>
            </a>
          </div>

          <a class="btn-store" href="http://localhost:3000" target="_blank">
            Open Storefront (http://localhost:3000) &rarr;
          </a>
        </div>
      </body>
      </html>
    `;
    return res.send(html);
  }

  res.json(data);
};

app.get('/', renderApiIndex);
app.get('/api', renderApiIndex);

// 1. Health check & DB Status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    database: isMongoConnected ? 'mongodb' : 'fallback-json',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/db-status', async (req, res) => {
  let productCount = 0;
  let orderCount = 0;
  if (isMongoConnected) {
    try {
      productCount = await Product.countDocuments();
      orderCount = await Order.countDocuments();
    } catch (e) {
      // ignore
    }
  } else {
    const local = getLocalDatabase();
    productCount = (local.products || []).length;
    orderCount = (local.orders || []).length;
  }

  res.json({
    connected: isMongoConnected,
    mode: isMongoConnected ? 'MongoDB (Mongoose)' : 'Local File (db.json)',
    uri: MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'),
    error: mongoConnectionError,
    counts: {
      products: productCount,
      orders: orderCount,
    },
  });
});

// 2. Products API
app.get('/api/products', async (req, res) => {
  try {
    if (isMongoConnected) {
      const products = await Product.find().lean();
      return res.json(products);
    }
  } catch (err) {
    console.error('Error in GET /api/products:', err.message);
  }
  const db = getLocalDatabase();
  res.json(db.products || []);
});

app.post('/api/products', async (req, res) => {
  const id = req.body.id || `prod-${Date.now().toString().slice(-6)}`;
  const productData = {
    ...req.body,
    id,
    createdAt: req.body.createdAt || new Date().toISOString(),
  };

  try {
    if (isMongoConnected) {
      const created = await Product.create(productData);
      return res.status(201).json(created);
    }
  } catch (err) {
    console.error('Error in POST /api/products:', err.message);
  }

  const db = getLocalDatabase();
  db.products = [productData, ...(db.products || [])];
  saveLocalDatabase(db);
  res.status(201).json(productData);
});

app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    if (isMongoConnected) {
      const updated = await Product.findOneAndUpdate({ id }, { $set: req.body }, { new: true });
      if (updated) return res.json(updated);
    }
  } catch (err) {
    console.error('Error in PUT /api/products/:id:', err.message);
  }

  const db = getLocalDatabase();
  const index = (db.products || []).findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  db.products[index] = { ...db.products[index], ...req.body };
  saveLocalDatabase(db);
  res.json(db.products[index]);
});

app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    if (isMongoConnected) {
      await Product.deleteOne({ id });
      return res.json({ message: 'Product removed from MongoDB', id });
    }
  } catch (err) {
    console.error('Error in DELETE /api/products/:id:', err.message);
  }

  const db = getLocalDatabase();
  db.products = (db.products || []).filter((p) => p.id !== id);
  saveLocalDatabase(db);
  res.json({ message: 'Product removed', id });
});

// 3. Orders API
app.get('/api/orders', async (req, res) => {
  try {
    if (isMongoConnected) {
      const orders = await Order.find().sort({ createdAt: -1 }).lean();
      return res.json(orders);
    }
  } catch (err) {
    console.error('Error in GET /api/orders:', err.message);
  }
  const db = getLocalDatabase();
  res.json(db.orders || []);
});

app.post('/api/orders', async (req, res) => {
  const randNum = Math.floor(100000 + Math.random() * 900000);
  const now = new Date().toISOString();
  const newOrder = {
    ...req.body,
    id: req.body.id || `ord-${randNum}`,
    orderNumber: req.body.orderNumber || `SB-${randNum}`,
    createdAt: req.body.createdAt || now,
    status: req.body.status || 'pending',
    statusHistory: req.body.statusHistory || [
      { status: 'pending', timestamp: now, note: 'Order placed via Storefront' },
    ],
  };

  try {
    if (isMongoConnected) {
      const created = await Order.create(newOrder);
      return res.status(201).json(created);
    }
  } catch (err) {
    console.error('Error in POST /api/orders:', err.message);
  }

  const db = getLocalDatabase();
  db.orders = [newOrder, ...(db.orders || [])];
  saveLocalDatabase(db);
  res.status(201).json(newOrder);
});

app.put('/api/orders/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status, note } = req.body;
  const now = new Date().toISOString();

  try {
    if (isMongoConnected) {
      const order = await Order.findOne({ $or: [{ id }, { orderNumber: id }] });
      if (order) {
        order.status = status;
        order.statusHistory.push({
          status,
          timestamp: now,
          note: note || `Status updated to ${status}`,
        });
        await order.save();
        return res.json(order);
      }
    }
  } catch (err) {
    console.error('Error in PUT /api/orders/:id/status:', err.message);
  }

  const db = getLocalDatabase();
  const order = (db.orders || []).find((o) => o.id === id || o.orderNumber === id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  order.status = status;
  order.statusHistory = order.statusHistory || [];
  order.statusHistory.push({
    status,
    timestamp: now,
    note: note || `Status updated to ${status}`,
  });
  saveLocalDatabase(db);
  res.json(order);
});

// 4. Newsletter API
app.post('/api/newsletter', async (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  try {
    if (isMongoConnected) {
      await Newsletter.findOneAndUpdate(
        { email: email.toLowerCase().trim() },
        { email: email.toLowerCase().trim() },
        { upsert: true, new: true }
      );
      return res.json({ success: true, promoCode: 'WELCOME200' });
    }
  } catch (err) {
    console.error('Error in POST /api/newsletter:', err.message);
  }

  const db = getLocalDatabase();
  db.newsletter = db.newsletter || [];
  if (!db.newsletter.includes(email)) {
    db.newsletter.push(email);
    saveLocalDatabase(db);
  }
  res.json({ success: true, promoCode: 'WELCOME200' });
});

// 5. Analytics Stats API
app.get('/api/stats', async (req, res) => {
  try {
    if (isMongoConnected) {
      const totalProducts = await Product.countDocuments();
      const orders = await Order.find().lean();
      const totalOrders = orders.length;
      const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
      const lowStock = await Product.countDocuments({ stockCount: { $lte: 10 } });

      return res.json({
        totalProducts,
        totalOrders,
        totalRevenue,
        lowStock,
        database: 'MongoDB',
      });
    }
  } catch (err) {
    console.error('Error in GET /api/stats:', err.message);
  }

  const db = getLocalDatabase();
  const products = db.products || [];
  const orders = db.orders || [];
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  res.json({
    totalProducts: products.length,
    totalOrders: orders.length,
    totalRevenue,
    lowStock: products.filter((p) => (p.stockCount || 0) <= 10).length,
    database: 'Local JSON',
  });
});

app.listen(PORT, () => {
  console.log(`[SmartBiz Backend] API Server active on http://localhost:${PORT}`);
  console.log(`[SmartBiz Backend] Database Mode: ${isMongoConnected ? 'MongoDB' : 'Local JSON'}`);
});
