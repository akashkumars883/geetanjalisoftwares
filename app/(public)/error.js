'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import { ArrowLeft, RefreshCcw } from 'lucide-react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log error to console (and potentially a server-side route in pino later)
    console.error('Public Layout Error:', error);
    
    toast.error('Something went wrong. Please try again.', {
      description: error?.message || 'A terminal error occurred while rendering the page.',
      duration: 5000,
    });
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl">Drat! Something Broke.</h1>
        <p className="mx-auto max-w-md text-base leading-7 text-black/50">
          We&apos;ve encountered an unexpected error. Our team has been notified (virtually) and we&apos;re working on it.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-8 py-3 text-sm font-bold text-white transition hover:bg-black/80"
        >
          <RefreshCcw size={15} />
          Try Again
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-8 py-3 text-sm font-bold text-black transition hover:bg-black/5"
        >
          <ArrowLeft size={15} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
