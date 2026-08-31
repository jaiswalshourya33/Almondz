import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

/* "Services Facilitation Through Group Companies" — the reference chart rebuilt
   as an animated graphic. Colours and text are kept exactly as in the source
   image; only the presentation is animated:
     - the colourful donut ring assembles segment by segment and carries a gentle
       scroll-linked spin that settles as the section reaches the viewport,
     - the centre label, the 49% / 51% split and the three group nodes fade in
       one after another with generous gaps,
     - hovering a group heading reveals its company caption (all three behave
       the same way). */

const CX = 380;
const CY = 320;
const R_OUT = 152;
const R_IN = 104;
const HOLE = 99;
const VB_W = 760;
const VB_H = 580;
/* Each connector is the same short dashed bridge sitting in the gap between a
   node and the ring's outer edge — never touching either. */
const NODE_GAP = 26;

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
    pos: { top: '55%', left: '17%' },
    caption: 'top',
    captionAlign: 'left',
    connector: { x1: CX - R_OUT - 2 - NODE_GAP, y1: CY, x2: CX - R_OUT - 2, y2: CY },
  },
  {
    key: 'financial',
    heading: ['Financial', 'Services'],
    company: 'Almondz Financial Services Ltd. (Merchant Banking / Corp. Finance)',
    color: '#7A2E1F',
    pos: { top: '12%', left: '50%' },
    caption: 'side',
    captionAlign: 'left',
    connector: { x1: CX, y1: CY - R_OUT - 2 - NODE_GAP, x2: CX, y2: CY - R_OUT - 2 },
  },
  {
    key: 'green',
    heading: ['Green Fuel'],
    company: 'Premier Green Innovation Pvt. Ltd.',
    color: '#5AA13E',
    pos: { top: '55%', left: '83%' },
    caption: 'top',
    captionAlign: 'right',
    connector: { x1: CX + R_OUT + 2 + NODE_GAP, y1: CY, x2: CX + R_OUT + 2, y2: CY },
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay },
  }),
};

const drawIn = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1, ease: 'easeInOut', delay: 1.9 + i * 0.25 },
      opacity: { duration: 0.25, delay: 1.9 + i * 0.25 },
    },
  }),
};

const segVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
};

const nodeVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE, delay },
  }),
  hover: {},
};

const arcVariants = {
  hidden: {},
  visible: {},
  hover: { scale: 1.07, transition: { type: 'spring', stiffness: 250, damping: 18 } },
};

/** One circular "C" arc node with heading + a company caption revealed on hover. */
const ArcNode: React.FC<{ node: GroupNode; revealDelay: number }> = ({ node, revealDelay }) => {
  const capHiddenX = node.caption === 'side' ? -10 : 0;
  const capHiddenY = node.caption === 'top' ? 10 : 0;

  return (
    <motion.div
      custom={revealDelay}
      variants={nodeVariants}
      whileHover="hover"
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ top: node.pos.top, left: node.pos.left }}
    >
      <div className="relative w-[156px] h-[156px] flex items-center justify-center">
        <motion.svg
          viewBox="0 0 100 100"
          variants={arcVariants}
          className="absolute inset-0 w-full h-full overflow-visible"
        >
          <motion.path
            d="M 74 10 A 44 44 0 1 0 74 90"
            fill="none"
            stroke={node.color}
            strokeWidth={4.5}
            strokeLinecap="round"
            variants={drawIn}
            custom={0}
          />
        </motion.svg>
        <span
          className="relative z-10 text-center font-serif font-bold italic leading-tight px-1"
          style={{ color: node.color, fontSize: '17px' }}
        >
          {node.heading.map((line) => (
            <span key={line} className="block">{line}</span>
          ))}
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, x: capHiddenX, y: capHiddenY }}
        variants={{ hover: { opacity: 1, x: 0, y: 0, transition: { duration: 0.5, ease: EASE } } }}
        className={`absolute w-[240px] text-[14px] font-semibold leading-snug text-[#1C2530] pointer-events-none ${
          node.caption === 'top'
            ? 'bottom-[110%] ' + (node.captionAlign === 'right' ? 'right-0 text-right' : 'left-0 text-left')
            : 'left-[112%] top-1/2 -translate-y-1/2 text-left'
        }`}
      >
        {node.company}
      </motion.div>
    </motion.div>
  );
};

