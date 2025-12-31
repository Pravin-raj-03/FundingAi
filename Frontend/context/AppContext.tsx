import React, { createContext, useContext, useState, useEffect } from 'react';
import { FundingItem } from '../types';

interface AppContextType {
  savedItems: FundingItem[];
  toggleSave: (item: FundingItem) => void;
  isSaved: (id: string) => boolean;
  language: string;
  setLanguage: (lang: string) => void;
  isTutorialOpen: boolean;
  setTutorialOpen: (isOpen: boolean) => void;
  isOnline: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedItems, setSavedItems] = useState<FundingItem[]>([]);
  const [language, setLanguage] = useState('en');
  const [isTutorialOpen, setTutorialOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('funding_saved_items');
    if (saved) {
      try {
        setSavedItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved items", e);
      }
    }

    // Auto-start tutorial for new users
    const hasSeenTutorial = localStorage.getItem('funding_tutorial_seen_v1');
    if (!hasSeenTutorial) {
        const timer = setTimeout(() => {
            setTutorialOpen(true);
        }, 1000); // 1s delay to let app load
        return () => clearTimeout(timer);
    }
  }, []);

  // Network Status Listeners
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('funding_saved_items', JSON.stringify(savedItems));
  }, [savedItems]);

  const toggleSave = (item: FundingItem) => {
    setSavedItems(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.filter(i => i.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const isSaved = (id: string) => {
    return savedItems.some(i => i.id === id);
  };

  const handleSetTutorialOpen = (isOpen: boolean) => {
      setTutorialOpen(isOpen);
      if (!isOpen) {
          // Mark as seen when closed
          localStorage.setItem('funding_tutorial_seen_v1', 'true');
      }
  };

  return (
    <AppContext.Provider value={{ 
        savedItems, 
        toggleSave, 
        isSaved, 
        language, 
        setLanguage, 
        isTutorialOpen, 
        setTutorialOpen: handleSetTutorialOpen,
        isOnline 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};