/**
 * API Configuration for Live & Local Environments
 *
 * In Local Development:
 * Defaults to '/api' (proxied via Vite to http://localhost:5000).
 *
 * In Production (when Frontend and Backend are deployed separately):
 * Set the environment variable `VITE_API_URL` on your hosting provider (Vercel/Netlify).
 * Example: VITE_API_URL=https://your-smartbiz-backend.onrender.com/api
 */

const rawApiUrl = import.meta.env.VITE_API_URL || '/api';

// Ensure no trailing slash
export const API_BASE_URL = rawApiUrl.replace(/\/$/, '');

