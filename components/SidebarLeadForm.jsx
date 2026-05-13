'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { Send, CheckCircle2, ArrowRight } from 'lucide-react';

export default function SidebarLeadForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'SEO & Digital Marketing',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        toast.success('Strategy request sent successfully! We will connect shortly.');
        setFormData({ name: '', email: '', service: 'SEO & Digital Marketing', message: '' });
      } else {
        toast.error(data.error || 'Failed to submit request.');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-[28px] border border-black/5 bg-slate-50 p-6 text-center space-y-4 shadow-sm animate-fade-in">
        <div className="mx-auto h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-600">
          <CheckCircle2 size={24} />
        </div>
        <div>
          <h4 className="text-base font-semibold text-slate-900">Request Sent!</h4>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Thank you. We have received your project details and will connect with you via email within 24 hours.
          </p>
        </div>
        <button
          onClick={() => setSuccess(false)}
          className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-orange-600 hover:text-slate-900 transition"
        >
          Send another inquiry <ArrowRight size={12} />
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-[28px] border border-black/5 bg-slate-50 p-5 shadow-sm sm:p-6 space-y-4">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-orange-600">
          Free Strategy
        </p>
        <h4 className="text-base font-semibold text-slate-900 mt-1">Accelerate Your Growth</h4>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          Submit your goals, and get a bespoke digital strategy roadmap from our experts.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Name */}
        <div>
          <input
            type="text"
            required
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-2xl border border-black/10 bg-white py-3 px-4 text-xs text-slate-900 placeholder-slate-400 outline-none transition duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 shadow-sm"
          />
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            required
            placeholder="Email address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full rounded-2xl border border-black/10 bg-white py-3 px-4 text-xs text-slate-900 placeholder-slate-400 outline-none transition duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 shadow-sm"
          />
        </div>

        {/* Service */}
        <div>
          <select
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full rounded-2xl border border-black/10 bg-white py-3 px-4 text-xs text-slate-900 outline-none transition duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 appearance-none cursor-pointer shadow-sm"
            style={{
              backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 16px center',
              backgroundSize: '12px',
            }}
          >
            <option value="Website Design & Development">Website Design & Development</option>
            <option value="SEO & Digital Marketing">SEO & Digital Marketing</option>
            <option value="Brand Strategy & Identity">Brand Strategy & Identity</option>
            <option value="Custom Software Development">Custom Software Development</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <textarea
            required
            rows={3}
            placeholder="Describe your business goal..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full rounded-2xl border border-black/10 bg-white py-3 px-4 text-xs text-slate-900 placeholder-slate-400 outline-none resize-none transition duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 shadow-sm"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-600 py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-orange-700 disabled:opacity-50 active:scale-95 shadow-sm"
        >
          {loading ? 'Sending...' : 'Get My Free Roadmap'}
          <Send size={12} />
        </button>
      </form>
    </div>
  );
}
