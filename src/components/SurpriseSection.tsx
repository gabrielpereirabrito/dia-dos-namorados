"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

export default function SurpriseSection() {
  const sectionRef = useRef(null);
  // Using a smaller margin to ensure it triggers even at the bottom of the page
  const isInView = useInView(sectionRef, { once: true, margin: "0px" });

  const targetDate = new Date("2026-07-05T00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsUnlocked(true);
        return true;
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
        return false;
      }
    };

    // Call immediately to set initial state without waiting 1s
    const unlocked = calculateTime();

    if (!unlocked) {
      const interval = setInterval(() => {
        const isDone = calculateTime();
        if (isDone) clearInterval(interval);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [targetDate]);

  return (
    <section
      id="surprise"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 overflow-hidden flex flex-col items-center"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-400/10 dark:bg-purple-400/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="text-center mb-12 relative z-10"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-purple-400/50" />
          <span className="text-purple-400/60 text-sm">✨</span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-purple-400/50" />
        </div>

        <h2 className="font-[family-name:var(--font-playfair-display)] text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-rose-400 bg-clip-text text-transparent mb-4">
          Uma Surpresa Especial
        </h2>
        <p className="text-foreground/70 max-w-xl mx-auto">
          O melhor ainda está por vir. Algo especial foi preparado para ti, mas a curiosidade vai ter que esperar um bocadinho mais...
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 w-full max-w-2xl"
      >
        <div className="relative bg-gradient-to-br from-white/80 via-purple-50/50 to-white/80 dark:from-purple-950/40 dark:via-pink-950/20 dark:to-purple-950/40 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-purple-500/10 border border-purple-200/30 dark:border-purple-500/10 backdrop-blur-sm text-center">
          
          {hasMounted ? (
            isUnlocked ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-rose-500 mb-4">A Surpresa foi Desbloqueada!</h3>
                <p className="text-foreground/80 mb-6">
                  Mais um capítulo lindo da nossa história começa agora. Amo-te muito! 💕
                </p>
                <div className="text-6xl animate-bounce">🎁</div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-4xl sm:text-5xl mb-6">🔒</div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-8 text-foreground/80">Disponível em</h3>
                
                <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-background/50 rounded-xl flex items-center justify-center text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400 shadow-inner">
                      {timeLeft.days.toString().padStart(2, '0')}
                    </div>
                    <span className="text-[10px] sm:text-xs text-foreground/60 mt-2 font-medium tracking-wider">DIAS</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-background/50 rounded-xl flex items-center justify-center text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400 shadow-inner">
                      {timeLeft.hours.toString().padStart(2, '0')}
                    </div>
                    <span className="text-[10px] sm:text-xs text-foreground/60 mt-2 font-medium tracking-wider">HORAS</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-background/50 rounded-xl flex items-center justify-center text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400 shadow-inner">
                      {timeLeft.minutes.toString().padStart(2, '0')}
                    </div>
                    <span className="text-[10px] sm:text-xs text-foreground/60 mt-2 font-medium tracking-wider">MIN</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-background/50 rounded-xl flex items-center justify-center text-2xl sm:text-3xl font-bold text-rose-500 shadow-inner">
                      {timeLeft.seconds.toString().padStart(2, '0')}
                    </div>
                    <span className="text-[10px] sm:text-xs text-foreground/60 mt-2 font-medium tracking-wider">SEG</span>
                  </div>
                </div>
              </motion.div>
            )
          ) : (
            <div className="min-h-[200px] flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
