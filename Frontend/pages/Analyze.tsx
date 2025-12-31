import React, { useState, useRef } from 'react';
import { Upload, FileText, Check, Loader2, AlertCircle, Globe, Link as LinkIcon, File as FileIcon, Search, Briefcase, TrendingUp, AlertTriangle } from 'lucide-react';
import { analyzeDocumentMock, analyzeUrlMock, analyzeInvestorMock } from '../services/mockAnalyzeService';
import { FundingCard } from '../components/FundingCard';
import { FundingItem, InvestorProfile } from '../types';
import { SpotlightCard } from '../components/ui/SpotlightCard';

export const AnalyzePage: React.FC = () => {
  const [mode, setMode] = useState<'upload' | 'url' | 'investor'>('upload');
  
  // File State
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  
  // URL & Investor State
  const [inputValue, setInputValue] = useState('');

  // Common State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<FundingItem | null>(null);
  const [investorResult, setInvestorResult] = useState<InvestorProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetState = () => {
    setResult(null);
    setInvestorResult(null);
    setError(null);
    setInputValue('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      resetState();

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const processAnalysis = (jsonString: string, source: string) => {
    try {
        const cleanJson = jsonString.replace(/```json/g, '').replace(/```/g, '').trim();
        const data = JSON.parse(cleanJson);
        
        const newItem: FundingItem = {
          id: Date.now().toString(),
          title: data.title || "Unknown Scheme",
          amount: data.amount || "Undisclosed",
          amountValue: 0,
          stage: "Analyzed",
          location: "Extracted",
          investor: data.investor || "Unknown",
          evidence_url: source.startsWith('http') ? source : '#',
          tags: data.tags || ["Extracted"],
          type: 'Govt',
          description: data.summary
        };
        setResult(newItem);
    } catch (e) {
        setError("Could not parse extracted data.");
    }
  };

  const handleAnalyzeFile = async () => {
    if (!preview || !file) return;
    setIsAnalyzing(true);
    resetState();

    try {
      const base64Data = preview.split(',')[1];
      const mimeType = file.type;
      const jsonString = await analyzeDocumentMock(base64Data, mimeType);
      
      if (jsonString) {
        processAnalysis(jsonString, "Uploaded Document");
      } else {
        setError("Could not extract meaningful funding data.");
      }
    } catch (err) {
      setError("Failed to analyze document.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAnalyzeUrl = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;
    
    setIsAnalyzing(true);
    resetState();

    try {
      const jsonString = await analyzeUrlMock(inputValue);
      if (jsonString) {
        processAnalysis(jsonString, inputValue);
      } else {
        setError("Could not extract funding data from this URL.");
      }
    } catch (err) {
      setError("Failed to scan website.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAnalyzeInvestor = async (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      if (!inputValue.trim()) return;

      setIsAnalyzing(true);
      resetState();

      try {
          const profile = await analyzeInvestorMock(inputValue);
          setInvestorResult(profile);
      } catch (err) {
          setError("Could not find investor data.");
      } finally {
          setIsAnalyzing(false);
      }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
        <h1 className="text-4xl font-display font-bold text-white mb-3">
          Funding Source <span className="text-primary">Intelligence</span>
        </h1>
        <p className="text-gray-400 max-w-lg mx-auto text-lg">
          Extract policy details, scan websites, or deep-dive into investor portfolios.
        </p>
      </div>

      {/* Toggle */}
      <div className="flex justify-center mb-8 overflow-x-auto no-scrollbar">
        <div className="bg-gray-900 p-1 rounded-xl border border-gray-800 flex gap-1 shadow-lg min-w-max">
            <button 
                onClick={() => { setMode('upload'); resetState(); }} 
                className={`px-4 md:px-6 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${mode === 'upload' ? 'bg-gray-800 text-white shadow-sm ring-1 ring-white/10' : 'text-gray-400 hover:text-white'}`}
            >
                <Upload className="w-4 h-4" /> Upload
            </button>
            <button 
                onClick={() => { setMode('url'); resetState(); }} 
                className={`px-4 md:px-6 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${mode === 'url' ? 'bg-gray-800 text-white shadow-sm ring-1 ring-white/10' : 'text-gray-400 hover:text-white'}`}
            >
                <Globe className="w-4 h-4" /> Website
            </button>
            <button 
                onClick={() => { setMode('investor'); resetState(); }} 
                className={`px-4 md:px-6 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${mode === 'investor' ? 'bg-gray-800 text-white shadow-sm ring-1 ring-white/10' : 'text-gray-400 hover:text-white'}`}
            >
                <Briefcase className="w-4 h-4" /> Investor Check
            </button>
        </div>
      </div>

      <SpotlightCard className="bg-gray-900/50 border-gray-800 p-8 shadow-2xl">
        
        {/* FILE UPLOAD MODE */}
        {mode === 'upload' && (
            <div className="animate-in fade-in zoom-in-95 duration-300">
                <div 
                    className={`border-2 border-dashed rounded-xl p-10 text-center transition-colors cursor-pointer group
                        ${file ? 'border-primary/50 bg-primary/5' : 'border-gray-700 hover:border-gray-500 hover:bg-gray-800/50'}
                    `}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={handleFileChange} 
                        className="hidden" 
                        accept="image/png, image/jpeg, image/webp, application/pdf"
                    />
                    
                    {preview ? (
                        <div className="relative inline-block group-hover:scale-[1.02] transition-transform">
                            <img src={preview} alt="Preview" className="max-h-64 rounded-lg shadow-xl border border-gray-700" />
                            <button 
                                onClick={(e) => {
                                e.stopPropagation();
                                setFile(null);
                                setPreview(null);
                                resetState();
                                }}
                                className="absolute -top-3 -right-3 bg-gray-800 text-red-400 border border-red-900/30 rounded-full p-1.5 shadow-lg hover:bg-gray-700"
                            >
                                <AlertCircle className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 bg-gray-800/50 text-gray-400 group-hover:text-primary group-hover:bg-primary/10 rounded-full flex items-center justify-center mb-6 transition-colors">
                                <FileIcon className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-medium text-white mb-2">Drop policy document here</h3>
                            <p className="text-sm text-gray-500">Supports PDF, PNG, JPG (Max 10MB)</p>
                        </div>
                    )}
                </div>

                {file && !result && (
                    <div className="mt-8 flex justify-center">
                        <button
                        onClick={handleAnalyzeFile}
                        disabled={isAnalyzing}
                        className="bg-white text-gray-950 px-10 py-4 rounded-xl font-bold hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:scale-105"
                        >
                        {isAnalyzing ? (
                            <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Scanning Document...
                            </>
                        ) : (
                            <>
                            <FileText className="w-5 h-5" />
                            Extract Scheme Details
                            </>
                        )}
                        </button>
                    </div>
                )}
            </div>
        )}

        {/* URL MODE */}
        {mode === 'url' && (
            <div className="animate-in fade-in zoom-in-95 duration-300 py-6">
                <form onSubmit={handleAnalyzeUrl} className="relative max-w-2xl mx-auto">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                        <div className="relative flex items-center bg-gray-950 border border-gray-700 rounded-xl p-2 shadow-xl focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
                            <div className="pl-4 pr-3 text-gray-500">
                                <LinkIcon className="w-5 h-5" />
                            </div>
                            <input 
                                type="url" 
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="https://startupindia.gov.in/scheme..."
                                className="w-full bg-transparent border-none text-white placeholder-gray-600 focus:ring-0 py-3"
                                required
                            />
                            <button 
                                type="submit"
                                disabled={isAnalyzing || !inputValue}
                                className="bg-primary hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
                            >
                                {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4" />}
                                {isAnalyzing ? 'Scanning...' : 'Scan URL'}
                            </button>
                        </div>
                    </div>
                    <p className="text-center text-gray-500 text-xs mt-4">
                        Paste a direct link to a government policy PDF or a scheme webpage.
                    </p>
                </form>
            </div>
        )}

        {/* INVESTOR MODE */}
        {mode === 'investor' && (
            <div className="animate-in fade-in zoom-in-95 duration-300 py-6">
                 <form onSubmit={handleAnalyzeInvestor} className="relative max-w-2xl mx-auto">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                        <div className="relative flex items-center bg-gray-950 border border-gray-700 rounded-xl p-2 shadow-xl focus-within:border-purple-500/50 focus-within:ring-1 focus-within:ring-purple-500/50 transition-all">
                            <div className="pl-4 pr-3 text-gray-500">
                                <Search className="w-5 h-5" />
                            </div>
                            <input 
                                type="text" 
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Enter Investor Name (e.g., Sequoia, Blume)..."
                                className="w-full bg-transparent border-none text-white placeholder-gray-600 focus:ring-0 py-3"
                                required
                            />
                            <button 
                                type="submit"
                                disabled={isAnalyzing || !inputValue}
                                className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
                            >
                                {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Briefcase className="w-4 h-4" />}
                                {isAnalyzing ? 'Analyzing...' : 'Analyze'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mt-8 p-4 bg-red-900/20 border border-red-900/50 text-red-400 rounded-lg flex items-center justify-center animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        {/* Result: Investor Profile */}
        {investorResult && mode === 'investor' && (
             <div className="mt-12 border-t border-gray-800 pt-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="bg-gray-800/30 border border-gray-700 rounded-2xl overflow-hidden">
                    <div className="bg-gray-800/80 p-6 border-b border-gray-700 flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-1">{investorResult.name}</h2>
                            <span className="text-sm text-purple-400 font-medium px-2 py-1 bg-purple-500/10 rounded-md border border-purple-500/20">
                                {investorResult.type}
                            </span>
                        </div>
                        <div className="text-right">
                            <div className="text-xs text-gray-400 uppercase tracking-wider">Ticket Size</div>
                            <div className="text-xl font-bold text-white">{investorResult.ticketSize}</div>
                        </div>
                    </div>
                    
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-green-400" /> Focus Areas
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {investorResult.focusAreas.map(area => (
                                    <span key={area} className="px-3 py-1 bg-gray-900 rounded-full text-sm text-gray-300 border border-gray-700">
                                        {area}
                                    </span>
                                ))}
                            </div>
                            
                            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mt-6 mb-4">Recent Exits</h3>
                            <div className="space-y-2">
                                {investorResult.recentExits.map(exit => (
                                    <div key={exit} className="flex items-center gap-2 text-sm text-gray-400">
                                        <Check className="w-3 h-3 text-green-500" /> {exit}
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="bg-red-900/10 rounded-xl p-4 border border-red-900/30">
                            <h3 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4" /> Potential Red Flags
                            </h3>
                            <ul className="space-y-3">
                                {investorResult.redFlags.map(flag => (
                                    <li key={flag} className="text-sm text-gray-300 flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                                        {flag}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 pt-4 border-t border-red-900/30 flex justify-between items-center">
                                <span className="text-xs text-gray-500">Estimated Acceptance</span>
                                <span className="text-lg font-bold text-white">{investorResult.acceptanceRate}</span>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        )}

        {/* Result: Funding/Document */}
        {result && (mode === 'upload' || mode === 'url') && (
          <div className="mt-12 border-t border-gray-800 pt-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-center justify-center mb-8">
                <div className="bg-green-500/10 text-green-400 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 border border-green-500/20">
                    <Check className="w-4 h-4" />
                    Analysis Complete
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Extracted Intelligence
                </h3>
                <FundingCard item={result} />
              </div>
              <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                <h4 className="font-bold text-white mb-3">AI Executive Summary</h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {result.description || "No summary available."}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {result.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-gray-900 border border-gray-700 rounded text-xs text-gray-400">
                            #{tag}
                        </span>
                    ))}
                </div>
                <div className="pt-4 border-t border-gray-700">
                    <p className="text-xs text-gray-500 flex items-start gap-2">
                        <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                        Disclaimer: This is an AI-generated extraction. Always verify details with the official source document or website.
                    </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </SpotlightCard>
    </div>
  );
};