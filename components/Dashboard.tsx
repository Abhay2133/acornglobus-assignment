import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Menu, 
  Plus, 
  Share2, 
  Download, 
  UploadCloud,
  ChevronDown,
  ArrowRight, 
  Star,
  Filter,
  TrendingUp,
  ShoppingBag,
  MoreHorizontal
} from 'lucide-react';
import { USERS, REFERRERS, SALES_TEAM, CHART_DATA_REFERRERS } from '../constants';
import { BarChart, Bar, Cell, ResponsiveContainer } from 'recharts';
import { TimeframeOption, SortOption } from '../types';

// Extended chart data to simulate changes
const CHART_DATA_Q3 = [
  { name: 'Behance', value: 30, fill: '#1769ff' },
  { name: 'Dribbble', value: 65, fill: '#ea4c89', striped: true },
  { name: 'Google', value: 20, fill: '#ea4335' },
  { name: 'Instagram', value: 45, fill: '#e1306c' },
  { name: 'Other', value: 15, fill: '#94a3b8' },
];

const CHART_DATA_Q2 = [
  { name: 'Behance', value: 45, fill: '#1769ff' },
  { name: 'Dribbble', value: 40, fill: '#ea4c89', striped: true },
  { name: 'Google', value: 35, fill: '#ea4335' },
  { name: 'Instagram', value: 25, fill: '#e1306c' },
  { name: 'Other', value: 10, fill: '#94a3b8' },
];

