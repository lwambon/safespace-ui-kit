/**
 * Analytics Service
 * Handles analytics logging and metrics retrieval
 */

import { apiClient } from '@/lib/apiClient';

export interface DashboardMetrics {
  total_reports: number;
  active_users: number;
  incidents_prevented: number;
  avg_response_time: number;
}

export interface IncidentTypeData {
  type: string;
  count: number;
  percentage: number;
}

export interface DemographicData {
  age_group: string;
  gender: string;
  count: number;
}

export const analyticsService = {
  /**
   * Log an analytics event
   */
  async logEvent(eventType: string, payload?: any): Promise<void> {
    return apiClient.post('/api/analytics/log', { eventType, payload });
  },

  /**
   * Get dashboard metrics for a time range
   */
  async getDashboardMetrics(timeRange: string = '7d'): Promise<DashboardMetrics> {
    return apiClient.get<DashboardMetrics>(
      `/api/analytics/dashboard/metrics?timeRange=${timeRange}`
    );
  },

  /**
   * Get incident type distribution
   */
  async getIncidentTypes(timeRange: string = '7d'): Promise<IncidentTypeData[]> {
    return apiClient.get<IncidentTypeData[]>(
      `/api/analytics/dashboard/incident-types?timeRange=${timeRange}`
    );
  },

  /**
   * Get demographic data
   */
  async getDemographics(timeRange: string = '7d'): Promise<DemographicData[]> {
    return apiClient.get<DemographicData[]>(
      `/api/analytics/dashboard/demographics?timeRange=${timeRange}`
    );
  },

  /**
   * Get user engagement metrics
   */
  async getEngagementMetrics(timeRange: string = '7d'): Promise<any> {
    return apiClient.get(
      `/api/analytics/engagement?timeRange=${timeRange}`
    );
  },

  /**
   * Get safety report statistics
   */
  async getSafetyStats(timeRange: string = '7d'): Promise<any> {
    return apiClient.get(
      `/api/analytics/safety-stats?timeRange=${timeRange}`
    );
  },
};