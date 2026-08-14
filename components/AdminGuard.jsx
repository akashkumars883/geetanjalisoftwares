"use client";

import { useState, useEffect } from "react";
import { Lock, ArrowRight, ShieldAlert, KeyRound } from "lucide-react";

export default function AdminGuard({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if auth token exists in localStorage
    const savedAuth = localStorage.getItem("geetanjali_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Default admin passcode: admin123
    if (passcode.trim() === "admin123" || passcode.trim() === "geetanjali2026") {
      localStorage.setItem("geetanjali_admin_auth", "true");
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("geetanjali_admin_auth");
    setIsAuthenticated(false);
    setPasscode("");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-stone-600 text-sm">
        Authenticating Admin...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-6 py-12 text-left selection:bg-orange-500/20">
        <div className="max-w-md w-full bg-white border border-stone-200 rounded-md p-8 space-y-8">
          {/* Logo & Header */}
          <div className="space-y-3 text-center">
            <div className="h-12 w-12 rounded-md bg-orange-600/10 border border-orange-600/20 flex items-center justify-center mx-auto text-orange-600">
              <KeyRound className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold text-stone-900 tracking-tight">Admin Portal Handoff</h1>
            <p className="text-xs text-stone-500 font-light">
              Enter your master passcode to manage website blogs, inquiries, and settings.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="admin-passcode" className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                Master Admin Passcode
              </label>
              <div className="relative">
                <input
                  id="admin-passcode"
                  type="password"
                  required
                  placeholder="Enter passcode (default: admin123)"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className={`w-full bg-stone-50 border rounded-md px-4 py-3 text-sm text-stone-900 placeholder-stone-400 focus:outline-none transition-colors ${
                    error ? "border-red-500 bg-red-50/20" : "border-stone-200 focus:border-black"
                  }`}
                />
                <Lock className="h-4 w-4 text-stone-400 absolute right-3.5 top-3.5" />
              </div>
              {error && (
                <div className="flex items-center gap-1.5 text-xs text-red-600 font-medium pt-1">
                  <ShieldAlert className="h-3.5 w-3.5" /> Invalid admin passcode. Please try again.
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-md text-xs font-bold uppercase tracking-wider bg-black text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Sign In to Admin Dashboard
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Footer note */}
          <div className="text-[11px] text-stone-400 text-center font-light border-t border-stone-100 pt-4">
            Protected Admin Area • Geetanjali Softwares
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-root w-full h-full min-h-screen">
      {typeof children === "function" ? children({ handleLogout }) : children}
    </div>
  );
}
