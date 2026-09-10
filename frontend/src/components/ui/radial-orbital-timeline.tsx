"use client";
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

// Orbit radius in px — shared by node placement and the "scroll the open card
// into view" maths below.
const RING_RADIUS = 240;

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [viewMode, setViewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset, setCenterOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // A click anywhere that isn't a node (nodes call stopPropagation) collapses
  // any open card and restarts the orbital rotation.
  const handleContainerClick = () => {
    setExpandedItems({});
    setActiveNodeId(null);
    setPulseEffect({});
    setAutoRotate(true);
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
        scrollOpenCardIntoView();
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  // The active node always animates to the top of the ring, where its card
  // opens just below it. If the user clicked a node near the bottom of the
  // circle that spot can be off-screen, so bring it into view.
  const scrollOpenCardIntoView = () => {
    requestAnimationFrame(() => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // active node sits at (container centre − radius); the card body is
      // roughly another ~210px below that.
      const cardCentreWithin = rect.height / 2 - RING_RADIUS + 190;
      const target =
        window.scrollY + rect.top + cardCentreWithin - window.innerHeight / 2;
      window.scrollTo({ top: Math.max(0, target), behavior: "smooth" });
    });
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = RING_RADIUS;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));

    // Depth cue: nodes toward the viewer (front of the ring) sit a touch more
    // opaque than those at the back. Deliberately shallow — a node must never
    // fade close to invisible.
    const opacity = Math.max(
      0.85,
      Math.min(1, 0.9 + 0.1 * ((1 + Math.cos(radian)) / 2))
    );

    // Darkness travels around the ring: 1 at the very top, 0 at the very
    // bottom, easing smoothly through the sides. Drives each node's fill so
    // the shading flows as the ring rotates.
    const darkness = (1 - Math.sin(radian)) / 2;

    return { x, y, angle, zIndex, opacity, darkness };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center bg-[#F1F3F5] overflow-hidden"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          <div className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-[#18253A] via-[#2E4057] to-[#D96B33] animate-pulse flex items-center justify-center z-10">
            <div className="absolute w-28 h-28 rounded-full border border-[#18253A]/20 animate-ping opacity-70"></div>
            <div
              className="absolute w-36 h-36 rounded-full border border-[#18253A]/10 animate-ping opacity-50"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md"></div>
          </div>

          <div className="absolute w-[480px] h-[480px] rounded-full border border-[#A49050]/30"></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            // The idle node fill travels from a soft light slate at the bottom
            // of the ring (still clearly visible on the page, never pure white)
            // to deep navy at the top. The icon stays navy through the lit
            // half and only turns light for the clearly dark nodes near the
            // top, so it never washes out.
            const d = position.darkness;
            const mix = (from: number, to: number, t: number) =>
              Math.round(from + (to - from) * t);
            const idleBg = `rgb(${mix(216, 24, d)}, ${mix(221, 37, d)}, ${mix(
              229,
              58,
              d
            )})`;
            const fgT = (() => {
              const t = Math.min(1, Math.max(0, (d - 0.5) / 0.35));
              return t * t * (3 - 2 * t);
            })();
            const idleFg = `rgb(${mix(24, 255, fgT)}, ${mix(
              37,
              255,
              fgT
            )}, ${mix(58, 255, fgT)})`;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            const iconWrapStyle = isExpanded
              ? { backgroundColor: "#18253A", color: "#ffffff" }
              : isRelated
              ? { backgroundColor: "rgba(217,107,51,0.15)", color: "#18253A" }
              : { backgroundColor: idleBg, color: idleFg };

            return (
              <div
                key={item.id}
                ref={(el) => (nodeRefs.current[item.id] = el)}
                className="absolute transition-all duration-700 cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(217,107,51,0.22) 0%, rgba(217,107,51,0) 70%)`,
                    width: `${item.energy * 0.5 + 56}px`,
                    height: `${item.energy * 0.5 + 56}px`,
                    left: `-${(item.energy * 0.5 + 56 - 56) / 2}px`,
                    top: `-${(item.energy * 0.5 + 56 - 56) / 2}px`,
                  }}
                ></div>

                <div
                  className={`
                  w-14 h-14 rounded-full flex items-center justify-center
                  border-2
                  ${
                    isExpanded
                      ? "border-[#D96B33] shadow-lg shadow-[#D96B33]/30"
                      : isRelated
                      ? "border-[#D96B33] animate-pulse"
                      : "border-[#A49050]/40"
                  }
                  transition-all duration-300 transform
                  ${isExpanded ? "scale-150" : ""}
                `}
                  style={iconWrapStyle}
                >
                  <Icon size={24} />
                </div>

                <div
                  className={`
                  absolute top-[4.25rem] left-1/2 -translate-x-1/2 whitespace-nowrap
                  text-sm font-semibold tracking-wider
                  transition-all duration-300
                  ${isExpanded ? "scale-125" : ""}
                `}
                  style={{
                    color: isExpanded
                      ? "#18253A"
                      : `rgba(24, 37, 58, ${(0.6 + 0.35 * d).toFixed(3)})`,
                  }}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <Card className="absolute top-24 left-1/2 -translate-x-1/2 w-72 bg-white border border-[#A49050]/30 rounded-md shadow-xl shadow-[#18253A]/10 overflow-visible">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-px h-4 bg-[#A49050]/50"></div>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base font-serif font-bold text-[#18253A] leading-snug">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4 text-sm text-[#18253A]/70 leading-relaxed">
                      <p>{item.content}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
