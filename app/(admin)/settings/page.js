'use client';

import React, { useEffect, useState } from 'react';
import { Search, Globe, MapPin, Save, Info, Loader2 } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    site_title: '',
    site_description: '',
    keywords: '',
    local_focus: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings');
        const data = await res.json();
        if (data && data.site_title) {
          setSettings(data);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleAIOptimize = async (targetField = 'all') => {
    setIsOptimizing(true);
    setMessage('');
    try {
      const res = await fetch('/api/ai/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error('Failed to generate SEO suggestions');

      const data = await res.json();
      
      if (targetField === 'all') {
        setSettings(prev => ({
          ...prev,
          site_title: data.site_title || prev.site_title || '',
          site_description: data.site_description || prev.site_description || '',
          keywords: data.keywords || prev.keywords || '',
        }));
      } else {
        setSettings(prev => ({
          ...prev,
          [targetField]: data[targetField] || prev[targetField] || '',
        }));
      }
      setMessage('✨ AI Optimization suggestions applied!');
    } catch (error) {
      console.error('AI Error:', error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setMessage('Settings saved successfully! Changes will reflect on live site.');
      } else {
        throw new Error('Failed to save settings');
      }
    } catch (error) {
      setMessage('Error saving settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex h-64 items-center justify-center text-black/30 font-medium">Loading SEO Settings...</div>;
  }

  return (
    <div className="max-w-4xl space-y-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 rounded-2xl bg-orange-500/5 p-4 border border-orange-500/10 text-orange-700 text-sm flex-1">
          <Info size={18} />
          <p>These settings directly control how your website appears on **Google Search**. Update them carefully!</p>
        </div>
        <button
          type="button"
          onClick={() => handleAIOptimize('all')}
          disabled={isOptimizing}
          className="ml-4 flex items-center gap-2 rounded-xl bg-purple-500/10 px-6 py-4 text-sm font-bold text-purple-600 transition hover:bg-purple-500/20 disabled:opacity-50 h-fit"
        >
          {isOptimizing ? <Loader2 className="h-4 w-4 animate-spin" /> : '✨ AI Optimize All'}
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Basic SEO */}
        <div className="grid gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-black/40 ml-1 flex items-center gap-2">
                <Globe size={14} /> Global Site Title
              </label>
              <button 
                type="button" 
                onClick={() => handleAIOptimize('site_title')}
                disabled={isOptimizing}
                className="text-[10px] font-bold text-purple-500 hover:text-purple-600 transition-colors"
                title="Optimize with AI"
              >
                {isOptimizing ? '...' : '✨ Suggest AI Title'}
              </button>
            </div>
            <input
              type="text"
              name="site_title"
              value={settings.site_title}
              onChange={handleChange}
              placeholder="e.g. Geetanjali Softwares - Best Agency in Bihar"
              className="h-14 w-full rounded-2xl border border-black/10 bg-white px-5 text-sm text-black outline-none transition focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 font-medium"
            />
            <p className="mt-2 text-xs text-black/30 ml-1">Ideal length: 50-60 characters.</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-black/40 ml-1 flex items-center gap-2">
                <Search size={14} /> Meta Description
              </label>
              <button 
                type="button" 
                onClick={() => handleAIOptimize('site_description')}
                disabled={isOptimizing}
                className="text-[10px] font-bold text-purple-500 hover:text-purple-600 transition-colors"
                title="Optimize with AI"
              >
                {isOptimizing ? '...' : '✨ Suggest AI Description'}
              </button>
            </div>
            <textarea
              name="site_description"
              value={settings.site_description}
              onChange={handleChange}
              rows="4"
              placeholder="Tell Google and potential users about your business..."
              className="w-full rounded-2xl border border-black/10 bg-white p-5 text-sm text-black outline-none transition focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 font-medium"
            />
            <p className="mt-2 text-xs text-black/30 ml-1">Ideal length: 150-160 characters.</p>
          </div>
        </div>

        {/* Local SEO */}
        <div className="grid gap-6 sm:grid-cols-2 pt-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-black/40 ml-1 flex items-center gap-2">
                <Search size={14} /> SEO Keywords
              </label>
              <button 
                type="button" 
                onClick={() => handleAIOptimize('keywords')}
                disabled={isOptimizing}
                className="text-[10px] font-bold text-purple-500 hover:text-purple-600 transition-colors"
                title="Suggest with AI"
              >
                {isOptimizing ? '...' : '✨ Suggest Keywords'}
              </button>
            </div>
            <input
              type="text"
              name="keywords"
              value={settings.keywords}
              onChange={handleChange}
              placeholder="digital, marketing, bihar, patna"
              className="h-14 w-full rounded-2xl border border-black/10 bg-white px-5 text-sm text-black outline-none transition focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 font-medium"
            />
            <p className="mt-2 text-xs text-black/30 ml-1">Separate keywords with commas.</p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-black/40 mb-3 ml-1 flex items-center gap-2">
              <MapPin size={14} /> Local Focus Target
            </label>
            <input
              type="text"
              name="local_focus"
              value={settings.local_focus}
              onChange={handleChange}
              placeholder="e.g. Bihar, Patna, Faridabad"
              className="h-14 w-full rounded-2xl border border-black/10 bg-white px-5 text-sm text-black outline-none transition focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10"
            />
            <p className="mt-2 text-xs text-black/30 ml-1">Your primary target region for Local SEO.</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-black/5">
           {message && (
             <p className={`text-sm font-medium ${message.includes('Error') ? 'text-red-500' : 'text-green-600'}`}>
               {message}
             </p>
           )}
           <button
             type="submit"
             disabled={saving}
             className="flex items-center gap-2 rounded-xl bg-orange-500 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-orange-500/30 transition hover:bg-orange-600 active:scale-[0.98] disabled:opacity-50 ml-auto"
           >
             <Save size={18} />
             {saving ? 'Saving...' : 'Save Site Settings'}
           </button>
        </div>
      </form>
    </div>
  );
}
