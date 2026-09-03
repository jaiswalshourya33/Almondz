import React, { useLayoutEffect, useRef, useState } from 'react';

export const Logo: React.FC<{ className?: string; light?: boolean }> = ({
  className = "h-11 sm:h-12",
  light = true,
}) => {
  const textColor = light ? "#FFFFFF" : "#18253A";
  const orangeColor = "#D96B33";

  // The wordmark is drawn as two text runs — 'alm' and 'ndz' — with a gap between
  // them for the circular 'o'. 'alm' keeps the font's natural letter spacing (so
  // no two letters ever collide), and after it is laid out we measure its real
  // width and drop 'ndz' + the ring a fixed SLOT further along. That keeps the
  // spacing even and the ring perfectly centred between 'm' and 'n' on every
  // platform, whichever font in the stack actually renders.
  const SLOT = 33; // width reserved for the 'o' circle, in viewBox units
  const almRef = useRef<SVGTSpanElement>(null);
  const [almEnd, setAlmEnd] = useState(79); // Century Gothic estimate until measured

  useLayoutEffect(() => {
    if (almRef.current) {
      setAlmEnd(almRef.current.getComputedTextLength());
    }
  }, [light]);

  const oCenter = almEnd + SLOT / 2;
  const ndzX = almEnd + SLOT;

  return (
    <div className={`inline-flex flex-col items-start justify-start select-none ${className}`}>
      <svg
        viewBox="0 0 232 66"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
        aria-label="Almondz – the infrastructure specialist"
      >
        <g id="almondz-brand">
          <text
            x="0"
            y="39"
            fill={textColor}
            fontFamily="'Century Gothic', 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            fontSize="44"
            fontWeight="350"
            letterSpacing="-0.01em"
          >
            <tspan ref={almRef}>alm</tspan>
            <tspan x={ndzX}>ndz</tspan>
          </text>

          {/* 'o' — a slim outer ring with a solid orange centre dot, centred in
              the reserved slot between 'm' and 'n' */}
          <g transform={`translate(${oCenter}, 25)`}>
            <circle cx="0" cy="0" r="12.2" stroke={textColor} strokeWidth="2.2" fill="none" />
            <circle cx="0" cy="0" r="7" fill={orangeColor} />
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
