import React, { useState } from 'react';
import { AlertTriangle, Phone, MessageCircle, Upload, X } from 'lucide-react';
import Button from '@/components/Button';

const EmergencyResponse: React.FC = () => {
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [evidence, setEvidence] = useState<File[]>([]);

  const handleEmergencyClick = () => {
    if (!emergencyActive) {
      setEmergencyActive(true);
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            triggerEmergencyProtocol();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const triggerEmergencyProtocol = () => {
    console.log('Emergency protocol activated');
  };

  const cancelEmergency = () => {
    setEmergencyActive(false);
    setCountdown(5);
  };

  const handleEvidenceUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setEvidence(prev => [...prev, ...files]);
  };

  const removeEvidence = (index: number) => {
    setEvidence(prev => prev.filter((_, i) => i !== index));
  };

  const emergencyContacts = [
    { icon: '🏥', title: 'Medical Emergency', number: '112' },
    { icon: '👮', title: 'Police', number: '911' },
    { icon: '🎗️', title: 'Support Hotline', number: '1-800-799-SAFE' },
    { icon: '💬', title: 'Crisis Text Line', number: 'Text HOME to 741741' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Emergency Response System</h1>
        <p className="text-gray-600 mt-2">One-click reporting with automatic evidence collection</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        {emergencyActive ? (
          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-20 h-20 border-4 border-red-600 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-red-600">{countdown}</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-red-600 mb-2">Emergency Protocol Activated</h2>
                <p className="text-gray-600">Help is on the way. Stay on this page.</p>
              </div>
            </div>
            <div className="flex justify-center space-x-4">
              <Button variant="danger" onClick={cancelEmergency}>
                Cancel Emergency
              </Button>
              <Button variant="primary">
                <Phone className="h-4 w-4 mr-2" />
                Call Emergency Services
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-10 w-10 text-red-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Emergency Report</h2>
                <p className="text-gray-600">Click the button below in case of immediate danger</p>
              </div>
            </div>
            <Button
              onClick={handleEmergencyClick}
              variant="danger"
              size="lg"
              className="px-8 py-4 text-lg"
            >
              <AlertTriangle className="h-5 w-5 mr-2" />
              Activate Emergency Protocol
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Collect Evidence</h2>
          
          <label className="block border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors">
            <input
              type="file"
              multiple
              onChange={handleEvidenceUpload}
              accept="image/*,video/*,audio/*,.txt,.pdf"
              className="hidden"
            />
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-700 font-medium">Upload screenshots, videos, or documents</p>
            <p className="text-gray-500 text-sm mt-1">Drag & drop or click to browse</p>
          </label>

          {evidence.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-gray-900 mb-3">Collected Evidence ({evidence.length})</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {evidence.map((file, index) => (
                  <div key={index} className="relative border border-gray-200 rounded-lg overflow-hidden">
                    <div className="w-full h-20 bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">{file.type.startsWith('image/') ? 'Image' : 'Document'}</span>
                    </div>
                    <div className="p-2">
                      <p className="text-xs text-gray-600 truncate">{file.name}</p>
                    </div>
                    <button
                      onClick={() => removeEvidence(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Emergency Contacts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                <div className="text-2xl mb-2">{contact.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{contact.title}</h3>
                <p className="text-blue-600 font-medium">{contact.number}</p>
                <div className="flex justify-center space-x-2 mt-3">
                  <Button size="sm" variant="primary" className="flex items-center space-x-1">
                    <Phone className="h-3 w-3" />
                    <span>Call</span>
                  </Button>
                  {contact.title.includes('Text') && (
                    <Button size="sm" variant="secondary" className="flex items-center space-x-1">
                      <MessageCircle className="h-3 w-3" />
                      <span>Text</span>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyResponse;