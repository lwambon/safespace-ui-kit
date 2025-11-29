/**
 * Forum Service
 * Handles forum posts, replies, and discussions
 */

import { apiClient } from '@/lib/apiClient';

export interface ForumPost {
  id: string;
  user_id: string;
  title: string;
  body: string;
  is_anonymous: boolean;
  created_at: string;
  updated_at: string;
  is_locked: boolean;
}

export interface ForumReply {
  id: string;
  post_id: string;
  user_id: string;
  body: string;
  is_anonymous: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreatePostRequest {
  title: string;
  body: string;
  is_anonymous?: boolean;
}

export interface CreateReplyRequest {
  body: string;
  is_anonymous?: boolean;
}

export const forumService = {
  /**
   * Get all forum posts
   */
  async getPosts(limit?: number, offset?: number): Promise<ForumPost[]> {
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    if (offset) params.append('offset', offset.toString());
    return apiClient.get<ForumPost[]>(
      `/api/forum/posts?${params.toString()}`
    );
  },

  /**
   * Get a single forum post by ID
   */
  async getPost(postId: string): Promise<ForumPost> {
    return apiClient.get<ForumPost>(`/api/forum/posts/${postId}`);
  },

  /**
   * Create a new forum post
   */
  async createPost(data: CreatePostRequest): Promise<ForumPost> {
    return apiClient.post<ForumPost>('/api/forum/posts', data);
  },

  /**
   * Update a forum post
   */
  async updatePost(postId: string, data: Partial<CreatePostRequest>): Promise<ForumPost> {
    return apiClient.put<ForumPost>(`/api/forum/posts/${postId}`, data);
  },

  /**
   * Delete a forum post
   */
  async deletePost(postId: string): Promise<void> {
    return apiClient.delete(`/api/forum/posts/${postId}`);
  },

  /**
   * Lock a forum post
   */
  async lockPost(postId: string): Promise<ForumPost> {
    return apiClient.patch<ForumPost>(`/api/forum/posts/${postId}/lock`);
  },

  /**
   * Get replies for a post
   */
  async getReplies(postId: string): Promise<ForumReply[]> {
    return apiClient.get<ForumReply[]>(`/api/forum/posts/${postId}/replies`);
  },

  /**
   * Create a reply to a post
   */
  async createReply(postId: string, data: CreateReplyRequest): Promise<ForumReply> {
    return apiClient.post<ForumReply>(`/api/forum/posts/${postId}/replies`, data);
  },

  /**
   * Update a reply
   */
  async updateReply(
    postId: string,
    replyId: string,
    data: Partial<CreateReplyRequest>
  ): Promise<ForumReply> {
    return apiClient.put<ForumReply>(
      `/api/forum/posts/${postId}/replies/${replyId}`,
      data
    );
  },

  /**
   * Delete a reply
   */
  async deleteReply(postId: string, replyId: string): Promise<void> {
    return apiClient.delete(`/api/forum/posts/${postId}/replies/${replyId}`);
  },
};
