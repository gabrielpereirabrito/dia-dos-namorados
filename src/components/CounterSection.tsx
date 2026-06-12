"use client";

import siteContent from "@/data/content";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ─── Section Header (same pattern as Timeline) ───

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div ref={ref} className="text-center mb-16 md:mb-20">
      <div className="flex items-center justify-center gap-3 mb-4">
        <motion.span
          initial={{ width: 0 }}
          animate={isInView ? { width: 32 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-px bg-gradient-to-r from-transparent to-rose-400/50 block"
        />
        <motion.span
          initial={{ scale: 0, rotate: -90 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.4, type: "spring" }}
          className="text-rose-400/60 text-sm"
        >
          ♥
        </motion.span>
        <motion.span
          initial={{ width: 0 }}
          animate={isInView ? { width: 32 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-px bg-gradient-to-l from-transparent to-rose-400/50 block"
        />
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="font-[family-name:var(--font-playfair-display)] text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 via-pink-500 to-rose-400 bg-clip-text text-transparent mb-4"
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-foreground/50 text-base sm:text-lg max-w-md mx-auto"
      >
        {subtitle}
      </motion.p>
    </motion.div>
  );
}

// ─── Counter Card ───

interface CounterCardProps {
  label: string;
  value: number;
  emoji: string;
  delay: number;
}

function CounterCard({ label, value, emoji, delay }: CounterCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [displayed, setDisplayed] = useState(value);

  useEffect(() => {
    setDisplayed(value);
  }, [value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 120 }}
      className="relative flex flex-col items-center justify-center gap-2 px-4 py-7 rounded-2xl border border-rose-300/30 bg-rose-500/8 backdrop-blur-sm shadow-xl shadow-rose-500/10 overflow-hidden group"
    >
      {/* Background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Pulse ring when seconds tick */}
      <motion.div
        key={`${label}-ring-${displayed}`}
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0] }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 rounded-2xl border border-rose-400/30 pointer-events-none"
      />

      {/* Emoji */}
      <motion.span
        animate={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
        className="text-2xl select-none"
      >
        {emoji}
      </motion.span>

      {/* Number — no color animation to avoid framer "inherit" crash */}
      <motion.span
        key={`${label}-val-${displayed}`}
        initial={{ scale: 1.2, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="font-[family-name:var(--font-playfair-display)] text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-br from-rose-600 via-pink-500 to-rose-400 bg-clip-text text-transparent tabular-nums leading-none"
      >
        {displayed.toLocaleString("pt-BR")}
      </motion.span>

      {/* Label */}
      <span className="text-foreground/60 text-[10px] sm:text-xs uppercase tracking-widest font-semibold text-center">
        {label}
      </span>

      {/* Decorative bottom line */}
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: "50%" } : {}}
        transition={{ duration: 0.8, delay: delay + 0.3 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-rose-400/50 to-transparent"
      />
    </motion.div>
  );
}

// ─── Time calculation ───

function computeTime(startDate: Date): {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
} {
  const now = new Date();
  const diffMs = now.getTime() - startDate.getTime();
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Accurate year + month diff
  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  if (now.getDate() < startDate.getDate()) months--;
  if (months < 0) { years--; months += 12; }

  // Remaining days after subtracting full years+months
  const afterYearsMonths = new Date(startDate);
  afterYearsMonths.setFullYear(afterYearsMonths.getFullYear() + years);
  afterYearsMonths.setMonth(afterYearsMonths.getMonth() + months);
  const remainMs = now.getTime() - afterYearsMonths.getTime();
  const days = Math.floor(remainMs / (1000 * 60 * 60 * 24));

  // Time within the current day
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  return { years, months, days, hours, minutes, seconds, totalDays };
}

// ─── Main Section ───

export default function CounterSection() {
  const { counter } = siteContent;
  const startDate = new Date(counter.startDate + "T00:00:00");

  const [time, setTime] = useState(() => computeTime(startDate));

  useEffect(() => {
    const id = setInterval(() => {
      setTime(computeTime(startDate));
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cards = [
    { label: "Anos", value: time.years, emoji: "🎂" },
    { label: "Meses", value: time.months, emoji: "🌙" },
    { label: "Dias", value: time.days, emoji: "☀️" },
    { label: "Horas", value: time.hours, emoji: "⏰" },
    { label: "Minutos", value: time.minutes, emoji: "⌛" },
    { label: "Segundos", value: time.seconds, emoji: "💓" },
  ];

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section id="counter" className="relative py-24 md:py-32 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--rose-100)_0%,_transparent_65%)] opacity-20 dark:opacity-5 pointer-events-none" />

      {/* Floating petals */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute select-none pointer-events-none text-rose-300/20 dark:text-rose-400/10"
          style={{
            left: `${10 + i * 20}%`,
            top: `${15 + (i % 2) * 50}%`,
            fontSize: `${20 + (i % 3) * 10}px`,
          }}
          animate={{ y: [0, -20, 0], rotate: [0, 15, -15, 0] }}
          transition={{ duration: 6 + i * 1.5, repeat: Infinity, ease: "easeInOut", delay: i }}
        >
          🌸
        </motion.div>
      ))}

      <div className="relative max-w-5xl mx-auto">
        <SectionHeader title={counter.sectionTitle} subtitle={counter.sectionSubtitle} />

        {/* Cards grid — 3 cols on mobile, 6 on lg */}
        <div
          ref={sectionRef}
          className="grid grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4"
        >
          {cards.map((card, i) => (
            <CounterCard
              key={card.label}
              label={card.label}
              value={card.value}
              emoji={card.emoji}
              delay={i * 0.1}
            />
          ))}
        </div>

        {/* Full moons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-10"
        >
          <p className="text-xl md:text-2xl font-bold text-foreground/90">
            {Math.floor(time.totalDays / 29.5)} luas cheias
          </p>
          <p className="text-foreground/50 text-sm mt-1">
            (Uma lua cheia ocorre a cada 29.5 dias)
          </p>
        </motion.div>

        {/* Romantic quote below */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12 text-foreground/40 text-sm italic"
        >
          &ldquo;e cada segundo que passa me faz ter ainda mais certeza de você.&rdquo; 💕
        </motion.p>
      </div>
    </section>
  );
}
