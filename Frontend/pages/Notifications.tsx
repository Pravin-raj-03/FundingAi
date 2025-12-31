import React from 'react';
import { Bell, Calendar, DollarSign, Info, CheckCircle2, AlertTriangle } from 'lucide-react';
import { SpotlightCard } from '../components/ui/SpotlightCard';

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: 'deadline',
    title: 'Deadline Approaching: TN EV Subsidy',
    message: 'The application window for the Tamil Nadu Electric Vehicle Subsidy closes in 3 days. Ensure your documents are ready.',
    time: '2 hours ago',
    read: false,
    priority: 'high'
  },
  {
    id: 2,
    type: 'funding',
    title: 'New Grant Match Found',
    message: 'We found a new "AgriTech Innovation Grant" that matches your profile. Funding amount: ₹50L.',
    time: '1 day ago',
    read: false,
    priority: 'medium'
  },
  {
    id: 3,
    type: 'system',
    title: 'System Upgrade: Felix Felicis v2.0',
    message: 'Our AI engine has been upgraded. You can now search using voice commands in Hindi and Tamil.',
    time: '3 days ago',
    read: true,
    priority: 'low'
  },
  {
    id: 4,
    type: 'update',
    title: 'Policy Change Alert',
    message: 'The GST exemption rules for startups have been updated by the Ministry of Finance.',
    time: '1 week ago',
    read: true,
    priority: 'medium'
  }
];

export const NotificationsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-[80vh]">
      <div className="flex items-center justify-between mb-8">
        <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                <Bell className="w-8 h-8 text-primary" />
                Notifications
            </h1>
            <p className="text-gray-400">Stay updated on deadlines, new funds, and system alerts.</p>
        </div>
        <button className="text-sm text-primary hover:text-white transition-colors">
            Mark all as read
        </button>
      </div>

      <div className="space-y-4">
        {MOCK_NOTIFICATIONS.map((notification) => (
          <SpotlightCard 
            key={notification.id} 
            className={`p-5 border-gray-800 bg-gray-900/50 backdrop-blur-sm transition-all ${!notification.read ? 'border-l-4 border-l-primary' : ''}`}
          >
            <div className="flex items-start gap-4">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                ${notification.type === 'deadline' ? 'bg-red-500/10 text-red-400' : 
                  notification.type === 'funding' ? 'bg-green-500/10 text-green-400' : 
                  notification.type === 'system' ? 'bg-blue-500/10 text-blue-400' : 'bg-gray-700/50 text-gray-400'}
              `}>
                {notification.type === 'deadline' && <AlertTriangle className="w-5 h-5" />}
                {notification.type === 'funding' && <DollarSign className="w-5 h-5" />}
                {notification.type === 'system' && <CheckCircle2 className="w-5 h-5" />}
                {notification.type === 'update' && <Info className="w-5 h-5" />}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                    <h3 className={`font-semibold text-lg ${!notification.read ? 'text-white' : 'text-gray-400'}`}>
                        {notification.title}
                    </h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{notification.time}</span>
                </div>
                <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                    {notification.message}
                </p>
                {notification.type === 'funding' && (
                    <button className="mt-3 text-xs font-bold bg-primary/10 text-primary px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-colors">
                        View Details
                    </button>
                )}
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">You're all caught up! ⚡</p>
      </div>
    </div>
  );
};
