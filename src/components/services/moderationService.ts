/**
 * Moderation Service
 * Handles content moderation and safety checks
 */

import { apiClient } from '@/lib/apiClient';

export interface ModerationResult {
  is_safe: boolean;
  severity?: 'low' | 'medium' | 'high';
  categories?: string[];
  confidence: number;
}

export interface HarassmentDetection {
  detected: boolean;
  type?: string;
  severity?: 'low' | 'medium' | 'high';
  details?: string;
}

export interface ContentModerationRequest {
  content: string;
  context?: 'forum' | 'chat' | 'comment' | 'report';
}

export const moderationService = {
  /**
   * Moderate a piece of content
   */
  async moderateContent(data: ContentModerationRequest): Promise<ModerationResult> {
    return apiClient.post<ModerationResult>('/api/moderation/check', data);
  },

  /**
   * Detect harassment in text
   */
  async detectHarassment(text: string): Promise<HarassmentDetection> {
    return apiClient.post<HarassmentDetection>('/api/moderation/detect-harassment', {
      text,
    });
  },

  /**
   * Batch moderate multiple contents
   */
  async batchModerate(contents: ContentModerationRequest[]): Promise<ModerationResult[]> {
    return apiClient.post<ModerationResult[]>('/api/moderation/batch-check', {
      contents,
    });
  },

  /**
   * Get moderation statistics
   */
  async getModerationStats(): Promise<{
    total_checked: number;
    harmful_content_found: number;
    false_positives: number;
  }> {
    return apiClient.get('/api/moderation/stats');
  },

  /**
   * Report flagged content
   */
  async reportContent(contentId: string, reason: string): Promise<{
    success: boolean;
    message: string;
  }> {
    return apiClient.post('/api/moderation/report', {
      content_id: contentId,
      reason,
    });
  },
};
