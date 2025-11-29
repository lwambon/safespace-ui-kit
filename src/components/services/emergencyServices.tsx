/**
 * Emergency Service
 * Handles emergency contacts and rapid response
 */

import { apiClient } from '@/lib/apiClient';

export interface EmergencyContact {
  type: string;
  hotline_number: string;
  country?: string;
}

export interface EmergencyResponse {
  location: string;
  iso_code: string;
  contacts: Record<string, string>;
}

export interface Country {
  name: string;
  iso_code: string;
}

export const emergencyService = {
  /**
   * Get emergency contacts for a location
   */
  async getEmergencyContacts(location: string): Promise<EmergencyResponse> {
    const response = await apiClient.post<EmergencyResponse>(
      '/api/emergency/contacts',
      { location }
    );
    return response;
  },

  /**
   * Get list of available countries
   */
  async getAvailableCountries(): Promise<Country[]> {
    return apiClient.get<Country[]>('/api/emergency/countries');
  },

  /**
   * Submit emergency report with immediate notification
   */
  async submitEmergencyReport(data: {
    category: string;
    severity: string;
    description: string;
    location: string;
    lat?: number;
    lng?: number;
  }): Promise<{ success: boolean; report_id: string }> {
    return apiClient.post(
      '/api/emergency/report',
      data
    );
  },

  /**
   * Get emergency hotline for a country
   */
  async getHotline(country: string): Promise<string> {
    const response = await apiClient.get(
      `/api/emergency/hotline?country=${encodeURIComponent(country)}`
    );
    return response.hotline_number;
  },
};