const Dashboard = () => {
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [timeframe, setTimeframe] = useState<TimeframeOption>('this-quarter');
  const [isTimeframeOpen, setIsTimeframeOpen] = useState(false);
  const [referrerSort, setReferrerSort] = useState<SortOption>('amount-desc');
  const [isReferrerMenuOpen, setIsReferrerMenuOpen] = useState(false);
  
  // Data Logic
  const getTimeframeLabel = () => {
    switch (timeframe) {
      case 'this-quarter': return 'Sep 1 - Nov 30, 2023';
      case 'last-quarter': return 'Jun 1 - Aug 31, 2023';
      case 'year-to-date': return 'Jan 1 - Nov 30, 2023';
    }
  };

  const getRevenueData = () => {
    // Simulating data changes based on timeframe
    switch (timeframe) {
      case 'this-quarter': 
        return { total: 528976.82, prev: 501641.73, trend: 7.9, cash: 27335.09 };
      case 'last-quarter': 
        return { total: 501641.73, prev: 480200.10, trend: 4.5, cash: 21440.50 };
      case 'year-to-date': 
        return { total: 1850430.12, prev: 1420000.00, trend: 12.4, cash: 430500.22 };
    }
  };

  const currentRevenue = getRevenueData();
  const currentChartData = timeframe === 'this-quarter' ? CHART_DATA_Q3 : CHART_DATA_Q2;

  // Filter Logic
  const filteredSalesTeam = useMemo(() => {
    return SALES_TEAM.filter(item => 
      item.user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredReferrers = useMemo(() => {
    let data = REFERRERS.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    // Sort logic
    if (referrerSort === 'amount-desc') {
        data = [...data].sort((a, b) => b.amount - a.amount);
    } else if (referrerSort === 'amount-asc') {
        data = [...data].sort((a, b) => a.amount - b.amount);
    } else if (referrerSort === 'name') {
        data = [...data].sort((a, b) => a.name.localeCompare(b.name));
    }
    
    // Simulate value scaling based on timeframe
    const multiplier = timeframe === 'this-quarter' ? 1 : timeframe === 'last-quarter' ? 0.85 : 3.5;
    return data.map(r => ({
        ...r,
        amount: Math.round(r.amount * multiplier)
    }));
  }, [searchQuery, referrerSort, timeframe]);


  return (
    <div className="flex-1 h-screen overflow-y-auto bg-gray-50 p-4 md:p-8 custom-scrollbar">
      {/* Top Bar */}
      <header className="flex items-center justify-between gap-4 mb-8">
        <div className="relative w-full max-w-md group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-rose-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Try searching 'insights' or names..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full border-none bg-white shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-rose-100 text-slate-600 placeholder:text-gray-400 transition-shadow"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full hover:bg-white hover:shadow-sm transition-all text-gray-500 active:scale-95">
            <Menu size={20} />
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-yellow-400 via-rose-500 to-purple-600 p-[2px] cursor-pointer hover:scale-105 transition-transform">
            <img src="https://picsum.photos/seed/profile/200" alt="Profile" className="w-full h-full rounded-full border-2 border-white object-cover" />
          </div>
          <button className="w-9 h-9 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-200 hover:bg-rose-700 transition-colors active:scale-95">
            <Plus size={20} />
          </button>
        </div>
      </header>

      {/* Report Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center bg-white text-gray-500 hover:bg-gray-50 hover:border-rose-200 hover:text-rose-500 transition-colors">
              <Plus size={16} />
            </button>
            <div className="flex -space-x-2">
              {USERS.slice(0, 3).map((user) => (
                <img key={user.id} src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border-2 border-white hover:z-10 hover:scale-110 transition-transform cursor-pointer" />
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-900 text-white flex items-center justify-center text-xs font-medium cursor-pointer hover:bg-slate-800">C</div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mt-2">New report</h1>
        </div>

        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
                <ActionButton icon={<Share2 size={18} />} />
                <ActionButton icon={<Download size={18} />} />
                <ActionButton icon={<UploadCloud size={18} />} />
            </div>
            
            <div className="relative">
                <div className="flex items-center gap-3 bg-white p-1 pr-4 rounded-full shadow-sm">
                    <div className="flex items-center bg-slate-900 text-white rounded-full px-3 py-1.5 gap-2 cursor-pointer select-none">
                        <div className="w-4 h-4 rounded-full bg-white relative">
                            <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-slate-900 rounded-full"></div>
                        </div>
                        <span className="text-xs font-medium">Timeframe</span>
                    </div>
                    <div 
                        className="flex items-center gap-2 text-sm font-medium text-slate-600 cursor-pointer hover:text-slate-900 select-none min-w-[140px] justify-between"
                        onClick={() => setIsTimeframeOpen(!isTimeframeOpen)}
                    >
                        <span>{getTimeframeLabel()}</span>
                        <ChevronDown size={14} className={`transition-transform ${isTimeframeOpen ? 'rotate-180' : ''}`} />
                    </div>
                </div>

                {isTimeframeOpen && (
                    <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="py-1">
                            {[
                                { val: 'this-quarter', label: 'This Quarter (Sep-Nov)' },
                                { val: 'last-quarter', label: 'Last Quarter (Jun-Aug)' },
                                { val: 'year-to-date', label: 'Year to Date' }
                            ].map((opt) => (
                                <button
                                    key={opt.val}
                                    onClick={() => {
                                        setTimeframe(opt.val as TimeframeOption);
                                        setIsTimeframeOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${timeframe === opt.val ? 'text-rose-500 font-medium bg-rose-50/50' : 'text-slate-600'}`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* Main Stats Area */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        {/* Left Column: Big Revenue & List */}
        <div className="xl:col-span-2 space-y-6">
            {/* Revenue Row */}
            <div className="bg-white rounded-3xl p-6 shadow-sm relative overflow-hidden transition-all duration-500">
                <div className="flex flex-col gap-1 mb-6">
                    <span className="text-gray-500 font-medium">Revenue</span>
                    <div className="flex items-baseline gap-4 flex-wrap">
                        <span className="text-5xl font-bold text-slate-900 transition-all duration-300">
                            ${Math.floor(currentRevenue.total).toLocaleString()}
                            <span className="text-gray-300">.{(currentRevenue.total % 1).toFixed(2).substring(2)}</span>
                        </span>
                        <div className="flex items-center gap-2">
                             <span className="bg-rose-500 text-white text-sm font-bold px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm shadow-rose-200">
                                <TrendingUp size={14} /> {currentRevenue.trend}%
                             </span>
                             <span className="bg-rose-500 text-white text-sm font-bold px-2 py-1 rounded-lg shadow-sm shadow-rose-200">
                                ${currentRevenue.cash.toLocaleString()}
                             </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                        <span>vs prev.</span>
                        <span className="font-semibold text-slate-700">${currentRevenue.prev.toLocaleString()}</span>
                        <span>{timeframe === 'this-quarter' ? 'Jun 1 - Aug 31, 2023' : 'Previous Period'}</span>
                        <ChevronDown size={14} />
                    </div>
                </div>

                {/* Team Rows */}
                 <div className="space-y-4">
                    {/* Just visual mock of the main interactive row for now */}
                    <div className="flex flex-wrap md:flex-nowrap items-center justify-between p-3 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group gap-y-3">
                         <div className="flex items-center gap-3 min-w-[140px]">
                             <img src={USERS[0].avatar} alt="" className="w-10 h-10 rounded-full" />
                             <span className="font-bold text-slate-800">${(209633 * (timeframe === 'this-quarter' ? 1 : 0.8)).toLocaleString()}</span>
                         </div>
                         <div className="hidden md:block flex-1 mx-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                             <div className="h-full bg-slate-800 w-[70%] group-hover:bg-rose-500 transition-colors duration-300"></div>
                         </div>
                         <span className="text-gray-400 text-sm min-w-[60px]">39.63%</span>
                         
                         {/* Mini avatars for visual density */}
                         <div className="flex items-center gap-2 px-2 border-l border-gray-200 mx-2">
                             <div className="flex -space-x-2">
                                <img src={USERS[2].avatar} alt="" className="w-8 h-8 rounded-full border-2 border-white" />
                                <img src={USERS[1].avatar} alt="" className="w-8 h-8 rounded-full border-2 border-white" />
                             </div>
                             <span className="text-xs text-gray-400 font-medium">+2</span>
                         </div>
                         
                         <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-rose-600 transition-colors shadow-lg shadow-slate-200 hover:shadow-rose-200 ml-auto md:ml-0">Details</button>
                    </div>
                 </div>
            </div>

            {/* Middle Section: Filters + Referrers + Chart + Table */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Referrers List */}
                <div className="lg:col-span-3 bg-white p-5 rounded-3xl shadow-sm flex flex-col h-[320px]">
                    <div className="flex items-center justify-between mb-4">
                         <div 
                            className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors relative"
                            onClick={() => setIsReferrerMenuOpen(!isReferrerMenuOpen)}
                         >
                             <Filter size={16} className="text-gray-400" />
                             <ChevronDown size={14} className="text-gray-400" />
                             
                             {isReferrerMenuOpen && (
                                <div className="absolute top-full left-0 mt-1 w-32 bg-white shadow-xl rounded-lg border border-gray-100 z-20 py-1">
                                    <div className="text-[10px] uppercase text-gray-400 font-bold px-3 py-1">Sort By</div>
                                    <div className="px-3 py-1.5 hover:bg-gray-50 text-xs cursor-pointer" onClick={() => setReferrerSort('amount-desc')}>Highest Value</div>
                                    <div className="px-3 py-1.5 hover:bg-gray-50 text-xs cursor-pointer" onClick={() => setReferrerSort('amount-asc')}>Lowest Value</div>
                                    <div className="px-3 py-1.5 hover:bg-gray-50 text-xs cursor-pointer" onClick={() => setReferrerSort('name')}>Name (A-Z)</div>
                                </div>
                             )}
                         </div>
                         <button className="flex items-center gap-2 px-3 py-1 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50">
                            Filters <Menu size={12} />
                         </button>
                    </div>
                    <div className="space-y-4 overflow-y-auto custom-scrollbar pr-1 flex-1">
                        {filteredReferrers.length > 0 ? (
                            filteredReferrers.map((ref) => (
                                <div key={ref.name} className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-1 rounded-lg transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: ref.color }}>
                                            <div className="text-white font-bold text-xs">{ref.name[0]}</div>
                                        </div>
                                        <span className="font-medium text-slate-700 text-sm">{ref.name}</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-slate-900 text-sm">${ref.amount.toLocaleString()}</div>
                                        <div className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded ml-auto w-fit">{ref.percentage}%</div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-400 text-sm py-8">No results found</div>
                        )}
                    </div>
                </div>

                {/* Chart Section */}
                <div className="lg:col-span-4 bg-white p-5 rounded-3xl shadow-sm flex flex-col h-[320px]">
                    <div className="flex items-center justify-between mb-4">
                         <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                             <BarChartIcon />
                             <ChevronDown size={14} className="text-gray-400" />
                         </div>
                         <button className="flex items-center gap-2 px-3 py-1 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50">
                            Filters <Menu size={12} />
                         </button>
                    </div>
                    
                    <div className="flex-1 min-h-[160px]">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={currentChartData} barSize={32}>
                                <defs>
                                    <pattern id="stripe-pattern" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
                                        <rect width="2" height="4" fill="#ea4c89" />
                                    </pattern>
                                </defs>
                                <Bar dataKey="value" radius={[8, 8, 8, 8]} animationDuration={500}>
                                    {currentChartData.map((entry, index) => (
                                        <Cell 
                                            key={`cell-${index}`} 
                                            fill={entry.striped ? 'url(#stripe-pattern)' : entry.fill} 
                                            stroke={entry.striped ? '#ea4c89' : 'none'}
                                            className="hover:opacity-80 transition-opacity cursor-pointer"
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                         </ResponsiveContainer>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 flex items-center justify-between pt-2 border-t border-gray-50">
                         <div>
                            <span className="block text-gray-400 text-xs">Deals amount</span>
                            <div className="flex items-center gap-1 font-medium text-slate-700 cursor-pointer hover:text-rose-500 transition-colors">
                                by referrer category <ChevronDown size={14} />
                            </div>
                         </div>
                         <ShoppingBag size={20} className="text-gray-400" />
                    </div>
                </div>

                {/* Sales Table */}
                <div className="lg:col-span-5 bg-white p-5 rounded-3xl shadow-sm flex flex-col h-[320px]">
                    <div className="flex items-center justify-between mb-4 text-xs text-gray-500 font-medium px-2">
                        <span>Sales</span>
                        <div className="flex gap-4">
                            <span>Revenue</span>
                            <span className="w-8 text-center">Leads</span>
                            <span className="w-8 text-center">KPI</span>
                            <span className="w-8 text-center">W/L</span>
                        </div>
                    </div>
                    <div className="space-y-3 overflow-y-auto custom-scrollbar flex-1">
                        {filteredSalesTeam.length > 0 ? (
                            filteredSalesTeam.map((data, idx) => (
                                <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0 hover:bg-gray-50 px-2 rounded-lg transition-colors group cursor-pointer">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <img src={data.user.avatar} className="w-8 h-8 rounded-full border border-gray-100" alt="" />
                                        <span className="text-sm font-medium text-slate-700 truncate group-hover:text-rose-500 transition-colors">{data.user.name}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm">
                                        <span className="font-bold text-slate-800 w-20 text-right">${(data.revenue * (timeframe === 'this-quarter' ? 1 : 0.9)).toLocaleString()}</span>
                                        <span className="w-8 text-center bg-slate-900 text-white rounded-md py-0.5 text-xs font-bold">{data.leads}</span>
                                        <span className="w-8 text-center text-gray-500">{data.kpi}</span>
                                        <span className="w-8 text-center font-medium">{data.winRate}%</span>
                                        <button className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-50 hover:bg-rose-100 text-gray-400 hover:text-rose-500 transition-colors">
                                            <ChevronDown size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                <span className="text-sm">No sales found</span>
                            </div>
                        )}
                    </div>
                    <div className="flex gap-2 mt-4 overflow-x-auto pb-2 custom-scrollbar">
                        <Badge icon="💪" text="Top sales" />
                        <Badge icon="🔥" text="Sales streak" />
                        <Badge icon="👍" text="Top review" />
                    </div>
                </div>

            </div>
        </div>

        {/* Right Column: Cards */}
        <div className="space-y-6">
            <div className="flex gap-4">
                {/* Top Sales Card */}
                <div className="bg-white p-5 rounded-3xl shadow-sm flex-1 relative group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                    <div className="text-gray-400 text-xs font-medium mb-2">Top sales</div>
                    <div className="text-4xl font-bold text-slate-900 mb-4">72</div>
                    <div className="flex items-center gap-2">
                        <img src={USERS[2].avatar} className="w-6 h-6 rounded-full" alt="" />
                        <span className="text-sm text-gray-600 group-hover:text-rose-500 transition-colors">Mikasa</span>
                    </div>
                    <button className="absolute right-4 bottom-4 w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-rose-500 group-hover:text-white transition-all">
                        <ArrowRight size={16} />
                    </button>
                </div>

                {/* Best Deal Card */}
                <div className="bg-slate-900 p-5 rounded-3xl shadow-sm flex-1 relative text-white group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150"></div>
                    <div className="flex justify-between items-start mb-2 relative z-10">
                         <div className="text-gray-400 text-xs font-medium">Best deal</div>
                         <Star size={14} className="text-gray-500 group-hover:text-yellow-400 transition-colors" />
                    </div>
                    <div className="text-2xl font-bold mb-4 relative z-10">$42,300</div>
                    <div className="text-sm text-gray-400 relative z-10">Rolf Inc.</div>
                    <button className="absolute right-4 bottom-4 w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-slate-900 transition-colors z-10">
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>

            {/* Small Stats Row */}
            <div className="flex gap-4">
                <StatCard label="Deals" value="256" trend="- 5" trendDown />
                <StatCard label="Value" value="528k" trend="↗ 7.9%" highlight />
                <StatCard label="Win rate" value="44%" trend="↗ 1.2%" />
            </div>

            {/* Work with platforms */}
            <div className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-6">
                    <span className="font-semibold text-slate-800">Work with platforms</span>
                    <div className="flex items-center gap-2">
                        <span className="bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm shadow-rose-200 cursor-default hover:scale-105 transition-transform">↗ 3</span>
                        <span className="bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm shadow-rose-200 cursor-default hover:scale-105 transition-transform">$156,841</span>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <PlatformCard 
                        icon={<div className="text-[#ea4c89] font-bold">D</div>}
                        name="Dribbble" 
                        percent="45.3%" 
                        amount="$71,048" 
                        color="text-[#ea4c89]"
                        borderColor="border-[#ea4c89]"
                        large
                    />
                    <div className="space-y-4">
                        <PlatformCard 
                            icon={<div className="text-[#e1306c] font-bold">I</div>}
                            name="Instagram" 
                            percent="28.1%" 
                            amount="$44,072" 
                            color="text-[#e1306c]"
                            borderColor="border-[#e1306c]"
                        />
                        <PlatformCard 
                            icon={<div className="text-[#ea4335] font-bold">G</div>}
                            name="Google" 
                            percent="14.1%" 
                            amount="$22,114" 
                            color="text-[#ea4335]"
                            borderColor="border-[#ea4335]"
                        />
                         <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded border border-gray-300"></div>
                                <span className="text-sm font-medium text-gray-600">Other</span>
                            </div>
                            <div className="text-right">
                                <div className="text-xs font-bold text-slate-700">7.1%</div>
                                <div className="text-[10px] text-gray-400">$11,135</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

// UI Components

const ActionButton = ({ icon }: { icon: React.ReactNode }) => (
    <button className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
        {icon}
    </button>
);

const Badge = ({ icon, text }: { icon: string; text: string }) => (
    <div className="flex items-center gap-1 bg-yellow-50 border border-yellow-100 px-2 py-1 rounded-lg text-xs font-medium text-yellow-700 whitespace-nowrap cursor-pointer hover:bg-yellow-100 transition-colors">
        <span>{icon}</span> {text}
    </div>
);

const StatCard = ({ label, value, trend, trendDown, highlight }: { label: string; value: string; trend: string; trendDown?: boolean; highlight?: boolean }) => (
    <div className={`flex-1 p-4 rounded-2xl bg-white shadow-sm flex flex-col items-center justify-center gap-1 cursor-pointer hover:shadow-md transition-all duration-300 group ${highlight ? 'border-2 border-rose-500' : 'hover:-translate-y-1'}`}>
        <div className="text-xs text-gray-400 font-medium group-hover:text-rose-500 transition-colors">{label}</div>
        <div className="text-xl font-bold text-slate-900">{value}</div>
        <div className={`text-xs font-bold ${trendDown ? 'text-slate-800' : 'text-slate-800'}`}>{trend}</div>
    </div>
);

const PlatformCard = ({ icon, name, percent, amount, color, borderColor, large }: any) => (
    <div className={`rounded-2xl border ${large ? 'border-rose-100 bg-white p-4 h-full flex flex-col justify-between hover:shadow-md' : 'border-rose-100 bg-white p-3 hover:shadow-sm'} transition-all duration-200 cursor-pointer group`}>
        <div className="flex items-center gap-2 mb-2">
            <div className={`w-6 h-6 rounded-full border ${borderColor} flex items-center justify-center text-xs group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            <span className="text-sm font-medium text-slate-700">{name}</span>
        </div>
        <div className={large ? "mt-auto" : ""}>
             <div className="text-2xl font-bold text-slate-900">{percent}</div>
             <div className="text-sm text-gray-400">{amount}</div>
        </div>
    </div>
);

const BarChartIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
        <line x1="12" y1="20" x2="12" y2="10"></line>
        <line x1="18" y1="20" x2="18" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="16"></line>
    </svg>
)

export default Dashboard;