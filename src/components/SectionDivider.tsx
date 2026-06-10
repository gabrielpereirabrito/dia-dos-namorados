"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

type Variant = "hearts" | "stars" | "wave";

interface SectionDividerProps {
  variant?: Variant;
}

export default function SectionDivider({ variant = "hearts" }: SectionDividerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  const elements: Record<Variant, string[]> = {
    hearts: ["♥", "♥", "♥"],
    stars: ["✦", "✦", "✦"],
    wave: ["~", "~", "~"],
  };

  const items = elements[variant];

  return (
    <div ref={ref} className="flex items-center justify-center gap-4 py-8 md:py-12">
      {/* Left line */}
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: 80 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="h-px bg-gradient-to-r from-transparent to-rose-300/40"
      />

      {/* Center elements */}
      <div className="flex items-center gap-2">
        {items.map((item, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0, rotate: -30 }}
            animate={
              isInView
                ? { opacity: [0, 1, 0.6], scale: 1, rotate: 0 }
                : {}
            }
            transition={{
              duration: 0.5,
              delay: 0.3 + i * 0.12,
              ease: "backOut",
            }}
            className="text-rose-400/40 text-xs"
          >
            {item}
          </motion.span>
        ))}
      </div>

      {/* Right line */}
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: 80 } : {}}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="h-px bg-gradient-to-l from-transparent to-rose-300/40"
      />
    </div>
  );
}
