'use client';

import { motion } from 'framer-motion';
import { Activity, BarChart3, Bot, Layers3, Sparkles, ShieldCheck } from 'lucide-react';

const pulses = [
  { label: 'DM Replies', value: '98.4%', tone: 'from-blue-500 to-cyan-400' },
  { label: 'Engagement', value: '+32%', tone: 'from-indigo-500 to-blue-500' },
  { label: 'Lead Quality', value: 'A+', tone: 'from-sky-500 to-blue-600' },
];

const activity = [
  { title: 'Auto-replied to 18 comments', time: '12s ago' },
  { title: 'Influencer workflow queued', time: '2m ago' },
  { title: 'Promo code LAUNCH10 applied', time: '5m ago' },
];

export default function SaasDashboardVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[640px]">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="glass-panel saas-ring overflow-hidden rounded-[34px] p-4 sm:p-5"
      >
        <div className="rounded-[28px] border border-blue-100/80 bg-white p-4 shadow-[0_20px_60px_rgba(37,99,235,0.08)] sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-blue-600">
                Live SaaS Control Room
              </p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                Automate, score, and scale every Instagram workflow.
              </h3>
            </div>
            <div className="hidden sm:flex items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-700">
              <ShieldCheck size={14} />
              Secure sync
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {pulses.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.08 }}
                className="rounded-[24px] border border-slate-100 bg-slate-50 p-4"
              >
                <div className={`h-2 rounded-full bg-gradient-to-r ${item.tone}`} />
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                  {item.label}
                </p>
                <p className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                  {item.value}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[28px] border border-slate-100 bg-slate-950 p-4 text-white sm:p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-blue-300">
                    Automation Graph
                  </p>
                  <h4 className="mt-2 text-lg font-bold">Daily activity and conversions</h4>
                </div>
                <Activity className="text-blue-300" size={18} />
              </div>

              <div className="mt-5 flex h-48 items-end gap-3 overflow-hidden rounded-[24px] bg-white/5 p-4">
                {[28, 44, 36, 64, 52, 78, 58, 86, 72, 94].map((height, index) => (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.8, delay: 0.15 + index * 0.04 }}
                    className="flex-1 rounded-full bg-gradient-to-t from-blue-500 via-sky-400 to-cyan-300 shadow-[0_0_20px_rgba(56,189,248,0.35)]"
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[28px] border border-blue-100 bg-blue-50 p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
                    <Bot size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-blue-700">
                      AI Assistant
                    </p>
                    <h4 className="text-lg font-bold text-slate-950">Comment and DM responder</h4>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Replies are generated from brand voice, promo rules, and plan-based limits.
                </p>
              </div>

              <div className="rounded-[28px] border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers3 className="text-blue-600" size={18} />
                    <p className="text-sm font-bold text-slate-950">Live Activity</p>
                  </div>
                  <Sparkles className="text-blue-500" size={16} />
                </div>

                <div className="mt-4 space-y-3">
                  {activity.map((item) => (
                    <div key={item.title} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-slate-900">{item.title}</p>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                          {item.time}
                        </p>
                      </div>
                      <BarChart3 className="text-blue-500" size={16} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
