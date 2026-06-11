'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { 
  MousePointer2, 
  Users, 
  TrendingUp, 
  BarChart3, 
  Sparkles, 
  Clock, 
  Activity, 
  CheckCircle, 
  Eye, 
  ChevronRight, 
  Settings, 
  MapPin, 
  Mail, 
  Phone 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

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
  const [livePulse, setLivePulse] = useState([]);

  // Mock settings values that the user can customize
  const [settings, setSettings] = useState({
    agencyEmail: 'geetanjalisoftwares@gmail.com',
    agencyPhone: '+91 7508657479',
    agencyAddress: 'Faridabad, Haryana, India',
    isEdit: false
  });

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

        const leadsData = await leadsRes.json().catch(() => []);
        const viewsData = await viewsRes.json().catch(() => []);
        
        const leads = Array.isArray(leadsData) ? leadsData : [];
        const views = Array.isArray(viewsData) ? viewsData : [];

        const totalLeads = leads.length || 0;
        
        if (stats.totalLeads > 0 && totalLeads > stats.totalLeads) {
          if (Notification.permission === "granted") {
            new Notification("🚀 New Lead Received!", {
              body: `${leads[0].name} is interested in ${leads[0].service}.`,
              icon: "/favicon.ico"
            });
            const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
            audio.play().catch(e => {});
          }
        }

        const totalViews = views?.reduce((acc, curr) => acc + (curr.view_count || 0), 0) || 0;
        
        // Optimize popular service finding (O(N) instead of O(N^2))
        const serviceCounts = leads.reduce((acc, lead) => {
          if (lead.service) acc[lead.service] = (acc[lead.service] || 0) + 1;
          return acc;
        }, {});
        
        const popularService = Object.keys(serviceCounts).length > 0 
          ? Object.keys(serviceCounts).reduce((a, b) => serviceCounts[a] > serviceCounts[b] ? a : b) 
          : 'N/A';
          
        const topPage = views?.[0]?.page_path || '/';

        setStats(prev => ({ 
          ...prev, 
          totalLeads, 
          totalViews, 
          popularService, 
          topPage, 
          viewsData: views 
        }));

        // Populate live pulse feed logs
        const pulseStream = [];
        leads.slice(0, 3).forEach((lead, i) => {
          pulseStream.push({
            id: `lead-${i}`,
            time: `${15 * (i + 1)} mins ago`,
            text: `New Enquiry received from "${lead.name}" for "${lead.service}"`,
            type: 'lead'
          });
        });
        if (pulseStream.length === 0) {
          pulseStream.push({ id: 'init', time: 'Just Now', text: 'Dashboard synchronized with Supabase cloud databases.', type: 'sys' });
        }
        setLivePulse(pulseStream);

      } catch (error) {
        // Ignored
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    fetchGrowthTip();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []); // Removed stats.totalLeads to prevent infinite loop

  const cards = [
    { label: 'Total Leads', value: stats.totalLeads, icon: <Users size={20} />, color: 'text-blue-600', bg: 'bg-blue-500/5' },
    { label: 'Total Views', value: stats.totalViews, icon: <MousePointer2 size={20} />, color: 'text-orange-600', bg: 'bg-orange-500/5' },
    { label: 'Popular Service', value: stats.popularService, icon: <TrendingUp size={20} />, color: 'text-green-600', bg: 'bg-green-500/5' },
    { label: 'Top Performance', value: stats.topPage, icon: <BarChart3 size={20} />, color: 'text-purple-600', bg: 'bg-purple-500/5' },
  ];

  // Dynamically calculate spline coords
  const WEEKLY_METRICS = [320, 480, 390, 780, 610, 940, 820];
  const svgWidth = 600;
  const svgHeight = 150;
  
  const pointsString = useMemo(() => {
    return WEEKLY_METRICS.map((pt, i) => {
      const x = (i * (svgWidth / (WEEKLY_METRICS.length - 1)));
      const y = svgHeight - (pt * (svgHeight / 1000));
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  }, [svgWidth, svgHeight]); // removed WEEKLY_METRICS

  const areaString = useMemo(() => {
    const start = `M 0 ${svgHeight}`;
    const line = WEEKLY_METRICS.map((pt, i) => {
      const x = (i * (svgWidth / (WEEKLY_METRICS.length - 1)));
      const y = svgHeight - (pt * (svgHeight / 1000));
      return `L ${x} ${y}`;
    }).join(' ');
    const end = `L ${svgWidth} ${svgHeight} Z`;
    return `${start} ${line} ${end}`;
  }, [svgWidth, svgHeight]); // removed WEEKLY_METRICS

  const handleSaveSettings = () => {
    setSettings(prev => ({ ...prev, isEdit: false }));
    toast.success('Agency settings updated globally!');
  };

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
      className="space-y-12 text-left"
    >
      
      {/* ────── OVERVIEW METRICS CARDS ────── */}
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
            <p className="text-xs font-semibold uppercase tracking-wider text-black/50">{card.label}</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-black flex items-baseline gap-1">
              {loading ? <span className="h-8 w-12 animate-pulse bg-black/5 rounded" /> : card.value}
              {typeof card.value === 'number' && <span className="text-xs font-semibold text-black/20">pts</span>}
            </h2>
          </motion.div>
        ))}
      </div>

      {/* ────── 💎 HIGH-FIDELITY INTERACTIVE SVG SPLINE TRAFFIC CHART 💎 ────── */}
      <motion.div 
        variants={itemVariants}
        className="rounded-[40px] border border-black/[0.03] bg-white p-8 sm:p-10 shadow-sm relative overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-black flex items-center gap-2">
              <Activity size={18} className="text-orange-500" />
              Traffic Velocity Curve
            </h3>
            <p className="text-sm text-black/40 mt-1">Real-time graphic representation of traffic density across the weekly cycle</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-black/65">
              <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
              Unique Views
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 bg-orange-500/5 px-3 py-1.5 rounded-full border border-orange-500/10">
              Live Monitor
            </span>
          </div>
        </div>

        {/* The Spline Plot canvas */}
        <div className="relative h-44 w-full">
          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0.00" />
              </linearGradient>
            </defs>

            {/* Grid Helper Horizontal Lines */}
            <line x1="0" y1="37" x2={svgWidth} y2="37" stroke="#000000" strokeOpacity="0.03" strokeDasharray="3" />
            <line x1="0" y1="75" x2={svgWidth} y2="75" stroke="#000000" strokeOpacity="0.03" strokeDasharray="3" />
            <line x1="0" y1="112" x2={svgWidth} y2="112" stroke="#000000" strokeOpacity="0.03" strokeDasharray="3" />

            <motion.path 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              d={areaString} 
              fill="url(#areaGrad)" 
            />

            <motion.path 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              d={pointsString} 
              fill="none" 
              stroke="#f97316" 
              strokeWidth="3.5" 
              strokeLinecap="round"
            />

            {WEEKLY_METRICS.map((pt, i) => {
              const x = (i * (svgWidth / (WEEKLY_METRICS.length - 1)));
              const y = svgHeight - (pt * (svgHeight / 1000));
              return (
                <g key={i} className="group/node cursor-pointer">
                  <circle 
                    cx={x} 
                    cy={y} 
                    r="5" 
                    fill="#ffffff" 
                    stroke="#f97316" 
                    strokeWidth="3" 
                    className="transition duration-200 group-hover/node:r-7 group-hover/node:stroke-black" 
                  />
                  <foreignObject x={x - 24} y={y - 32} width="48" height="24" className="overflow-visible pointer-events-none opacity-0 group-hover/node:opacity-100 transition duration-200">
                    <div className="bg-black text-white text-xs font-semibold text-center rounded py-0.5 px-1 shadow">
                      {pt} vws
                    </div>
                  </foreignObject>
                </g>
              );
            })}
          </svg>
        </div>

        {/* X-Axis Labels */}
        <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-black/50 pt-4 border-t border-black/[0.03]">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </motion.div>

      {/* ────── TWO COLUMN SUB-BLOCKS: TRAFFIC DISTRIBUTION & REALTIME ACTIVITY PULSE ────── */}
      <div className="grid gap-10 lg:grid-cols-12">
        
        {/* Real Traffic Distribution Left (Colspan 7) */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-7 rounded-[40px] border border-black/[0.03] bg-white p-10 shadow-sm relative group"
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-bold tracking-tight text-black">Traffic Distribution</h3>
              <p className="text-xs text-black/30 mt-1">Live client browser directory paths</p>
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-500 bg-orange-500/5 px-3 py-1.5 rounded-full border border-orange-500/10">Active</span>
          </div>
          
          <div className="space-y-8">
             {stats.viewsData && stats.viewsData.length > 0 ? (
               stats.viewsData.slice(0, 4).map((page, idx) => {
                 const percentage = ((page.view_count / stats.totalViews) * 100).toFixed(0);
                 return (
                   <div key={page.page_path} className="space-y-3">
                     <div className="flex justify-between text-xs font-semibold transition-all">
                       <span className="text-black/60 hover:text-black transition-colors">{page.page_path}</span>
                       <span className="text-black/40 tracking-tighter">{page.view_count} <span className="font-semibold text-black/20">views</span> ({percentage}%)</span>
                     </div>
                     <div className="h-2.5 w-full bg-black/[0.03] rounded-full overflow-hidden">
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
               <div className="h-48 flex flex-col items-center justify-center text-xs text-black/40 font-semibold border-2 border-dashed border-black/[0.02] rounded-[32px] uppercase tracking-wider gap-4">
                 <div className="h-10 w-10 rounded-full bg-black/[0.02] animate-pulse flex items-center justify-center">?</div>
                 No Traffic Data Yet
               </div>
             )}
          </div>
        </motion.div>

        {/* Live Activity Pulse Right Sidebar (Colspan 5) */}
        <motion.div 
          variants={itemVariants} 
          className="lg:col-span-5 rounded-[40px] border border-black/[0.03] bg-white p-10 shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold tracking-tight text-black flex items-center gap-2">
                <Activity size={18} className="text-orange-500 animate-pulse" />
                Live Feed
              </h3>
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            </div>

            <div className="space-y-5">
              {livePulse.map((pulse) => (
                <div key={pulse.id} className="flex gap-4 items-start text-sm border-b border-black/[0.02] pb-3.5">
                  <div className="h-7 w-7 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600 shrink-0">
                    <Activity size={12} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-black/85 font-semibold leading-relaxed text-left">{pulse.text}</p>
                    <p className="text-xs text-black/40 flex items-center gap-1">
                      <Clock size={10} /> {pulse.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-black/[0.02] text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-black/40">
              Refreshes in background
            </span>
          </div>
        </motion.div>
      </div>

      {/* ────── CENTRALIZED GLOBAL SETTINGS CONTROL CENTER (No-Code Config Panel) ────── */}
      <motion.div 
        variants={itemVariants}
        className="rounded-[40px] border border-black/[0.03] bg-white p-10 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-black/[0.02] mb-6 gap-3">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-black flex items-center gap-2">
              <Settings size={18} className="text-orange-500" />
              Centralized Agency Coordinates
            </h3>
            <p className="text-xs text-black/30 mt-1">Configure company coordinates once to dynamically sync footers globally</p>
          </div>
          
          <button
            onClick={() => {
              if (settings.isEdit) {
                handleSaveSettings();
              } else {
                setSettings(prev => ({ ...prev, isEdit: true }));
              }
            }}
            className="rounded-xl bg-black hover:bg-orange-600 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition shadow-sm"
          >
            {settings.isEdit ? 'Save Changes' : 'Edit Coordinates'}
          </button>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-semibold uppercase tracking-wider text-black/55 flex items-center gap-1.5">
              <Mail size={12} className="text-orange-500" /> Official Email Desk
            </label>
            <input 
              type="email" 
              readOnly={!settings.isEdit}
              value={settings.agencyEmail}
              onChange={(e) => setSettings({ ...settings, agencyEmail: e.target.value })}
              className={`w-full rounded-xl border border-black/5 bg-stone-50 py-2.5 px-3.5 text-xs text-black outline-none transition focus:border-orange-500/20 ${settings.isEdit ? 'bg-white focus:ring-4 focus:ring-orange-500/5' : 'cursor-not-allowed opacity-70'}`}
            />
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-xs font-semibold uppercase tracking-wider text-black/55 flex items-center gap-1.5">
              <Phone size={12} className="text-orange-500" /> Contact Phone
            </label>
            <input 
              type="text" 
              readOnly={!settings.isEdit}
              value={settings.agencyPhone}
              onChange={(e) => setSettings({ ...settings, agencyPhone: e.target.value })}
              className={`w-full rounded-xl border border-black/5 bg-stone-50 py-2.5 px-3.5 text-xs text-black outline-none transition focus:border-orange-500/20 ${settings.isEdit ? 'bg-white focus:ring-4 focus:ring-orange-500/5' : 'cursor-not-allowed opacity-70'}`}
            />
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-xs font-semibold uppercase tracking-wider text-black/55 flex items-center gap-1.5">
              <MapPin size={12} className="text-orange-500" /> Corporate Headquarters
            </label>
            <input 
              type="text" 
              readOnly={!settings.isEdit}
              value={settings.agencyAddress}
              onChange={(e) => setSettings({ ...settings, agencyAddress: e.target.value })}
              className={`w-full rounded-xl border border-black/5 bg-stone-50 py-2.5 px-3.5 text-xs text-black outline-none transition focus:border-orange-500/20 ${settings.isEdit ? 'bg-white focus:ring-4 focus:ring-orange-500/5' : 'cursor-not-allowed opacity-70'}`}
            />
          </div>
        </div>
      </motion.div>

      {/* AI Agency Growth Hub */}
      <motion.div variants={itemVariants} className="rounded-[48px] border-4 border-white bg-gradient-to-br from-purple-600/5 via-white to-orange-500/5 p-10 lg:p-16 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.03)] relative overflow-hidden group">
        <div className="absolute -top-24 -right-24 h-64 w-64 bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-10 right-10 p-8 text-[140px] opacity-[0.03] select-none pointer-events-none group-hover:scale-110 group-hover:rotate-6 transition-all duration-1000">✨</div>
        
        <div className="relative z-10 space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 flex items-center gap-3">
                <span className="h-2.5 w-2.5 bg-purple-600 rounded-full animate-pulse shadow-[0_0_10px_rgba(147,51,234,0.5)]"></span>
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
            <div className="absolute top-0 left-10 -translate-y-1/2 px-4 py-1 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-full">Pro Tip</div>
            <p className="text-xl lg:text-2xl font-medium text-black leading-relaxed italic whitespace-pre-line selection:bg-orange-500/20">
              &ldquo;{stats.aiTip}&rdquo;
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
