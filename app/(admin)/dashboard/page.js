'use client';

import React, { useEffect, useState } from 'react';
import { MousePointer2, Users, TrendingUp, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

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

        const totalLeads = leads.length || 0;
        
        if (stats.totalLeads > 0 && totalLeads > stats.totalLeads) {
          if (Notification.permission === "granted") {
            new Notification("🚀 New Lead Received!", {
              body: `${leads[0].name} is interested in ${leads[0].service}.`,
              icon: "/favicon.ico"
            });
            const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
            audio.play().catch(e => {}); // Audio play failure handled silently in production
          }
        }

        const totalViews = views.reduce((acc, curr) => acc + curr.view_count, 0) || 0;
        const services = leads.map(l => l.service);
        const popularService = services.sort((a,b) =>
          services.filter(v => v===a).length - services.filter(v => v===b).length
        ).pop() || 'N/A';
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
        // Fetch error handled silently
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    fetchGrowthTip();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [stats.totalLeads]);

  const cards = [
    { label: 'Total Leads', value: stats.totalLeads, icon: <Users size={20} />, color: 'text-blue-600', bg: 'bg-blue-500/5' },
    { label: 'Total Views', value: stats.totalViews, icon: <MousePointer2 size={20} />, color: 'text-orange-600', bg: 'bg-orange-500/5' },
    { label: 'Popular Service', value: stats.popularService, icon: <TrendingUp size={20} />, color: 'text-green-600', bg: 'bg-green-500/5' },
    { label: 'Top Performance', value: stats.topPage, icon: <BarChart3 size={20} />, color: 'text-purple-600', bg: 'bg-purple-500/5' },
  ];

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      variants={containerVariants}
      className="space-y-12"
    >
      {/* Overview Cards */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <motion.div 
            key={card.label} 
            variants={itemVariants}
            className="group relative rounded-[32px] border border-black/[0.03] bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:border-orange-500/20 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
          >
            <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${card.bg} ${card.color} transition-all duration-500 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white`}>
              {card.icon}
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-black/30">{card.label}</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-black flex items-baseline gap-1">
              {loading ? <span className="h-8 w-12 animate-pulse bg-black/5 rounded" /> : card.value}
              {typeof card.value === 'number' && <span className="text-xs font-medium text-black/20">pts</span>}
            </h2>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Real Traffic Insights */}
        <motion.div 
          variants={itemVariants}
          className="rounded-[40px] border border-black/[0.03] bg-white p-10 shadow-sm overflow-hidden relative group"
        >
          <div className="absolute top-0 right-0 p-10 text-6xl opacity-[0.02] transition-transform duration-700 group-hover:scale-125 group-hover:rotate-12">📈</div>
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-bold tracking-tight text-black">Traffic Distribution</h3>
              <p className="text-xs text-black/30 mt-1">Live website performance data</p>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500 bg-orange-500/5 px-3 py-1.5 rounded-full border border-orange-500/10">Active</span>
          </div>
          
          <div className="space-y-8">
             {stats.viewsData && stats.viewsData.length > 0 ? (
               stats.viewsData.slice(0, 5).map((page, idx) => {
                 const percentage = ((page.view_count / stats.totalViews) * 100).toFixed(0);
                 return (
                   <div key={page.page_path} className="space-y-3">
                     <div className="flex justify-between text-[11px] font-bold transition-all">
                       <span className="text-black/50 hover:text-black transition-colors">{page.page_path}</span>
                       <span className="text-black/30 tracking-tighter">{page.view_count} <span className="font-medium text-black/10">views</span> ({percentage}%)</span>
                     </div>
                     <div className="h-2 w-full bg-black/[0.03] rounded-full overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: `${percentage}%` }}
                         transition={{ duration: 1.5, delay: 0.5 + (idx * 0.1), ease: "easeOut" }}
                         className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.2)]" 
                         style={{ opacity: 1 - (idx * 0.1) }}
                       />
                     </div>
                   </div>
                 );
               })
             ) : (
               <div className="h-48 flex flex-col items-center justify-center text-[10px] text-black/20 font-bold border-2 border-dashed border-black/[0.02] rounded-[32px] uppercase tracking-[0.3em] gap-4">
                 <div className="h-10 w-10 rounded-full bg-black/[0.02] animate-pulse flex items-center justify-center">?</div>
                 No Traffic Data Yet
               </div>
             )}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="rounded-[40px] border border-black/[0.03] bg-white p-10 shadow-sm">
          <h3 className="text-xl font-bold tracking-tight text-black mb-10">Strategic Tools</h3>
          <div className="grid gap-5">
             <button className="flex items-center justify-between rounded-3xl border border-black/[0.02] p-6 text-sm font-bold text-black group hover:bg-black/[0.01] hover:border-orange-500/10 transition-all duration-300">
               <span className="flex items-center gap-4">
                 <div className="h-12 w-12 rounded-2xl bg-blue-500/5 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
                   <Users size={20} />
                 </div>
                 <div className="text-left">
                   <p className="font-bold text-black group-hover:text-orange-600 transition-colors">Export Intelligence</p>
                   <p className="text-[10px] text-black/30 font-medium tracking-tight">Generate full lead CSV report</p>
                 </div>
               </span>
               <span className="text-[9px] font-bold text-black/30 uppercase tracking-[0.2em] border border-black/5 px-3 py-1.5 rounded-xl group-hover:border-orange-500/20 transition-colors">CSV</span>
             </button>
             
             <button className="flex items-center justify-between rounded-3xl border border-black/[0.02] p-6 text-sm font-bold text-black group hover:bg-red-500/5 hover:border-red-500/10 transition-all duration-300">
               <span className="flex items-center gap-4">
                 <div className="h-12 w-12 rounded-2xl bg-red-500/5 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                   <TrendingUp size={20} />
                 </div>
                 <div className="text-left">
                   <p className="font-bold text-black group-hover:text-red-700 transition-colors">Cleanse Cache</p>
                   <p className="text-[10px] text-black/30 font-medium tracking-tight">Reset dashboard live metrics</p>
                 </div>
               </span>
             </button>
          </div>
        </motion.div>
      </div>

      {/* AI Agency Growth Hub */}
      <motion.div variants={itemVariants} className="rounded-[48px] border-4 border-white bg-gradient-to-br from-purple-600/5 via-white to-orange-500/5 p-10 lg:p-16 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.03)] relative overflow-hidden group">
        <div className="absolute -top-24 -right-24 h-64 w-64 bg-purple-500/10 rounded-full blur-[100px] transition-all duration-1000 group-hover:bg-orange-500/20" />
        <div className="absolute top-10 right-10 p-8 text-[140px] opacity-[0.03] select-none pointer-events-none group-hover:scale-110 group-hover:rotate-6 transition-all duration-1000">✨</div>
        
        <div className="relative z-10 space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-purple-600 flex items-center gap-3">
                <span className="h-2 w-2 bg-purple-600 rounded-full animate-pulse shadow-[0_0_10px_rgba(147,51,234,0.5)]"></span>
                AI Agency Growth Engine
              </span>
              <h3 className="text-3xl lg:text-4xl font-bold tracking-tighter text-black max-w-xl leading-[1.1]">Skyrocket your agency with AI-driven insights.</h3>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchGrowthTip}
              disabled={isTipLoading}
              className="group flex items-center gap-3 rounded-[24px] bg-black px-8 py-5 text-sm font-bold text-white shadow-2xl shadow-black/20 transition-all duration-500 disabled:opacity-50"
            >
              <span className="transition-transform group-hover:rotate-12">✨</span>
              {isTipLoading ? 'Processing...' : 'Next Strategic Insight'}
            </motion.button>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="p-10 lg:p-14 rounded-[40px] bg-white border border-black/[0.02] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] relative"
          >
            <div className="absolute top-0 left-10 -translate-y-1/2 px-4 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-full">Pro Tip</div>
            <p className="text-xl lg:text-2xl font-medium text-black leading-relaxed italic whitespace-pre-line selection:bg-orange-500/20">
              "{stats.aiTip}"
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
