import React, { useState } from 'react';
import { Star, ExternalLink, Building2, MapPin, Tag, Flag, MessageSquare, Percent, ChevronDown, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { FundingItem } from '../types';
import { useApp } from '../context/AppContext';
import { SpotlightCard } from './ui/SpotlightCard';

interface Props {
  item: FundingItem;
}

export const FundingCard: React.FC<Props> = ({ item }) => {
  const { toggleSave, isSaved } = useApp();
  const saved = isSaved(item.id);
  const [showTest, setShowTest] = useState(false);
  const [testing, setTesting] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const handleAction = (action: string) => {
    alert(`${action} recorded for ${item.title}`);
  };

  const runAcceptabilityTest = () => {
      setTesting(true);
      setScore(null);
      // Simulate calculation
      setTimeout(() => {
          // Generate a pseudo-random score based on string length to be consistent per card
          const randomBase = item.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
          const calculatedScore = 40 + (randomBase % 55); // Score between 40 and 95
          setScore(calculatedScore);
          setTesting(false);
      }, 2000);
  };

  return (
    <SpotlightCard className="group border-gray-800 bg-gray-900/50 backdrop-blur-sm w-full max-w-md mx-auto transition-all duration-500">
      <div className="p-5 flex flex-col h-full relative overflow-hidden">
        {/* Type Badge */}
        <div className="absolute top-0 right-0 p-3">
             <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-bl-xl rounded-tr-xl
              ${item.type === 'Govt' ? 'bg-blue-500/20 text-blue-400' : 
                item.type === 'VC' ? 'bg-purple-500/20 text-purple-400' :
                item.type === 'Subsidy' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
              {item.type}
            </span>
        </div>

        <div className="flex justify-between items-start mb-3 pr-10">
          <div>
            <span className="inline-flex items-center text-xs font-medium text-gray-500 mb-1">
              {item.stage} Stage
            </span>
            <h3 className="text-lg font-bold text-white leading-tight group-hover:text-primary transition-colors">
              {item.title}
            </h3>
          </div>
        </div>

        <div className="flex items-baseline mb-4">
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">{item.amount}</span>
        </div>

        <div className="space-y-2 mb-4 flex-grow border-l-2 border-gray-800 pl-3">
          <div className="flex items-center text-sm text-gray-400">
            <Building2 className="w-3.5 h-3.5 mr-2 text-primary" />
            {item.investor}
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <MapPin className="w-3.5 h-3.5 mr-2 text-secondary" />
            {item.location}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags.slice(0, 3).map(tag => (
            <span key={tag} className="inline-flex items-center text-[10px] font-medium text-gray-400 bg-gray-800/50 px-2 py-1 rounded-md border border-gray-700/50">
              <Tag className="w-2.5 h-2.5 mr-1 opacity-50" />
              {tag}
            </span>
          ))}
        </div>

        {/* Acceptability Rate Test Section */}
        <div className="mb-4">
            <button 
                onClick={() => { setShowTest(!showTest); if(!score && !showTest) runAcceptabilityTest(); }}
                className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-between transition-colors
                ${showTest ? 'bg-gray-800 text-white' : 'bg-gray-900/50 text-gray-400 hover:bg-gray-800 hover:text-white'}`}
            >
                <div className="flex items-center gap-2">
                    <Percent className="w-3.5 h-3.5" />
                    Acceptance Rate Test
                </div>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showTest ? 'rotate-180' : ''}`} />
            </button>

            {showTest && (
                <div className="mt-2 p-3 bg-black/40 rounded-lg border border-gray-800 animate-in fade-in slide-in-from-top-2">
                    {testing ? (
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-gray-400">
                                <span>Analyzing criteria...</span>
                                <span className="animate-pulse">Running</span>
                            </div>
                            <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full bg-primary animate-progress origin-left w-full"></div>
                            </div>
                        </div>
                    ) : score ? (
                        <div>
                             <div className="flex items-end justify-between mb-1">
                                <span className="text-xs text-gray-400">Probability</span>
                                <span className={`text-lg font-bold ${score > 70 ? 'text-green-400' : score > 40 ? 'text-yellow-400' : 'text-red-400'}`}>
                                    {score}% Match
                                </span>
                             </div>
                             <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden mb-3">
                                <div 
                                    className={`h-full rounded-full transition-all duration-1000 ${score > 70 ? 'bg-green-500' : score > 40 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                                    style={{ width: `${score}%` }}
                                ></div>
                             </div>
                             <div className="grid grid-cols-1 gap-1">
                                <div className="flex items-center gap-2 text-[10px] text-gray-300">
                                    <CheckCircle className="w-3 h-3 text-green-500" /> Location matches criteria
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-gray-300">
                                    <CheckCircle className="w-3 h-3 text-green-500" /> Sector alignment verified
                                </div>
                                {score < 80 && (
                                    <div className="flex items-center gap-2 text-[10px] text-gray-300">
                                        <AlertTriangle className="w-3 h-3 text-yellow-500" /> High competition ratio
                                    </div>
                                )}
                             </div>
                             <button 
                                onClick={runAcceptabilityTest}
                                className="mt-3 w-full text-[10px] text-gray-500 hover:text-white underline decoration-gray-700"
                            >
                                Re-run test
                            </button>
                        </div>
                    ) : null}
                </div>
            )}
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-800 mt-auto gap-2">
            <div className="flex gap-2">
                 <button 
                    onClick={() => handleAction('Report Fraud')}
                    title="Report Fraud"
                    className="p-2 rounded-lg text-gray-500 hover:bg-red-900/20 hover:text-red-400 transition-colors"
                >
                    <Flag className="w-4 h-4" />
                </button>
                 <button 
                    onClick={() => handleAction('Feedback')}
                    title="Give Feedback"
                    className="p-2 rounded-lg text-gray-500 hover:bg-gray-800 hover:text-gray-300 transition-colors"
                >
                    <MessageSquare className="w-4 h-4" />
                </button>
            </div>

            <div className="flex gap-2">
                <button 
                    onClick={(e) => {
                    e.preventDefault();
                    toggleSave(item);
                    }}
                    className={`p-2 rounded-lg transition-colors border ${saved ? 'border-yellow-500/50 bg-yellow-500/10 text-yellow-400' : 'border-gray-700 bg-gray-800 text-gray-400 hover:text-white'}`}
                >
                    <Star className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
                </button>
                <a 
                    href={item.evidence_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center px-3 py-2 rounded-lg bg-primary text-white text-xs font-bold hover:bg-blue-600 transition-all shadow-lg shadow-primary/20"
                >
                    Apply <ExternalLink className="w-3 h-3 ml-1" />
                </a>
            </div>
        </div>
      </div>
    </SpotlightCard>
  );
};