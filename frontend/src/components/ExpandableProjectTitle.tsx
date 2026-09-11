import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface ExpandableProjectTitleProps {
  title: string;
  className?: string;
  as?: 'h1' | 'h2';
  buttonClassName?: string;
}

export const ExpandableProjectTitle: React.FC<ExpandableProjectTitleProps> = ({
  title,
  className = 'text-[15px] sm:text-[17px] lg:text-[19px] leading-[23px] sm:leading-[25px] lg:leading-[28px] font-semibold text-[#020617] tracking-tight',
  as: Component = 'h1',
  buttonClassName
}) => {
  const [expanded, setExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(() => (title?.length ?? 0) > 210);
  const textRef = useRef<HTMLHeadingElement>(null);

  // Reset expansion when title changes
  useEffect(() => {
    setExpanded(false);
    const initialOverflow = (title?.length ?? 0) > 210;
    setCanExpand(initialOverflow);
  }, [title]);

  useEffect(() => {
    const checkOverflow = () => {
      const el = textRef.current;
      if (!el || expanded) return;
      const isOver = el.scrollHeight > el.clientHeight + 1 || (title?.length ?? 0) > 210;
      setCanExpand(isOver);
    };

    checkOverflow();
    const frameId = requestAnimationFrame(checkOverflow);
    const timer = setTimeout(checkOverflow, 120);

    window.addEventListener('resize', checkOverflow);
    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timer);
      window.removeEventListener('resize', checkOverflow);
    };
  }, [title, expanded]);

  const defaultBtnClass = 'mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11.5px] sm:text-[12px] font-semibold text-[#D96B33] bg-[#D96B33]/8 hover:bg-[#D96B33]/15 border border-[#D96B33]/20 hover:border-[#D96B33]/35 transition-all duration-300 cursor-pointer shadow-2xs group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D96B33]/40';

  return (
    <div>
      <Component
        ref={textRef}
        className={`${className} transition-all duration-300 ease-out ${
          !expanded && canExpand ? 'line-clamp-2 sm:line-clamp-3' : ''
        }`}
      >
        {title}
      </Component>

      {canExpand && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className={buttonClassName || defaultBtnClass}
          aria-expanded={expanded}
        >
          <span>{expanded ? 'Show less' : 'Show more'}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-300 ease-out ${
              expanded ? 'rotate-180 text-[#D96B33]' : 'text-[#D96B33]/80 group-hover:translate-y-0.5'
            }`}
          />
        </button>
      )}
    </div>
  );
};
