import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { SavedPage } from './pages/Saved';
import { AnalyzePage } from './pages/Analyze';
import { ChatPage } from './pages/Chat';
import { SettingsPage } from './pages/Settings';
import { NotificationsPage } from './pages/Notifications';

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="saved" element={<SavedPage />} />
            <Route path="analyze" element={<AnalyzePage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </AppProvider>
  );
};

export default App;