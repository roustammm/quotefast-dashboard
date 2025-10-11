"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { User, Bell, Shield, Key, Palette, Globe, Save, Eye, EyeOff, Copy, Trash2, Plus, Edit, Zap, Brain } from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext";
import { useAIPersonalization } from "../../../contexts/AIPersonalizationContext";
import { useState } from "react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { onboardingData } = useAIPersonalization();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  const handleThemeChange = (newTheme: string) => {
    setSelectedTheme(newTheme as "light" | "dark" | "system");
    setTheme(newTheme as "light" | "dark" | "system");
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-gray-400">Manage your account and preferences</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
          <Save className="h-4 w-4" />
          Save Changes
        </button>
      </div>

      {/* Settings Tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {["Profile", "Notifications", "Security", "API Keys", "Appearance", "AI Personalisatie", "System"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              tab === "Profile" 
                ? "bg-blue-600 text-white" 
                : "bg-white/10 hover:bg-white/20 text-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Profile Settings */}
      <Card className="bg-white/10 backdrop-blur-xl border border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                SJ
              </div>
              <button 
                className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                aria-label="Edit profile picture"
                title="Edit profile picture"
              >
                <Edit className="h-3 w-3" />
              </button>
            </div>
            <div className="flex-1">
              <h3 className="text-white text-lg font-semibold">Sarah Johnson</h3>
              <p className="text-gray-400">sarah.johnson@company.com</p>
              <p className="text-gray-500 text-sm">Project Manager • Joined Jan 15, 2023</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
              <input
                id="firstName"
                type="text"
                defaultValue="Sarah"
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
              <input
                id="lastName"
                type="text"
                defaultValue="Johnson"
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                id="email"
                type="email"
                defaultValue="sarah.johnson@company.com"
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
              <input
                id="phone"
                type="tel"
                defaultValue="+1 (555) 123-4567"
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="bg-white/10 backdrop-blur-xl border border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "Email notifications", description: "Receive updates via email", enabled: true },
            { label: "Push notifications", description: "Get real-time alerts", enabled: true },
            { label: "SMS alerts", description: "Critical updates via SMS", enabled: false },
            { label: "Project updates", description: "Notifications about project changes", enabled: true },
            { label: "Team mentions", description: "When someone mentions you", enabled: true },
            { label: "System maintenance", description: "Scheduled maintenance alerts", enabled: true }
          ].map((notification, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div>
                <h4 className="text-white font-medium">{notification.label}</h4>
                <p className="text-gray-400 text-sm">{notification.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={notification.enabled}
                  className="sr-only peer"
                  aria-label={`Toggle ${notification.label} notifications`}
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="bg-white/10 backdrop-blur-xl border border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter current password"
                className="w-full px-3 py-2 pr-10 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Eye className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full px-3 py-2 pr-10 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <EyeOff className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full px-3 py-2 pr-10 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <EyeOff className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <div>
              <h4 className="text-yellow-400 font-medium">Two-Factor Authentication</h4>
              <p className="text-gray-300 text-sm">Add an extra layer of security to your account</p>
            </div>
            <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors">
              Enable 2FA
            </button>
          </div>
        </CardContent>
      </Card>

      {/* API Keys */}
      <Card className="bg-white/10 backdrop-blur-xl border border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Key className="h-5 w-5" />
            API Keys
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Personal Access Token</h4>
              <p className="text-gray-400 text-sm">For accessing the API from external applications</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              <Plus className="h-4 w-4" />
              Generate New
            </button>
          </div>

          <div className="space-y-3">
            {[
              { name: "Production API Key", key: "sk-prod-...abc123", created: "Jan 10, 2024", lastUsed: "2 hours ago" },
              { name: "Development API Key", key: "sk-dev-...xyz789", created: "Jan 5, 2024", lastUsed: "1 day ago" }
            ].map((apiKey, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex-1">
                  <h5 className="text-white font-medium">{apiKey.name}</h5>
                  <p className="text-gray-400 text-sm font-mono">{apiKey.key}</p>
                  <p className="text-gray-500 text-xs">Created {apiKey.created} • Last used {apiKey.lastUsed}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    aria-label="Copy API key"
                    title="Copy API key"
                  >
                    <Copy className="h-4 w-4 text-gray-400" />
                  </button>
                  <button 
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    aria-label="Delete API key"
                    title="Delete API key"
                  >
                    <Trash2 className="h-4 w-4 text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card className="bg-white/10 backdrop-blur-xl border border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Appearance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Theme</label>
            <div className="flex items-center gap-4">
              {["Light", "Dark", "System"].map((themeOption) => (
                <label key={themeOption} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="theme"
                    value={themeOption.toLowerCase()}
                    checked={selectedTheme === themeOption.toLowerCase()}
                    onChange={() => handleThemeChange(themeOption.toLowerCase())}
                    className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 focus:ring-blue-500"
                  />
                  <span className="text-gray-300">{themeOption}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-300 mb-2">Language</label>
            <select 
              id="language"
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Select language"
            >
              <option value="en">English</option>
              <option value="nl">Nederlands</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>

          <div>
            <label htmlFor="timezone" className="block text-sm font-medium text-gray-300 mb-2">Timezone</label>
            <select 
              id="timezone"
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Select timezone"
            >
              <option value="UTC">UTC</option>
              <option value="Europe/Amsterdam">Europe/Amsterdam</option>
              <option value="Europe/Brussels">Europe/Brussels</option>
              <option value="America/New_York">America/New_York</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* AI Personalisatie Sectie */}
      {onboardingData && (
        <Card className="bg-white/10 backdrop-blur-xl border border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Personalisatie
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Onboarding Data Overview */}
            <div className="bg-gradient-to-r from-blue-50/10 to-purple-50/10 rounded-lg p-4 border border-blue-200/20">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-5 w-5 text-blue-400" />
                <h4 className="text-white font-medium">Jouw Onboarding Data</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Bedrijf:</span>
                  <span className="text-white ml-2">{onboardingData.companyName}</span>
                </div>
                <div>
                  <span className="text-gray-400">Branche:</span>
                  <span className="text-white ml-2">{onboardingData.industry}</span>
                </div>
                <div>
                  <span className="text-gray-400">Teamgrootte:</span>
                  <span className="text-white ml-2">{onboardingData.teamSize}</span>
                </div>
                <div>
                  <span className="text-gray-400">Ervaring:</span>
                  <span className="text-white ml-2">{onboardingData.experienceLevel}</span>
                </div>
              </div>
            </div>

            {/* AI Features Preferences */}
            <div>
              <h4 className="text-white font-medium mb-3">AI Features Voorkeuren</h4>
              <div className="space-y-3">
                {onboardingData.aiFeatureInterests.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Workflow Preferences */}
            <div>
              <h4 className="text-white font-medium mb-3">Workflow Voorkeuren</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-white/5 rounded-lg">
                  <span className="text-gray-400 text-sm">Automatisering Niveau:</span>
                  <div className="text-white font-medium">{onboardingData.workflowPreferences.automationLevel}</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <span className="text-gray-400 text-sm">Rapportage Frequentie:</span>
                  <div className="text-white font-medium">{onboardingData.workflowPreferences.reportingFrequency}</div>
                </div>
              </div>
              <div className="mt-3">
                <span className="text-gray-400 text-sm">Gewenste Integraties:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {onboardingData.workflowPreferences.integrationNeeds.map((integration, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-600/20 text-blue-300 rounded-full text-xs">
                      {integration}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Settings Toggles */}
            <div>
              <h4 className="text-white font-medium mb-3">AI Instellingen</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <div className="text-white font-medium">AI Offerte Generator</div>
                    <div className="text-gray-400 text-sm">Automatische prijsberekening en suggesties</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      defaultChecked 
                      aria-label="AI Offerte Generator toggle"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <div className="text-white font-medium">Smart Templates</div>
                    <div className="text-gray-400 text-sm">Context-aware template suggesties</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      defaultChecked 
                      aria-label="Smart Templates toggle"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <div className="text-white font-medium">Predictive Analytics</div>
                    <div className="text-gray-400 text-sm">Voorspel conversies en trends</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      aria-label="Predictive Analytics toggle"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Update Preferences Button */}
            <div className="flex justify-end">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                <Edit className="h-4 w-4" />
                Voorkeuren Bijwerken
              </button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
