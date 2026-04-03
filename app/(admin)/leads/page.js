'use client';

import React, { useEffect, useState } from 'react';
import { Mail, Briefcase, Calendar, Info } from 'lucide-react';

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch('/api/leads');
        const data = await res.json();
        setLeads(data);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  if (loading) {
    return <div className="flex h-64 items-center justify-center text-black/30 font-medium">Loading Leads...</div>;
  }

  if (leads.length === 0) {
    return <div className="flex h-64 items-center justify-center text-black/30 font-medium">No enquiries yet.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-black/5">
            <th className="pb-4 text-xs font-bold uppercase tracking-wider text-black/30">Client Name</th>
            <th className="pb-4 text-xs font-bold uppercase tracking-wider text-black/30">Enquiry Service</th>
            <th className="pb-4 text-xs font-bold uppercase tracking-wider text-black/30">Date Received</th>
            <th className="pb-4 text-xs font-bold uppercase tracking-wider text-black/30 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black/5">
          {leads.map((lead) => (
            <tr key={lead.id} className="group hover:bg-[#fcfcfc] transition">
              <td className="py-5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-600 font-bold text-xs uppercase">
                    {lead.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-black">{lead.name}</h4>
                    <p className="text-xs text-black/40 flex items-center gap-1">
                      <Mail size={12} /> {lead.email}
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-3 py-1 text-xs font-bold text-black/60">
                  <Briefcase size={12} /> {lead.service}
                </span>
              </td>
              <td className="py-5">
                <p className="text-sm font-medium text-black/60 flex items-center gap-1.5">
                  <Calendar size={14} /> {new Date(lead.created_at).toLocaleDateString()}
                </p>
              </td>
              <td className="py-5 text-right">
                <button className="inline-flex items-center gap-2 rounded-xl bg-orange-500/10 px-4 py-2 text-sm font-bold text-orange-600 transition hover:bg-orange-500 hover:text-white">
                  <Info size={16} /> Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
