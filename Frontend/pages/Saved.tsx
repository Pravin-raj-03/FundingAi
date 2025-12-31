import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FundingCard } from '../components/FundingCard';
import { LayoutDashboard, Bell, Landmark, Rocket, Zap } from 'lucide-react';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';
import { SpotlightCard } from '../components/ui/SpotlightCard';

export const SavedPage: React.FC = () => {
  const { savedItems } = useApp();
  const [sort, setSort] = useState<'recent' | 'amount' | 'deadline'>('recent');

  const sortedItems = [...savedItems].sort((a, b) => {
    if (sort === 'amount') return b.amountValue - a.amountValue;
    if (sort === 'deadline') {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    }
    return 0; // Recent is default order
  });

  const groupedItems = {
    Govt: sortedItems.filter(i => i.type === 'Govt' || i.type === 'Subsidy'),
    Private: sortedItems.filter(i => i.type === 'VC' || i.type === 'Angel')
  };

  const totalAmount = savedItems.reduce((acc, curr) => acc + curr.amountValue, 0) / 100000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center">
            <LayoutDashboard className="w-6 h-6 mr-2 text-primary" /> 
            Saved Dashboard
          </h1>
          <p className="text-gray-400 mt-1">Track your applications and deadlines.</p>
        </div>

        <div className="flex items-center gap-2">
          <select 
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            className="bg-gray-900 border border-gray-800 text-gray-200 text-sm rounded-lg focus:ring-primary focus:border-primary p-2.5"
          >
            <option value="recent">Recently Added</option>
            <option value="deadline">Closest Deadline</option>
            <option value="amount">Highest Amount</option>
          </select>
        </div>
      </div>

      {savedItems.length === 0 ? (
        <div className="text-center py-20 bg-gray-900 rounded-2xl border border-dashed border-gray-800">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-white">No saved items yet</h3>
          <p className="text-gray-500">Star items from the search page to track them here.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-primary to-blue-700 rounded-xl p-5 text-white shadow-lg shadow-primary/20 relative overflow-hidden">
              <div className="relative z-10">
                <div className="text-blue-100 text-sm font-medium mb-1">Total Potential Funding</div>
                <div className="text-2xl font-bold">
                  ₹<AnimatedCounter end={totalAmount} decimals={1} /> Lakhs
                </div>
              </div>
              {/* Decorative Circle */}
              <div className="absolute -right-4 -bottom-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            </div>
             <SpotlightCard className="p-5 border-gray-800 bg-gray-900">
              <div className="text-gray-400 text-sm font-medium mb-1">Applications Tracked</div>
              <div className="text-2xl font-bold text-white">
                <AnimatedCounter end={savedItems.length} duration={500} />
              </div>
            </SpotlightCard>
             <SpotlightCard className="p-5 border-gray-800 bg-gray-900">
              <div className="text-gray-400 text-sm font-medium mb-1">Upcoming Deadlines</div>
              <div className="text-2xl font-bold text-white">
                <AnimatedCounter 
                  end={savedItems.filter(i => i.deadline && new Date(i.deadline) > new Date()).length} 
                  duration={500} 
                />
              </div>
            </SpotlightCard>
          </div>

          {/* Grouped Lists */}
          {Object.entries(groupedItems).map(([category, items]) => (
            items.length > 0 && (
              <div key={category}>
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  {category === 'Govt' ? <Landmark className="w-5 h-5 text-blue-400" /> : <Rocket className="w-5 h-5 text-purple-400" />}
                  {category === 'Govt' ? 'Government & Subsidies' : 'VC & Private Equity'}
                  <span className="ml-2 bg-gray-800 text-gray-300 text-xs py-0.5 px-2 rounded-full border border-gray-700">{items.length}</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map(item => (
                    <div key={item.id} className="relative">
                       <FundingCard item={item} />
                       <div className="absolute top-4 right-14 z-20">
                         <button className="p-2 bg-gray-900/90 backdrop-blur rounded-full text-secondary hover:bg-secondary/10 shadow-sm border border-secondary/20 text-xs font-bold flex items-center gap-1">
                            <Bell className="w-3 h-3" /> Track
                         </button>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      )}
      
      {savedItems.length > 0 && (
        <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 border border-gray-800 text-gray-500 text-sm">
                <Zap className="w-4 h-4 text-yellow-500" />
                You're all caught up!
            </div>
        </div>
      )}
    </div>
  );
};