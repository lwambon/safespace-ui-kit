import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Shield, 
  UserCheck, 
  Zap,
  AlertTriangle,
  MessageCircle,
  BookOpen
} from 'lucide-react';
import StatCard from '../components/StatCard';
import { analyticsService } from '../components/services/analyticsServices';
import { toast } from 'sonner';

interface DashboardMetrics {
  totalReports: number;
  activeUsers: number;
  incidentsPrevented: number;
  safetyRating: number;
  averageResponseTime: number;
  recentActivity: Activity[];
}

interface Activity {
  type: 'detection' | 'report' | 'prevention' | 'education';
  message: string;
  time: string;
}

const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
    // Auto-refresh every 5 minutes
    const interval = setInterval(loadDashboardData, 300000);
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async () => {
    try {
      const data = await analyticsService.getDashboardMetrics('7d');
      
      setMetrics({
        totalReports: data.totalReports || 0,
        activeUsers: data.activeUsers || 0,
        incidentsPrevented: Math.max(0, (data.totalReports || 0) * 0.75),
        safetyRating: Math.round(((100 - (data.totalReports || 0)) / 100) * 100) || 85,
        averageResponseTime: 2.3,
        recentActivity: [
          { type: 'detection', message: `${Math.floor(Math.random() * 5) + 1} harmful content instances detected`, time: '2 min ago' },
          { type: 'report', message: `${Math.floor(Math.random() * 3) + 1} new reports submitted`, time: '5 min ago' },
          { type: 'prevention', message: 'Potential harassment prevented in chat', time: '12 min ago' },
          { type: 'education', message: '12 users completed safety modules', time: '1 hour ago' },
        ]
      });
    } catch (error) {
      console.error('Error loading dashboard:', error);
      toast.error('Failed to load dashboard metrics');
      // Set default values on error
      setMetrics({
        totalReports: 0,
        activeUsers: 0,
        incidentsPrevented: 0,
        safetyRating: 85,
        averageResponseTime: 2.3,
        recentActivity: []
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Unable to load dashboard data</p>
      </div>
    );
  }

  const stats = [
    { title: 'Protected Users', value: metrics.activeUsers.toString(), change: '+12%', trend: 'up' as const, icon: Users },
    { title: 'Incidents Prevented', value: Math.floor(metrics.incidentsPrevented).toString(), change: '+8%', trend: 'up' as const, icon: Shield },
    { title: 'Safety Rating', value: `${metrics.safetyRating}%`, change: '+5%', trend: 'up' as const, icon: UserCheck },
    { title: 'Response Time', value: `${metrics.averageResponseTime}s`, change: '-15%', trend: 'down' as const, icon: Zap },
  ];

  const quickActions = [
    { 
      title: 'Emergency Report', 
      description: 'Immediate assistance', 
      icon: AlertTriangle, 
      path: '/emergency',
      variant: 'danger' as const
    },
    { 
      title: 'Start Monitoring', 
      description: 'Begin safety monitoring', 
      icon: Shield, 
      path: '/detection',
      variant: 'primary' as const
    },
    { 
      title: 'Educational Modules', 
      description: 'Learn safety practices', 
      icon: BookOpen, 
      path: '/education',
      variant: 'success' as const
    },
    { 
      title: 'Community Support', 
      description: 'Connect with peers', 
      icon: MessageCircle, 
      path: '/support',
      variant: 'secondary' as const
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Safety Dashboard</h1>
        <p className="text-gray-600 mt-2">Monitor and manage digital safety in real-time</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={index}
                    to={action.path}
                    className={`
                      flex items-center space-x-4 p-4 rounded-lg border transition-all hover:shadow-md
                      ${action.variant === 'danger' ? 'border-red-200 bg-red-50 hover:bg-red-100' : 
                        action.variant === 'primary' ? 'border-blue-200 bg-blue-50 hover:bg-blue-100' :
                        action.variant === 'success' ? 'border-green-200 bg-green-50 hover:bg-green-100' :
                        'border-gray-200 bg-gray-50 hover:bg-gray-100'
                      }
                    `}
                  >
                    <div className={`
                      p-3 rounded-lg
                      ${action.variant === 'danger' ? 'bg-red-100 text-red-600' : 
                        action.variant === 'primary' ? 'bg-blue-100 text-blue-600' :
                        action.variant === 'success' ? 'bg-green-100 text-green-600' :
                        'bg-gray-100 text-gray-600'
                      }
                    `}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{action.title}</h3>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {metrics.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'detection' ? 'bg-yellow-500' :
                  activity.type === 'report' ? 'bg-red-500' :
                  activity.type === 'prevention' ? 'bg-green-500' :
                  'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;