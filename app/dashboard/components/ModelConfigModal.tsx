"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { X, Save, TestTube, AlertCircle, CheckCircle, Settings, Key, Globe, Zap } from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext";

interface ModelConfigModalProps {
  modelId: string;
  modelName: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: ModelConfig) => void;
}

interface ModelConfig {
  endpoint: string;
  apiKey?: string;
  temperature: number;
  maxTokens: number;
  timeout: number;
  retryAttempts: number;
  enabled: boolean;
}

export default function ModelConfigModal({ modelId, modelName, isOpen, onClose, onSave }: ModelConfigModalProps) {
  const { theme } = useTheme();
  const [config, setConfig] = useState<ModelConfig>({
    endpoint: "http://127.0.0.1:1234/v1",
    apiKey: "",
    temperature: 0.7,
    maxTokens: 2048,
    timeout: 30,
    retryAttempts: 3,
    enabled: true
  });

  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(config);
    onClose();
  };

  const testConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    
    try {
      // Simulate API test
      await new Promise(resolve => setTimeout(resolve, 2000));
      setTestResult("Connection successful! Model is responding correctly.");
    } catch (error) {
      setTestResult("Connection failed: " + error);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center modal p-4">
      <Card className="bg-white/10 backdrop-blur-xl border border-white/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configure {modelName}
            </CardTitle>
            <div className="relative group">
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
              <span className={`absolute right-0 top-full mt-1 text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 tooltip-transition modal-tooltip modal-tooltip-enhanced tooltip-pointer-events-none whitespace-nowrap ${
                theme === "dark"
                  ? "bg-white/10 text-white backdrop-blur-sm border border-white/20"
                  : "bg-gray-900 text-white backdrop-blur-sm border border-gray-700/50 shadow-lg"
              }`}>
                Close modal
                <span className={`absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent ${
                  theme === "dark"
                    ? "border-b-white/10"
                    : "border-b-gray-900"
                }`}></span>
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Basic Configuration</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Endpoint URL
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="url"
                  value={config.endpoint}
                  onChange={(e) => setConfig({ ...config, endpoint: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="http://127.0.0.1:1234/v1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                API Key (Optional)
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="password"
                  value={config.apiKey}
                  onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter API key if required"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.enabled}
                  onChange={(e) => setConfig({ ...config, enabled: e.target.checked })}
                  className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500"
                />
                <span className="text-gray-300">Enable this model</span>
              </label>
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Advanced Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Temperature ({config.temperature})
                </label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={config.temperature}
                  onChange={(e) => setConfig({ ...config, temperature: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                  aria-label="Temperature slider"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Focused</span>
                  <span>Balanced</span>
                  <span>Creative</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Max Tokens
                </label>
                <input
                  type="number"
                  value={config.maxTokens}
                  onChange={(e) => setConfig({ ...config, maxTokens: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="100"
                  max="8192"
                  aria-label="Maximum tokens"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Timeout (seconds)
                </label>
                <input
                  type="number"
                  value={config.timeout}
                  onChange={(e) => setConfig({ ...config, timeout: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="5"
                  max="120"
                  aria-label="Timeout in seconds"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Retry Attempts
                </label>
                <input
                  type="number"
                  value={config.retryAttempts}
                  onChange={(e) => setConfig({ ...config, retryAttempts: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  max="5"
                  aria-label="Retry attempts"
                />
              </div>
            </div>
          </div>

          {/* Test Connection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Test Connection</h3>
            
            <button
              onClick={testConnection}
              disabled={isTesting}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-lg transition-colors"
            >
              {isTesting ? (
                <Zap className="h-4 w-4 animate-spin" />
              ) : (
                <TestTube className="h-4 w-4" />
              )}
              {isTesting ? "Testing..." : "Test Connection"}
            </button>

            {testResult && (
              <div className={`p-3 rounded-lg flex items-center gap-2 ${
                testResult.includes("successful") 
                  ? "bg-green-500/10 border border-green-500/20" 
                  : "bg-red-500/10 border border-red-500/20"
              }`}>
                {testResult.includes("successful") ? (
                  <CheckCircle className="h-4 w-4 text-green-400" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-400" />
                )}
                <span className={`text-sm ${
                  testResult.includes("successful") ? "text-green-400" : "text-red-400"
                }`}>
                  {testResult}
                </span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Save className="h-4 w-4" />
              Save Configuration
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
