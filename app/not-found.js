import Link from 'next/link';
import { Home, MessageCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
      <div className="relative mb-8">
        <h1 className="text-[150px] font-black leading-none text-black/[0.03] sm:text-[200px]">404</h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-2xl font-bold tracking-tight text-black sm:text-4xl">Page Not Found</p>
        </div>
      </div>
      
      <p className="mb-10 max-w-md text-lg text-black/40">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-2xl bg-black px-8 py-4 text-sm font-bold text-white transition hover:bg-black/80"
        >
          <Home size={18} /> Back to Home
        </Link>
        <Link
          href="/contact"
          className="flex items-center gap-2 rounded-2xl border border-black/10 px-8 py-4 text-sm font-bold text-black transition hover:bg-black/5"
        >
          <MessageCircle size={18} /> Contact Support
        </Link>
      </div>

      <div className="mt-20 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-black/20">
        <span className="h-px w-8 bg-black/10"></span>
        Geetanjali Softwares
        <span className="h-px w-8 bg-black/10"></span>
      </div>
    </div>
  );
}
