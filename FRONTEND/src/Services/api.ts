// Centralized API client for SafeSpace frontend

const API_FASTAPI = import.meta.env.VITE_API_FASTAPI || '';
const API_NODE = import.meta.env.VITE_API_NODE || '';

async function apiFetch(base: string, path: string, options: RequestInit = {}) {
  const token = localStorage.getItem('auth_token') || localStorage.getItem('token');
  // Normalize headers: create a Headers instance so we can set values safely and
  // avoid TypeScript union incompatibilities with RequestInit['headers'].
  const headers = new Headers(options.headers as HeadersInit);
  if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const url = `${base}${path}`;
  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    let errBody: any = null;
    try { errBody = await res.json(); } catch { /* ignore parse errors */ }
    const message = (errBody && (errBody.error || errBody.message)) || `HTTP ${res.status} on ${path}`;
    const err: any = new Error(message);
    err.status = res.status;
    err.body = errBody;
    throw err;
  }
  try {
    return await res.json();
  } catch {
    return null as any;
  }
}

// -------------------- AUTH (Node.js) --------------------
export const register = (data: any) =>
  apiFetch(API_NODE, '/api/auth/register', { method: 'POST', body: JSON.stringify(data) });

export const login = (data: any) =>
  apiFetch(API_NODE, '/api/auth/login', { method: 'POST', body: JSON.stringify(data) });

// -------------------- FORUM (Node.js) --------------------
export const getPosts = (params?: Record<string, string | number>) => {
  let path = '/api/forum/posts';
  if (params) {
    const qs = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => qs.append(k, String(v)));
    path += `?${qs.toString()}`;
  }
  return apiFetch(API_NODE, path);
};

export const createPost = (data: any) =>
  apiFetch(API_NODE, '/api/forum/posts', { method: 'POST', body: JSON.stringify(data) });

export const replyToPost = (postId: string, data: any) =>
  apiFetch(API_NODE, `/api/forum/posts/${postId}/replies`, { method: 'POST', body: JSON.stringify(data) });

// -------------------- REPORTS & HOTSPOTS (Node.js) --------------------
export const createReport = (data: any) =>
  apiFetch(API_NODE, '/api/reports', { method: 'POST', body: JSON.stringify(data) });

export const getHotspots = () => apiFetch(API_NODE, '/api/hotspots');

// -------------------- EMERGENCY (FastAPI) --------------------
export const emergency = (data: any) =>
  apiFetch(API_FASTAPI, '/ml/emergency', { method: 'POST', body: JSON.stringify(data) });

// -------------------- CHATBOT (FastAPI) --------------------
export const chatbot = (data: any) =>
  apiFetch(API_FASTAPI, '/ml/chatbot', { method: 'POST', body: JSON.stringify(data) });

// -------------------- MODERATION (FastAPI) --------------------
export const moderate = (data: any) =>
  apiFetch(API_FASTAPI, '/ml/moderate', { method: 'POST', body: JSON.stringify(data) });

// -------------------- EDUCATION MODULES (FastAPI) --------------------
export const getModules = (topic: string) =>
  apiFetch(API_FASTAPI, '/ml/education', { method: 'POST', body: JSON.stringify({ topic }) });

// Optional convenience: fetch list of supported education topics (frontend-only list)
export const educationTopics = ['harassment', 'privacy', 'reporting', 'response'];

export default {
  register,
  login,
  getPosts,
  createPost,
  replyToPost,
  createReport,
  getHotspots,
  emergency,
  chatbot,
  moderate,
  getModules,
  educationTopics,
};
