/**
 * Report Service
 * Handles incident/harassment reports
 */

import { apiClient } from '@/lib/apiClient';

export interface Report {
  id: string;
  user_id: string | null;
  category: string;
  severity: 'low' | 'medium' | 'high' | 'immediate';
  description?: string;
  lat?: number;
  lng?: number;
  location_text?: string;
  timestamp: string;
  is_anonymous: boolean;
  status: string;
  consent_share_location: boolean;
  consent_contact_user: boolean;
}

export interface CreateReportRequest {
  category: string;
  severity: 'low' | 'medium' | 'high' | 'immediate';
  description?: string;
  lat?: number;
  lng?: number;
  location_text?: string;
  is_anonymous?: boolean;
  consent_share_location?: boolean;
  consent_contact_user?: boolean;
}

export interface ReportStats {
  total: number;
  by_severity: Record<string, number>;
  by_category: Record<string, number>;
}

export const reportService = {
  /**
   * Get all reports (admin)
   */
  async getReports(limit?: number, offset?: number): Promise<Report[]> {
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    if (offset) params.append('offset', offset.toString());
    return apiClient.get<Report[]>(
      `/api/reports?${params.toString()}`
    );
  },

  /**
   * Get a single report by ID
   */
  async getReport(reportId: string): Promise<Report> {
    return apiClient.get<Report>(`/api/reports/${reportId}`);
  },

  /**
   * Create a new report
   */
  async createReport(data: CreateReportRequest): Promise<Report> {
    return apiClient.post<Report>('/api/reports', data);
  },

  /**
   * Update a report
   */
  async updateReport(reportId: string, data: Partial<CreateReportRequest>): Promise<Report> {
    return apiClient.put<Report>(`/api/reports/${reportId}`, data);
  },

  /**
   * Delete a report
   */
  async deleteReport(reportId: string): Promise<void> {
    return apiClient.delete(`/api/reports/${reportId}`);
  },

  /**
   * Update report status
   */
  async updateReportStatus(reportId: string, status: string): Promise<Report> {
    return apiClient.patch<Report>(`/api/reports/${reportId}/status`, { status });
  },

  /**
   * Get report statistics
   */
  async getReportStats(): Promise<ReportStats> {
    return apiClient.get<ReportStats>('/api/reports/stats');
  },

  /**
   * Get reports by category
   */
  async getReportsByCategory(category: string): Promise<Report[]> {
    return apiClient.get<Report[]>(`/api/reports/category/${category}`);
  },

  /**
   * Get reports by severity
   */
  async getReportsBySeverity(severity: string): Promise<Report[]> {
    return apiClient.get<Report[]>(`/api/reports/severity/${severity}`);
  },
};
