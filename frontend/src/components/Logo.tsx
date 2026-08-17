import React from 'react';
import logoImage from '../images/logo.jpg';

export const Logo: React.FC<{ className?: string; light?: boolean }> = ({ className = "h-14", light: _light = false }) => {
  return (
    <div className={`select-none ${className}`}>
      <img
        src={logoImage}
        alt="Almondz – the infrastructure specialist"
        className="h-full w-auto object-contain"
      />
    </div>
  );
};
