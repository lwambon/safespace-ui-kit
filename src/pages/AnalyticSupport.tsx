import React, { useState } from 'react';
import { Download, Share, Printer, TrendingUp, TrendingDown } from 'lucide-react';
import Button from '@/components/Button';

const AnalyticsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('incidents');

  const metrics = [
    { id: 'incidents', label: 'Incident Reports', value: '1,234', change: '+12%', trend: 'up' as const },
    { id: 'prevention', label: 'Prevention Rate', value: '89%', change: '+5%', trend: 'up' as const },
    { id: 'response', label: 'Avg Response Time', value: '2.3s', change: '-15%', trend: 'down' as const },
    { id: 'users', label: 'Protected Users', value: '15,678', change: '+8%', trend: 'up' as const },
  ];

  const incidentTypes = [
    { type: 'Online Harassment', count: 456, percentage: 37 },
    { type: 'Hate Speech', count: 289, percentage: 23 },
    { type: 'Cyberbullying', count: 234, percentage: 19 },
    { type: 'Non-consensual Sharing', count: 156, percentage: 13 },
    { type: 'Other', count: 99, percentage: 8 },
  ];

  const demographicData = [
    { category: 'Age 18-24', percentage: 35 },
    { category: 'Age 25-34', percentage: 28 },
    { category: 'Age 35-44', percentage: 20 },
    { category: 'Age 45+', percentage: 17 },
  ];

  const timeRangeOptions = [
    { value: '24h', label: '24H' },
    { value: '7d', label: '7D' },
    { value: '30d', label: '30D' },
    { value: '90d', label: '90D' },
  ];

  const SimpleBarChart = ({ data, color = 'blue' }: { data: number[]; color?: string }) => {
    const maxValue = Math.max(...data);
    const colorClasses: Record<string, string> = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      red: 'bg-red-500',
      yellow: 'bg-yellow-500',
    };

    return (
      <div className="flex items-end space-x-1 h-32">
        {data.map((value, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div
              className={`w-full ${colorClasses[color]} rounded-t transition-all duration-500`}
              style={{ height: `${(value / maxValue) * 100}%` }}
            />
            <span className="text-xs text-gray-500 mt-1">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index]}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Data insights for policymakers and researchers</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          {timeRangeOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setTimeRange(option.value)}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                timeRange === option.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map(metric => (
          <div key={metric.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">{metric.label}</h3>
              <div className={`flex items-center space-x-1 text-sm ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span>{metric.change}</span>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-4">{metric.value}</p>
            <SimpleBarChart 
              data={[65, 59, 80, 81, 56, 55]} 
              color={metric.trend === 'up' ? 'green' : 'red'}
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Incident Type Distribution</h2>
            <select 
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="incidents">Incident Reports</option>
              <option value="response">Response Times</option>
              <option value="prevention">Prevention Rates</option>
            </select>
          </div>
          
          <div className="space-y-4">
            {incidentTypes.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">{item.type}</span>
                  <span className="text-gray-600">{item.count} ({item.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">User Demographics</h2>
          <div className="space-y-4">
            {demographicData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">{item.category}</span>
                  <span className="text-gray-600">{item.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Export Reports</h3>
            <p className="text-gray-600 text-sm mt-1">
              Download comprehensive analytics reports for research and policy development
            </p>
          </div>
          <div className="flex space-x-3 mt-4 sm:mt-0">
            <Button variant="secondary" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export PDF</span>
            </Button>
            <Button variant="secondary" className="flex items-center space-x-2">
              <Share className="h-4 w-4" />
              <span>Share</span>
            </Button>
            <Button variant="secondary" className="flex items-center space-x-2">
              <Printer className="h-4 w-4" />
              <span>Print</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;