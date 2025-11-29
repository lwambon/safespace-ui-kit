/**
 * Hotspot Service
 * Handles geographic hotspot data for harassment/risk areas
 */

import { apiClient } from '@/lib/apiClient';

export interface Hotspot {
  id: string;
  lat: number;
  lng: number;
  location_text: string;
  report_count: number;
  last_updated: string;
}

export interface HotspotStats {
  total_hotspots: number;
  highest_risk: Hotspot | null;
  avg_reports_per_hotspot: number;
}

export const hotspotService = {
  /**
   * Get all hotspots
   */
  async getHotspots(limit?: number, offset?: number): Promise<Hotspot[]> {
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    if (offset) params.append('offset', offset.toString());
    return apiClient.get<Hotspot[]>(
      `/api/hotspots?${params.toString()}`
    );
  },

  /**
   * Get a single hotspot by ID
   */
  async getHotspot(hotspotId: string): Promise<Hotspot> {
    return apiClient.get<Hotspot>(`/api/hotspots/${hotspotId}`);
  },

  /**
   * Get hotspots within a radius
   */
  async getHotspotsNearby(
    lat: number,
    lng: number,
    radiusKm: number = 5
  ): Promise<Hotspot[]> {
    const params = new URLSearchParams();
    params.append('lat', lat.toString());
    params.append('lng', lng.toString());
    params.append('radius_km', radiusKm.toString());
    return apiClient.get<Hotspot[]>(
      `/api/hotspots/nearby?${params.toString()}`
    );
  },

  /**
   * Get hotspot statistics
   */
  async getHotspotStats(): Promise<HotspotStats> {
    return apiClient.get<HotspotStats>('/api/hotspots/stats');
  },

  /**
   * Create a new hotspot (admin)
   */
  async createHotspot(data: {
    lat: number;
    lng: number;
    location_text: string;
  }): Promise<Hotspot> {
    return apiClient.post<Hotspot>('/api/hotspots', data);
  },

  /**
   * Update hotspot data
   */
  async updateHotspot(
    hotspotId: string,
    data: Partial<Hotspot>
  ): Promise<Hotspot> {
    return apiClient.put<Hotspot>(`/api/hotspots/${hotspotId}`, data);
  },

  /**
   * Delete a hotspot
   */
  async deleteHotspot(hotspotId: string): Promise<void> {
    return apiClient.delete(`/api/hotspots/${hotspotId}`);
  },

  /**
   * Get heatmap data for visualization
   */
  async getHeatmapData(): Promise<Array<{
    lat: number;
    lng: number;
    weight: number;
  }>> {
    return apiClient.get('/api/hotspots/heatmap');
  },
};
