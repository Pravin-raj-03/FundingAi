import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Plus, MessageSquare, Star, Trash2, PanelLeft, Settings, Zap, Sprout, Rocket, Users } from 'lucide-react';
import { processMockChat } from '../services/mockChatService';
import { ChatMessage, ChatSession } from '../types';
import { MOCK_CHAT_SESSIONS } from '../constants';
import { FundingCard } from '../components/FundingCard';
import { ThinkingIndicator } from '../components/ui/ThinkingIndicator';
import { Galaxy } from '../components/ui/Galaxy';
import { Link } from 'react-router-dom';

export const ChatPage: React.FC = () => {
  // State
  const [sessions, setSessions] = useState<ChatSession[]>(MOCK_CHAT_SESSIONS);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Derived State
  const activeSession = sessions.find(s => s.id === activeSessionId);
  const messages = activeSession ? activeSession.messages : [];
  const starredSessions = sessions.filter(s => s.isStarred);
  const recentSessions = sessions.filter(s => !s.isStarred);

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeSessionId, isThinking]);

  useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth < 1024) setIsSidebarOpen(false);
        else setIsSidebarOpen(true);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); 
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const createNewChat = () => {
    setActiveSessionId(null);
    setInput('');
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
    inputRef.current?.focus();
  };

  const deleteSession = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSessions(prev => prev.filter(s => s.id !== id));
    if (activeSessionId === id) setActiveSessionId(null);
  };

  const toggleStar = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSessions(prev => prev.map(s => 
      s.id === id ? { ...s, isStarred: !s.isStarred } : s
    ));
  };

  const handleSend = async (e: React.FormEvent, overridePrompt?: string) => {
    e.preventDefault();
    const textToSend = overridePrompt || input;
    if (!textToSend.trim() || isThinking) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend
    };

    setIsThinking(true);
    setInput('');

    let currentSessionId = activeSessionId;
    let currentHistory: ChatMessage[] = [];

    // Create new session if none exists
    if (!currentSessionId) {
      const newSession: ChatSession = {
        id: Date.now().toString(),
        title: textToSend.slice(0, 30) + (textToSend.length > 30 ? '...' : ''),
        createdAt: Date.now(),
        isStarred: false,
        messages: [userMsg]
      };
      setSessions(prev => [newSession, ...prev]);
      setActiveSessionId(newSession.id);
      currentSessionId = newSession.id;
      currentHistory = [userMsg];
    } else {
      setSessions(prev => prev.map(s => 
        s.id === currentSessionId ? { ...s, messages: [...s.messages, userMsg] } : s
      ));
      const s = sessions.find(s => s.id === currentSessionId);
      if (s) {
          currentHistory = [...s.messages, userMsg];
      }
    }

    // Process Mock Response with History
    const response = await processMockChat(textToSend, currentHistory);

    const modelMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: response.text,
      data: response.data
    };

    setSessions(prev => prev.map(s => 
      s.id === currentSessionId ? { ...s, messages: [...s.messages, modelMsg] } : s
    ));
    
    setIsThinking(false);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-950 overflow-hidden relative font-sans">
      
      {/* Background Galaxy Effect for Chat Area */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <Galaxy starSpeed={0.1} density={0.5} transparent />
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 z-20 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          absolute lg:static inset-y-0 left-0 z-30
          w-80 bg-gray-950/95 border-r border-gray-800 flex flex-col transition-transform duration-300 ease-in-out backdrop-blur-xl
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-0 lg:opacity-0 lg:overflow-hidden'}
          ${isSidebarOpen && 'lg:w-80 lg:opacity-100'}
        `}
      >
        <div className="p-4">
          <button 
            onClick={createNewChat}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" /> New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6 no-scrollbar">
          {starredSessions.length > 0 && (
            <div>
              <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 px-3">Starred</h3>
              <div className="space-y-1">
                {starredSessions.map(session => (
                  <SessionItem 
                    key={session.id} 
                    session={session} 
                    isActive={activeSessionId === session.id}
                    onClick={() => { setActiveSessionId(session.id); if(window.innerWidth < 1024) setIsSidebarOpen(false); }}
                    onDelete={(e) => deleteSession(e, session.id)}
                    onStar={(e) => toggleStar(e, session.id)}
                  />
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 px-3">History</h3>
            <div className="space-y-1">
              {recentSessions.map(session => (
                <SessionItem 
                  key={session.id} 
                  session={session} 
                  isActive={activeSessionId === session.id}
                  onClick={() => { setActiveSessionId(session.id); if(window.innerWidth < 1024) setIsSidebarOpen(false); }}
                  onDelete={(e) => deleteSession(e, session.id)}
                  onStar={(e) => toggleStar(e, session.id)}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-800 bg-gray-900/50">
            <Link to="/settings" className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800">
                <Settings className="w-5 h-5" />
                <span className="font-medium">Settings</span>
            </Link>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-w-0 relative z-10">
        
        {/* Top Bar */}
        <div className="h-16 flex items-center justify-between px-6 bg-transparent z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 transition-colors"
            >
              <PanelLeft className="w-5 h-5" />
            </button>
            <div className="flex flex-col">
                <span className="font-bold text-gray-100 text-sm">
                    {activeSession ? activeSession.title : 'New Session'}
                </span>
                <span className="text-xs text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                    Online
                </span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scroll-smooth no-scrollbar">
          {!activeSessionId ? (
            <div className="h-full flex flex-col items-center justify-center max-w-4xl mx-auto text-center space-y-10 animate-in fade-in zoom-in-95 duration-500">
              <div className="relative">
                <div className="absolute inset-0 bg-primary blur-3xl opacity-20 rounded-full"></div>
                <div className="w-20 h-20 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-3xl flex items-center justify-center shadow-2xl relative z-10">
                    <Bot className="w-10 h-10 text-primary" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                  Funding Intelligence <span className="text-primary">AI</span>
                </h2>
                <p className="text-lg text-gray-400 max-w-lg mx-auto">
                  Search millions of funding sources using natural language. I'll analyze, rank, and serve the best opportunities.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl text-left">
                <StarterCard 
                  icon={Zap}
                  title="EV Subsidies" 
                  prompt="Show me EV subsidies in Tamil Nadu" 
                  onClick={(p) => handleSend({ preventDefault: () => {} } as any, p)}
                />
                <StarterCard 
                  icon={Sprout}
                  title="Agri-Tech Grants" 
                  prompt="Find government grants for AgriTech startups" 
                  onClick={(p) => handleSend({ preventDefault: () => {} } as any, p)}
                />
                <StarterCard 
                  icon={Rocket}
                  title="Seed Funding" 
                  prompt="List VC firms offering Seed funding for SaaS" 
                  onClick={(p) => handleSend({ preventDefault: () => {} } as any, p)}
                />
                <StarterCard 
                  icon={Users}
                  title="Women Entrepreneurs" 
                  prompt="Schemes for women-led startups in India" 
                  onClick={(p) => handleSend({ preventDefault: () => {} } as any, p)}
                />
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                  
                  {/* Message Bubble */}
                  <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex max-w-[90%] md:max-w-[70%] gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`
                            w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg mt-1 border border-white/5
                            ${msg.role === 'user' ? 'bg-gray-800' : 'bg-gradient-to-br from-primary to-blue-600'}
                        `}>
                            {msg.role === 'user' ? <User className="w-5 h-5 text-gray-300" /> : <Bot className="w-5 h-5 text-white" />}
                        </div>
                        
                        <div className={`p-5 rounded-3xl text-sm leading-relaxed shadow-sm backdrop-blur-sm
                            ${msg.role === 'user' 
                            ? 'bg-white/10 text-white rounded-tr-sm border border-white/10' 
                            : 'bg-black/40 text-gray-200 rounded-tl-sm border border-white/5'
                            }
                        `}>
                            {msg.role === 'model' ? (
                                <div 
                                    className="prose prose-sm prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{ 
                                    __html: msg.text
                                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
                                    .replace(/\n/g, '<br/>')
                                }} />
                            ) : (
                                msg.text
                            )}
                        </div>
                    </div>
                  </div>

                  {/* Attached Cards */}
                  {msg.data && msg.data.length > 0 && (
                    <div className="pl-0 md:pl-14 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
                        {msg.data.map(item => (
                            <div key={item.id} className="animate-in zoom-in-95 duration-500 delay-100">
                                <FundingCard item={item} />
                            </div>
                        ))}
                    </div>
                  )}

                </div>
              ))}
              
              {/* Thinking State */}
              {isThinking && (
                <div className="flex justify-start">
                   <div className="flex flex-row gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center flex-shrink-0 mt-1 border border-white/10">
                         <Bot className="w-5 h-5 text-white" />
                      </div>
                      <ThinkingIndicator />
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} className="h-10" />
            </>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 bg-transparent">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSend} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 group-focus-within:border-primary/50 group-focus-within:ring-1 group-focus-within:ring-primary/50 transition-all">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about funding, grants, or schemes..."
                  className="w-full pl-6 pr-14 py-5 bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 font-medium"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isThinking}
                  className="absolute right-3 top-3 bottom-3 aspect-square bg-gray-800 text-gray-400 rounded-xl hover:bg-primary hover:text-white disabled:opacity-50 disabled:hover:bg-gray-800 transition-all active:scale-95 flex items-center justify-center"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
            <div className="text-center mt-4">
                <span className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold">
                    AI Verified Results • Govt & Private Sources
                </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Sub-components

const SessionItem = ({ session, isActive, onClick, onDelete, onStar }: any) => (
  <div 
    onClick={onClick}
    className={`
      group flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-all duration-200 border
      ${isActive ? 'bg-gray-800/80 border-gray-700 shadow-md' : 'hover:bg-gray-800/40 border-transparent hover:border-gray-800'}
    `}
  >
    <MessageSquare className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-primary' : 'text-gray-600'}`} />
    
    <div className="flex-1 min-w-0">
      <h4 className={`text-sm truncate ${isActive ? 'font-medium text-gray-200' : 'text-gray-400 group-hover:text-gray-300'}`}>
        {session.title}
      </h4>
    </div>

    {/* Hover Actions */}
    <div className={`flex items-center gap-1 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
      <button 
        onClick={onStar}
        className={`p-1.5 rounded-md hover:bg-gray-700 ${session.isStarred ? 'text-yellow-400 opacity-100' : 'text-gray-500'}`}
      >
        <Star className={`w-3.5 h-3.5 ${session.isStarred ? 'fill-current' : ''}`} />
      </button>
      <button 
        onClick={onDelete}
        className="p-1.5 rounded-md hover:bg-red-900/30 text-gray-500 hover:text-red-400"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  </div>
);

const StarterCard = ({ icon: Icon, title, prompt, onClick }: any) => (
  <button 
    onClick={() => onClick(prompt)}
    className="p-4 bg-gray-900/40 border border-white/5 rounded-2xl hover:border-primary/30 hover:bg-gray-800/60 transition-all text-left group hover:scale-[1.02]"
  >
    <div className="mb-3 bg-gray-800 w-fit p-2 rounded-lg group-hover:bg-gray-700 transition-colors">
        <Icon className="w-6 h-6 text-primary" />
    </div>
    <div className="font-bold text-gray-200 text-sm mb-1 group-hover:text-primary transition-colors">{title}</div>
    <div className="text-xs text-gray-500 line-clamp-2 group-hover:text-gray-400">{prompt}</div>
  </button>
);