export const GroupCompaniesGraphic: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-15% 0px -15% 0px' });

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05 } },
  };

  const ringGroup = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4, staggerChildren: 0.07, delayChildren: 0.3 },
    },
  };

  return (
    <section className="py-20 bg-white border-t border-[#A49050]/20 overflow-hidden">
      <div ref={sectionRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-3xl sm:text-4xl font-serif font-bold text-[#18253A] text-center"
        >
          Services Facilitation Through Group Companies
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="relative mt-10 mx-auto"
          style={{ maxWidth: VB_W }}
        >
          <div className="relative w-full" style={{ paddingBottom: `${(VB_H / VB_W) * 100}%` }}>
            <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 w-full h-full overflow-visible" aria-hidden="true">
              {GROUPS.map((g, i) => (
                <motion.line
                  key={g.key}
                  x1={g.connector.x1}
                  y1={g.connector.y1}
                  x2={g.connector.x2}
                  y2={g.connector.y2}
                  stroke="#3A3A3A"
                  strokeWidth={1.4}
                  strokeDasharray="5 5"
                  custom={2.4 + i * 0.2}
                  variants={fadeUp}
                />
              ))}

              <motion.g variants={ringGroup}>
                {SEG_PATHS.map((s, i) => (
                  <motion.path key={i} d={s.d} fill={s.color} variants={segVariants} />
                ))}
              </motion.g>

              <motion.circle cx={CX} cy={CY} r={HOLE} fill="#ffffff" custom={1.4} variants={fadeUp} />
              <motion.text
                x={CX}
                y={CY - 8}
                textAnchor="middle"
                className="font-serif"
                style={{ fontSize: 38, fontWeight: 700, fill: '#16202B' }}
                custom={1.6}
                variants={fadeUp}
              >
                AGSL
              </motion.text>
              <motion.text
                x={CX}
                y={CY + 26}
                textAnchor="middle"
                style={{ fontSize: 20, fill: '#3A4653' }}
                custom={1.6}
                variants={fadeUp}
              >
                (Listed entity)
              </motion.text>

              <motion.line
                x1={CX}
                y1={CY + HOLE - 6}
                x2={CX}
                y2={CY + R_OUT + 44}
                stroke="#8A939C"
                strokeWidth={1.2}
                strokeDasharray="4 4"
                custom={2.0}
                variants={fadeUp}
              />
              <motion.g custom={2.15} variants={fadeUp}>
                <text x={CX - 70} y={CY + R_OUT + 32} textAnchor="middle" style={{ fontSize: 26, fontWeight: 700, fontStyle: 'italic', fill: '#16202B' }}>49%</text>
                <text x={CX - 70} y={CY + R_OUT + 56} textAnchor="middle" style={{ fontSize: 18, fill: '#3A4653' }}>Public</text>
              </motion.g>
              <motion.g custom={2.3} variants={fadeUp}>
                <text x={CX + 76} y={CY + R_OUT + 32} textAnchor="middle" style={{ fontSize: 26, fontWeight: 700, fontStyle: 'italic', fill: '#16202B' }}>51%</text>
                <text x={CX + 76} y={CY + R_OUT + 56} textAnchor="middle" style={{ fontSize: 18, fill: '#3A4653' }}>Promoters</text>
              </motion.g>
            </svg>

            {GROUPS.map((g, i) => (
              <ArcNode key={g.key} node={g} revealDelay={2.5 + i * 0.45} />
            ))}
          </div>
        </motion.div>

        <motion.p
          custom={4.2}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-6 text-center font-serif font-bold italic"
          style={{ color: '#1F3A6B', fontSize: '1.2rem' }}
        >
          Widely held company having diversified presence
        </motion.p>
      </div>
    </section>
  );
};
