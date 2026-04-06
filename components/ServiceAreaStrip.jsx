import React from 'react';

const cities = [
  'Delhi NCR', 'Noida', 'Gurgaon', 'Lucknow', 'Kanpur', 'Varanasi', 'Prayagraj', 'Meerut', 
  'Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur', 'Darbhanga', 
  'Arrah', 'Begusarai', 'Bihar Sharif', 'Munger', 'Purnia',
  'Mumbai', 'Bangalore', 'Kolkata', 'Hyderabad'
];

export default function ServiceAreaStrip() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="pt-12 pb-2">
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-medium text-black/40">
          {cities.map((city) => (
            <span key={city}>{city}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
