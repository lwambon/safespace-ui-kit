import { LucideIcon } from 'lucide-react';
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'moderator' | 'admin';
  avatar?: string;
}

export interface Incident {
  id: string;
  type: 'harassment' | 'bullying' | 'hate_speech' | 'spam' | 'other';
  severity: 'low' | 'medium' | 'high';
  content: string;
  timestamp: string;
  status: 'pending' | 'under_review' | 'resolved';
  reporter?: string;
  evidence?: string[];
}

export interface EmergencyReport {
  id: string;
  userId: string;
  type: string;
  description: string;
  evidence: File[];
  timestamp: string;
  status: 'active' | 'resolved';
  location?: string;
}

// Update t
export interface EducationalModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  lessons: number;
  icon: LucideIcon;
  category: string;
  progress: number;
  completed: boolean;
  topic?: string; // Add this line to connect with backend topics
}


export interface SupportMessage {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
}

export interface AnalyticsData {
  incidents: number;
  prevented: number;
  responseTime: number;
  userGrowth: number;
}