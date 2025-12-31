import React, { useState, useEffect } from 'react';
import { Sparkles, BrainCircuit, Search, Database } from 'lucide-react';

export const ThinkingIndicator: React.FC = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { text: "Analyzing query intent...", icon: BrainCircuit },
    { text: "Scanning govt databases...", icon: Database },
    { text: "Filtering VC matches...", icon: Search },
    { text: "Verifying eligibility...", icon: Sparkles },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % steps.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = steps[step].icon;

  return (
    <div className="flex items-center space-x-3 p-4 bg-gray-900/50 border border-gray-800 rounded-2xl w-fit animate-in fade-in duration-300">
      <div className="relative">
        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
          <CurrentIcon className="w-5 h-5 text-primary animate-pulse" />
        </div>
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-200 w-48 truncate transition-all duration-300">
          {steps[step].text}
        </span>
        <div className="h-1 w-full bg-gray-800 rounded-full mt-1 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-secondary animate-progress w-full origin-left" />
        </div>
      </div>
    </div>
  );
};
