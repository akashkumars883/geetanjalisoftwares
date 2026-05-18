'use client';

import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Video, 
  ChevronRight, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  Phone,
  Mail,
  User
} from 'lucide-react';
import { toast } from 'sonner';

export default function ConsultationScheduler({ isModal = false }) {
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  
  // Lead Info
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [messageText, setMessageText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [booked, setBooked] = useState(false);

  // Generate next 7 business days dynamically
  const getNextBusinessDays = () => {
    const list = [];
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    let count = 0;
    let index = 0;
    
    while (count < 7) {
      const d = new Date();
      d.setDate(d.getDate() + index);
      
      // Skip Sundays
      if (d.getDay() !== 0) {
        list.push({
          dateObj: d,
          dayNum: d.getDate(),
          monthName: months[d.getMonth()],
          weekDayName: weekdays[d.getDay()],
          slotsCount: 5 + (d.getDate() % 4) // mock slot counts
        });
        count++;
      }
      index++;
    }
    return list;
  };

  const businessDays = getNextBusinessDays();
  const timeSlots = ['10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM'];

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !selectedTimeSlot) {
      toast.error('Please enter all details and select a preferred slot.');
      return;
    }

    setSubmitting(true);
    const day = businessDays[selectedDayIdx];
    const formattedDate = `${day.dayNum} ${day.monthName} (${day.weekDayName})`;
    
    const formattedMessage = `--- DEDICATED CALENDAR CONSULTATION BOOKED ---
Scheduled Date: ${formattedDate}
Scheduled Time: ${selectedTimeSlot} (Zoom / Google Meet)
Client Note: ${messageText || 'No custom note attached.'}
Client Phone: ${phone}`;

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          service: 'Interactive Calendar Booking',
          message: formattedMessage
        })
      });

      if (res.ok) {
        toast.success('Your session is scheduled successfully!');
        setBooked(true);
      } else {
        const errData = await res.json();
        toast.error(errData.error || 'Failed to register appointment.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to dispatch appointment data.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id={isModal ? undefined : "scheduler"} className={`${isModal ? 'py-2 sm:py-4' : 'py-24'} relative overflow-hidden bg-transparent`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.02),transparent_50%)]" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        
        {/* Title Bar */}
        <div className={`text-center max-w-3xl mx-auto ${isModal ? 'mb-6 sm:mb-8' : 'mb-16'}`}>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-orange-600">
            <Calendar size={13} />
            Consultation Booking
          </span>
          <h2 className={`mt-4 ${isModal ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl'} font-semibold tracking-tight text-black text-center`}>
            Book a 1-on-1 Consultation Call
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-500 max-w-xl mx-auto leading-relaxed text-center">
            Pick a convenient date and time to lock in a dedicated strategy call with our expert product engineering leads.
          </p>
        </div>

        {/* Calendar Scheduler Board */}
        <div className={`max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch rounded-[32px] sm:rounded-[40px] border border-black/[0.03] bg-white ${isModal ? 'p-4 sm:p-6 shadow-none border-none' : 'p-6 sm:p-10 shadow-xl shadow-stone-100'}`}>
          
          {/* Left Columns - Date/Time Selectors */}
          <div className="md:col-span-7 space-y-8 flex flex-col justify-between">
            
            {!booked ? (
              <>
                {/* 1. Choose Date slider */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-black uppercase tracking-wider text-left">1. Select Preferred Date</h3>
                  
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2.5 overflow-x-auto pb-2">
                    {businessDays.map((day, idx) => {
                      const isSelected = selectedDayIdx === idx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setSelectedDayIdx(idx);
                            setSelectedTimeSlot(''); // reset slot on day change
                          }}
                          className={`p-3 rounded-2xl flex flex-col items-center justify-center border-2 transition-all shrink-0 min-w-[70px] ${
                            isSelected 
                              ? 'bg-white text-slate-900 border-black shadow-md scale-105' 
                              : 'bg-white border-black/5 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span className="text-[9px] uppercase tracking-wider opacity-60 block">{day.weekDayName.substring(0, 3)}</span>
                          <span className="text-sm font-semibold mt-1.5 block">{day.dayNum}</span>
                          <span className="text-[9px] uppercase tracking-wider opacity-60 block mt-1">{day.monthName}</span>
                          <span className={`text-[8px] font-semibold uppercase tracking-widest mt-2 block ${isSelected ? 'text-orange-400' : 'text-stone-400'}`}>
                            {day.slotsCount} available
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Choose Time Slots Grid */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-black uppercase tracking-wider text-left">2. Select Available Time Slot</h3>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {timeSlots.map((slot, idx) => {
                      const isSelected = selectedTimeSlot === slot;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`p-3.5 rounded-xl border-2 text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                            isSelected 
                              ? 'bg-orange-600 text-slate-900 border-orange-600 shadow-md scale-[1.02]' 
                              : 'bg-white border-black/5 hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          <Clock size={12} />
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Session specifications info bar */}
                <div className="p-4 rounded-2xl bg-white border border-black/[0.02] flex items-center justify-between text-xs font-semibold text-stone-500 text-left">
                  <div className="flex items-center gap-3">
                    <Video size={16} className="text-orange-600 animate-pulse" />
                    <div>
                      <span className="block font-semibold text-black">Dynamic Video Consultation</span>
                      <span className="block text-[10px] text-stone-400 mt-0.5">Custom link shared on email after selection</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 border border-emerald-500/10 rounded-full text-[9px] font-semibold uppercase tracking-wider">
                    Free / 30 Min
                  </span>
                </div>
              </>
            ) : (
              <div className="py-20 text-center space-y-4 animate-scale-up flex flex-col justify-center items-center h-full">
                <div className="h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600">
                  <CheckCircle size={32} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-black text-center">Consultation Call Confirmed!</h4>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto mt-2 leading-relaxed text-center">
                    Awesome, **{name}**! Your meeting on **{businessDays[selectedDayIdx].dayNum} {businessDays[selectedDayIdx].monthName}** at **{selectedTimeSlot}** has been recorded dynamically. Check your inbox for the calendar invite!
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setBooked(false);
                    setSelectedTimeSlot('');
                    setName('');
                    setEmail('');
                    setPhone('');
                    setMessageText('');
                  }}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-orange-600 hover:underline"
                >
                  Book another slot
                  <ArrowRight size={12} />
                </button>
              </div>
            )}

          </div>

          {/* Right Columns - Details form */}
          <div className="md:col-span-5 p-6 rounded-3xl bg-white text-slate-900 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.15),transparent_60%)]" />
            
            {!booked ? (
              <form onSubmit={handleBookingSubmit} className="relative space-y-4 flex-1 flex flex-col justify-between">
                
                <div className="space-y-1">
                  <span className="text-[9px] font-semibold uppercase tracking-widest text-orange-400">Lock your slot</span>
                  <h4 className="text-base font-semibold text-slate-900 text-left">3. Fill in Details</h4>
                </div>

                <div className="space-y-3 flex-1 flex flex-col justify-center py-4">
                  <div className="space-y-1 text-left relative flex items-center">
                    <User size={13} className="absolute left-3.5 text-slate-900/30" />
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl bg-white/10 border border-white/5 py-2.5 pl-10 pr-4 text-xs text-slate-900 outline-none focus:border-orange-500/30 placeholder-white/30"
                    />
                  </div>

                  <div className="space-y-1 text-left relative flex items-center">
                    <Mail size={13} className="absolute left-3.5 text-slate-900/30" />
                    <input
                      type="email"
                      required
                      placeholder="Your Email ID"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl bg-white/10 border border-white/5 py-2.5 pl-10 pr-4 text-xs text-slate-900 outline-none focus:border-orange-500/30 placeholder-white/30"
                    />
                  </div>

                  <div className="space-y-1 text-left relative flex items-center">
                    <Phone size={13} className="absolute left-3.5 text-slate-900/30" />
                    <input
                      type="tel"
                      required
                      placeholder="Mobile Contact"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl bg-white/10 border border-white/5 py-2.5 pl-10 pr-4 text-xs text-slate-900 outline-none focus:border-orange-500/30 placeholder-white/30"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <textarea
                      rows={2}
                      placeholder="Optional: Tell us briefly about your project goal..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="w-full rounded-xl bg-white/10 border border-white/5 py-2.5 px-3.5 text-xs text-slate-900 outline-none focus:border-orange-500/30 placeholder-white/30 resize-none"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-[10px] text-slate-900/50 leading-relaxed text-left">
                    Selected: **{selectedTimeSlot ? `${businessDays[selectedDayIdx].dayNum} ${businessDays[selectedDayIdx].monthName} at ${selectedTimeSlot}` : 'No slot chosen yet'}**
                  </div>
                  <button
                    type="submit"
                    disabled={submitting || !selectedTimeSlot}
                    className="w-full rounded-xl bg-orange-600 hover:bg-orange-700 disabled:bg-white/10 disabled:text-slate-900/30 disabled:border-transparent py-3 px-4 text-xs font-semibold text-slate-900 shadow-lg transition active:scale-[0.98] flex items-center justify-center gap-1.5"
                  >
                    {submitting ? 'Scheduling call...' : 'Confirm Call Booking'}
                    <Sparkles size={12} />
                  </button>
                </div>

              </form>
            ) : (
              <div className="relative text-left space-y-4 flex flex-col justify-center h-full">
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 aspect-[16/10] mb-2">
                  <img src="/images/consultation_booking_illustration.png" alt="Consultation Calendar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-[9px] font-semibold uppercase tracking-widest text-orange-400">Success confirmed</span>
                  <h4 className="text-base font-semibold text-slate-900 mt-1">What happens next?</h4>
                </div>
                <div className="space-y-3 text-xs text-slate-900/70 leading-relaxed">
                  <p>
                    1. **Auto Invitation Sent:** You will receive an instant Google Calendar event directly to your email ID **{email}**.
                  </p>
                  <p>
                    2. **Consultation Link:** A dynamic Google Meet or Zoom link will be auto-generated inside the calendar slots.
                  </p>
                  <p>
                    3. **Strategy Brainstorming:** Our tech leads will research your corporate domain in advance to make the brainstorming highly customized!
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
