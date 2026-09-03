import React, { useEffect, useRef } from 'react';

/* "Services Facilitation Through Group Companies" — the reference chart rebuilt
   as an animated graphic. Colours and text are kept exactly as in the source
   image; only the presentation is animated:
     - the colourful donut ring assembles segment by segment as the section
       reaches the viewport,
     - the centre label, the 49% / 51% split and the three group nodes fade in
       one after another with generous gaps,
     - hovering a group heading reveals its company caption (all three behave
       the same way).

   The reveal uses the site-wide plain pattern (see AboutOverview.tsx and the
   `.about-subnav` rules in index.css): a `useRef` + IntersectionObserver toggles
   an `.is-visible` class on the section and every step animates in pure CSS with
   `opacity` / `translate` + `transition-delay`. This deliberately avoids a
   JS animation library orchestrating dozens of SVG nodes at once, which stalls
   the renderer. */

const CX = 380;
const CY = 355;
const R_OUT = 152;
const R_IN = 104;
const HOLE = 99;
const VB_W = 760;
const VB_H = 595;
/* Each connector is the same dashed bridge sitting in the gap between a node
   and the ring's outer edge — never touching either. */
const NODE_GAP = 40;

// Full rainbow wheel, read clockwise from just past the bottom gap.
const RING_COLORS = [
  '#26B7A9', '#2FB878', '#4FBE3A', '#82C63F', '#B7D330', '#EDC71C',
  '#F5A81C', '#F4871F', '#F16522', '#EE4036', '#E22A72', '#BC3A94',
  '#7C3FA0', '#3E57A6', '#2280C3', '#25A8DF',
];
const SEGMENTS = RING_COLORS.length;
const GAP_DEG = 14;
const START_DEG = 90 + GAP_DEG / 2;
const SWEEP_DEG = 360 - GAP_DEG;
const SEG_DEG = SWEEP_DEG / SEGMENTS;

const rad = (d: number) => (d * Math.PI) / 180;
const pt = (r: number, a: number): [number, number] => [
  CX + r * Math.cos(rad(a)),
  CY + r * Math.sin(rad(a)),
];

