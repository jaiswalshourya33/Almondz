import React from 'react';

export const Logo: React.FC<{ className?: string; light?: boolean }> = ({
  className = "h-11 sm:h-12",
  light = true,
}) => {
  const textColor = light ? "#FFFFFF" : "#18253A";
  const orangeColor = "#D96B33";

  return (
    <div className={`inline-flex flex-col items-start justify-start select-none ${className}`}>
      <svg
        viewBox="0 0 232 66"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
        aria-label="Almondz – the infrastructure specialist"
      >
        {/* 'almondz' wordmark — one <text> run so the letters keep the font's
            natural kerning and read as a single tight word. The 'o' glyph is
            rendered transparent so it still reserves its advance width (keeping
            'ndz' correctly spaced), and the ring + orange dot are overlaid at
            the 'o' position (x≈93 at this size/font). */}
        <g id="almondz-brand">
          <text
            x="0"
            y="39"
            fill={textColor}
            fontFamily="'Century Gothic', 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            fontSize="44"
            fontWeight="350"
            letterSpacing="-0.025em"
          >
            <tspan>alm</tspan>
            <tspan fill="transparent">o</tspan>
            <tspan>ndz</tspan>
          </text>

          {/* 'o' as a slim outer ring with a solid orange centre dot */}
          <g transform="translate(91, 25)">
            {/* Outer ring */}
            <circle
              cx="0"
              cy="0"
              r="12.2"
              stroke={textColor}
              strokeWidth="2.2"
              fill="none"
            />
            {/* Solid orange inner accent circle */}
            <circle
              cx="0"
              cy="0"
              r="7"
              fill={orangeColor}
            />
          </g>
        </g>

        {/* Tagline: 'the infrastructure specialist' */}
        <text
          x="1"
          y="59"
          fill={orangeColor}
          fontFamily="Georgia, 'Times New Roman', Cambria, serif"
          fontSize="15"
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
