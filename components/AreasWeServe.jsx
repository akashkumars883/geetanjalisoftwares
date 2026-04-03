'use client';

import React, { useEffect, useState } from 'react';
import { MapPin, Globe, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AreasWeServe() {
  const [localFocus, setLocalFocus] = useState('Bihar & India');

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase
        .from('settings')
        .select('local_focus')
        .eq('id', 1)
        .single();
      
      if (data?.local_focus) {
        setLocalFocus(data.local_focus);
      }
    };
    fetchSettings();
  }, []);

  const cities = localFocus.split(',').map(city => city.trim());

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 flex items-center gap-2">
                <MapPin size={12} /> Local Presence, Global Standards
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-black leading-tight">
                Empowering Businesses Across <span className="text-orange-600">{cities[0]}</span> & Beyond
              </h2>
            </div>
            
            <p className="text-lg text-black/40 leading-relaxed">
              Geetanjali Softwares is proud to be a catalyst for digital transformation in {cities[0]}. 
              We combine local market insights with world-class technology to help you dominate your industry.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {cities.map((city) => (
                <div key={city} className="flex items-center gap-3 p-4 rounded-2xl border border-black/5 bg-stone-50/50">
                  <CheckCircle2 size={18} className="text-green-500" />
                  <span className="font-bold text-black/70">{city}</span>
                </div>
              ))}
              <div className="flex items-center gap-3 p-4 rounded-2xl border border-black/5 bg-stone-50/50">
                <Globe size={18} className="text-blue-500" />
                <span className="font-bold text-black/70">Global Delivery</span>
              </div>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="aspect-video w-full rounded-[40px] bg-black/5 overflow-hidden border border-black/5 relative group">
              <div className="absolute inset-0 bg-stone-900 opacity-10 group-hover:opacity-20 transition-all duration-700"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full border-4 border-orange-500/20 animate-ping absolute inset-0"></div>
                  <div className="h-24 w-24 rounded-full bg-orange-500 flex items-center justify-center text-white relative shadow-2xl shadow-orange-500/50">
                    <MapPin size={40} />
                  </div>
                </div>
              </div>
              
              {/* Decorative Floating Stats */}
              <div className="absolute top-12 left-12 p-4 rounded-2xl bg-white shadow-xl border border-black/5 animate-bounce-slow">
                <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest mb-1">Total Client Base</p>
                <p className="text-2xl font-black text-black">150+</p>
              </div>

              <div className="absolute bottom-12 right-12 p-4 rounded-2xl bg-white shadow-xl border border-black/5 animate-bounce-slow delay-300">
                <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest mb-1">Local Influence</p>
                <p className="text-2xl font-black text-orange-600">Top Rated</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
