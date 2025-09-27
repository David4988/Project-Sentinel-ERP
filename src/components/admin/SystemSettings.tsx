import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Save, RefreshCw } from "lucide-react";

const defaultSettings = {
  theme: "light",
  notifications: true,
  dataSharing: true,
  autoBackup: false,
};

const SystemSettings: React.FC = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [saved, setSaved] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type, value } = e.target;
    let newValue: string | boolean = value;
    if (type === "checkbox") {
      newValue = (e.target as HTMLInputElement).checked;
    }
    setSettings((prev) => ({
      ...prev,
      [name]: newValue,
    }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    // Simulate save logic (API call, etc.)
  };

  const handleReset = () => {
    setSettings(defaultSettings);
    setSaved(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            System Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Theme
                </label>
                <select
                  name="theme"
                  value={settings.theme}
                  onChange={handleChange}
                  className="border rounded px-3 py-2 w-full"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
              <div className="flex-1 flex items-center gap-2 mt-6 md:mt-0">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={settings.notifications}
                  onChange={handleChange}
                  className="mr-2"
                  id="notifications"
                />
                <label
                  htmlFor="notifications"
                  className="text-sm font-medium text-gray-700"
                >
                  Enable Notifications
                </label>
              </div>
              <div className="flex-1 flex items-center gap-2 mt-6 md:mt-0">
                <input
                  type="checkbox"
                  name="dataSharing"
                  checked={settings.dataSharing}
                  onChange={handleChange}
                  className="mr-2"
                  id="dataSharing"
                />
                <label
                  htmlFor="dataSharing"
                  className="text-sm font-medium text-gray-700"
                >
                  Allow Data Sharing
                </label>
              </div>
              <div className="flex-1 flex items-center gap-2 mt-6 md:mt-0">
                <input
                  type="checkbox"
                  name="autoBackup"
                  checked={settings.autoBackup}
                  onChange={handleChange}
                  className="mr-2"
                  id="autoBackup"
                />
                <label
                  htmlFor="autoBackup"
                  className="text-sm font-medium text-gray-700"
                >
                  Enable Auto Backup
                </label>
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <Button
                type="button"
                onClick={handleSave}
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Save Settings
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" /> Reset to Default
              </Button>
              {saved && (
                <span className="text-green-600 font-medium ml-4">
                  Settings saved!
                </span>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemSettings;
