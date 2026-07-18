'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { Send, CheckCircle2, ArrowRight } from 'lucide-react';

export default function SidebarLeadForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
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
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: formData.service,
          message: `Phone: ${formData.phone}\n\nGoal: ${formData.message}`
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        toast.success('Strategy request sent successfully! We will connect shortly.');
        setFormData({ name: '', email: '', phone: '', service: 'SEO & Digital Marketing', message: '' });
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
      <div className="border border-foreground/10 bg-foreground/5 p-8 text-center space-y-6">
        <div className="mx-auto h-16 w-16 bg-primary/10 flex items-center justify-center text-primary">
          <CheckCircle2 size={32} />
        </div>
        <div>
          <h4 className="font-heading text-2xl font-bold uppercase tracking-tight text-foreground">Request Sent!</h4>
          <p className="text-sm text-foreground/60 mt-4 leading-relaxed font-medium">
            Thank you. We have received your project details and will connect with you via email within 24 hours.
          </p>
        </div>
        <button
          onClick={() => setSuccess(false)}
          className="inline-flex items-center gap-2 font-heading text-[10px] font-bold uppercase tracking-widest text-primary hover:text-white transition-colors"
        >
          Send another inquiry <ArrowRight size={14} />
        </button>
      </div>
    );
  }

  return (
    <div className="border border-foreground/10 bg-foreground/5 p-6 sm:p-8 space-y-8">
      <div>
        <p className="font-heading text-[10px] font-bold uppercase tracking-widest text-primary">
          Free Strategy
        </p>
        <h4 className="font-heading text-2xl font-bold uppercase tracking-tight text-foreground mt-2">Accelerate Your Growth</h4>
        <p className="text-sm text-foreground/60 mt-4 leading-relaxed font-medium">
          Submit your goals, and get a bespoke digital strategy roadmap from our experts.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <input
            type="text"
            required
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border-b border-foreground/20 bg-transparent py-4 text-sm text-foreground placeholder-foreground/40 outline-none transition-colors focus:border-primary focus:bg-foreground/5 px-4"
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
            className="w-full border-b border-foreground/20 bg-transparent py-4 text-sm text-foreground placeholder-foreground/40 outline-none transition-colors focus:border-primary focus:bg-foreground/5 px-4"
          />
        </div>

        {/* Phone */}
        <div>
          <input
            type="tel"
            required
            placeholder="Phone number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full border-b border-foreground/20 bg-transparent py-4 text-sm text-foreground placeholder-foreground/40 outline-none transition-colors focus:border-primary focus:bg-foreground/5 px-4"
          />
        </div>

        {/* Service */}
        <div>
          <select
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full border-b border-foreground/20 bg-transparent py-4 text-sm text-foreground outline-none transition-colors focus:border-primary focus:bg-foreground/5 px-4 appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 16px center',
              backgroundSize: '12px',
            }}
          >
            <option className="bg-background text-foreground" value="Website Design & Development">Website Design & Development</option>
            <option className="bg-background text-foreground" value="SEO & Digital Marketing">SEO & Digital Marketing</option>
            <option className="bg-background text-foreground" value="Brand Strategy & Identity">Brand Strategy & Identity</option>
            <option className="bg-background text-foreground" value="Custom Software Development">Custom Software Development</option>
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
            className="w-full border-b border-foreground/20 bg-transparent py-4 text-sm text-foreground placeholder-foreground/40 outline-none resize-none transition-colors focus:border-primary focus:bg-foreground/5 px-4 mt-2"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="group relative w-full inline-flex items-center justify-center gap-4 overflow-hidden border border-foreground/20 bg-primary px-8 py-5 font-heading text-[12px] font-bold uppercase tracking-widest text-white transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] mt-6"
        >
          <span className="relative z-10">{loading ? 'Sending...' : 'Get My Free Roadmap'}</span>
          {!loading && (
            <span className="relative z-10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight size={14} />
            </span>
          )}
        </button>
      </form>
    </div>
  );
}
