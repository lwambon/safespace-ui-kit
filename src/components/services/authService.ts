/**
 * Authentication Service
 * Handles user login, registration, and token management
 */

import { apiClient } from '@/lib/apiClient';

export interface User {
  id: string;
  email?: string;
  phone?: string;
  handle?: string;
  role: string;
  is_anonymous: boolean;
  created_at: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email?: string;
  phone?: string;
  handle?: string;
  password: string;
  pin?: string;
}

export const authService = {
  /**
   * Register a new user
   */
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/api/auth/register', data, {
      skipAuth: true,
    });
    if (response.token) {
      apiClient.setAuthToken(response.token);
    }
    return response;
  },

  /**
   * Login with email and password
   */
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/api/auth/login', data, {
      skipAuth: true,
    });
    if (response.token) {
      apiClient.setAuthToken(response.token);
    }
    return response;
  },

  /**
   * Logout user
   */
  logout(): void {
    apiClient.clearAuthToken();
  },

  /**
   * Get current user from token
   */
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  /**
   * Save user to localStorage
   */
  setCurrentUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  },
};
