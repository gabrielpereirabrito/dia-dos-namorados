"use client";

import { useAudio } from "@/context/AudioContext";
import siteContent from "@/data/content";
import { motion } from "motion/react";

export default function HeroSection() {
  const { activate, isActivated } = useAudio();

  const handleStart = () => {
    activate();

    // Smooth scroll to the timeline section after a brief delay
    setTimeout(() => {
      const timeline = document.getElementById("timeline");
      timeline?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--rose-100)_0%,_transparent_70%)] opacity-40 dark:opacity-10" />

        {/* Floating hearts */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-rose-300/20 dark:text-rose-400/10 text-2xl select-none"
            initial={{
              x: `${15 + i * 14}%`,
              y: "110%",
              rotate: -20 + i * 10,
            }}
            animate={{
              y: "-10%",
              rotate: 20 + i * 10,
            }}
            transition={{
              duration: 12 + i * 3,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2,
            }}
          >
            ♥
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center gap-6 max-w-2xl"
      >
        {/* Decorative flourish */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-rose-400/60 text-4xl"
        >
          ✦
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, filter: "blur(12px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="font-[family-name:var(--font-playfair-display)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight"
        >
          <span className="bg-gradient-to-br from-rose-600 via-pink-500 to-rose-400 bg-clip-text text-transparent">
            {siteContent.hero.headline}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg sm:text-xl md:text-2xl text-foreground/50 max-w-lg leading-relaxed font-light"
        >
          {siteContent.hero.subtitle}
        </motion.p>

        {/* CTA Button — only show if not yet activated */}
        {!isActivated && (
          <motion.button
            id="hero-cta"
            onClick={handleStart}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.06, boxShadow: "0 20px 40px rgba(244,63,94,0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="relative mt-6 px-10 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 text-white font-semibold text-lg shadow-xl shadow-rose-500/20 transition-all overflow-hidden group cursor-pointer"
          >
            {/* Shimmer effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />

            <span className="relative flex items-center gap-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              {siteContent.hero.ctaText}
            </span>
          </motion.button>
        )}

        {/* Scroll indicator (after activation) */}
        {isActivated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2 text-foreground/30"
            >
              <span className="text-sm">Desliza para baixo</span>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {/* Bottom gradient fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