function wedge(rO: number, rI: number, a0: number, a1: number): string {
  const [x1, y1] = pt(rO, a0);
  const [x2, y2] = pt(rO, a1);
  const [x3, y3] = pt(rI, a1);
  const [x4, y4] = pt(rI, a0);
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M${x1},${y1} A${rO},${rO} 0 ${large} 1 ${x2},${y2} L${x3},${y3} A${rI},${rI} 0 ${large} 0 ${x4},${y4} Z`;
}

const SEG_PATHS = RING_COLORS.map((color, i) => ({
  color,
  d: wedge(R_OUT, R_IN, START_DEG + i * SEG_DEG, START_DEG + (i + 1) * SEG_DEG - 1.4),
}));

interface GroupNode {
  key: string;
  heading: string[];
  company: string;
  color: string;
  pos: { top: string; left: string };
  caption: 'top' | 'side';
  captionAlign: 'left' | 'right';
  connector: { x1: number; y1: number; x2: number; y2: number };
}

const GROUPS: GroupNode[] = [
  {
    key: 'infra',
    heading: ['Infrastructure', 'Consulting'],
    company: 'Almondz Global Infra Consultant Ltd.',
    color: '#1B3A73',
    pos: { top: '56%', left: '14%' },
    caption: 'top',
    captionAlign: 'left',
    connector: { x1: CX - R_OUT - 2 - NODE_GAP, y1: CY, x2: CX - R_OUT - 2, y2: CY },
  },
  {
    key: 'financial',
    heading: ['Financial', 'Services'],
    company: 'Almondz Financial Services Ltd. (Merchant Banking / Corp. Finance)',
    color: '#7A2E1F',
    pos: { top: '15%', left: '50%' },
    caption: 'side',
    captionAlign: 'left',
    connector: { x1: CX, y1: CY - R_OUT - 2 - NODE_GAP, x2: CX, y2: CY - R_OUT - 2 },
  },
  {
    key: 'green',
    heading: ['Green Fuel'],
    company: 'Premier Green Innovation Pvt. Ltd.',
    color: '#5AA13E',
    pos: { top: '56%', left: '86%' },
    caption: 'top',
    captionAlign: 'right',
    connector: { x1: CX + R_OUT + 2 + NODE_GAP, y1: CY, x2: CX + R_OUT + 2, y2: CY },
  },
];

/** One circular "C" arc node with heading + a company caption revealed on hover. */
const ArcNode: React.FC<{ node: GroupNode; revealIndex: number }> = ({ node, revealIndex }) => (
  <div
    className="gc-node absolute -translate-x-1/2 -translate-y-1/2"
    style={{ top: node.pos.top, left: node.pos.left, ['--i' as string]: revealIndex }}
  >
    <div className="relative w-[156px] h-[156px] flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="gc-arc-svg absolute inset-0 w-full h-full overflow-visible">
        <path
          className="gc-arc"
          d="M 74 10 A 44 44 0 1 0 74 90"
          fill="none"
          stroke={node.color}
          strokeWidth={4.5}
          strokeLinecap="round"
        />
      </svg>
      <span
        className="relative z-10 text-center font-serif font-bold italic leading-tight px-1"
        style={{ color: node.color, fontSize: '17px' }}
      >
        {node.heading.map((line) => (
          <span key={line} className="block">{line}</span>
        ))}
      </span>
    </div>

    <div
      className={`gc-caption absolute w-[240px] text-[14px] font-semibold leading-snug text-[#1C2530] pointer-events-none ${
        node.caption === 'top'
          ? 'bottom-[110%] ' + (node.captionAlign === 'right' ? 'right-0 text-right' : 'left-0 text-left')
          : 'left-[112%] top-1/2 -translate-y-1/2 text-left'
      }`}
    >
      {node.company}
    </div>
  </div>
);

export const GroupCompaniesGraphic: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      section.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('is-visible');
          observer.unobserve(section);
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="group-companies pt-20 pb-8 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="gc-reveal text-3xl sm:text-4xl font-serif font-bold text-[#18253A] text-center">
          Services Facilitation Through Group Companies
        </h2>

        <div className="relative mt-10 mx-auto" style={{ maxWidth: VB_W }}>
          <div className="relative w-full" style={{ paddingBottom: `${(VB_H / VB_W) * 100}%` }}>
            <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 w-full h-full overflow-visible" aria-hidden="true">
              {GROUPS.map((g, i) => (
                <line
                  key={g.key}
                  className="gc-connector"
                  style={{ ['--i' as string]: i }}
                  x1={g.connector.x1}
                  y1={g.connector.y1}
                  x2={g.connector.x2}
                  y2={g.connector.y2}
                  stroke="#3A3A3A"
                  strokeWidth={1.4}
                  strokeDasharray="5 5"
                />
              ))}

              <g>
                {SEG_PATHS.map((s, i) => (
                  <path key={i} className="gc-seg" style={{ ['--i' as string]: i }} d={s.d} fill={s.color} />
                ))}
              </g>

              <circle className="gc-center" cx={CX} cy={CY} r={HOLE} fill="#ffffff" />
              <text
                className="gc-center font-serif"
                x={CX}
                y={CY - 8}
                textAnchor="middle"
                style={{ fontSize: 38, fontWeight: 700, fill: '#16202B' }}
              >
                AGSL
              </text>
              <text
                className="gc-center"
                x={CX}
                y={CY + 26}
                textAnchor="middle"
                style={{ fontSize: 20, fill: '#3A4653' }}
              >
                (Listed entity)
              </text>

              <line
                className="gc-split"
                style={{ ['--i' as string]: 0 }}
                x1={CX}
                y1={CY + HOLE - 6}
                x2={CX}
                y2={CY + R_OUT + 44}
                stroke="#8A939C"
                strokeWidth={1.2}
                strokeDasharray="4 4"
              />
              <g className="gc-split" style={{ ['--i' as string]: 1 }}>
                <text x={CX - 70} y={CY + R_OUT + 32} textAnchor="middle" style={{ fontSize: 26, fontWeight: 700, fontStyle: 'italic', fill: '#16202B' }}>49%</text>
                <text x={CX - 70} y={CY + R_OUT + 56} textAnchor="middle" style={{ fontSize: 18, fill: '#3A4653' }}>Public</text>
              </g>
              <g className="gc-split" style={{ ['--i' as string]: 2 }}>
                <text x={CX + 76} y={CY + R_OUT + 32} textAnchor="middle" style={{ fontSize: 26, fontWeight: 700, fontStyle: 'italic', fill: '#16202B' }}>51%</text>
                <text x={CX + 76} y={CY + R_OUT + 56} textAnchor="middle" style={{ fontSize: 18, fill: '#3A4653' }}>Promoters</text>
              </g>
            </svg>

            {GROUPS.map((g, i) => (
              <ArcNode key={g.key} node={g} revealIndex={i} />
            ))}
          </div>
        </div>

        <p
          className="gc-reveal gc-reveal--late mt-6 text-center font-serif font-bold italic"
          style={{ color: '#1F3A6B', fontSize: '1.2rem' }}
        >
          Widely held company having diversified presence
        </p>
      </div>
    </section>
  );
};
