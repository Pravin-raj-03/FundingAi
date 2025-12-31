import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, FileCheck, Coins, TrendingUp, Sparkles, Zap, PlayCircle, Bot, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SpotlightCard } from '../components/ui/SpotlightCard';
import { Galaxy } from '../components/ui/Galaxy';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { setTutorialOpen } = useApp();

  return (
    <div className="flex flex-col items-center justify-start min-h-[calc(100vh-4rem)] bg-gray-950 relative overflow-hidden">
      
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-gray-950">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        {/* Animated Blobs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-secondary/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Galaxy Component - Layered for Depth */}
      <div className="absolute top-0 left-0 w-full h-[100vh] pointer-events-none z-0 overflow-hidden flex justify-center items-center opacity-60">
        <Galaxy
            starSpeed={0.2}
            density={0.8}
            hueShift={220} 
            speed={0.3}
            glowIntensity={1}
            saturation={90}
            mouseRepulsion
            repulsionStrength={1.5}
            twinkleIntensity={0.8}
            rotationSpeed={0.02}
            transparent
        />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 relative z-10 pt-20 md:pt-32">
        
        {/* Branding Badge - Professional Update */}
        <div className="flex justify-center mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 backdrop-blur-md shadow-lg">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold tracking-widest text-primary uppercase">
                    Enterprise AI Engine v2.0
                </span>
             </div>
        </div>

        {/* Hero Content */}
        <div className="text-center max-w-5xl mx-auto mb-20 animate-in zoom-in-95 duration-700 delay-100">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold text-white tracking-tight mb-8 leading-[0.95] drop-shadow-2xl">
              Funding for your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-secondary">
                Next Moonshot.
              </span>
            </h1>
            
            {/* Description - Improved Typography */}
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed font-normal antialiased">
              Discover government schemes, venture capital, and subsidies tailored for your startup. 
              <span className="text-white font-semibold"> Multilingual. Intelligent. Instant.</span>
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <button 
                onClick={() => navigate('/chat')}
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-gradient-to-r from-primary to-blue-600 rounded-2xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ring-offset-gray-900 shadow-[0_0_20px_-5px_rgba(77,124,254,0.4)]"
              >
                Ask AI Assistant
                <Bot className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
              </button>
              
              <button 
                onClick={() => navigate('/analyze')}
                className="inline-flex items-center justify-center px-8 py-4 font-semibold text-gray-200 transition-all duration-200 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:text-white backdrop-blur-sm hover:border-white/20"
              >
                <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                Analyze Policy
              </button>
            </div>

            <div className="mt-8">
                <button 
                    onClick={() => setTutorialOpen(true)}
                    className="inline-flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-primary transition-colors py-2"
                >
                    <PlayCircle className="w-4 h-4" />
                    How it works
                </button>
            </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto w-full mt-12 pb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            <FeatureCard 
            icon={Globe} 
            title="Multilingual Core" 
            desc="Chat effortlessly in your local language." 
            color="text-blue-400" 
            bg="bg-blue-400/10"
            />
            <FeatureCard 
            icon={Coins} 
            title="Unified Database" 
            desc="Govt grants & VC funds in one place." 
            color="text-green-400" 
            bg="bg-green-400/10"
            />
            <FeatureCard 
            icon={TrendingUp} 
            title="Smart Matching" 
            desc="AI ranks funds by startup eligibility." 
            color="text-purple-400" 
            bg="bg-purple-400/10"
            />
            <FeatureCard 
            icon={FileCheck} 
            title="Policy Scanner" 
            desc="Extract hard cash details from PDFs." 
            color="text-orange-400" 
            bg="bg-orange-400/10"
            />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, color, bg }: any) => (
  <SpotlightCard className="hover:-translate-y-1 transition-transform border-gray-800 bg-gray-900/60 backdrop-blur-md">
    <div className="p-6 h-full">
      <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center mb-4 border border-white/5`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed font-medium">{desc}</p>
    </div>
  </SpotlightCard>
);