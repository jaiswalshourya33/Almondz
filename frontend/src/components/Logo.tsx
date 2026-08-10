import React from 'react';

export const Logo: React.FC<{ className?: string; light?: boolean }> = ({ className = "h-8", light = false }) => {
  return (
    <div className={`flex flex-col select-none ${className}`}>
      <div className={`flex items-center text-2xl font-normal tracking-tight ${light ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Georgia, serif' }}>
        <span>alm</span>
        <span className="relative inline-flex items-center justify-center w-5 h-5 mx-0.5 rounded-full bg-[#F2834C]">
          <span className="w-2 h-2 rounded-full bg-white"></span>
        </span>
        <span>ndz</span>
      </div>
      <span className="text-[10px] italic font-medium tracking-normal text-[#F2834C] -mt-1 whitespace-nowrap">
        the infrastructure specialist
      </span>
    </div>
  );
};

