import React from 'react';

export const Logo: React.FC<{ className?: string; light?: boolean }> = ({
  className = "h-9 sm:h-10",
  light = true,
}) => {
  const textColor = light ? "#FFFFFF" : "#18253A";
  const orangeColor = "#D96B33";

  return (
    <div className={`inline-flex flex-col items-start justify-start select-none ${className}`}>
      <svg
        viewBox="0 0 216 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
        aria-label="Almondz – the infrastructure specialist"
      >
        <g id="almondz-brand">
          {/* 'a' - bowl & right stem */}
          <path
            d="M 25 25 C 25 18.9 20.1 14 14 14 C 7.9 14 3 18.9 3 25 C 3 31.1 7.9 36 14 36 C 20.1 36 25 31.1 25 25 Z M 25 14 V 36"
            stroke={textColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* 'l' - vertical stem */}
          <path
            d="M 33 2 V 36"
            stroke={textColor}
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* 'm' - double arch */}
          <path
            d="M 41 36 V 14 M 41 21 C 41 17.1 44.1 14 48 14 C 51.9 14 54 17.1 54 21 V 36 M 54 21 C 54 17.1 57.1 14 61 14 C 64.9 14 67 17.1 67 21 V 36"
            stroke={textColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* 'o' - outer circle flush with x-height (14) & baseline (36) + concentric orange dot */}
          <circle cx="85.5" cy="25" r="10.8" stroke={textColor} strokeWidth="2.4" fill="none" />
          <circle cx="85.5" cy="25" r="6.2" fill={orangeColor} />

          {/* 'n' - single arch */}
          <path
            d="M 104 36 V 14 M 104 21 C 104 17.1 107.1 14 111 14 C 114.9 14 117 17.1 117 21 V 36"
            stroke={textColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* 'd' - bowl & ascender stem */}
          <path
            d="M 145 25 C 145 18.9 140.1 14 134 14 C 127.9 14 123 18.9 123 25 C 123 31.1 127.9 36 134 36 C 140.1 36 145 31.1 145 25 Z M 145 2 V 36"
            stroke={textColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* 'z' - top bar, diagonal, bottom bar */}
          <path
            d="M 153 14 H 171 L 153 36 H 171"
            stroke={textColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>

        {/* Tagline: 'the infrastructure specialist' */}
        <text
          x="2"
          y="50"
          fill={orangeColor}
          fontFamily="Georgia, 'Times New Roman', Cambria, serif"
          fontSize="13"
          fontStyle="italic"
          fontWeight="400"
          letterSpacing="0.01em"
        >
          the infrastructure specialist
        </text>
      </svg>
    </div>
  );
};

