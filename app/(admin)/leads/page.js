'use client';

import React, { useEffect, useState } from 'react';
import { 
  Mail, 
  Briefcase, 
  Calendar, 
  Info, 
  Search, 
  Layers, 
  List, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  X, 
  Trash2, 
  Send,
  User,
  MessageSquare,
  FileText,
  Clock,
  ArrowRightLeft
} from 'lucide-react';
import { toast } from 'sonner';

const PIPELINE_COLUMNS = [
  { id: 'new', label: 'New Enquiries', bg: 'bg-blue-500/5', border: 'border-blue-500/15', text: 'text-blue-600' },
  { id: 'discussion', label: 'In Discussion', bg: 'bg-amber-500/5', border: 'border-amber-500/15', text: 'text-amber-600' },
  { id: 'proposal', label: 'Proposal Sent', bg: 'bg-purple-500/5', border: 'border-purple-500/15', text: 'text-purple-600' },
  { id: 'won', label: 'Projects Won', bg: 'bg-emerald-500/5', border: 'border-emerald-500/15', text: 'text-emerald-600' },
  { id: 'archived', label: 'Archived', bg: 'bg-stone-100', border: 'border-black/5', text: 'text-stone-500' }
];

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' or 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState('All');
  const [selectedLead, setSelectedLead] = useState(null);
  
  // AI Email draft states
  const [aiDraft, setAiDraft] = useState('');
  const [isDrafting, setIsDrafting] = useState(false);

  // Fetch leads from db
  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/leads');
      const data = await res.json();
      setLeads(data || []);
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to sync leads with server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Update lead pipeline status (PUT request)
  const updateLeadStatus = async (leadId, targetStatus) => {
    try {
      const res = await fetch('/api/leads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId, status: targetStatus })
      });

      if (res.ok) {
        toast.success(`Pipeline status updated!`);
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead(prev => ({ ...prev, status: targetStatus }));
        }
        fetchLeads(); // reload grid
      } else {
        toast.error('Failed to transition lead status.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to write database updates.');
    }
  };

  // Permanently delete a lead
  const handleDeleteLead = async (leadId) => {
    if (!confirm('Are you absolutely sure you want to permanently delete this lead? This action is irreversible.')) {
      return;
    }

    try {
      const res = await fetch(`/api/leads?id=${leadId}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        toast.success('Lead purged successfully.');
        setSelectedLead(null);
        fetchLeads();
      } else {
        toast.error('Failed to delete lead from database.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Network failure during lead purging.');
    }
  };

  // Generate a response draft instantly
  const generateAiResponseDraft = (lead) => {
    setIsDrafting(true);
    setAiDraft('');
    
    setTimeout(() => {
      const salutation = `Subject: Proposal for ${lead.service} - Geetanjali Softwares

Dear ${lead.name},

Thank you for reaching out to Geetanjali Softwares regarding your requirement for "${lead.service}". We have carefully evaluated your interest:

"${lead.message}"

We are excited about the possibility of collaborating with you. At Geetanjali Softwares, we specialize in high-performance digital architectures, premium UI layouts, and solid organic growth. 

Here is what we propose as immediate next steps:
1. A brief 10-minute introduction call to map your product roadmap.
2. A detailed wireframe mockup and budget options proposal.

Could you let us know your availability for a brief call this week?

Warm regards,
Business Growth Desk
Geetanjali Softwares
www.geetanjalisoftwares.com`;

      setAiDraft(salutation);
      setIsDrafting(false);
      toast.success('AI Sales Pitch draft generated!');
    }, 800);
  };

  // Filter leads list
  const filteredLeads = leads.filter(lead => {
    const nameStr = lead.name || '';
    const emailStr = lead.email || '';
    const msgStr = lead.message || '';
    const matchesSearch = nameStr.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          emailStr.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          msgStr.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesService = selectedService === 'All' || lead.service === selectedService;
    return matchesSearch && matchesService;
  });

  // Extract unique services list for filter selector
  const servicesList = useMemo(() => {
    const services = leads.map(l => l.service);
    return ['All', ...new Set(services)];
  }, [leads]);

  function useMemo(factory, deps) {
    const [state, setState] = useState(factory);
    useEffect(() => {
      setState(factory());
    }, deps);
    return state;
  }

  return (
    <div className="space-y-8">
      
      {/* ────── TOP BRAND CRM CONTROL BAR ────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-black flex items-center gap-2 text-left">
            <Layers size={22} className="text-orange-600" />
            Lead Management CRM
          </h2>
          <p className="text-sm text-black/40 mt-1 text-left">
            Drag, track, and close client enquiries. Use our custom AI Email Assistant to reply to client needs in seconds.
          </p>
        </div>

        {/* View Mode Toggles */}
        <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl border border-black/5">
          <button
            onClick={() => setViewMode('kanban')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
              viewMode === 'kanban' ? 'bg-white text-orange-600 shadow-sm' : 'text-black/55 hover:text-black'
            }`}
          >
            <Layers size={12} /> Board View
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
              viewMode === 'list' ? 'bg-white text-orange-600 shadow-sm' : 'text-black/55 hover:text-black'
            }`}
          >
            <List size={12} /> Table List
          </button>
        </div>
      </div>

      {/* ────── FILTER OPTIONS PANEL ────── */}
      <div className="bg-white rounded-2xl border border-black/5 p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/35" size={13} />
          <input 
            type="text" 
            placeholder="Search leads, keywords, messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-stone-50 border border-black/5 rounded-xl py-2 pl-9 pr-3 text-xs text-black placeholder-black/35 outline-none transition focus:border-orange-500/20 focus:bg-white"
          />
        </div>

        {/* Services Filters */}
        <div className="relative w-full sm:w-auto">
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="w-full sm:w-56 bg-stone-50 border border-black/5 rounded-xl py-2 px-3 text-xs text-black/75 outline-none appearance-none cursor-pointer focus:border-orange-500/20"
            style={{
              backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
              backgroundSize: '10px',
            }}
          >
            {servicesList.map((svc) => (
              <option key={svc} value={svc}>{svc === 'All' ? 'All Services' : svc}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="py-24 text-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-orange-600 border-t-transparent mx-auto" />
          <p className="text-xs text-black/45 tracking-widest uppercase font-semibold">Syncing CRM Database...</p>
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="py-20 text-center space-y-4 border-2 border-dashed border-black/[0.02] rounded-[40px]">
          <Layers size={32} className="mx-auto text-black/15" />
          <div>
            <p className="text-sm font-semibold text-black">No enquiries found</p>
            <p className="text-xs text-black/45 mt-0.5">We don&apos;t have any lead entries matching this query currently.</p>
          </div>
        </div>
      ) : viewMode === 'kanban' ? (
        
        /* ────── 🚀 KANBAN BOARD VIEW LAYOUT 🚀 ────── */
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
          {PIPELINE_COLUMNS.map((col) => {
            const columnLeads = filteredLeads.filter(lead => {
              const status = lead.status || 'new';
              return status === col.id;
            });

            return (
              <div 
                key={col.id} 
                className="rounded-3xl border border-black/[0.02] bg-white p-4 space-y-4 flex flex-col max-h-[70vh]"
              >
                {/* Column header */}
                <div className="flex items-center justify-between pb-2 border-b border-black/[0.02]">
                  <span className={`text-xs font-semibold uppercase tracking-wider ${col.text}`}>
                    {col.label}
                  </span>
                  <span className="text-xs font-semibold text-black/25 bg-stone-100 px-2 py-0.5 rounded-md">
                    {columnLeads.length}
                  </span>
                </div>

                {/* Cards stack */}
                <div className="space-y-3 overflow-y-auto flex-1 pr-1 custom-scrollbar">
                  {columnLeads.length === 0 ? (
                    <div className="py-10 text-center text-xs font-semibold text-black/15 uppercase tracking-wider border-2 border-dashed border-black/[0.01] rounded-2xl">
                      Empty Lane
                    </div>
                  ) : (
                    columnLeads.map((lead) => (
                      <div
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className="p-4 rounded-2xl border border-black/[0.03] bg-stone-50/50 hover:bg-white hover:border-orange-500/10 hover:shadow-md transition duration-200 cursor-pointer text-left space-y-3 relative group"
                      >
                        <div>
                          <h4 className="text-sm font-semibold text-black group-hover:text-orange-600 transition">
                            {lead.name}
                          </h4>
                          <p className="text-xs font-semibold text-black/35 uppercase mt-0.5 tracking-wider">
                            {lead.service}
                          </p>
                        </div>

                        <p className="text-xs text-black/55 line-clamp-2 leading-relaxed">
                          {lead.message}
                        </p>

                        <div className="flex items-center justify-between pt-2 border-t border-black/[0.03] text-xs text-black/45">
                          <span className="flex items-center gap-1">
                            <Calendar size={10} />
                            {new Date(lead.created_at).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short'
                            })}
                          </span>
                          <span className="h-5 w-5 rounded-lg border border-black/5 flex items-center justify-center bg-white text-black group-hover:bg-orange-500 group-hover:text-white transition">
                            <ChevronRight size={10} />
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        
        /* ────── 📋 CLASSIC TABLE LIST VIEW LAYOUT 📋 ────── */
        <div className="rounded-[40px] border border-black/[0.03] bg-white p-8 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-black/[0.03] text-xs font-semibold uppercase tracking-wider text-black/35">
                  <th className="pb-4">Client Name</th>
                  <th className="pb-4">Enquiry Service</th>
                  <th className="pb-4">Pipeline Status</th>
                  <th className="pb-4">Date Received</th>
                  <th className="pb-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.02]">
                {filteredLeads.map((lead) => {
                  const status = lead.status || 'new';
                  const currentCol = PIPELINE_COLUMNS.find(c => c.id === status) || PIPELINE_COLUMNS[0];
                  
                  return (
                    <tr key={lead.id} className="group hover:bg-[#fcfcfc] transition">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-600 font-bold text-xs uppercase border border-orange-500/10">
                            {lead.name ? lead.name.charAt(0) : '?'}
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm text-black">{lead.name}</h4>
                            <p className="text-xs text-black/40 flex items-center gap-1 mt-0.5">
                              <Mail size={10} /> {lead.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-2.5 py-1 text-xs font-semibold text-black/60">
                          <Briefcase size={10} /> {lead.service}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${currentCol.bg} ${currentCol.text} ${currentCol.border}`}>
                          {currentCol.label}
                        </span>
                      </td>
                      <td className="py-4 text-xs text-black/55">
                        <p className="flex items-center gap-1.5">
                          <Calendar size={12} /> 
                          {new Date(lead.created_at).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </p>
                      </td>
                      <td className="py-4 text-right">
                        <button 
                          onClick={() => setSelectedLead(lead)}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-black/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-black hover:bg-orange-500/5 hover:text-orange-600 transition"
                        >
                          <Info size={12} /> Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ────── 💎 POP-OVER LEAD PROFILE & AI ASSIST PANEL ────── */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
          
          <div className="w-full max-w-xl h-full bg-white shadow-2xl flex flex-col justify-between animate-slide-left relative border-l border-black/5">
            
            {/* Header */}
            <div className="h-20 border-b border-black/5 px-8 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-black text-left">Lead Lifecycle Profile</h3>
                <p className="text-xs text-black/35 text-left">Modify pipeline columns, generate instant AI mail pitches</p>
              </div>
              <button 
                onClick={() => { setSelectedLead(null); setAiDraft(''); }}
                className="h-8 w-8 rounded-full border border-black/5 flex items-center justify-center hover:bg-stone-50 transition text-black"
              >
                <X size={14} />
              </button>
            </div>

            {/* Lifecycle Details Body */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 text-left">
              
              {/* Profile Card */}
              <div className="p-5 rounded-2xl bg-stone-50 border border-black/[0.02] space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-base font-bold text-black">{selectedLead.name}</h4>
                    <p className="text-xs text-black/45 mt-0.5 flex items-center gap-1.5">
                      <Briefcase size={11} className="text-orange-500" /> Interested Service: <strong className="font-semibold text-black">{selectedLead.service}</strong>
                    </p>
                  </div>
                  <span className="inline-flex rounded-lg border border-black/5 bg-white px-2 py-1 text-xs text-black/45">
                    <Clock size={10} className="inline mr-1 mt-0.5" />
                    {new Date(selectedLead.created_at).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short'
                    })}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-y-3 pt-2 text-xs border-t border-black/[0.04]">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-black/35">Client Email</p>
                    <a href={`mailto:${selectedLead.email}`} className="font-semibold text-black hover:text-orange-600 transition mt-0.5 inline-block">
                      {selectedLead.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-black/35">Pipeline Stage</p>
                    <select
                      value={selectedLead.status || 'new'}
                      onChange={(e) => updateLeadStatus(selectedLead.id, e.target.value)}
                      className="text-xs font-bold text-orange-600 bg-white border border-black/5 rounded-lg py-1 px-2 mt-0.5 outline-none cursor-pointer"
                    >
                      <option value="new">New Enquiry</option>
                      <option value="discussion">In Discussion</option>
                      <option value="proposal">Proposal Sent</option>
                      <option value="won">Project Won 🟢</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Requirement Text Box */}
              <div className="space-y-2">
                <h5 className="text-xs font-semibold uppercase tracking-wider text-black/45 flex items-center gap-1">
                  <MessageSquare size={12} className="text-orange-500" /> Client Query Requirements
                </h5>
                <div className="rounded-2xl border border-black/5 bg-stone-50 p-5 text-xs text-black/75 leading-relaxed font-mono whitespace-pre-line shadow-inner max-h-48 overflow-y-auto">
                  &ldquo;{selectedLead.message}&rdquo;
                </div>
              </div>

              {/* ────── 🤖 AI PITCH GENERATOR BOX ────── */}
              <div className="p-5 rounded-2xl border border-purple-500/15 bg-gradient-to-br from-purple-500/[0.02] to-orange-500/[0.02] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 flex items-center gap-1.5">
                    <Sparkles size={13} className="animate-pulse" />
                    AI Business Reply assistant
                  </span>
                  <button
                    onClick={() => generateAiResponseDraft(selectedLead)}
                    disabled={isDrafting}
                    className="rounded-xl bg-black hover:bg-orange-600 text-white text-xs font-semibold uppercase tracking-wider px-4 py-2 transition disabled:opacity-50"
                  >
                    {isDrafting ? 'Drafting...' : 'Generate Sales Pitch'}
                  </button>
                </div>

                {aiDraft && (
                  <div className="space-y-3 animate-fade-in text-left">
                    <div className="relative">
                      <textarea
                        rows={6}
                        readOnly
                        value={aiDraft}
                        className="w-full rounded-xl border border-purple-500/10 bg-white p-4 text-xs leading-relaxed font-mono text-black/75 resize-none outline-none shadow-sm"
                      />
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(aiDraft);
                          toast.success('Sales proposal draft copied to clipboard!');
                        }}
                        className="absolute right-3 bottom-3 rounded-lg bg-stone-100 hover:bg-stone-200 border border-black/5 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-black transition"
                      >
                        Copy Pitch
                      </button>
                    </div>
                    <p className="text-xs text-black/40 leading-relaxed">
                      This smart pitch parses client name, interest, and coordinates to construct a professional, high-converting agency follow-up response.
                    </p>
                  </div>
                )}
              </div>

            </div>

            {/* Quick Actions Footer */}
            <div className="h-20 border-t border-black/5 px-8 flex items-center justify-between bg-stone-50">
              <button
                type="button"
                onClick={() => handleDeleteLead(selectedLead.id)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-red-500/10 text-red-600 bg-red-500/5 hover:bg-red-500 hover:text-white px-4 py-3 text-xs font-bold transition"
              >
                <Trash2 size={13} />
                Delete Enquiry
              </button>

              <div className="flex gap-2">
                <a
                  href={`mailto:${selectedLead.email}?subject=Regarding your enquiry at Geetanjali Softwares`}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-black hover:bg-orange-600 text-white px-5 py-3 text-xs font-bold transition shadow-md"
                >
                  <Send size={12} />
                  Send Email
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
