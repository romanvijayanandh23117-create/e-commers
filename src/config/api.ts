/**
 * API Configuration for Live & Local Environments
 *
 * In Local Development:
 * Defaults to '/api' (proxied via Vite to http://localhost:5000).
 *
 * In Production:
 * Automatically connects to your live Render backend:
 * https://e-commers-g078.onrender.com/api
 */

const isDev = import.meta.env.DEV;
const defaultProdApi = 'https://e-commers-g078.onrender.com/api';
const rawApiUrl = import.meta.env.VITE_API_URL || (isDev ? '/api' : defaultProdApi);

// Ensure no trailing slash
export const API_BASE_URL = rawApiUrl.replace(/\/$/, '');

