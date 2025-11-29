import { Incident } from '@/assets/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface Moderator {
  id: number;
  name: string;
  status: 'online' | 'away' | 'offline';
  reportsHandled: number;
  lastActive: string;
}

export const moderationServices = {
  // Report services
  getAllReports: async (): Promise<Incident[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/reports`);
      if (!response.ok) throw new Error('Failed to fetch reports');
      const data = await response.json() as { success: boolean; data: Incident[] };
      return data.data || [];
    } catch (error) {
      console.error('Error fetching reports:', error);
      throw error;
    }
  },

  getReportById: async (id: string): Promise<Incident> => {
    try {
      const response = await fetch(`${API_BASE_URL}/reports/${id}`);
      if (!response.ok) throw new Error('Failed to fetch report');
      const data = await response.json() as { success: boolean; data: Incident };
      return data.data;
    } catch (error) {
      console.error('Error fetching report:', error);
      throw error;
    }
  },

  getReportsByStatus: async (status: string): Promise<Incident[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/reports/status/${status}`);
      if (!response.ok) throw new Error('Failed to fetch reports');
      const data = await response.json() as { success: boolean; data: Incident[] };
      return data.data || [];
    } catch (error) {
      console.error('Error fetching reports:', error);
      throw error;
    }
  },

  createReport: async (report: Omit<Incident, 'id' | 'timestamp'>): Promise<string> => {
    try {
      const response = await fetch(`${API_BASE_URL}/reports`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(report),
      });
      if (!response.ok) throw new Error('Failed to create report');
      const data = await response.json() as { success: boolean; id: string };
      return data.id;
    } catch (error) {
      console.error('Error creating report:', error);
      throw error;
    }
  },

  updateReportStatus: async (id: string, status: Incident['status']): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/reports/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Failed to update report');
    } catch (error) {
      console.error('Error updating report:', error);
      throw error;
    }
  },

  getReportStats: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/reports/stats`);
      if (!response.ok) throw new Error('Failed to fetch statistics');
      const data = await response.json() as { success: boolean; data: Record<string, unknown> };
      return data.data;
    } catch (error) {
      console.error('Error fetching statistics:', error);
      throw error;
    }
  },

  // Moderator services
  getAllModerators: async (): Promise<Moderator[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/moderators`);
      if (!response.ok) throw new Error('Failed to fetch moderators');
      const data = await response.json() as { success: boolean; data: Moderator[] };
      return data.data || [];
    } catch (error) {
      console.error('Error fetching moderators:', error);
      throw error;
    }
  },

  getModeratorById: async (id: number): Promise<Moderator> => {
    try {
      const response = await fetch(`${API_BASE_URL}/moderators/${id}`);
      if (!response.ok) throw new Error('Failed to fetch moderator');
      const data = await response.json() as { success: boolean; data: Moderator };
      return data.data;
    } catch (error) {
      console.error('Error fetching moderator:', error);
      throw error;
    }
  },

  addModerator: async (moderator: Omit<Moderator, 'id' | 'reportsHandled' | 'lastActive'>): Promise<number> => {
    try {
      const response = await fetch(`${API_BASE_URL}/moderators`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(moderator),
      });
      if (!response.ok) throw new Error('Failed to add moderator');
      const data = await response.json() as { success: boolean; id: number };
      return data.id;
    } catch (error) {
      console.error('Error adding moderator:', error);
      throw error;
    }
  },

  updateModeratorStatus: async (id: number, status: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/moderators/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Failed to update moderator status');
    } catch (error) {
      console.error('Error updating moderator status:', error);
      throw error;
    }
  },

  removeModerator: async (id: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/moderators/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to remove moderator');
    } catch (error) {
      console.error('Error removing moderator:', error);
      throw error;
    }
  },

  getModeratorStats: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/moderators/stats`);
      if (!response.ok) throw new Error('Failed to fetch statistics');
      const data = await response.json() as { success: boolean; data: Record<string, unknown> };
      return data.data;
    } catch (error) {
      console.error('Error fetching statistics:', error);
      throw error;
    }
  },
};
