import { useState, useEffect } from 'react';
import HarassmentStatus from '../components/HarassmentStatus';
import EmergencyResponse from '../components/EmergencyResponse';
import { motion } from 'framer-motion';
import { analyticsService } from '@/components/services/analyticsServices';
import { toast } from 'sonner';

type ThreatLevel = 'calm' | 'low' | 'medium' | 'high' | 'critical';

interface DashboardData {
  totalReports: number;
  activeUsers: number;
  safetyRating: number;
  threatLevel: ThreatLevel;
}

const threatDescriptions = {
    calm: 'No threats detected. Your digital space is secure.',
    low: 'Low-level negativity detected. We recommend caution.',
    medium: 'Moderate harassment patterns identified. Stay vigilant.',
    high: 'High-risk threats detected. Consider taking action.',
    critical: 'Immediate threat detected. Activate emergency response now.',
};

// Placeholder function for AI threat detection
// TODO: Replace with actual AI service integration
const detectThreatLevel = async (): Promise<ThreatLevel> => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 100));
  // For now, return random level as demo
  // In production, this would analyze user content, social media, etc.
  const randomIndex = Math.floor(Math.random() * threatLevels.length);
  return threatLevels[randomIndex];
};

export default function Home() {
  const [threatLevel, setThreatLevel] = useState<ThreatLevel>('calm');
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * threatLevels.length);
      setThreatLevel(threatLevels[randomIndex]);
    }, 5000); // Update every 5 seconds to simulate real-time analysis

    return () => clearInterval(interval);
  }, [threatLevel]);

  return (
    <div className="space-y-8">
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading safety metrics...</p>
        </div>
      ) : (
        <>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <HarassmentStatus threatLevel={threatLevel} />
            <p className="text-center text-gray-600 mt-4 text-lg">{threatDescriptions[threatLevel]}</p>
            
            {dashboardData && (
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">Total Reports</p>
                  <p className="text-2xl font-bold text-blue-600">{dashboardData.totalReports}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold text-green-600">{dashboardData.activeUsers}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">Safety Rating</p>
                  <p className="text-2xl font-bold text-purple-600">{dashboardData.safetyRating}%</p>
                </div>
              </div>
            )}
          </motion.div>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Need Immediate Help?</h2>
            <p className="text-gray-600 mb-6">If you are in immediate danger, use the emergency response button.</p>
            <EmergencyResponse />
          </div>
        </>
      )}
    </div>
  );
}
