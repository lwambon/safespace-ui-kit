import React, { useState } from 'react';
import { CheckCircle, Clock, AlertCircle, MoreVertical } from 'lucide-react';
import Button from '@/components/Button';
import { Incident } from '@/assets/types';

const CommunityModeration: React.FC = () => {
  const [reports, setReports] = useState<Incident[]>([
    {
      id: '1',
      type: 'harassment',
      severity: 'high',
      content: 'User repeatedly sending inappropriate messages in the general chat room',
      timestamp: '2024-01-15 14:30',
      status: 'pending',
      reporter: 'Anonymous User'
    },
    {
      id: '2',
      type: 'hate_speech',
      severity: 'medium',
      content: 'Discriminatory comments targeting specific groups in group chat',
      timestamp: '2024-01-15 13:45',
      status: 'under_review',
      reporter: 'Community Member'
    },
    {
      id: '3',
      type: 'spam',
      severity: 'low',
      content: 'Multiple duplicate messages and promotional content detected',
      timestamp: '2024-01-15 12:15',
      status: 'resolved',
      reporter: 'Auto-Moderator'
    }
  ]);

  const [moderators] = useState([
    { id: 1, name: 'Alex Johnson', status: 'online', reportsHandled: 47, lastActive: '2 min ago' },
    { id: 2, name: 'Sam Smith', status: 'away', reportsHandled: 32, lastActive: '1 hour ago' },
    { id: 3, name: 'Taylor Kim', status: 'online', reportsHandled: 28, lastActive: '5 min ago' },
  ]);

  const handleStatusChange = (reportId: string, newStatus: Incident['status']) => {
    setReports(prev => prev.map(report => 
      report.id === reportId ? { ...report, status: newStatus } : report
    ));
  };

  const getSeverityColor = (severity: Incident['severity']) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: Incident['status']) => {
    switch (status) {
      case 'resolved': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'under_review': return <Clock className="h-4 w-4 text-blue-600" />;
      default: return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Community Moderation</h1>
        <p className="text-gray-600 mt-2">Crowdsourced safety monitoring and report management</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Pending Reports</h2>
                <div className="flex space-x-4 text-sm">
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                    {reports.filter(r => r.status === 'pending').length} Pending
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                    {reports.filter(r => r.status === 'under_review').length} In Review
                  </span>
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {reports.map((report) => (
                <div key={report.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{report.reporter}</span>
                        <span className="text-sm text-gray-500">{report.timestamp}</span>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(report.severity)}`}>
                        {report.severity}
                      </span>
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreVertical className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>

                  <div className="mb-3">
                    <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm font-medium mb-2">
                      {report.type.replace('_', ' ')}
                    </span>
                    <p className="text-gray-700">{report.content}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm">
                      {getStatusIcon(report.status)}
                      <span className={`font-medium ${
                        report.status === 'resolved' ? 'text-green-600' :
                        report.status === 'under_review' ? 'text-blue-600' :
                        'text-yellow-600'
                      }`}>
                        {report.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => handleStatusChange(report.id, 'under_review')}
                      >
                        Review
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleStatusChange(report.id, 'resolved')}
                      >
                        Resolve
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Moderator Team</h3>
            <div className="space-y-4">
              {moderators.map((mod) => (
                <div key={mod.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {mod.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                        mod.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{mod.name}</p>
                      <p className="text-sm text-gray-500">{mod.reportsHandled} reports handled</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="primary" className="w-full justify-center">
                Add Moderator
              </Button>
              <Button variant="secondary" className="w-full justify-center">
                Moderation Settings
              </Button>
              <Button variant="secondary" className="w-full justify-center">
                View Activity Logs
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityModeration;