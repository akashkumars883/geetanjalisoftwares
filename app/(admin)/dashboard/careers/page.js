'use client';

import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Plus, 
  Trash2, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Search, 
  Layers, 
  ChevronRight, 
  Sparkles, 
  UserCheck,
  X,
  Users,
  Eye,
  FileText,
  Mail,
  Phone,
  Calendar,
  ExternalLink,
  Archive,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminCareersPage() {
  const [activeTab, setActiveTab] = useState('applications'); // 'applications' or 'vacancies'
  
  // Positions & Applicants list states
  const [positions, setPositions] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingApplicants, setLoadingApplicants] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  // Search/Filters
  const [applicantSearch, setApplicantSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // New Position Form State
  const [formData, setFormData] = useState({
    title: '',
    department: 'Engineering',
    type: 'Full-Time / Remote',
    experience: '1 - 3 Years',
    path: 'Experienced',
    description: '',
    responsibilitiesText: '',
    requirementsText: ''
  });

  // Custom Screening Questions Configuration
  const [includeQuestions, setIncludeQuestions] = useState(true);
  const [selectedProfileType, setSelectedProfileType] = useState('Frontend');

  // Fetch all positions from dynamic backend
  const fetchPositions = async () => {
    try {
      const res = await fetch('/api/jobs');
      if (res.ok) {
        const data = await res.json();
        setPositions(data);
      }
    } catch (err) {
      console.error("Error fetching vacancies:", err);
    }
  };

  // Fetch all candidate submissions
  const fetchApplicants = async () => {
    try {
      setLoadingApplicants(true);
      const res = await fetch('/api/careers');
      if (res.ok) {
        const data = await res.json();
        setApplicants(data || []);
      }
    } catch (err) {
      console.error("Error fetching applicants:", err);
    } finally {
      setLoadingApplicants(false);
    }
  };

  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      await Promise.all([fetchPositions(), fetchApplicants()]);
      setLoading(false);
    };
    initData();
  }, []);

  // Form input handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Profile-specific screening questions preset generator
  const getQuestionsPreset = (type) => {
    if (type === 'Frontend') {
      return [
        { id: 'github_url', label: 'GitHub Profile URL', type: 'url', placeholder: 'e.g. https://github.com/yourusername', required: true },
        { id: 'nextjs_rendering', label: 'Which Next.js rendering pattern do you prefer for high SEO landing pages?', type: 'select', options: ['Static Site Generation (SSG / ISR)', 'Server-Side Rendering (SSR)', 'Client-Side Rendering (CSR)'], required: true }
      ];
    }
    if (type === 'Design') {
      return [
        { id: 'figma_link', label: 'Figma Showcase Link (File or Prototype)', type: 'url', placeholder: 'e.g. https://figma.com/file/...', required: true },
        { id: 'design_philosophy', label: 'In 1 sentence, how do you balance minimalist aesthetics with detailed UI functionality?', type: 'text', placeholder: 'e.g. I prioritize visual hierarchies...', required: true }
      ];
    }
    if (type === 'Marketing') {
      return [
        { id: 'seo_keyword', label: 'Provide an example of a competitive keyword you successfully ranked on Google Page 1', type: 'text', placeholder: 'e.g. Best SaaS tool in Delhi', required: true },
        { id: 'monthly_budget', label: 'What is the maximum monthly advertising budget you have directly managed?', type: 'select', options: ['Less than ₹50,000 / mo', '₹50,000 - ₹2,00,000 / mo', '₹2,00,000+ / mo'], required: true }
      ];
    }
    return [
      { id: 'linkedin_url', label: 'LinkedIn Profile URL', type: 'url', placeholder: 'e.g. https://linkedin.com/in/username', required: true }
    ];
  };

  // Submit new job vacancy to Database
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const responsibilities = formData.responsibilitiesText
      .split('\n')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    const requirements = formData.requirementsText
      .split('\n')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    const questions = includeQuestions ? getQuestionsPreset(selectedProfileType) : [];

    const payload = {
      title: formData.title,
      department: formData.department,
      type: formData.type,
      experience: formData.experience,
      path: formData.path,
      description: formData.description,
      responsibilities,
      requirements,
      questions
    };

    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await res.json();

      if (res.ok) {
        toast.success('New vacancy listed successfully!');
        setFormData({
          title: '',
          department: 'Engineering',
          type: 'Full-Time / Remote',
          experience: '1 - 3 Years',
          path: 'Experienced',
          description: '',
          responsibilitiesText: '',
          requirementsText: ''
        });
        setShowAddForm(false);
        fetchPositions();
      } else {
        toast.error(result.error || 'Failed to list position.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Communication failure while submitting.');
    } finally {
      setSubmitting(false);
    }
  };

  // Purge a listed job opening
  const handleDeletePosition = async (id) => {
    if (!confirm('Are you absolutely sure you want to remove this vacancy? This will instantly deactivate live applications.')) {
      return;
    }

    try {
      const res = await fetch(`/api/jobs?id=${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        toast.success('Vacancy successfully deactivated!');
        fetchPositions();
      } else {
        const errData = await res.json();
        toast.error(errData.error || 'Failed to delete position.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Network failure during deletion.');
    }
  };

  // Update applicant's review status
  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await fetch('/api/careers', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });

      if (res.ok) {
        toast.success(`Applicant marked as ${status}!`);
        if (selectedApplicant && selectedApplicant.id === id) {
          setSelectedApplicant(prev => ({ ...prev, status }));
        }
        fetchApplicants();
      } else {
        toast.error('Failed to update candidate status.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to connect to careers database.');
    }
  };

  // Delete/Archive applicant profile permanently
  const handleDeleteApplicant = async (id) => {
    if (!confirm('Are you sure you want to permanently delete this application record? This action cannot be undone.')) {
      return;
    }

    try {
      const res = await fetch(`/api/careers?id=${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        toast.success('Application record purged.');
        setSelectedApplicant(null);
        fetchApplicants();
      } else {
        toast.error('Failed to remove application.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to connect to careers database.');
    }
  };

  // Filtering applications based on search keyword & status tabs
  const filteredApplicants = applicants.filter((app) => {
    const matchesSearch = app.name.toLowerCase().includes(applicantSearch.toLowerCase()) || 
                          app.email.toLowerCase().includes(applicantSearch.toLowerCase()) ||
                          app.role.toLowerCase().includes(applicantSearch.toLowerCase());
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Derived metrics counts
  const totalSubmissions = applicants.length;
  const pendingReview = applicants.filter(a => a.status === 'new' || !a.status).length;
  const shortlistedCount = applicants.filter(a => a.status === 'shortlisted').length;

  return (
    <div className="space-y-10">
      
      {/* ────── TOP DASHBOARD TITLE BAR ────── */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-black flex items-center gap-2 text-left">
            <Briefcase size={22} className="text-orange-600" />
            Recruitment & Careers Hub
          </h2>
          <p className="text-sm text-black/40 mt-1 text-left">
            Review candidate applications (ATS), manage active job openings, and customize dynamic screening questions.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-2 rounded-2xl bg-orange-600 px-5 py-3.5 text-xs font-bold text-white shadow-lg shadow-orange-600/10 hover:bg-orange-700 hover:scale-[1.01] active:scale-95 transition"
          >
            <Plus size={15} />
            Create Job Vacancy
          </button>
        </div>
      </div>

      {/* ────── STATS HIGHLIGHTS GRID ────── */}
      <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl border border-black/[0.03] bg-white p-6 relative overflow-hidden text-left">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-black/50">Total Applications</p>
            <Users size={16} className="text-orange-500" />
          </div>
          <h3 className="text-2xl font-bold text-black mt-2">{totalSubmissions}</h3>
          <p className="text-xs text-black/45 mt-1">Submitted in total</p>
        </div>

        <div className="rounded-3xl border border-black/[0.03] bg-white p-6 relative overflow-hidden text-left">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-black/50">Pending Review</p>
            <Clock size={16} className="text-amber-500 animate-pulse" />
          </div>
          <h3 className="text-2xl font-bold text-black mt-2">{pendingReview}</h3>
          <p className="text-xs text-black/45 mt-1">Awaiting verification</p>
        </div>

        <div className="rounded-3xl border border-black/[0.03] bg-white p-6 relative overflow-hidden text-left">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-black/50">Shortlisted</p>
            <CheckCircle2 size={16} className="text-emerald-500" />
          </div>
          <h3 className="text-2xl font-bold text-black mt-2">{shortlistedCount}</h3>
          <p className="text-xs text-black/45 mt-1">Moved to Interview round</p>
        </div>

        <div className="rounded-3xl border border-black/[0.03] bg-white p-6 relative overflow-hidden text-left">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-black/50">Active Vacancies</p>
            <Briefcase size={16} className="text-blue-500" />
          </div>
          <h3 className="text-2xl font-bold text-black mt-2">{positions.length}</h3>
          <p className="text-xs text-black/45 mt-1">Live listings on frontend</p>
        </div>
      </div>

      {/* ────── MAIN SUB-NAVIGATION INTERACTIVE TABS ────── */}
      <div className="flex border-b border-black/5 gap-6">
        <button
          onClick={() => setActiveTab('applications')}
          className={`pb-4 text-xs font-bold uppercase tracking-wider transition relative outline-none ${
            activeTab === 'applications' ? 'text-orange-600' : 'text-black/30 hover:text-black/60'
          }`}
        >
          Received Applications ({applicants.length})
          {activeTab === 'applications' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600 rounded-full" />}
        </button>
        <button
          onClick={() => setActiveTab('vacancies')}
          className={`pb-4 text-xs font-bold uppercase tracking-wider transition relative outline-none ${
            activeTab === 'vacancies' ? 'text-orange-600' : 'text-black/30 hover:text-black/60'
          }`}
        >
          Manage Job Openings ({positions.length})
          {activeTab === 'vacancies' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600 rounded-full" />}
        </button>
      </div>

      {/* ────── TAB PANEL 1: DETAILED APPLICATIONS (ATS MODULE) ────── */}
      {activeTab === 'applications' && (
        <div className="space-y-6">
          
          {/* Applications Controls Bar */}
          <div className="bg-white rounded-2xl border border-black/5 p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/35" size={13} />
              <input 
                type="text" 
                placeholder="Search candidates, roles..."
                value={applicantSearch}
                onChange={(e) => setApplicantSearch(e.target.value)}
                className="w-full bg-stone-50 border border-black/5 rounded-xl py-2 pl-9 pr-3 text-xs text-black placeholder-black/35 outline-none transition focus:border-orange-500/20 focus:bg-white"
              />
            </div>

            {/* Status filtering selector tabs */}
            <div className="flex flex-wrap gap-1.5 self-start sm:self-auto">
              {['All', 'new', 'shortlisted', 'archived'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition duration-150 ${
                    statusFilter === status 
                      ? 'bg-black text-white shadow-sm' 
                      : 'bg-stone-50 hover:bg-stone-100 border border-black/5 text-black/65'
                  }`}
                >
                  {status === 'new' ? 'New' : status === 'shortlisted' ? 'Shortlisted' : status === 'archived' ? 'Archived' : 'All Statuses'}
                </button>
              ))}
            </div>
          </div>

          {/* Table display */}
          <div className="rounded-[40px] border border-black/[0.03] bg-white p-8 shadow-sm">
            {loadingApplicants ? (
              <div className="py-20 text-center space-y-4">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-orange-600 border-t-transparent mx-auto" />
                <p className="text-xs text-black/45 tracking-widest uppercase font-semibold">Syncing Candidates...</p>
              </div>
            ) : filteredApplicants.length === 0 ? (
              <div className="py-16 text-center space-y-4 border-2 border-dashed border-black/[0.02] rounded-[32px]">
                <Users size={32} className="mx-auto text-black/15" />
                <div>
                  <p className="text-sm font-semibold text-black">No matching submissions found</p>
                  <p className="text-xs text-black/45 mt-0.5">There are currently no replies matching the selected filters.</p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-black/[0.03] text-xs font-semibold uppercase tracking-wider text-black/35">
                      <th className="pb-4">Candidate</th>
                      <th className="pb-4">Applied For</th>
                      <th className="pb-4">Experience</th>
                      <th className="pb-4">Submitted Date</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.02]">
                    {filteredApplicants.map((app) => {
                      const isNew = app.status === 'new' || !app.status;
                      const isShortlisted = app.status === 'shortlisted';
                      const isArchived = app.status === 'archived';

                      return (
                        <tr key={app.id} className="group hover:bg-stone-50/50 transition">
                          <td className="py-4 pr-4">
                            <div className="font-semibold text-sm text-black">
                              {app.name}
                            </div>
                            <div className="text-xs text-black/40 mt-0.5 flex items-center gap-3">
                              <span>{app.email}</span>
                              <span>•</span>
                              <span>{app.phone}</span>
                            </div>
                          </td>
                          <td className="py-4 font-semibold text-xs text-black/75">
                            {app.role}
                          </td>
                          <td className="py-4 text-xs text-black/55">{app.experience}</td>
                          <td className="py-4 text-xs text-black/55">
                            {app.created_at ? new Date(app.created_at).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            }) : 'N/A'}
                          </td>
                          <td className="py-4">
                            <span className={`text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                              isShortlisted 
                                ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/10'
                                : isArchived 
                                  ? 'bg-stone-200/50 text-stone-500 border-stone-200'
                                  : 'bg-amber-500/10 text-amber-600 border-amber-500/10 animate-pulse'
                            }`}>
                              {isShortlisted ? 'Shortlisted' : isArchived ? 'Archived' : 'New Profile'}
                            </span>
                          </td>
                          <td className="py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {/* Open Detail Panel Button */}
                              <button
                                onClick={() => setSelectedApplicant(app)}
                                className="h-8 w-8 rounded-xl border border-black/5 hover:bg-orange-500/5 hover:text-orange-600 flex items-center justify-center text-black/60 transition"
                                title="Open Detailed Profile"
                              >
                                <Eye size={13} />
                              </button>

                              {/* Resume Link */}
                              {app.resume_url && (
                                <a
                                  href={app.resume_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="h-8 w-8 rounded-xl border border-black/5 hover:bg-black/5 flex items-center justify-center text-black/60 transition"
                                  title="Open Attachment Resume"
                                >
                                  <ExternalLink size={13} />
                                </a>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ────── TAB PANEL 2: VACANCIES MANAGER ────── */}
      {activeTab === 'vacancies' && (
        <div className="rounded-[40px] border border-black/[0.03] bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-black">Active Hires ({positions.length})</h3>
              <p className="text-xs text-black/40 mt-1">These roles are currently live on your client portal</p>
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 bg-orange-500/5 px-3 py-1.5 rounded-full border border-orange-500/10">
              Realtime DB
            </span>
          </div>

          {positions.length === 0 ? (
            <div className="py-16 text-center space-y-4 border-2 border-dashed border-black/[0.02] rounded-[32px]">
              <Layers size={32} className="mx-auto text-black/15" />
              <div>
                <p className="text-sm font-bold text-black">No positions are currently active</p>
                <p className="text-[11px] text-black/45 mt-0.5">Click &quot;Create New Position&quot; to list your first dynamic vacancy.</p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-black/[0.03] text-xs font-semibold uppercase tracking-wider text-black/35">
                    <th className="pb-4">Position Title</th>
                    <th className="pb-4">Department</th>
                    <th className="pb-4">Job Type</th>
                    <th className="pb-4">Exp. Required</th>
                    <th className="pb-4">Eligibility</th>
                    <th className="pb-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.02]">
                  {positions.map((job) => (
                    <tr key={job.id} className="group hover:bg-stone-50/50 transition">
                      <td className="py-4 pr-4">
                        <div className="font-semibold text-sm text-black group-hover:text-orange-600 transition">
                          {job.title}
                        </div>
                        <div className="text-xs text-black/40 mt-0.5 line-clamp-1 max-w-[280px]">
                          {job.description}
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-orange-500/10 text-orange-600">
                          {job.department}
                        </span>
                      </td>
                      <td className="py-4 text-xs text-black/55">{job.type}</td>
                      <td className="py-4 text-xs text-black/55">{job.experience}</td>
                      <td className="py-4 text-xs text-black/55">{job.path}</td>
                      <td className="py-4 text-right">
                        {typeof job.id === 'string' && job.id.length < 15 ? (
                          <span className="text-xs font-semibold uppercase tracking-wider bg-stone-100 py-1 px-2.5 rounded-lg border border-black/5 text-black/45">
                            System Role
                          </span>
                        ) : (
                          <button
                            onClick={() => handleDeletePosition(job.id)}
                            className="h-8 w-8 rounded-xl border border-red-500/10 hover:bg-red-500 hover:text-white flex items-center justify-center text-red-600 transition"
                            title="Purge opening"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ────── 💎 POP-OVER APPLICANT DETAILS SIDE PANEL (Viewer ATS Modal) ────── */}
      {selectedApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
          
          <div className="w-full max-w-xl h-full bg-white shadow-2xl flex flex-col justify-between animate-slide-left relative border-l border-black/5">
            
            {/* Header */}
            <div className="h-20 border-b border-black/5 px-8 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-black">Applicant Profile</h3>
                <p className="text-[10px] text-black/35">Review screening answers, pitch notes, and status actions</p>
              </div>
              <button 
                onClick={() => setSelectedApplicant(null)}
                className="h-8 w-8 rounded-full border border-black/5 flex items-center justify-center hover:bg-stone-50 transition text-black"
              >
                <X size={14} />
              </button>
            </div>

            {/* Profile Details Body */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 text-left">
              
              {/* Bio block */}
              <div className="p-5 rounded-2xl bg-stone-50 border border-black/[0.02] space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-base font-black text-black">{selectedApplicant.name}</h4>
                    <p className="text-[10px] text-black/45 mt-0.5">Applied For: **{selectedApplicant.role}**</p>
                  </div>
                  <span className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    selectedApplicant.status === 'shortlisted' 
                      ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/10'
                      : selectedApplicant.status === 'archived' 
                        ? 'bg-stone-200/50 text-stone-500 border-stone-200'
                        : 'bg-amber-500/10 text-amber-600 border-amber-500/10'
                  }`}>
                    {selectedApplicant.status || 'new'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-y-3 pt-2 text-xs border-t border-black/[0.04]">
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-wider text-black/35">Email ID</p>
                    <p className="font-semibold text-black/75 mt-0.5">{selectedApplicant.email}</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-wider text-black/35">Contact Phone</p>
                    <p className="font-semibold text-black/75 mt-0.5">{selectedApplicant.phone}</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-wider text-black/35">Experience Level</p>
                    <p className="font-semibold text-black/75 mt-0.5">{selectedApplicant.experience}</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-wider text-black/35">Submitted On</p>
                    <p className="font-semibold text-black/75 mt-0.5">
                      {selectedApplicant.created_at ? new Date(selectedApplicant.created_at).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      }) : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Attachments Section */}
              <div className="space-y-2">
                <h5 className="text-[10px] font-black uppercase tracking-widest text-black/45">Attachments</h5>
                <div className="grid grid-cols-2 gap-3">
                  {selectedApplicant.resume_url && (
                    <a
                      href={selectedApplicant.resume_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border border-black/5 bg-white p-3.5 flex items-center justify-between text-xs font-semibold text-black hover:border-orange-500/20 hover:text-orange-600 transition shadow-sm"
                    >
                      <span className="flex items-center gap-2">
                        <FileText size={14} className="text-orange-500" /> Open Resume
                      </span>
                      <ExternalLink size={12} />
                    </a>
                  )}

                  {selectedApplicant.portfolio ? (
                    <a
                      href={selectedApplicant.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border border-black/5 bg-white p-3.5 flex items-center justify-between text-xs font-semibold text-black hover:border-orange-500/20 hover:text-orange-600 transition shadow-sm"
                    >
                      <span className="flex items-center gap-2">
                        <Globe size={14} className="text-orange-500" /> Portfolio Website
                      </span>
                      <ExternalLink size={12} />
                    </a>
                  ) : (
                    <div className="rounded-xl border border-black/[0.02] bg-stone-50/50 p-3.5 text-xs text-black/30 text-center font-semibold">
                      No Portfolio Shared
                    </div>
                  )}
                </div>
              </div>

              {/* Pitch Message / Custom Question Answers scrollable box */}
              <div className="space-y-2">
                <h5 className="text-[10px] font-black uppercase tracking-widest text-black/45">Screening Application Answers & Pitch</h5>
                <div className="rounded-2xl border border-black/5 bg-stone-50 p-5 text-xs text-black/75 leading-relaxed font-mono whitespace-pre-line overflow-y-auto max-h-64 shadow-inner">
                  {selectedApplicant.message || 'No screening questions details or pitch comments shared.'}
                </div>
              </div>

            </div>

            {/* Quick action buttons footer */}
            <div className="h-20 border-t border-black/5 px-8 flex items-center justify-between bg-stone-50">
              <button
                type="button"
                onClick={() => handleDeleteApplicant(selectedApplicant.id)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-red-500/10 text-red-600 bg-red-500/5 hover:bg-red-500 hover:text-white px-4 py-3 text-xs font-bold transition"
              >
                <Trash2 size={13} />
                Delete Profile
              </button>

              <div className="flex gap-2">
                {selectedApplicant.status !== 'archived' && (
                  <button
                    onClick={() => handleUpdateStatus(selectedApplicant.id, 'archived')}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-black/5 px-4 py-3 text-xs font-bold text-black/65 hover:bg-stone-100 transition"
                  >
                    <Archive size={13} />
                    Archive
                  </button>
                )}

                {selectedApplicant.status !== 'shortlisted' && (
                  <button
                    onClick={() => handleUpdateStatus(selectedApplicant.id, 'shortlisted')}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 px-5 py-3 text-xs font-bold transition shadow-md shadow-emerald-600/15"
                  >
                    <UserCheck size={13} />
                    Shortlist
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ────── POP-OVER CREATION SLIDE PANEL ────── */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
          
          <div className="w-full max-w-2xl h-full bg-white shadow-2xl flex flex-col justify-between animate-slide-left relative border-l border-black/5">
            
            {/* Slide Header */}
            <div className="h-20 border-b border-black/5 px-8 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-black flex items-center gap-2">
                  <Sparkles size={18} className="text-orange-600 animate-pulse" />
                  List Dynamic Vacancy
                </h3>
                <p className="text-[10px] text-black/35">Provide the required career specifications for the recruitment board</p>
              </div>
              <button 
                onClick={() => setShowAddForm(false)}
                className="h-8 w-8 rounded-full border border-black/5 flex items-center justify-center hover:bg-stone-50 transition text-black"
              >
                <X size={14} />
              </button>
            </div>

            {/* Slide Form Body */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-6">
              
              {/* Job Title & Department */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-black uppercase tracking-wider text-black/55">Vacancy Name / Title *</label>
                  <input
                    type="text"
                    name="title"
                    required
                    placeholder="e.g. Lead React Developer"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-black/5 bg-stone-50 py-3 px-4 text-xs text-black outline-none transition focus:border-orange-500/20 focus:ring-4 focus:ring-orange-500/5 focus:bg-white"
                  />
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-black uppercase tracking-wider text-black/55">Organizational Sector *</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-black/5 bg-stone-50 py-3 px-4 text-xs text-black/75 outline-none transition cursor-pointer appearance-none focus:border-orange-500/20 focus:ring-4 focus:ring-orange-500/5 focus:bg-white"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 16px center',
                      backgroundSize: '12px',
                    }}
                  >
                    <option value="Engineering">Engineering & Tech</option>
                    <option value="Design">UX/UI & Brand Design</option>
                    <option value="Growth">Growth & Digital Marketing</option>
                  </select>
                </div>
              </div>

              {/* Type & Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-black uppercase tracking-wider text-black/55">Hiring Type *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-black/5 bg-stone-50 py-3 px-4 text-xs text-black/75 outline-none transition cursor-pointer appearance-none focus:border-orange-500/20"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 16px center',
                      backgroundSize: '12px',
                    }}
                  >
                    <option value="Full-Time / Remote">Full-Time / Remote</option>
                    <option value="Part-Time / Hybrid">Part-Time / Hybrid</option>
                    <option value="Contract (Freelance)">Contract (Freelance)</option>
                    <option value="Internship (Paid)">Internship (Paid)</option>
                  </select>
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-black uppercase tracking-wider text-black/55">Exp. Bracket *</label>
                  <input
                    type="text"
                    name="experience"
                    required
                    placeholder="e.g. 1 - 3 Years"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-black/5 bg-stone-50 py-3 px-4 text-xs text-black outline-none transition focus:border-orange-500/20"
                  />
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-black uppercase tracking-wider text-black/55">Route Eligibility *</label>
                  <select
                    name="path"
                    value={formData.path}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-black/5 bg-stone-50 py-3 px-4 text-xs text-black/75 outline-none transition cursor-pointer appearance-none focus:border-orange-500/20"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 16px center',
                      backgroundSize: '12px',
                    }}
                  >
                    <option value="Experienced">Experienced Route</option>
                    <option value="Campus/Intern">Campus/Interns Route</option>
                  </select>
                </div>
              </div>

              {/* Short Description */}
              <div className="space-y-1 text-left">
                <label className="text-[10px] font-black uppercase tracking-wider text-black/55">Role Profile Overview *</label>
                <textarea
                  name="description"
                  required
                  rows={3}
                  placeholder="Summarize the core impact, expectations, and primary framework alignment of this role..."
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-black/5 bg-stone-50 py-3 px-4 text-xs text-black outline-none resize-none transition focus:border-orange-500/20"
                />
              </div>

              {/* Responsibilities */}
              <div className="space-y-1 text-left">
                <label className="text-[10px] font-black uppercase tracking-wider text-black/55 flex items-center justify-between">
                  <span>Core Responsibilities *</span>
                  <span className="text-[8px] font-medium text-black/35">Separate each responsibility with a new line</span>
                </label>
                <textarea
                  name="responsibilitiesText"
                  required
                  rows={4}
                  placeholder="e.g. Translate design layouts into code&#10;Optimize Core Web Vitals&#10;Conduct clean deployment tests"
                  value={formData.responsibilitiesText}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-black/5 bg-stone-50 py-3 px-4 text-xs text-black outline-none resize-none transition focus:border-orange-500/20"
                />
              </div>

              {/* Requirements */}
              <div className="space-y-1 text-left">
                <label className="text-[10px] font-black uppercase tracking-wider text-black/55 flex items-center justify-between">
                  <span>Technical & Experience Requirements *</span>
                  <span className="text-[8px] font-medium text-black/35">Separate each requirement with a new line</span>
                </label>
                <textarea
                  name="requirementsText"
                  required
                  rows={4}
                  placeholder="e.g. 1+ Years hands-on React / Next.js app setup&#10;Familiarity with Tailwind CSS & CSS grids&#10;Basic knowledge of Google Analytics"
                  value={formData.requirementsText}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-black/5 bg-stone-50 py-3 px-4 text-xs text-black outline-none resize-none transition focus:border-orange-500/20"
                />
              </div>

              {/* Screening preset questions options */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-black/[0.03] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-black">
                    Custom Screening Profile Questions
                  </span>
                  <input
                    type="checkbox"
                    checked={includeQuestions}
                    onChange={(e) => setIncludeQuestions(e.target.checked)}
                    className="h-4 w-4 rounded text-orange-600 border-black/10 accent-orange-600 cursor-pointer"
                  />
                </div>

                {includeQuestions && (
                  <div className="space-y-2 text-left">
                    <p className="text-[9px] text-black/45 leading-relaxed">
                      Select a department role template below. Candidates applying for this position will be required to answer specific technical screening questions tailored to this track!
                    </p>
                    <select
                      value={selectedProfileType}
                      onChange={(e) => setSelectedProfileType(e.target.value)}
                      className="w-full rounded-xl border border-black/5 bg-white py-2 px-3 text-xs text-black/75 outline-none cursor-pointer appearance-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 12px center',
                        backgroundSize: '10px',
                      }}
                    >
                      <option value="Frontend">Frontend Specialist Template (GitHub URL, Next.js SSG preference)</option>
                      <option value="Design">UI/UX Designer Template (Figma Link, Minimalist Philosophy)</option>
                      <option value="Marketing">Growth Specialist Template (Google Page 1 keyword, Monthly budget)</option>
                      <option value="General">General Track Template (LinkedIn Profile URL)</option>
                    </select>
                  </div>
                )}
              </div>

            </form>

            {/* Slide Footer */}
            <div className="h-20 border-t border-black/5 px-8 flex items-center justify-end gap-3 bg-stone-50">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="rounded-xl border border-black/5 px-5 py-3 text-xs font-bold text-black/75 hover:bg-stone-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="rounded-xl bg-black px-6 py-3 text-xs font-bold text-white hover:bg-orange-600 disabled:opacity-50 transition flex items-center gap-2"
              >
                {submitting ? 'Creating vacancy...' : 'Publish Opening'}
                <CheckCircle size={14} />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
