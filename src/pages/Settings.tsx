import React from 'react';
import { Bell, Shield, Users, Globe } from 'lucide-react';
import Button from '@/components/Button';

interface Setting {
  name: string;
  description: string;
  enabled: boolean;
}

const Settings: React.FC = () => {
  const settingsSections = [
    {
      title: 'Notification Preferences',
      icon: Bell,
      settings: [
        { name: 'Email Notifications', description: 'Receive email alerts for important events', enabled: true },
        { name: 'Push Notifications', description: 'Get real-time alerts on your device', enabled: true },
        { name: 'SMS Alerts', description: 'Emergency alerts via text message', enabled: false },
        { name: 'Weekly Reports', description: 'Summary of safety metrics and activities', enabled: true },
      ]
    },
    {
      title: 'Privacy & Security',
      icon: Shield,
      settings: [
        { name: 'Two-Factor Authentication', description: 'Add an extra layer of security to your account', enabled: true },
        { name: 'Data Encryption', description: 'Encrypt all stored data and communications', enabled: true },
        { name: 'Automatic Logout', description: 'Automatically log out after 30 minutes of inactivity', enabled: false },
        { name: 'Activity Tracking', description: 'Track and review account activity', enabled: true },
      ]
    },
    {
      title: 'Community Guidelines',
      icon: Users,
      settings: [
        { name: 'Content Moderation', description: 'Automatically filter inappropriate content', enabled: true },
        { name: 'User Reporting', description: 'Allow users to report concerning behavior', enabled: true },
        { name: 'Anonymous Mode', description: 'Enable anonymous reporting features', enabled: true },
        { name: 'Community Alerts', description: 'Notify community of safety updates', enabled: false },
      ]
    },
    {
      title: 'Regional Settings',
      icon: Globe,
      settings: [
        { name: 'Language', description: 'English (US)', enabled: true },
        { name: 'Time Zone', description: 'Eastern Time (ET)', enabled: true },
        { name: 'Regional Resources', description: 'Show local support services and helplines', enabled: true },
        { name: 'Compliance Mode', description: 'Enable region-specific compliance features', enabled: false },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your SafeSpace preferences and security settings</p>
      </div>

      <div className="space-y-8">
        {settingsSections.map((section, sectionIndex) => {
          const Icon = section.icon;
          return (
            <div key={sectionIndex} className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {section.settings.map((setting: Setting, settingIndex: number) => (
                  <div key={settingIndex} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{setting.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{setting.description}</p>
                      </div>
                      <div className="ml-4">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked={setting.enabled}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Save Changes</h3>
            <p className="text-gray-600 text-sm mt-1">
              Apply your settings preferences across all SafeSpace features
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="secondary">Reset to Defaults</Button>
            <Button variant="primary">Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;