import React from 'react';

export const Logo: React.FC<{ className?: string; light?: boolean }> = ({
  className = "h-11 sm:h-12",
  light = true,
}) => {
  return (
    <div className={`inline-flex items-center justify-start select-none ${className}`}>
      <img
        src="/logo-official.png"
        alt="Almondz – the infrastructure specialist"
        className={`h-full w-auto object-contain transition-all ${
          light ? '' : 'filter brightness-0'
        }`}
      />
    </div>
  );
};
