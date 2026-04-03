'use client';

import React, { useState, useEffect } from 'react';

export default function DiagPage() {
  const [results, setResults] = useState({
    gemini: 'Checking...',
    resend: 'Checking...',
    models: [],
    error: null
  });

  useEffect(() => {
    const testAPIs = async () => {
      try {
        const res = await fetch('/api/diag');
        const data = await res.json();
        setResults(data);
      } catch (err) {
        setResults(prev => ({ ...prev, error: err.message }));
      }
    };
    testAPIs();
  }, []);

  return (
    <div className="p-10 space-y-6 max-w-2xl mx-auto font-mono text-xs bg-stone-900 text-green-400 rounded-3xl mt-10 shadow-2xl overflow-hidden border border-white/10">
      <h1 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
        System Diagnostic Tool
      </h1>
      
      <div className="space-y-4">
        <div className="border-b border-white/5 pb-2">
          <p className="text-white/40 mb-1 uppercase tracking-widest">Environment Variables</p>
          <div className="flex justify-between">
            <span>GEMINI_API_KEY:</span>
            <span className={results.gemini_present ? 'text-green-500' : 'text-red-500'}>
              {results.gemini_present ? 'PRESENT' : 'MISSING'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>RESEND_API_KEY:</span>
            <span className={results.resend_present ? 'text-green-500' : 'text-red-500'}>
              {results.resend_present ? 'PRESENT' : 'MISSING'}
            </span>
          </div>
        </div>

        <div className="border-b border-white/5 pb-2">
          <p className="text-white/40 mb-1 uppercase tracking-widest">Gemini API Connection</p>
          <p className="text-white break-all">{results.gemini_status}</p>
        </div>

        <div className="border-b border-white/5 pb-2">
          <p className="text-white/40 mb-1 uppercase tracking-widest">Resend Email Connection</p>
          <p className="text-white break-all">{results.resend_status}</p>
        </div>

        <div>
          <p className="text-white/40 mb-1 uppercase tracking-widest">Available Gemini Models</p>
          {results.models && results.models.length > 0 ? (
            <ul className="list-disc list-inside space-y-1 mt-2">
              {results.models.map(m => (
                <li key={m} className="text-green-300">{m}</li>
              ))}
            </ul>
          ) : (
            <p className="text-orange-400">No models found for this key.</p>
          )}
        </div>
      </div>

      <div className="mt-8 p-4 bg-black/50 rounded-xl border border-white/5">
        <p className="text-white/60">Solution Recommendation:</p>
        <p className="mt-2 text-white italic">
          {results.recommendation || "Waiting for diagnostic completion..."}
        </p>
      </div>
    </div>
  );
}
