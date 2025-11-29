import React, { useState, useEffect } from 'react';
import { AlertTriangle, Phone, MessageCircle, Upload, X, MapPin } from 'lucide-react';
import Button from '@/components/Button';
import { toast } from 'sonner';

//interface EmergencyContact {
 // type: string;
 // hotline_number: string;
//}

interface LocationContacts {
  location: string;
  iso_code: string;
  contacts: Record<string, string>;
}

const EmergencyResponse: React.FC = () => {
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [evidence, setEvidence] = useState<File[]>([]);
  const [userLocation, setUserLocation] = useState<string>('');
  const [emergencyContacts, setEmergencyContacts] = useState<LocationContacts | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get user's location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
            );
            const data = await response.json();
            setUserLocation(data.countryName || 'Kenya'); // Default to Kenya if unavailable
          } catch (error) {
            console.error('Error getting location:', error);
            setUserLocation('Kenya'); // Fallback
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          setUserLocation('Kenya'); // Fallback
        }
      );
    }
  }, []);

  // Fetch emergency contacts when location is available
  useEffect(() => {
    if (userLocation) {
      fetchEmergencyContacts(userLocation);
    }
  }, [userLocation]);

  const fetchEmergencyContacts = async (location: string) => {
    try {
      const response = await fetch('/api/emergency/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setEmergencyContacts(data);
      } else {
        toast.error('Failed to load emergency contacts');
      }
    } catch (error) {
      console.error('Error fetching emergency contacts:', error);
      toast.error('Error loading emergency contacts');
    }
  };

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

  const triggerEmergencyProtocol = async () => {
    try {
      setIsLoading(true);
      
      // Create emergency report
      const reportData = {
        category: 'emergency',
        severity: 'immediate',
        description: 'Emergency protocol activated',
        location_text: userLocation,
        consent_share_location: true,
        consent_contact_user: false,
        is_anonymous: false
      };

      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
      });

      if (response.ok) {
        toast.success('Emergency alert sent successfully!');
        
        // Upload evidence if any
        if (evidence.length > 0) {
          await uploadEvidence();
        }
      } else {
        toast.error('Failed to send emergency alert');
      }
    } catch (error) {
      console.error('Error triggering emergency protocol:', error);
      toast.error('Error sending emergency alert');
    } finally {
      setIsLoading(false);
    }
  };

  const uploadEvidence = async () => {
    const formData = new FormData();
    evidence.forEach(file => {
      formData.append('evidence', file);
    });

    try {
      const response = await fetch('/api/reports/evidence', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success('Evidence uploaded successfully');
      }
    } catch (error) {
      console.error('Error uploading evidence:', error);
      toast.error('Failed to upload evidence');
    }
  };

  const cancelEmergency = () => {
    setEmergencyActive(false);
    setCountdown(5);
    toast.info('Emergency alert cancelled');
  };

  const handleEvidenceUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setEvidence(prev => [...prev, ...files]);
  };

  const removeEvidence = (index: number) => {
    setEvidence(prev => prev.filter((_, i) => i !== index));
  };

  const handleCallContact = (number: string) => {
    // Remove non-numeric characters for dialing
    const cleanNumber = number.replace(/[^\d+]/g, '');
    window.open(`tel:${cleanNumber}`);
  };

  const handleTextContact = (number: string) => {
    const cleanNumber = number.replace(/[^\d+]/g, '');
    window.open(`sms:${cleanNumber}`);
  };

  const defaultContacts = [
    { icon: '🏥', title: 'Medical Emergency', number: '112' },
    { icon: '👮', title: 'Police', number: '911' },
    { icon: '🎗️', title: 'Support Hotline', number: '1-800-799-SAFE' },
    { icon: '💬', title: 'Crisis Text Line', number: 'Text HOME to 741741' },
  ];

  const renderContactButtons = (contact: { number: string; title: string }) => (
    <div className="flex justify-center space-x-2 mt-3">
      <Button 
        size="sm" 
        variant="primary" 
        className="flex items-center space-x-1"
        onClick={() => handleCallContact(contact.number)}
      >
        <Phone className="h-3 w-3" />
        <span>Call</span>
      </Button>
      {!contact.number.includes('Text') && (
        <Button 
          size="sm" 
          variant="secondary" 
          className="flex items-center space-x-1"
          onClick={() => handleTextContact(contact.number)}
        >
          <MessageCircle className="h-3 w-3" />
          <span>Text</span>
        </Button>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Emergency Response System</h1>
        <p className="text-gray-600 mt-2">One-click reporting with automatic evidence collection</p>
        
        {userLocation && (
          <div className="flex items-center mt-1 text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            Location: {userLocation}
            {emergencyContacts && ` • ${emergencyContacts.location}`}
          </div>
        )}
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
                <p className="text-gray-600">
                  {isLoading ? 'Sending alert to emergency contacts...' : 'Help is on the way. Stay on this page.'}
                </p>
              </div>
            </div>
            <div className="flex justify-center space-x-4">
              <Button variant="danger" onClick={cancelEmergency} disabled={isLoading}>
                Cancel Emergency
              </Button>
              <Button variant="primary" disabled={isLoading}>
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
                      <span className="text-gray-400 text-sm">
                        {file.type.startsWith('image/') ? 'Image' : 
                         file.type.startsWith('video/') ? 'Video' : 'Document'}
                      </span>
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
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Emergency Contacts {emergencyContacts && `• ${emergencyContacts.location}`}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {emergencyContacts ? (
              Object.entries(emergencyContacts.contacts).map(([type, number], index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                  <div className="text-2xl mb-2">🚨</div>
                  <h3 className="font-semibold text-gray-900 mb-1 capitalize">
                    {type.replace(/_/g, ' ')}
                  </h3>
                  <p className="text-blue-600 font-medium">{number}</p>
                  {renderContactButtons({ number, title: type })}
                </div>
              ))
            ) : (
              defaultContacts.map((contact, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                  <div className="text-2xl mb-2">{contact.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-1">{contact.title}</h3>
                  <p className="text-blue-600 font-medium">{contact.number}</p>
                  {renderContactButtons(contact)}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyResponse;