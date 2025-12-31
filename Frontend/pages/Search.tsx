import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, Filter, Globe, Sparkles } from 'lucide-react';
import { FundingCard } from '../components/FundingCard';
import { MOCK_FUNDING_DATA, STATES, INVESTOR_TYPES } from '../constants';
import { FilterState } from '../types';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<'funding' | 'other'>('funding');
  const [filters, setFilters] = useState<FilterState>({
    minAmount: 0,
    region: 'All Regions',
    investorType: 'All Types',
    verifiedOnly: false
  });
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [query, filters]);

  const filteredData = useMemo(() => {
    return MOCK_FUNDING_DATA.filter(item => {
      // Text Search
      const matchesQuery = query === '' || 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.tags.some(t => t.toLowerCase().includes(query.toLowerCase()));
      
      // Filter Logic
      const matchesAmount = item.amountValue >= filters.minAmount;
      const matchesRegion = filters.region === 'All Regions' || item.location.includes(filters.region);
      const matchesType = filters.investorType === 'All Types' || item.type === filters.investorType;

      return matchesQuery && matchesAmount && matchesRegion && matchesType;
    });
  }, [query, filters]);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Sticky Search Header */}
      <div className="sticky top-16 z-40 bg-gray-950/90 backdrop-blur border-b border-gray-800 px-4 py-4 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSearchParams({ q: e.target.value });
              }}
              className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-white placeholder-gray-500 transition-all"
              placeholder="Refine your search..."
            />
          </div>
          
          <div className="flex bg-gray-900 p-1 rounded-lg w-full sm:w-auto border border-gray-800">
            <button
              onClick={() => setActiveTab('funding')}
              className={`flex-1 sm:flex-none px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                activeTab === 'funding' ? 'bg-gray-800 text-primary shadow-sm' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Funding Results
            </button>
            <button
              onClick={() => setActiveTab('other')}
              className={`flex-1 sm:flex-none px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                activeTab === 'other' ? 'bg-gray-800 text-primary shadow-sm' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Globe className="w-4 h-4" />
              Other Sources
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Filters Sidebar */}
        <aside className="lg:w-64 flex-shrink-0 space-y-6">
          <div className="bg-gray-900 p-5 rounded-xl border border-gray-800 shadow-sm sticky top-36">
            <div className="flex items-center gap-2 mb-4 text-white font-semibold">
              <Filter className="w-4 h-4" /> Filters
            </div>

            {/* Min Amount */}
            <div className="mb-6">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
                Min Amount (₹)
              </label>
              <input 
                type="range" 
                min="0" 
                max="50000000" 
                step="100000"
                value={filters.minAmount}
                onChange={(e) => setFilters({...filters, minAmount: Number(e.target.value)})}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="mt-2 text-sm text-gray-300 font-medium">
                {filters.minAmount > 0 ? `₹${(filters.minAmount / 100000).toFixed(1)} Lakhs+` : 'Any Amount'}
              </div>
            </div>

            {/* Region */}
            <div className="mb-6">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Region</label>
              <select 
                value={filters.region}
                onChange={(e) => setFilters({...filters, region: e.target.value})}
                className="w-full bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5"
              >
                {STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Type */}
            <div className="mb-6">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Investor Type</label>
              <select 
                value={filters.investorType}
                onChange={(e) => setFilters({...filters, investorType: e.target.value})}
                className="w-full bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5"
              >
                {INVESTOR_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {/* Verified Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300 font-medium">Verified Sources</span>
              <button 
                onClick={() => setFilters({...filters, verifiedOnly: !filters.verifiedOnly})}
                className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 ${filters.verifiedOnly ? 'bg-secondary' : 'bg-gray-700'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${filters.verifiedOnly ? 'translate-x-4' : ''}`} />
              </button>
            </div>
          </div>
        </aside>

        {/* Results Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="space-y-4">
               {[1, 2, 3].map(i => (
                 <div key={i} className="bg-gray-900 p-5 rounded-xl border border-gray-800 shadow-sm animate-pulse">
                   <div className="h-4 bg-gray-800 rounded w-1/4 mb-4"></div>
                   <div className="h-6 bg-gray-800 rounded w-3/4 mb-4"></div>
                   <div className="h-4 bg-gray-800 rounded w-1/2"></div>
                 </div>
               ))}
            </div>
          ) : (
            <>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-gray-400 font-medium">
                  Found <span className="font-bold text-white">{filteredData.length}</span> opportunities
                </h2>
              </div>
              
              {activeTab === 'funding' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredData.map(item => (
                    <FundingCard key={item.id} item={item} />
                  ))}
                  
                  {filteredData.length === 0 && (
                    <div className="col-span-full py-12 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-900 mb-4 border border-gray-800">
                        <SearchIcon className="w-8 h-8 text-gray-500" />
                      </div>
                      <h3 className="text-lg font-medium text-white">No funding found</h3>
                      <p className="text-gray-500">Try adjusting your filters or search query.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-gray-900 rounded-xl border border-gray-800 p-8 text-center">
                  <Globe className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-white">External Sources</h3>
                  <p className="text-gray-500">Integrating global web search for funding...</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};