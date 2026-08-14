"use client";

import { useState, useEffect } from "react";
import { Inbox, Mail, Calendar, Search, DollarSign, Tag } from "lucide-react";

export default function AdminLeadsPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadInquiries() {
      try {
        const res = await fetch("/api/contact");
        const data = await res.json();
        setInquiries(data.inquiries || []);
      } catch (err) {
        console.error("Error fetching admin leads:", err);
      } finally {
        setLoading(false);
      }
    }
    loadInquiries();
  }, []);

  const filteredInquiries = inquiries.filter((item) =>
    (item.name + " " + item.email + " " + item.service + " " + item.message)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Client Inquiries &amp; Leads
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-light">
            Review incoming project proposals and messages submitted through your website contact forms.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-md border border-stone-200">
        <div className="relative flex-1">
          <Search className="h-4 w-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search inquiries by client name, email, or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-stone-50 border border-stone-200 rounded-md pl-10 pr-4 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-black transition-colors"
          />
        </div>
        <div className="text-xs font-semibold text-stone-500 shrink-0">
          Total Leads: <span className="text-stone-900 font-bold">{filteredInquiries.length}</span>
        </div>
      </div>

      {/* Inquiries Table / Grid */}
      <div className="bg-white border border-stone-200 rounded-md overflow-hidden">
        {loading ? (
          <div className="text-center py-10 text-xs text-stone-500">Loading incoming inquiries...</div>
        ) : filteredInquiries.length === 0 ? (
          <div className="text-center py-10 space-y-3">
            <Inbox className="h-8 w-8 text-stone-300 mx-auto" />
            <p className="text-sm text-stone-600 font-light">No client inquiries found yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {filteredInquiries.map((item, idx) => {
              const formattedDate = item.created_at
                ? new Date(item.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Recent";

              return (
                <div key={item.id || idx} className="p-6 hover:bg-stone-50/60 transition-colors space-y-4">
                  {/* Row Top */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-md bg-orange-600/10 border border-orange-600/20 flex items-center justify-center text-orange-600 font-bold text-sm">
                        {item.name ? item.name.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-stone-900">{item.name || "Anonymous Client"}</h3>
                        <a
                          href={`mailto:${item.email}`}
                          className="text-xs font-medium text-stone-500 hover:text-orange-600 transition-colors flex items-center gap-1"
                        >
                          <Mail className="h-3 w-3" /> {item.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-stone-400 shrink-0">
                      <span className="inline-flex items-center gap-1 font-light">
                        <Calendar className="h-3 w-3" /> {formattedDate}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-green-100 text-green-800 font-bold text-[10px]">
                        {item.status || "New Lead"}
                      </span>
                    </div>
                  </div>

                  {/* Metadata Chips */}
                  <div className="flex flex-wrap items-center gap-2">
                    {item.service && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-stone-100 text-stone-700 font-semibold text-[11px]">
                        <Tag className="h-3 w-3 text-stone-400" /> {item.service}
                      </span>
                    )}
                    {item.budget && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-stone-100 text-stone-700 font-semibold text-[11px]">
                        <DollarSign className="h-3 w-3 text-stone-400" /> Budget: {item.budget}
                      </span>
                    )}
                  </div>

                  {/* Message Body */}
                  {item.message && (
                    <div className="p-4 rounded-md bg-stone-50 border border-stone-100 text-xs text-stone-700 font-light leading-relaxed">
                      "{item.message}"
                    </div>
                  )}

                  {/* Quick Action */}
                  <div className="flex justify-end pt-1">
                    <a
                      href={`mailto:${item.email}?subject=Regarding Your Project Inquiry - Geetanjali Softwares`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-black text-white text-xs font-semibold hover:bg-zinc-800 transition-colors"
                    >
                      <Mail className="h-3.5 w-3.5" /> Reply to Client Email
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
