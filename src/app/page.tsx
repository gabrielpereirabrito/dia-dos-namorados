"use client";

import { useAudio } from "@/context/AudioContext";
import { motion } from "motion/react";
import siteContent from "@/data/content";

export default function Home() {
  const { activate, isActivated } = useAudio();

  const handleStart = () => {
    activate();
    // In Phase 3, this will also scroll to the timeline section
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      {!isActivated ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center gap-8"
        >
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-[family-name:var(--font-playfair-display)] text-5xl md:text-7xl font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 bg-clip-text text-transparent leading-tight"
          >
            {siteContent.hero.headline}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl max-w-lg text-foreground/60"
          >
            {siteContent.hero.subtitle}
          </motion.p>

          {/* CTA Button */}
          <motion.button
            id="hero-cta"
            onClick={handleStart}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative mt-4 px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold text-lg shadow-xl shadow-rose-500/25 hover:shadow-rose-500/40 transition-shadow overflow-hidden group"
          >
            {/* Shimmer effect on hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative flex items-center gap-2">
              <HeartIcon className="w-5 h-5" />
              {siteContent.hero.ctaText}
            </span>
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <h1 className="font-[family-name:var(--font-playfair-display)] text-4xl md:text-6xl font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 bg-clip-text text-transparent">
            {siteContent.hero.headline}
          </h1>
          <p className="text-foreground/60 text-lg">
            A música está a tocar 🎵 — as secções serão construídas na Fase 3.
          </p>
        </motion.div>
      )}
    </main>
  );
}

function HeartIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}
