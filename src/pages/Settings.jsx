// // pages/Settings.jsx
// import React from 'react';

// const Settings = () => {
//   return (
//     <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//       <h2 className="text-xl font-semibold text-gray-900 mb-4">Settings</h2>
//       <p className="text-gray-600">Settings and configuration options will be implemented here.</p>
//     </div>
//   );
// };

// export default Settings




import React, { useState } from 'react';
import {
  User,
  Lock,
  Bell,
  CreditCard,
  Users,
  Building,
  Zap,
  Shield,
  Globe,
  Smartphone,
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
  X,
  Check,
  AlertCircle,
  Eye,
  EyeOff,
  Key,
  Trash2,
  Plus,
  Download,
  Upload,
  RefreshCw,
  ExternalLink,
  Database,
  Wifi,
  Monitor,
  Palette,
  Clock,
  Languages,
  DollarSign,
  FileText,
  Calendar,
  Activity,
  BarChart3,
  Sliders,
  Code,
  Link,
  Github,
  Slack,
  Chrome
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showApiKeys, setShowApiKeys] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    desktop: true
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const settingsTabs = [
    { id: 'general', label: 'General', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'company', label: 'Company', icon: Building },
    { id: 'integrations', label: 'Integrations', icon: Zap },
    { id: 'api', label: 'API & Webhooks', icon: Code },
    { id: 'preferences', label: 'Preferences', icon: Sliders }
  ];

  const integrations = [
    {
      id: 'slack',
      name: 'Slack',
      description: 'Get notifications and updates in Slack',
      icon: Slack,
      connected: true,
      status: 'active'
    },
    {
      id: 'quickbooks',
      name: 'QuickBooks',
      description: 'Sync transactions with QuickBooks Online',
      icon: Database,
      connected: false,
      status: 'available'
    },
    {
      id: 'gmail',
      name: 'Gmail',
      description: 'Email receipts and notifications',
      icon: Mail,
      connected: true,
      status: 'active'
    },
    {
      id: 'dropbox',
      name: 'Dropbox',
      description: 'Store receipts and documents',
      icon: Upload,
      connected: false,
      status: 'available'
    },
    {
      id: 'salesforce',
      name: 'Salesforce',
      description: 'Sync client data and expenses',
      icon: Building,
      connected: true,
      status: 'active'
    },
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Connect with 5000+ apps',
      icon: Zap,
      connected: false,
      status: 'available'
    }
  ];

  const apiKeys = [
    {
      id: 'api-1',
      name: 'Production API',
      key: 'sk_live_••••••••••••••••••••••••••••4532',
      created: '2025-01-15',
      lastUsed: '2025-09-20',
      permissions: ['read', 'write']
    },
    {
      id: 'api-2',
      name: 'Development API',
      key: 'sk_test_••••••••••••••••••••••••••••8976',
      created: '2025-02-10',
      lastUsed: '2025-09-18',
      permissions: ['read']
    }
  ];

  const teamMembers = [
    {
      id: 'user-1',
      name: 'Sarah Johnson',
      email: 'sarah@company.com',
      role: 'Admin',
      status: 'active',
      lastActive: '2025-09-20'
    },
    {
      id: 'user-2',
      name: 'Mike Chen',
      email: 'mike@company.com',
      role: 'Manager',
      status: 'active',
      lastActive: '2025-09-19'
    },
    {
      id: 'user-3',
      name: 'Emma Davis',
      email: 'emma@company.com',
      role: 'User',
      status: 'pending',
      lastActive: null
    }
  ];

  const ToggleSwitch = ({ enabled, onChange, label, description }) => (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="font-medium text-gray-900">{label}</p>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-[#b892ff]' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      {/* Profile Information */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h3>
        
        <div className="flex items-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-[#b892ff] to-[#8b5cf6] rounded-full flex items-center justify-center text-white font-bold text-2xl">
              JD
            </div>
            <button className="absolute bottom-0 right-0 w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors">
              <Camera className="w-3 h-3" />
            </button>
          </div>
          <div className="ml-4">
            <h4 className="font-semibold text-gray-900">John Doe</h4>
            <p className="text-gray-500">Admin</p>
            <button className="text-[#b892ff] hover:text-[#a075ff] text-sm font-medium mt-1">
              Change Photo
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              defaultValue="John"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              defaultValue="Doe"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              defaultValue="john.doe@company.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              defaultValue="+1 (555) 123-4567"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <textarea
              rows={3}
              defaultValue="Finance Manager with 10+ years of experience in expense management and financial operations."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button className="px-4 py-2 bg-[#b892ff] text-white rounded-lg hover:bg-[#a075ff] transition-colors">
            Save Changes
          </button>
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Settings</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent">
                <option>Eastern Time (ET)</option>
                <option>Pacific Time (PT)</option>
                <option>Central Time (CT)</option>
                <option>Mountain Time (MT)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent">
                <option>English (US)</option>
                <option>English (UK)</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent">
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
                <option>CAD (C$)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent">
                <option>MM/DD/YYYY</option>
                <option>DD/MM/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      {/* Password Settings */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Password & Authentication</h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Password</p>
              <p className="text-sm text-gray-500">Last changed 3 months ago</p>
            </div>
            <button
              onClick={() => setShowPasswordChange(!showPasswordChange)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Change Password
            </button>
          </div>

          {showPasswordChange && (
            <div className="border-t pt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
                />
              </div>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-[#b892ff] text-white rounded-lg hover:bg-[#a075ff] transition-colors">
                  Update Password
                </button>
                <button
                  onClick={() => setShowPasswordChange(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="border-t pt-6">
            <ToggleSwitch
              enabled={twoFactorEnabled}
              onChange={setTwoFactorEnabled}
              label="Two-Factor Authentication"
              description="Add an extra layer of security to your account"
            />
          </div>
        </div>
      </div>

      {/* Session Management */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Active Sessions</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <Monitor className="w-8 h-8 text-gray-400 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Current Session</p>
                <p className="text-sm text-gray-500">Chrome on macOS • New York, NY</p>
                <p className="text-sm text-gray-500">Last active: Now</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Current
            </span>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <Smartphone className="w-8 h-8 text-gray-400 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Mobile App</p>
                <p className="text-sm text-gray-500">iOS App • New York, NY</p>
                <p className="text-sm text-gray-500">Last active: 2 hours ago</p>
              </div>
            </div>
            <button className="text-red-600 hover:text-red-700 font-medium text-sm">
              Revoke
            </button>
          </div>
        </div>

        <div className="mt-6">
          <button className="text-red-600 hover:text-red-700 font-medium">
            Sign out of all other sessions
          </button>
        </div>
      </div>

      {/* Login History */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Login Activity</h3>
        
        <div className="space-y-3">
          {[
            { location: 'New York, NY', device: 'Chrome on macOS', time: '2 minutes ago', status: 'success' },
            { location: 'New York, NY', device: 'iOS App', time: '2 hours ago', status: 'success' },
            { location: 'Boston, MA', device: 'Firefox on Windows', time: '3 days ago', status: 'failed' },
            { location: 'New York, NY', device: 'Chrome on macOS', time: '1 week ago', status: 'success' }
          ].map((login, index) => (
            <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-3 ${
                  login.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{login.device}</p>
                  <p className="text-sm text-gray-500">{login.location} • {login.time}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                login.status === 'success' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {login.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      {/* Notification Preferences */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Delivery Methods</h4>
            <div className="space-y-3">
              <ToggleSwitch
                enabled={notifications.email}
                onChange={(value) => setNotifications({...notifications, email: value})}
                label="Email Notifications"
                description="Receive notifications via email"
              />
              <ToggleSwitch
                enabled={notifications.push}
                onChange={(value) => setNotifications({...notifications, push: value})}
                label="Push Notifications"
                description="Receive push notifications on mobile and desktop"
              />
              <ToggleSwitch
                enabled={notifications.sms}
                onChange={(value) => setNotifications({...notifications, sms: value})}
                label="SMS Notifications"
                description="Receive text messages for urgent alerts"
              />
              <ToggleSwitch
                enabled={notifications.desktop}
                onChange={(value) => setNotifications({...notifications, desktop: value})}
                label="Desktop Notifications"
                description="Show notifications in your browser"
              />
            </div>
          </div>

          <div className="border-t pt-6">
            <h4 className="font-medium text-gray-900 mb-4">Event Types</h4>
            <div className="space-y-3">
              <ToggleSwitch
                enabled={true}
                onChange={() => {}}
                label="New Expense Submissions"
                description="When employees submit new expenses"
              />
              <ToggleSwitch
                enabled={true}
                onChange={() => {}}
                label="Approval Requests"
                description="When expenses require your approval"
              />
              <ToggleSwitch
                enabled={false}
                onChange={() => {}}
                label="Budget Alerts"
                description="When departments exceed budget thresholds"
              />
              <ToggleSwitch
                enabled={true}
                onChange={() => {}}
                label="Payment Confirmations"
                description="When payments are processed"
              />
              <ToggleSwitch
                enabled={false}
                onChange={() => {}}
                label="System Updates"
                description="Product updates and maintenance notices"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Email Settings */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Email Settings</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Frequency</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent">
              <option>Real-time</option>
              <option>Daily digest</option>
              <option>Weekly digest</option>
              <option>Never</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Digest Time</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent">
              <option>9:00 AM</option>
              <option>12:00 PM</option>
              <option>6:00 PM</option>
              <option>9:00 PM</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIntegrationsSettings = () => (
    <div className="space-y-6">
      {/* Available Integrations */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Available Integrations</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrations.map((integration) => {
            const Icon = integration.icon;
            return (
              <div
                key={integration.id}
                className={`p-4 border rounded-lg ${
                  integration.connected ? 'border-green-200 bg-green-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Icon className="w-8 h-8 text-gray-600 mr-3" />
                    <div>
                      <h4 className="font-medium text-gray-900">{integration.name}</h4>
                      <p className="text-sm text-gray-500">{integration.description}</p>
                    </div>
                  </div>
                  {integration.connected && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    integration.connected
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {integration.connected ? 'Connected' : 'Available'}
                  </span>
                  <button
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      integration.connected
                        ? 'text-red-600 hover:text-red-700'
                        : 'text-[#b892ff] hover:text-[#a075ff]'
                    }`}
                  >
                    {integration.connected ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Webhook Settings */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Webhooks</h3>
            <p className="text-gray-500">Configure webhook endpoints for real-time notifications</p>
          </div>
          <button className="flex items-center px-4 py-2 bg-[#b892ff] text-white rounded-lg hover:bg-[#a075ff] transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Add Webhook
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">https://api.yourapp.com/webhooks/expenses</p>
              <p className="text-sm text-gray-500">Expense events • Last triggered 2 hours ago</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                Active
              </span>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <Sliders className="w-4 h-4" />
              </button>
              <button className="p-1 text-gray-400 hover:text-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderApiSettings = () => (
    <div className="space-y-6">
      {/* API Keys */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">API Keys</h3>
            <p className="text-gray-500">Manage your API keys for integrations</p>
          </div>
          <button className="flex items-center px-4 py-2 bg-[#b892ff] text-white rounded-lg hover:bg-[#a075ff] transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Create New Key
          </button>
        </div>

        <div className="space-y-4">
          {apiKeys.map((apiKey) => (
            <div key={apiKey.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium text-gray-900">{apiKey.name}</h4>
                  <p className="text-sm text-gray-500 font-mono">{apiKey.key}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowApiKeys(!showApiKeys)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                    title="Reveal"
                  >
                    {showApiKeys ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600" title="Regenerate">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-600" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex space-x-4">
                  <span>Created: {apiKey.created}</span>
                  <span>Last used: {apiKey.lastUsed}</span>
                </div>
                <div className="flex space-x-2">
                  {apiKey.permissions.map((permission) => (
                    <span
                      key={permission}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* API Documentation */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">API Documentation</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center mb-3">
              <Code className="w-6 h-6 text-[#b892ff] mr-3" />
              <h4 className="font-medium text-gray-900">API Reference</h4>
            </div>
            <p className="text-sm text-gray-500 mb-3">
              Complete documentation for all API endpoints
            </p>
            <button className="flex items-center text-[#b892ff] hover:text-[#a075ff] text-sm font-medium">
              View Documentation
              <ExternalLink className="w-4 h-4 ml-1" />
            </button>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center mb-3">
              <Download className="w-6 h-6 text-[#b892ff] mr-3" />
              <h4 className="font-medium text-gray-900">SDK Downloads</h4>
            </div>
            <p className="text-sm text-gray-500 mb-3">
              Official SDKs for popular programming languages
            </p>
            <button className="flex items-center text-[#b892ff] hover:text-[#a075ff] text-sm font-medium">
              Download SDKs
              <ExternalLink className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Rate Limits */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">API Usage & Limits</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">1,247</p>
            <p className="text-sm text-gray-500">Requests this month</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">10,000</p>
            <p className="text-sm text-gray-500">Monthly limit</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">87.5%</p>
            <p className="text-sm text-gray-500">Remaining</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">API Usage</span>
            <span className="text-sm text-gray-500">1,247 / 10,000</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-[#b892ff] h-3 rounded-full" style={{ width: '12.5%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'security':
        return renderSecuritySettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'billing':
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Settings</h3>
            <p className="text-gray-600">Billing settings are managed in the Billing section.</p>
            <button className="mt-4 px-4 py-2 bg-[#b892ff] text-white rounded-lg hover:bg-[#a075ff] transition-colors">
              Go to Billing
            </button>
          </div>
        );
      case 'team':
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Management</h3>
            <p className="text-gray-600">Team management is handled in the Employees section.</p>
            <button className="mt-4 px-4 py-2 bg-[#b892ff] text-white rounded-lg hover:bg-[#a075ff] transition-colors">
              Go to Employees
            </button>
          </div>
        );
      case 'company':
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Company Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                <input
                  type="text"
                  defaultValue="Acme Corporation"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent">
                  <option>Technology</option>
                  <option>Finance</option>
                  <option>Healthcare</option>
                  <option>Education</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                  rows={3}
                  defaultValue="123 Business St, Suite 100, New York, NY 10001"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button className="px-4 py-2 bg-[#b892ff] text-white rounded-lg hover:bg-[#a075ff] transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        );
      case 'integrations':
        return renderIntegrationsSettings();
      case 'api':
        return renderApiSettings();
      case 'preferences':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Display Preferences</h3>
              <div className="space-y-4">
                <ToggleSwitch
                  enabled={darkMode}
                  onChange={setDarkMode}
                  label="Dark Mode"
                  description="Switch to dark theme"
                />
                <ToggleSwitch
                  enabled={true}
                  onChange={() => {}}
                  label="Compact View"
                  description="Show more content in less space"
                />
                <ToggleSwitch
                  enabled={false}
                  onChange={() => {}}
                  label="Auto-save Forms"
                  description="Automatically save form progress"
                />
              </div>
            </div>
          </div>
        );
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
          <p className="text-gray-600 mt-1">Manage your account, security, and application preferences</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Navigation */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
            <nav className="space-y-1">
              {settingsTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-[#b892ff] text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;