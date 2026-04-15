'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2, RefreshCcw, Save, ShieldCheck, Trash2, Sparkles } from 'lucide-react';
import { automixaPlans } from '@/lib/automixa';

const initialForm = {
  page_id: '',
  ig_id: '',
  page_access_token: '',
  page_name: '',
  ig_username: '',
  plan_tier: 'starter',
  promo_code: '',
  daily_limit: 250,
  auto_like: true,
  schedule_active: false,
  start_time: '00:00',
  end_time: '23:59',
  timezone: 'UTC',
  persona: 'Professional',
  expires_at: '',
  bio: '',
  knowledge_base: '',
};

export default function AutomixaAdminPage() {
  const [integrations, setIntegrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState(initialForm);

  const selectedPlan = automixaPlans.find((plan) => plan.id === form.plan_tier) || automixaPlans[0];

  const fetchIntegrations = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/automixa/integrations');
      const data = await res.json();
      setIntegrations(Array.isArray(data) ? data : []);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIntegrations();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePlanChange = (e) => {
    const planId = e.target.value;
    const plan = automixaPlans.find((item) => item.id === planId) || automixaPlans[0];

    setForm((prev) => ({
      ...prev,
      plan_tier: plan.id,
      daily_limit: plan.limits.daily_limit,
      auto_like: plan.featureFlags.auto_like,
      schedule_active: plan.featureFlags.scheduling,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const payload = {
        ...form,
        bio_settings: {
          bio: form.bio,
          show_stats: true,
          custom_links: [],
        },
        knowledge_base: form.knowledge_base || null,
        expires_at: form.expires_at || null,
      };

      const res = await fetch('/api/automixa/integrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save integration');
      }

      setMessage('Integration saved successfully.');
      setForm(initialForm);
      fetchIntegrations();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handlePatch = async (id, updates) => {
    try {
      const res = await fetch('/api/automixa/integrations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update integration');
      }

      setIntegrations((prev) => prev.map((item) => (item.id === id ? data : item)));
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this integration?')) return;

    try {
      const res = await fetch('/api/automixa/integrations', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete integration');
      }

      setIntegrations((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      setMessage(error.message);
    }
  };

  const totals = integrations.reduce(
    (acc, item) => {
      acc.usage += Number(item.usage_count || 0);
      acc.active += item.is_active ? 1 : 0;
      acc.autoLike += item.auto_like ? 1 : 0;
      return acc;
    },
    { usage: 0, active: 0, autoLike: 0 }
  );

  return (
    <div className="space-y-10">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-black/30">Connected</p>
          <h2 className="mt-3 text-3xl font-bold text-black">{integrations.length}</h2>
        </div>
        <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-black/30">Active Automations</p>
          <h2 className="mt-3 text-3xl font-bold text-black">{totals.active}</h2>
        </div>
        <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-black/30">Auto-Like Enabled</p>
          <h2 className="mt-3 text-3xl font-bold text-black">{totals.autoLike}</h2>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr]">
        <form onSubmit={handleSubmit} className="rounded-[32px] border border-black/5 bg-white p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-600">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-black/30">Automixa Setup</p>
              <h1 className="text-2xl font-bold text-black">Create or update an integration</h1>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              name="page_name"
              value={form.page_name}
              onChange={handleChange}
              placeholder="Facebook Page name"
              className="h-14 rounded-2xl border border-black/10 px-4 text-sm outline-none"
            />
            <input
              name="ig_username"
              value={form.ig_username}
              onChange={handleChange}
              placeholder="Instagram username"
              className="h-14 rounded-2xl border border-black/10 px-4 text-sm outline-none"
            />
            <input
              name="page_id"
              value={form.page_id}
              onChange={handleChange}
              placeholder="Page ID"
              className="h-14 rounded-2xl border border-black/10 px-4 text-sm outline-none"
            />
            <input
              name="ig_id"
              value={form.ig_id}
              onChange={handleChange}
              placeholder="Instagram ID"
              className="h-14 rounded-2xl border border-black/10 px-4 text-sm outline-none"
            />
            <input
              name="page_access_token"
              value={form.page_access_token}
              onChange={handleChange}
              placeholder="Page access token"
              className="h-14 rounded-2xl border border-black/10 px-4 text-sm outline-none sm:col-span-2"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-black/30">Plan</span>
              <select
                name="plan_tier"
                value={form.plan_tier}
                onChange={handlePlanChange}
                className="h-14 w-full rounded-2xl border border-black/10 px-4 text-sm outline-none"
              >
                {automixaPlans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-black/30">Promo Code</span>
              <input
                name="promo_code"
                value={form.promo_code}
                onChange={handleChange}
                placeholder="LAUNCH10"
                className="h-14 w-full rounded-2xl border border-black/10 px-4 text-sm outline-none"
              />
            </label>
            <label className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-black/30">Daily Limit</span>
              <input
                name="daily_limit"
                type="number"
                value={form.daily_limit}
                onChange={handleChange}
                className="h-14 w-full rounded-2xl border border-black/10 px-4 text-sm outline-none"
              />
            </label>
            <label className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-black/30">Timezone</span>
              <input
                name="timezone"
                value={form.timezone}
                onChange={handleChange}
                className="h-14 w-full rounded-2xl border border-black/10 px-4 text-sm outline-none"
              />
            </label>
            <label className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-black/30">Start Time</span>
              <input
                name="start_time"
                type="time"
                value={form.start_time}
                onChange={handleChange}
                className="h-14 w-full rounded-2xl border border-black/10 px-4 text-sm outline-none"
              />
            </label>
            <label className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-black/30">End Time</span>
              <input
                name="end_time"
                type="time"
                value={form.end_time}
                onChange={handleChange}
                className="h-14 w-full rounded-2xl border border-black/10 px-4 text-sm outline-none"
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex items-center gap-3 rounded-2xl border border-black/10 px-4 py-4">
              <input
                type="checkbox"
                name="auto_like"
                checked={form.auto_like}
                onChange={handleChange}
              />
              <span className="text-sm font-medium text-black">Auto-like enabled</span>
            </label>
            <label className="flex items-center gap-3 rounded-2xl border border-black/10 px-4 py-4">
              <input
                type="checkbox"
                name="schedule_active"
                checked={form.schedule_active}
                onChange={handleChange}
              />
              <span className="text-sm font-medium text-black">Schedule active</span>
            </label>
          </div>

          <div className="grid gap-4">
            <input
              name="expires_at"
              type="datetime-local"
              value={form.expires_at}
              onChange={handleChange}
              className="h-14 rounded-2xl border border-black/10 px-4 text-sm outline-none"
            />
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={3}
              placeholder="Profile bio text"
              className="rounded-2xl border border-black/10 px-4 py-3 text-sm outline-none resize-none"
            />
            <textarea
              name="knowledge_base"
              value={form.knowledge_base}
              onChange={handleChange}
              rows={4}
              placeholder="Knowledge base / playbook"
              className="rounded-2xl border border-black/10 px-4 py-3 text-sm outline-none resize-none"
            />
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="text-sm text-black/50">
              Selected plan: <span className="font-bold text-black">{selectedPlan.name}</span>
            </div>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-6 py-4 text-sm font-bold text-white transition hover:bg-orange-600 disabled:opacity-50"
            >
              {saving ? <RefreshCcw size={16} className="animate-spin" /> : <Save size={16} />}
              {saving ? 'Saving...' : 'Save Integration'}
            </button>
          </div>

          {message && (
            <p className="rounded-2xl bg-black/5 px-4 py-3 text-sm text-black/70">{message}</p>
          )}
        </form>

        <div className="space-y-4">
          <div className="rounded-[32px] border border-black/5 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-orange-600">
              <ShieldCheck size={18} />
              <p className="text-xs font-bold uppercase tracking-[0.24em]">Plan Matrix</p>
            </div>
            <div className="mt-4 space-y-3">
              {selectedPlan.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3 rounded-2xl bg-stone-50 px-4 py-3 text-sm text-black/70">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-orange-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-black/5 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-black">Connected Integrations</h2>
              <button
                type="button"
                onClick={fetchIntegrations}
                className="inline-flex items-center gap-2 rounded-2xl border border-black/10 px-4 py-3 text-sm font-bold text-black transition hover:bg-black/5"
              >
                <RefreshCcw size={16} />
                Refresh
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {loading ? (
                <p className="text-sm text-black/40">Loading integrations...</p>
              ) : integrations.length === 0 ? (
                <p className="text-sm text-black/40">No integrations yet. Add the first one above.</p>
              ) : (
                integrations.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-black/5 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-bold text-black">{item.page_name || item.ig_username || item.id}</p>
                        <p className="text-xs text-black/40">
                          {item.plan?.name || item.plan_tier} - limit {item.daily_limit}
                        </p>
                        <p className="mt-1 text-xs text-black/40">
                          Promo: {item.promo_code || 'none'} | Status: {item.subscription_status || 'active'}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="rounded-xl p-2 text-red-500 transition hover:bg-red-500/10"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {(item.enabled_features || []).slice(0, 5).map((feature) => (
                        <span
                          key={feature}
                          className="rounded-full bg-orange-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-orange-600"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handlePatch(item.id, { is_active: !item.is_active })}
                        className="rounded-2xl border border-black/10 px-4 py-2 text-sm font-bold text-black transition hover:bg-black/5"
                      >
                        {item.is_active ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePatch(item.id, { auto_like: !item.auto_like })}
                        className="rounded-2xl border border-black/10 px-4 py-2 text-sm font-bold text-black transition hover:bg-black/5"
                      >
                        Toggle Auto-like
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePatch(item.id, { schedule_active: !item.schedule_active })}
                        className="rounded-2xl border border-black/10 px-4 py-2 text-sm font-bold text-black transition hover:bg-black/5"
                      >
                        Toggle Schedule
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
