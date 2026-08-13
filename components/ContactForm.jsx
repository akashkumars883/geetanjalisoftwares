"use client";

import { useState } from "react";
import { Send, ArrowRight } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "development",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      alert("Please fill in your name and email.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", service: "development", message: "" });
      } else {
        alert(data.error || "Failed to submit request. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting contact form:", err);
      alert("Network error submitting request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 bg-white text-stone-900 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Simple Header */}
          <div className="lg:col-span-5 text-left space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-50 border border-stone-100 text-[11px] font-bold uppercase tracking-wider text-stone-600">
              Let's Partner
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-stone-900 leading-tight">
              Ready to build <br />
              <span className="text-orange-600">something exceptional?</span>
            </h2>
          </div>

          {/* Right Column: Compact White/stone Form Card */}
          <div className="lg:col-span-7 bg-stone-50 border border-stone-100 rounded-xl p-6 sm:p-8 shadow-sm relative">
            {isSubmitted ? (
              <div className="h-full min-h-[220px] flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
                <div className="h-12 w-12 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-600">
                  <Send className="h-5 w-5 animate-pulse" />
                </div>
                <h3 className="text-lg font-bold text-stone-900">Request Received &amp; Saved!</h3>
                <p className="text-xs text-stone-600 max-w-xs font-light">
                  Thank you. Your inquiry has been sent to our admin team. A project manager will contact you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="text-[11px] font-bold uppercase tracking-wider text-stone-500 hover:text-black underline pt-2 cursor-pointer"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="space-y-1">
                    <label htmlFor="form-name" className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="form-name"
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-stone-200 rounded-lg px-4 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-1">
                    <label htmlFor="form-email" className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      required
                      placeholder="e.g. john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-stone-200 rounded-lg px-4 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>

                {/* Service scope selector */}
                <div className="space-y-1">
                  <label htmlFor="form-service" className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                    Project Service Area
                  </label>
                  <select
                    id="form-service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-white border border-stone-200 rounded-lg px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-black transition-colors cursor-pointer"
                  >
                    <option value="Web Apps & Development">Web Apps &amp; Development</option>
                    <option value="AI Integrations & Automation">AI Integrations &amp; Automation</option>
                    <option value="Growth & Technical SEO">Growth &amp; Technical SEO</option>
                    <option value="Corporate Design & Branding">Corporate Design &amp; Branding</option>
                  </select>
                </div>

                {/* Message details */}
                <div className="space-y-1">
                  <label htmlFor="form-message" className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                    Tell us about your project
                  </label>
                  <textarea
                    id="form-message"
                    required
                    rows={3}
                    placeholder="Brief description of your requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-stone-200 rounded-lg px-4 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-black transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black text-white hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer"
                >
                  <span>{isSubmitting ? "Sending to Admin..." : "Send Project Request"}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
