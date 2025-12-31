import React from 'react';
import { useApp } from '../context/AppContext';
import { Globe, Bell, Shield, Moon } from 'lucide-react';
import { SpotlightCard } from '../components/ui/SpotlightCard';

export const SettingsPage: React.FC = () => {
  const { language, setLanguage } = useApp();

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ta', label: 'Tamil (தமிழ்)' },
    { code: 'hi', label: 'Hindi (हिंदी)' },
    { code: 'te', label: 'Telugu (తెలుగు)' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
      <p className="text-gray-400 mb-8">Customize your Funding Intelligence experience.</p>

      <div className="grid gap-6">
        
        {/* Language */}
        <SpotlightCard className="p-6 border-gray-800 bg-gray-900/50">
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Language</h3>
                <p className="text-sm text-gray-400 mt-1">Select your preferred language for chat and results.</p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex gap-3 flex-wrap">
             {languages.map(lang => (
                 <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                        language === lang.code
                        ? 'bg-primary text-white border-primary' 
                        : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-600'
                    }`}
                 >
                    {lang.label}
                 </button>
             ))}
          </div>
        </SpotlightCard>

        {/* Notifications (Mock) */}
        <SpotlightCard className="p-6 border-gray-800 bg-gray-900/50">
            <div className="flex items-center justify-between">
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-400">
                        <Bell className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white">Alerts</h3>
                        <p className="text-sm text-gray-400">Get notified when new funding matches your profile.</p>
                    </div>
                </div>
                <div className="w-12 h-6 bg-gray-700 rounded-full relative cursor-not-allowed opacity-60">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"></div>
                </div>
            </div>
        </SpotlightCard>

        {/* Theme (Mock - Locked to Dark) */}
        <SpotlightCard className="p-6 border-gray-800 bg-gray-900/50">
            <div className="flex items-center justify-between">
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                        <Moon className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white">Theme</h3>
                        <p className="text-sm text-gray-400">Currently locked to 'Futuristic Dark'.</p>
                    </div>
                </div>
                 <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">Locked</span>
            </div>
        </SpotlightCard>

      </div>
    </div>
  );
};