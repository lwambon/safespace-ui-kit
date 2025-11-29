/**
 * Centralized API Client
 * Handles all backend API communication with authentication
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
}

interface ApiError extends Error {
  status?: number;
  data?: unknown;
}

class APIClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  /**
   * Get JWT token from localStorage
   */
  private getAuthToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * Set JWT token in localStorage
   */
  setAuthToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  /**
   * Clear JWT token from localStorage
   */
  clearAuthToken(): void {
    localStorage.removeItem('auth_token');
  }

  /**
   * Generic request method with error handling
   */
  async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { skipAuth = false, ...fetchOptions } = options;
    const url = `${this.baseURL}${endpoint}`;

    // Prepare headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    };

    // Add auth token if available and not skipped
    if (!skipAuth) {
      const token = this.getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    // Handle token expiration (401)
    if (response.status === 401 && !skipAuth) {
      this.clearAuthToken();
      window.location.href = '/login';
    }

    // Parse response
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const error: ApiError = new Error(
        (data as Record<string, unknown>)?.error || (data as Record<string, unknown>)?.message || `HTTP Error: ${response.status}`
      );
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data as T;
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  /**
   * POST request
   */
  async post<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PUT request
   */
  async put<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  /**
   * PATCH request
   */
  async patch<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }
}

// Export singleton instance
export const apiClient = new APIClient(API_BASE_URL);
export default apiClient;
