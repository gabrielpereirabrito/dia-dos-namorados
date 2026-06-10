"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Thin animated progress bar at the top of the viewport.
 * Shows how far the user has scrolled through the page.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      id="scroll-progress"
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-rose-500 via-pink-400 to-rose-500 origin-left z-[100]"
      style={{ scaleX }}
    />
  );
}
