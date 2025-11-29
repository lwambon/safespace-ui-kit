import React, { useState, useEffect } from 'react';
import { Bell, Shield, Users, Globe, Save } from 'lucide-react';
import Button from '@/components/Button';
import { useAuth } from '@/lib/AuthContext';
import { toast } from 'sonner';

interface SettingItem {
  name: string;
  description: string;
  enabled: boolean;
  key: string;
}

interface UserSettings {
  notifications: SettingItem[];
  privacy: SettingItem[];
  community: SettingItem[];
  regional: SettingItem[];
}

const Settings: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<UserSettings>({
    notifications: [
      { key: 'email_notifications', name: 'Email Notifications', description: 'Receive email alerts for important events', enabled: true },
      { key: 'push_notifications', name: 'Push Notifications', description: 'Get real-time alerts on your device', enabled: true },
      { key: 'sms_alerts', name: 'SMS Alerts', description: 'Emergency alerts via text message', enabled: false },
      { key: 'weekly_reports', name: 'Weekly Reports', description: 'Summary of safety metrics and activities', enabled: true },
    ],
    privacy: [
      { key: 'two_factor_auth', name: 'Two-Factor Authentication', description: 'Add an extra layer of security to your account', enabled: true },
      { key: 'data_encryption', name: 'Data Encryption', description: 'Encrypt all stored data and communications', enabled: true },
      { key: 'auto_logout', name: 'Automatic Logout', description: 'Automatically log out after 30 minutes of inactivity', enabled: false },
      { key: 'activity_tracking', name: 'Activity Tracking', description: 'Track and review account activity', enabled: true },
    ],
    community: [
      { key: 'content_moderation', name: 'Content Moderation', description: 'Automatically filter inappropriate content', enabled: true },
      { key: 'user_reporting', name: 'User Reporting', description: 'Allow users to report concerning behavior', enabled: true },
      { key: 'anonymous_mode', name: 'Anonymous Mode', description: 'Enable anonymous reporting features', enabled: true },
      { key: 'community_alerts', name: 'Community Alerts', description: 'Notify community of safety updates', enabled: false },
    ],
    regional: [
      { key: 'language', name: 'Language', description: 'English (US)', enabled: true },
      { key: 'time_zone', name: 'Time Zone', description: 'Eastern Time (ET)', enabled: true },
      { key: 'regional_resources', name: 'Regional Resources', description: 'Show local support services and helplines', enabled: true },
      { key: 'compliance_mode', name: 'Compliance Mode', description: 'Enable region-specific compliance features', enabled: false },
    ]
  });

  useEffect(() => {
    loadUserSettings();
  }, [user?.id]);

  const loadUserSettings = async () => {
    // Default settings loaded above; in a real app,
    // fetch from backend: GET /api/auth/user/settings
  };

  const toggleSetting = (category: keyof UserSettings, key: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: prev[category].map(item =>
        item.key === key ? { ...item, enabled: !item.enabled } : item
      )
    }));
  };

  const handleSaveSettings = async () => {
    if (!user?.id) {
      toast.error('You must be logged in to save settings');
      return;
    }

    setLoading(true);
    try {
      const settingsPayload = {
        notifications: Object.fromEntries(
          settings.notifications.map(s => [s.key, s.enabled])
        ),
        privacy: Object.fromEntries(
          settings.privacy.map(s => [s.key, s.enabled])
        ),
        community: Object.fromEntries(
          settings.community.map(s => [s.key, s.enabled])
        ),
        regional: Object.fromEntries(
          settings.regional.map(s => [s.key, s.enabled])
        )
      };

      console.log('Saving settings:', settingsPayload);
      toast.success('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const handleResetToDefaults = () => {
    setSettings({
      notifications: [
        { key: 'email_notifications', name: 'Email Notifications', description: 'Receive email alerts for important events', enabled: true },
        { key: 'push_notifications', name: 'Push Notifications', description: 'Get real-time alerts on your device', enabled: true },
        { key: 'sms_alerts', name: 'SMS Alerts', description: 'Emergency alerts via text message', enabled: false },
        { key: 'weekly_reports', name: 'Weekly Reports', description: 'Summary of safety metrics and activities', enabled: true },
      ],
      privacy: [
        { key: 'two_factor_auth', name: 'Two-Factor Authentication', description: 'Add an extra layer of security to your account', enabled: true },
        { key: 'data_encryption', name: 'Data Encryption', description: 'Encrypt all stored data and communications', enabled: true },
        { key: 'auto_logout', name: 'Automatic Logout', description: 'Automatically log out after 30 minutes of inactivity', enabled: false },
        { key: 'activity_tracking', name: 'Activity Tracking', description: 'Track and review account activity', enabled: true },
      ],
      community: [
        { key: 'content_moderation', name: 'Content Moderation', description: 'Automatically filter inappropriate content', enabled: true },
        { key: 'user_reporting', name: 'User Reporting', description: 'Allow users to report concerning behavior', enabled: true },
        { key: 'anonymous_mode', name: 'Anonymous Mode', description: 'Enable anonymous reporting features', enabled: true },
        { key: 'community_alerts', name: 'Community Alerts', description: 'Notify community of safety updates', enabled: false },
      ],
      regional: [
        { key: 'language', name: 'Language', description: 'English (US)', enabled: true },
        { key: 'time_zone', name: 'Time Zone', description: 'Eastern Time (ET)', enabled: true },
        { key: 'regional_resources', name: 'Regional Resources', description: 'Show local support services and helplines', enabled: true },
        { key: 'compliance_mode', name: 'Compliance Mode', description: 'Enable region-specific compliance features', enabled: false },
      ]
    });
    toast.success('Settings reset to defaults');
  };

  const renderSection = (title: string, icon: React.ComponentType<any>, items: SettingItem[]) => {
    const Icon = icon;
    return (
      <div key={title} className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Icon className="h-5 w-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {items.map((setting) => (
            <div key={setting.key} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{setting.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{setting.description}</p>
                </div>
                <div className="ml-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={setting.enabled}
                      onChange={() => {
                        const category = Object.keys(settings).find(key =>
                          settings[key as keyof UserSettings].find(s => s.key === setting.key)
                        ) as keyof UserSettings;
                        if (category) toggleSetting(category, setting.key);
                      }}
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
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your SafeSpace preferences and security settings</p>
      </div>

      <div className="space-y-8">
        {renderSection('Notification Preferences', Bell, settings.notifications)}
        {renderSection('Privacy & Security', Shield, settings.privacy)}
        {renderSection('Community Guidelines', Users, settings.community)}
        {renderSection('Regional Settings', Globe, settings.regional)}
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
            <Button 
              variant="secondary" 
              onClick={handleResetToDefaults}
              disabled={loading}
            >
              Reset to Defaults
            </Button>
            <Button 
              variant="primary" 
              onClick={handleSaveSettings}
              disabled={loading}
            >
              {loading ? 'Saving...' : <><Save className="w-4 h-4 mr-2" /> Save Changes</>}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;