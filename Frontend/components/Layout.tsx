import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Star, FileText, MessageSquare, Menu, X, Settings, Bell, WifiOff } from 'lucide-react';
import { VoiceTutorial } from './VoiceTutorial';
import { useApp } from '../context/AppContext';

const NavLink = ({ to, icon: Icon, label, active }: { to: string; icon: any; label: string; active: boolean }) => (
  <Link 
    to={to} 
    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors
      ${active 
        ? 'text-primary bg-primary/10' 
        : 'text-gray-400 hover:text-white hover:bg-gray-800'
      }`}
  >
    <Icon className="w-4 h-4 mr-2" />
    {label}
  </Link>
);

export const Layout: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { isOnline } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100 font-sans">
      <VoiceTutorial />
      
      {/* Offline Banner */}
      {!isOnline && (
        <div className="bg-red-900/80 backdrop-blur text-white text-xs font-bold text-center py-2 flex items-center justify-center gap-2 sticky top-0 z-[60] animate-in slide-in-from-top-full">
            <WifiOff className="w-3 h-3" />
            OFFLINE MODE: Using stored data. AI features may be limited.
        </div>
      )}

      {/* Navbar */}
      <nav className={`sticky ${!isOnline ? 'top-8' : 'top-0'} z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800 transition-all`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                  <span className="text-white font-display font-extrabold text-lg">Fi</span>
                </div>
                <span className="text-lg font-display font-bold text-white hidden sm:block tracking-tight">Funding Intelligence</span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-2">
              <NavLink to="/" icon={Home} label="Home" active={location.pathname === '/'} />
              <NavLink to="/chat" icon={MessageSquare} label="AI Chat" active={location.pathname === '/chat'} />
              <NavLink to="/saved" icon={Star} label="Saved" active={location.pathname === '/saved'} />
              <NavLink to="/analyze" icon={FileText} label="Analyze" active={location.pathname === '/analyze'} />
              
              <div className="w-px h-6 bg-gray-800 mx-2"></div>
              
              <NavLink to="/notifications" icon={Bell} label="Alerts" active={location.pathname === '/notifications'} />
              <NavLink to="/settings" icon={Settings} label="Settings" active={location.pathname === '/settings'} />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-400 hover:bg-gray-800 hover:text-white"
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800 bg-gray-950 p-2 space-y-1">
            <NavLink to="/" icon={Home} label="Home" active={location.pathname === '/'} />
            <NavLink to="/chat" icon={MessageSquare} label="AI Chat" active={location.pathname === '/chat'} />
            <NavLink to="/saved" icon={Star} label="Saved" active={location.pathname === '/saved'} />
            <NavLink to="/analyze" icon={FileText} label="Analyze" active={location.pathname === '/analyze'} />
            <NavLink to="/notifications" icon={Bell} label="Alerts" active={location.pathname === '/notifications'} />
            <NavLink to="/settings" icon={Settings} label="Settings" active={location.pathname === '/settings'} />
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};