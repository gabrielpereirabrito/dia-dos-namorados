"use client";

import siteContent from "@/data/content";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ─── Typewriter Hook ───

function useTypewriter(text: string, isActive: boolean, speed: number = 30) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    setDisplayedText("");
    setIsComplete(false);
    let index = 0;

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, isActive, speed]);

  return { displayedText, isComplete };
}

// ─── Main Section ───

export default function LoveCardSection() {
  const { loveCard } = siteContent;
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-120px" });
  const [letterOpened, setLetterOpened] = useState(false);

  const { displayedText, isComplete } = useTypewriter(
    loveCard.message,
    letterOpened,
    25
  );

  // Trigger letter opening when section comes into view
  useEffect(() => {
    if (isInView && !letterOpened) {
      const timer = setTimeout(() => setLetterOpened(true), 600);
      return () => clearTimeout(timer);
    }
  }, [isInView, letterOpened]);

  return (
    <section
      id="love-card"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-400/8 dark:bg-rose-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-rose-400/50" />
            <span className="text-rose-400/60 text-sm">💌</span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-rose-400/50" />
          </div>

          <h2 className="font-[family-name:var(--font-playfair-display)] text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 via-pink-500 to-rose-400 bg-clip-text text-transparent mb-4">
            {loveCard.sectionTitle}
          </h2>
        </motion.div>

        {/* Letter card */}
        <motion.div
          initial={{ opacity: 0, rotateX: -15, y: 30 }}
          animate={isInView ? { opacity: 1, rotateX: 0, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
          style={{ perspective: "1000px" }}
        >
          <div className="relative bg-gradient-to-br from-white/80 via-rose-50/50 to-white/80 dark:from-rose-950/40 dark:via-pink-950/30 dark:to-rose-950/40 rounded-3xl p-8 sm:p-10 md:p-12 shadow-2xl shadow-rose-500/10 border border-rose-200/30 dark:border-rose-500/10 backdrop-blur-sm">
            {/* Letter texture */}
            <div className="absolute inset-0 rounded-3xl opacity-[0.03] bg-[repeating-linear-gradient(0deg,transparent,transparent_27px,var(--rose-300)_27px,var(--rose-300)_28px)]" />

            {/* Content */}
            <div className="relative">
              {/* Message text with typewriter effect */}
              <div className="space-y-4 text-foreground/80 text-base sm:text-lg leading-relaxed whitespace-pre-line min-h-[200px]">
                {letterOpened ? (
                  <>
                    <p>{displayedText}</p>
                    {/* Blinking cursor */}
                    {!isComplete && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                        className="inline-block w-0.5 h-5 bg-rose-500 ml-0.5 align-middle"
                      />
                    )}
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 0.5 } : {}}
                    className="flex items-center justify-center h-48"
                  >
                    <div className="flex flex-col items-center gap-3 text-foreground/30">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                      </motion.div>
                      <span className="text-sm">A abrir a carta...</span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Signature */}
              {isComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-8 pt-6 border-t border-rose-200/30 dark:border-rose-500/10"
                >
                  <p className="font-[family-name:var(--font-playfair-display)] text-xl sm:text-2xl text-rose-500 font-semibold italic text-right">
                    {loveCard.signature}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Decorative corner elements */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-rose-300/20 rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-rose-300/20 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-rose-300/20 rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-rose-300/20 rounded-br-lg" />
          </div>
        </motion.div>

        {/* Closing heart */}
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8, type: "spring" }}
            className="flex justify-center mt-12"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-4xl"
            >
              💕
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
