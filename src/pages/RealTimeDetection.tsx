import React, { useState, useEffect } from 'react';
import { Play, Pause, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import Button from '@/components/Button';
import { Incident } from '@/assets/types';

const RealTimeDetection: React.FC = () => {
  const [monitoringActive, setMonitoringActive] = useState(true);
  const [detectedIncidents, setDetectedIncidents] = useState<Incident[]>([
    { 
      id: '1', 
      type: 'harassment', 
      severity: 'medium', 
      content: 'Inappropriate language detected in general chat', 
      timestamp: '2:30 PM', 
      status: 'under_review'  
    },
    { 
      id: '2', 
      type: 'bullying', 
      severity: 'high', 
      content: 'Potential bullying pattern identified in user messages', 
      timestamp: '2:25 PM', 
      status: 'pending' 
    },
    { 
      id: '3', 
      type: 'hate_speech', 
      severity: 'medium', 
      content: 'Hate speech keywords detected and filtered', 
      timestamp: '2:15 PM', 
      status: 'resolved' 
    },
  ]);

  // Calculate threat level based on current incidents
  const calculateThreatLevel = (incidents: Incident[]): 'low' | 'medium' | 'high' => {
    const hasHighSeverity = incidents.some(incident => 
      incident.severity === 'high' && incident.status !== 'resolved'
    );
    const hasMediumSeverity = incidents.some(incident => 
      incident.severity === 'medium' && incident.status !== 'resolved'
    );

    if (hasHighSeverity) return 'high';
    if (hasMediumSeverity) return 'medium';
    return 'low';
  };

  const threatLevel = calculateThreatLevel(detectedIncidents);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (monitoringActive) {
      interval = setInterval(() => {
        if (Math.random() > 0.7) {
          const types: Incident['type'][] = ['harassment', 'bullying', 'hate_speech'];
          const severities: Incident['severity'][] = ['low', 'medium', 'high'];
          const newIncident: Incident = {
            id: Date.now().toString(),
            type: types[Math.floor(Math.random() * types.length)],
            severity: severities[Math.floor(Math.random() * severities.length)],
            content: 'New potential threat pattern detected',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'pending'
          };
          setDetectedIncidents(prev => [newIncident, ...prev.slice(0, 9)]);
        }
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [monitoringActive]);

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
      default: return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    }
  };

  const handleResolveIncident = (incidentId: string) => {
    setDetectedIncidents(prev => 
      prev.map(incident => 
        incident.id === incidentId 
          ? { ...incident, status: 'resolved' }
          : incident
      )
    );
  };

  const handleReviewIncident = (incidentId: string) => {
    setDetectedIncidents(prev => 
      prev.map(incident => 
        incident.id === incidentId 
          ? { ...incident, status: 'under_review' }
          : incident
      )
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Real-time Harassment Detection</h1>
        <p className="text-gray-600 mt-2">AI-powered monitoring for harmful content and behavior patterns</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
              monitoringActive 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                monitoringActive ? 'bg-green-500 animate-pulse' : 'bg-gray-500'
              }`} />
              <span className="font-medium">
                {monitoringActive ? 'Active Monitoring' : 'Monitoring Paused'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Threat Level</p>
              <div className={`px-3 py-1 rounded-full font-semibold ${
                threatLevel === 'high' ? 'bg-red-100 text-red-800' :
                threatLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {threatLevel.toUpperCase()}
              </div>
            </div>
            
            <Button
              variant={monitoringActive ? 'danger' : 'success'}
              onClick={() => setMonitoringActive(!monitoringActive)}
              className="flex items-center space-x-2"
            >
              {monitoringActive ? (
                <>
                  <Pause className="h-4 w-4" />
                  <span>Pause Monitoring</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  <span>Start Monitoring</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Detected Incidents</h2>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {detectedIncidents.length} Total
              </span>
            </div>
            <div className="space-y-4">
              {detectedIncidents.map((incident) => (
                <div key={incident.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="capitalize font-medium text-gray-900">
                        {incident.type.replace('_', ' ')}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(incident.severity)}`}>
                        {incident.severity}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      {getStatusIcon(incident.status)}
                      <span>{incident.timestamp}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{incident.content}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${
                      incident.status === 'resolved' ? 'text-green-600' :
                      incident.status === 'under_review' ? 'text-blue-600' :
                      'text-yellow-600'
                    }`}>
                      {incident.status.charAt(0).toUpperCase() + incident.status.slice(1).replace('_', ' ')}
                    </span>
                    <div className="flex space-x-2">
                      {incident.status === 'pending' && (
                        <Button 
                          size="sm" 
                          variant="primary"
                          onClick={() => handleReviewIncident(incident.id)}
                        >
                          Review
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => handleResolveIncident(incident.id)}
                        disabled={incident.status === 'resolved'}
                      >
                        {incident.status === 'resolved' ? 'Resolved' : 'Mark Resolved'}
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Detection Settings</h3>
            <div className="space-y-4">
              {[
                'Text Content Analysis',
                'Image Content Monitoring',
                'Behavioral Pattern Detection',
                'Audio Content Analysis'
              ].map((setting, index) => (
                <label key={index} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    defaultChecked={index !== 3}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{setting}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sensitivity Level</h3>
            <div className="space-y-3">
              <input
                type="range"
                min="1"
                max="10"
                defaultValue="7"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Low Sensitivity</span>
                <span>High Sensitivity</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeDetection;