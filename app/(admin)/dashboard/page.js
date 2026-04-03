'use client';

import React, { useEffect, useState } from 'react';
import { MousePointer2, Users, TrendingUp, BarChart3 } from 'lucide-react';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    totalViews: 0,
    popularService: 'Loading...',
    topPage: 'Loading...',
    viewsData: [],
    aiTip: '✨ Thinking of your next big move...',
  });
  const [loading, setLoading] = useState(true);
  const [isTipLoading, setIsTipLoading] = useState(false);

  const fetchGrowthTip = async () => {
    setIsTipLoading(true);
    try {
      const res = await fetch('/api/ai/tips');
      const data = await res.json();
      setStats(prev => ({ ...prev, aiTip: data.tip || prev.aiTip }));
    } catch (err) {
      console.error("Tip Error:", err);
    } finally {
      setIsTipLoading(false);
    }
  };

  useEffect(() => {
    // Request notification permission
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    const fetchData = async () => {
      try {
        const [leadsRes, viewsRes] = await Promise.all([
          fetch('/api/leads'),
          fetch('/api/analytics'),
        ]);

        const leads = await leadsRes.json();
        const views = await viewsRes.json();

        // Calculate stats
        const totalLeads = leads.length || 0;
        
        // Push Notification Logic
        if (stats.totalLeads > 0 && totalLeads > stats.totalLeads) {
          if (Notification.permission === "granted") {
            new Notification("🚀 New Lead Received!", {
              body: `${leads[0].name} is interested in ${leads[0].service}.`,
              icon: "/favicon.ico"
            });
            // Play a ding sound
            const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
            audio.play().catch(e => console.log("Audio play failed:", e));
          }
        }

        const totalViews = views.reduce((acc, curr) => acc + curr.view_count, 0) || 0;
        
        // Find popular service
        const services = leads.map(l => l.service);
        const popularService = services.sort((a,b) =>
          services.filter(v => v===a).length - services.filter(v => v===b).length
        ).pop() || 'N/A';

        // Top Page
        const topPage = views[0]?.page_path || '/';

        setStats(prev => ({ 
          ...prev, 
          totalLeads, 
          totalViews, 
          popularService, 
          topPage, 
          viewsData: views 
        }));
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    fetchGrowthTip(); // Get tip once on mount
    // Poll every 30 seconds for new leads
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [stats.totalLeads]);

  const cards = [
    { label: 'Total Leads', value: stats.totalLeads, icon: <Users className="text-blue-600" />, color: 'bg-blue-50' },
    { label: 'Total Views', value: stats.totalViews, icon: <MousePointer2 className="text-orange-600" />, color: 'bg-orange-50' },
    { label: 'Popular Service', value: stats.popularService, icon: <TrendingUp className="text-green-600" />, color: 'bg-green-50' },
    { label: 'Top Performing Page', value: stats.topPage, icon: <BarChart3 className="text-purple-600" />, color: 'bg-purple-50' },
  ];

  return (
    <div className="space-y-10">
      {/* Overview Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-xl border border-black/5 bg-white p-6 shadow-sm group hover:border-orange-500/20 transition-all">
            <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${card.color}`}>
              {card.icon}
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-black/30">{card.label}</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-black">
              {loading ? '...' : card.value}
            </h2>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Real Traffic Insights */}
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold tracking-tight text-black">Traffic Insights</h3>
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/20 bg-black/5 px-2 py-1 rounded-md">Live Data</span>
          </div>
          
          <div className="space-y-6">
             {stats.viewsData && stats.viewsData.length > 0 ? (
               stats.viewsData.slice(0, 5).map((page, idx) => {
                 const percentage = ((page.view_count / stats.totalViews) * 100).toFixed(0);
                 return (
                   <div key={page.page_path} className="space-y-2">
                     <div className="flex justify-between text-xs font-bold transition-all">
                       <span className="text-black/60">{page.page_path}</span>
                       <span className="text-black/30">{page.view_count} views ({percentage}%)</span>
                     </div>
                     <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden">
                       <div 
                         className="h-full bg-orange-500 rounded-full transition-all duration-1000" 
                         style={{ width: `${percentage}%`, opacity: 1 - (idx * 0.15) }}
                       />
                     </div>
                   </div>
                 );
               })
             ) : (
               <div className="h-40 flex items-center justify-center text-xs text-black/20 font-bold border border-dashed border-black/5 rounded-xl uppercase tracking-widest">
                 No Traffic Data Yet
               </div>
             )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold tracking-tight text-black mb-6">Quick Tools</h3>
          <div className="grid gap-4">
             <button className="flex items-center justify-between rounded-xl border border-black/5 p-5 text-sm font-bold text-black group hover:bg-black/5 transition">
               <span className="flex items-center gap-3">
                 <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                   📊
                 </div>
                 Export All Leads
               </span>
               <span className="text-[10px] font-bold text-black/30 uppercase tracking-widest border border-black/10 px-2 py-1 rounded">CSV</span>
             </button>
             
             <button className="flex items-center justify-between rounded-xl border border-black/10 p-5 text-sm font-bold text-black group hover:bg-red-500 transition">
               <span className="flex items-center gap-3 group-hover:text-white">
                 <div className="h-8 w-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-600 transition-all">
                   ⚠️
                 </div>
                 Reset Dashboard Layout
               </span>
             </button>
          </div>
        </div>
      </div>

      {/* AI Agency Growth Hub */}
      <div className="rounded-[32px] border border-purple-500/10 bg-purple-500/[0.02] p-8 lg:p-12 shadow-sm relative overflow-hidden group border border-white">
        <div className="absolute top-0 right-0 p-8 text-[120px] opacity-[0.03] select-none pointer-events-none group-hover:scale-110 transition-all">✨</div>
        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-purple-500 flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-purple-500 rounded-full animate-pulse"></span>
                AI Agency Growth Hub
              </span>
              <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-black">Mastering the Digital Agency Game</h3>
            </div>
            <button 
              onClick={fetchGrowthTip}
              disabled={isTipLoading}
              className="flex items-center gap-2 rounded-2xl bg-white border border-purple-100 px-6 py-3 text-sm font-bold text-purple-600 shadow-sm hover:shadow-md transition disabled:opacity-50"
            >
              {isTipLoading ? '...' : '✨ Next Secret Tip'}
            </button>
          </div>
          
          <div className="p-8 rounded-[24px] bg-white border border-purple-500/5 shadow-xl shadow-purple-500/5">
            <p className="text-lg lg:text-xl font-medium text-purple-900 leading-relaxed italic whitespace-pre-line">
              {stats.aiTip}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
