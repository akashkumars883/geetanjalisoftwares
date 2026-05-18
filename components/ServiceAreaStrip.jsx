import React from 'react';
import Link from 'next/link';

const targetCities = [
  { name: 'Faridabad', slug: 'faridabad' },
  { name: 'Delhi NCR', slug: 'delhi-ncr' },
  { name: 'Patna', slug: 'patna' },
  { name: 'Delhi', slug: 'delhi' },
  { name: 'Mumbai', slug: 'mumbai' },
  { name: 'Bangalore', slug: 'bangalore' },
  { name: 'Lucknow', slug: 'lucknow' },
  { name: 'Jaipur', slug: 'jaipur' },
  { name: 'Pune', slug: 'pune' },
  { name: 'Noida', slug: 'noida' },
  { name: 'Gurgaon', slug: 'gurgaon' },
  { name: 'Kolkata', slug: 'kolkata' },
  { name: 'Chennai', slug: 'chennai' },
  { name: 'Hyderabad', slug: 'hyderabad' },
  { name: 'Ahmedabad', slug: 'ahmedabad' },
  { name: 'Chandigarh', slug: 'chandigarh' },
  { name: 'Ranchi', slug: 'ranchi' },
  { name: 'Bhopal', slug: 'bhopal' },
  { name: 'Indore', slug: 'indore' },
  { name: 'Kanpur', slug: 'kanpur' },
  { name: 'Surat', slug: 'surat' },
  { name: 'Guwahati', slug: 'guwahati' }
];

export default function ServiceAreaStrip() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-t border-black/5 mt-16 pt-12 pb-6">
      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 text-left">
        Our Operating Service Areas
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-3.5 text-[11px] font-medium text-slate-400">
        {targetCities.map((city) => (
          <Link 
            key={city.slug} 
            href={`/locations/${city.slug}`} 
            className="hover:text-orange-600 hover:underline transition-colors duration-200"
          >
            {city.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
