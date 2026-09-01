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
        {/* Main 'almondz' Brand Typography with slim regular weight */}
        <g id="almondz-brand">
          {/* 'a', 'l', 'm' */}
          <text
            x="0"
            y="39"
            fill={textColor}
            fontFamily="'Century Gothic', 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            fontSize="44"
            fontWeight="350"
            letterSpacing="-0.01em"
          >
            alm
          </text>

          {/* 'o' with slim outer ring and solid orange center dot - naturally spaced with other letters */}
          <g transform="translate(95, 26)">
            {/* Outer ring */}
            <circle
              cx="0"
              cy="0"
              r="13.2"
              stroke={textColor}
              strokeWidth="2.8"
              fill="none"
            />
            {/* Solid orange inner accent circle */}
            <circle
              cx="0"
              cy="0"
              r="8.2"
              fill={orangeColor}
            />
          </g>

          {/* 'ndz' naturally spaced after 'o' */}
          <text
            x="112"
            y="39"
            fill={textColor}
            fontFamily="'Century Gothic', 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            fontSize="44"
            fontWeight="350"
            letterSpacing="-0.01em"
          >
            ndz
          </text>
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
