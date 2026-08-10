import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-[#fdf9ed] px-4 text-center">
      <div className="w-20 h-20 bg-[#0D1B2A] text-[#F2834C] flex items-center justify-center font-mono text-3xl font-bold mb-6">
        404
      </div>
      <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#0D1B2A]">Page Not Found</h1>
      <p className="text-sm text-[#1c1c15]/70 max-w-md mt-3 leading-relaxed">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="mt-8 bg-[#F2834C] hover:bg-[#d9723f] text-white px-8 py-3 text-xs font-mono font-bold tracking-widest uppercase transition-all shadow-md flex items-center gap-2 rounded-none"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Home</span>
      </Link>
    </div>
  );
};
