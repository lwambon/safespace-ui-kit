/**
 * Analytics Service
 * Handles analytics logging and metrics retrieval
 */

import { apiClient } from '@/lib/apiClient';

// Backend returns snake_case, we'll map to camelCase and also provide UI metrics
export interface DashboardMetricsBackend {
  total_reports: number;
  active_users: number;
  incidents_prevented: number;
  avg_response_time: number | string;
}

export interface DisplayMetric {
  value: number | string;
  change?: string;
  trend?: 'up' | 'down';
}

export interface DashboardMetrics {
  totalReports: number;
  activeUsers: number;
  incidentsPrevented: number;
  avgResponseTime: number;
  incidents: DisplayMetric;
  prevention: DisplayMetric;
  response: DisplayMetric;
  users: DisplayMetric;
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
    const raw = await apiClient.get<DashboardMetricsBackend>(
      `/api/analytics/dashboard/metrics?timeRange=${timeRange}`
    );

    // Map backend fields to frontend-friendly structure
    const totalReports = raw.total_reports || 0;
    const activeUsers = raw.active_users || 0;
    const incidentsPrevented = raw.incidents_prevented || 0;
    const avgResponseTime = Number(raw.avg_response_time) || 0;

    return {
      totalReports,
      activeUsers,
      incidentsPrevented,
      avgResponseTime,
      incidents: { value: totalReports, change: '+3%', trend: 'up' },
      prevention: { value: incidentsPrevented, change: '+5%', trend: 'up' },
      response: { value: avgResponseTime, change: '-2%', trend: 'down' },
      users: { value: activeUsers, change: '+1%', trend: 'up' },
    };
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