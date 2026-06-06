'use client';

import Link from 'next/link';
import { useState } from 'react';

const STORAGE_KEY = 'geetanjali_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(
    () => typeof window !== 'undefined' && window.localStorage.getItem(STORAGE_KEY) !== 'accepted'
  );

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-[80] mx-auto max-w-3xl rounded-2xl border border-black/10 bg-white p-4 shadow-2xl shadow-black/10 sm:flex sm:items-center sm:justify-between sm:gap-6">
      <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
        We use essential cookies and analytics to improve site performance and enquiries. Read our{" "}
        <Link href="/privacy" className="font-semibold text-slate-900 underline underline-offset-4">
          Privacy Policy
        </Link>.
      </p>
      <button
        type="button"
        onClick={() => {
          window.localStorage.setItem(STORAGE_KEY, 'accepted');
          setVisible(false);
        }}
        className="mt-3 w-full rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800 sm:mt-0 sm:w-auto"
      >
        Accept
      </button>
    </div>
  );
}
