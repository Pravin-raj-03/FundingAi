import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, ChevronRight, ChevronLeft, Map, CheckCircle2, Navigation } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SpotlightCard } from './ui/SpotlightCard';

const TOUR_STEPS = [
  {
    path: '/',
    title: "Welcome to Funding Intelligence",
    description: "Your central command for finding startup funding. Ask the AI Assistant about grants, or analyze policies instantly.",
    position: 'bottom-right' 
  },
  {
    path: '/chat',
    title: "AI Funding Assistant",
    description: "Ask complex questions like 'How do I apply for Startup India?' in English, Tamil, Hindi or Telugu. The AI analyzes real policies to give you accurate answers.",
    position: 'bottom-right'
  },
  {
    path: '/analyze',
    title: "Document Scanner",
    description: "Found a long policy PDF? Upload it here. Our AI extracts the key details like 'Amount', 'Deadline', and 'Eligibility' in seconds.",
    position: 'bottom-right'
  },
  {
    path: '/saved',
    title: "Track Your Applications",
    description: "Star interesting opportunities to save them here. Monitor deadlines and get alerts so you never miss a funding round.",
    position: 'bottom-right'
  }
];

export const VoiceTutorial: React.FC = () => {
  const { isTutorialOpen, setTutorialOpen } = useApp();
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle Navigation when step changes
  useEffect(() => {
    if (!isTutorialOpen) return;
    
    const targetPath = TOUR_STEPS[step].path;
    if (location.pathname !== targetPath) {
      navigate(targetPath);
    }
  }, [step, isTutorialOpen, navigate, location.pathname]);

  const handleNext = () => {
    if (step < TOUR_STEPS.length - 1) {
      setStep(prev => prev + 1);
    } else {
      setTutorialOpen(false);
      setStep(0); // Reset for next time
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    setTutorialOpen(false);
    setStep(0);
  };

  if (!isTutorialOpen) return null;

  const currentStep = TOUR_STEPS[step];
  const isLastStep = step === TOUR_STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex flex-col justify-end items-end p-6 sm:p-10">
      {/* Guide Card */}
      <div className={`w-full max-w-md pointer-events-auto transition-all duration-500 transform`}>
        <SpotlightCard className="bg-gray-900/95 backdrop-blur-md border-primary/50 shadow-2xl shadow-primary/20 animate-in slide-in-from-bottom-10 fade-in duration-500 border">
          
          {/* Header Badge */}
          <div className="absolute -top-3 left-6 px-3 py-1 bg-gradient-to-r from-primary to-blue-600 text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-lg border border-white/20 flex items-center gap-2">
            <Navigation className="w-3 h-3" />
            App Tour • {step + 1}/{TOUR_STEPS.length}
          </div>

          <button 
            onClick={handleSkip}
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white transition-colors hover:bg-white/10 rounded-full"
            title="End Tour"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6 pt-8">
            {/* Content */}
            <div className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/20 rounded-lg">
                        <Map className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold text-white font-display">
                        {currentStep.title}
                    </h2>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed pl-1">
                    {currentStep.description}
                </p>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between border-t border-gray-800 pt-4 mt-2">
              <button 
                onClick={handlePrev}
                disabled={step === 0}
                className={`flex items-center text-xs font-medium transition-colors ${step === 0 ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 hover:text-white'}`}
              >
                <ChevronLeft className="w-3 h-3 mr-1" />
                Prev
              </button>

              <div className="flex gap-1.5">
                {TOUR_STEPS.map((_, i) => (
                    <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === step ? 'w-4 bg-primary' : 'w-1 bg-gray-700'}`} />
                ))}
              </div>

              <button 
                onClick={handleNext}
                className="flex items-center px-4 py-2 bg-white text-gray-950 rounded-lg text-xs font-bold hover:bg-gray-200 transition-all shadow-lg hover:scale-105"
              >
                {isLastStep ? 'Finish' : 'Next'}
                {isLastStep ? <CheckCircle2 className="w-3 h-3 ml-2" /> : <ChevronRight className="w-3 h-3 ml-1" />}
              </button>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
};