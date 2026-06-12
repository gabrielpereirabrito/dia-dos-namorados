"use client";

import siteContent from "@/data/content";
import type { LoveNote } from "@/data/content";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Section Header ───

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

// ─── Fisher-Yates shuffle ───

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Jar SVG ───

function JarIllustration({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      viewBox="0 0 120 150"
      className="w-36 h-44 sm:w-44 sm:h-56 drop-shadow-2xl"
      aria-hidden="true"
    >
      {/* Lid */}
      <motion.rect
        x="22"
        y="12"
        width="76"
        height="18"
        rx="5"
        fill="#f9a8d4"
        animate={isOpen ? { y: -8, rotate: -6 } : { y: 0, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        style={{ originX: "60px", originY: "20px" }}
      />
      {/* Lid top highlight */}
      <rect x="30" y="14" width="60" height="6" rx="3" fill="#fbcfe8" opacity="0.6" />

      {/* Body */}
      <path
        d="M18 30 Q16 80 18 130 Q18 142 60 142 Q102 142 102 130 Q104 80 102 30 Z"
        fill="#fce7f3"
        stroke="#f9a8d4"
        strokeWidth="2"
      />
      {/* Glass shine */}
      <path
        d="M28 38 Q26 80 28 118"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M38 36 Q37 65 38 95"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.3"
      />

      {/* Notes inside jar */}
      <motion.g
        animate={isOpen ? { y: -6, opacity: 1 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <rect x="38" y="95" width="22" height="16" rx="3" fill="#fda4af" transform="rotate(-8,49,103)" />
        <rect x="62" y="92" width="20" height="14" rx="3" fill="#f9a8d4" transform="rotate(5,72,99)" />
        <rect x="45" y="108" width="24" height="15" rx="3" fill="#fbcfe8" transform="rotate(-3,57,116)" />
        <rect x="34" y="112" width="18" height="13" rx="3" fill="#fda4af" transform="rotate(10,43,119)" />
        <rect x="66" y="107" width="19" height="14" rx="3" fill="#f472b6" transform="rotate(-5,76,114)" />
      </motion.g>

      {/* Jar neck */}
      <path d="M20 28 Q20 32 18 32 M100 28 Q100 32 102 32" stroke="#f9a8d4" strokeWidth="2" fill="none" />
    </svg>
  );
}

// ─── Note Ticket ───

function NoteTicket({ note, onNext, nextText }: { note: LoveNote; onNext: () => void; nextText: string }) {
  return (
    <motion.div
      key={note.id}
      initial={{ opacity: 0, y: 60, scale: 0.8, rotate: -4 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, y: -40, scale: 0.85, rotate: 4 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="relative w-full max-w-sm mx-auto"
    >
      {/* Paper texture card */}
      <div className="relative bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/60 dark:to-pink-950/60 border border-rose-200/40 dark:border-rose-700/30 rounded-2xl p-8 shadow-2xl shadow-rose-500/15 overflow-hidden">
        {/* Ruled lines decoration */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute left-8 right-8 h-px bg-rose-200/40 dark:bg-rose-800/40"
            style={{ top: `${50 + i * 22}px` }}
          />
        ))}

        {/* Decorative hearts corner */}
        <div className="absolute top-3 right-4 text-rose-400/50 text-lg select-none">💕</div>
        <div className="absolute bottom-3 left-4 text-rose-400/40 text-sm select-none">♥</div>

        {/* Hole punch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-rose-300/50 dark:border-rose-700/50" />

        {/* Message */}
        <p className="relative font-[family-name:var(--font-playfair-display)] text-rose-800 dark:text-rose-200 text-lg sm:text-xl leading-relaxed text-center mt-4 italic">
          &ldquo;{note.message}&rdquo;
        </p>

        {/* Fold crease effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/5 pointer-events-none rounded-2xl" />
      </div>

      {/* Next button */}
      <motion.button
        id="love-jar-next-btn"
        onClick={onNext}
        whileHover={{ scale: 1.04, boxShadow: "0 16px 40px rgba(244,63,94,0.3)" }}
        whileTap={{ scale: 0.96 }}
        className="mt-6 w-full py-3 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 text-white font-semibold text-sm shadow-lg shadow-rose-500/20 cursor-pointer relative overflow-hidden group"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600 ease-in-out" />
        <span className="relative">{nextText}</span>
      </motion.button>
    </motion.div>
  );
}

// ─── Main Section ───

type JarState = "idle" | "opening" | "open";

export default function LoveJarSection() {
  const { loveJar } = siteContent;

  const [state, setState] = useState<JarState>("idle");
  const [deck, setDeck] = useState<LoveNote[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalRevealed, setTotalRevealed] = useState(0);

  // Build initial shuffled deck
  useEffect(() => {
    setDeck(shuffle(loveJar.notes));
  }, [loveJar.notes]);

  const currentNote = deck[currentIndex];

  const openJar = useCallback(() => {
    if (state !== "idle") return;
    setState("opening");
    setTimeout(() => {
      setState("open");
      setTotalRevealed((prev) => Math.max(prev, 1));
    }, 500);
  }, [state]);

  const nextNote = useCallback(() => {
    const nextIdx = currentIndex + 1;
    if (nextIdx >= deck.length) {
      // Reshuffle
      setDeck(shuffle(loveJar.notes));
      setCurrentIndex(0);
    } else {
      setCurrentIndex(nextIdx);
    }
    setTotalRevealed((prev) => prev + 1);
  }, [currentIndex, deck.length, loveJar.notes]);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section id="love-jar" className="relative py-24 md:py-32 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--blush-50)_0%,_transparent_60%)] opacity-30 dark:opacity-5 pointer-events-none" />

      <div ref={sectionRef} className="relative max-w-3xl mx-auto">
        <SectionHeader title={loveJar.sectionTitle} subtitle={loveJar.sectionSubtitle} />

        {/* Jar + interaction */}
        <div className="flex flex-col items-center gap-8">
          {/* Jar with click to open */}
          <motion.button
            id="love-jar-btn"
            onClick={openJar}
            disabled={state !== "idle"}
            className="relative flex flex-col items-center gap-4 group cursor-pointer disabled:cursor-default bg-transparent border-none p-0"
            whileHover={state === "idle" ? { scale: 1.06 } : {}}
            whileTap={state === "idle" ? { scale: 0.96 } : {}}
            aria-label="Tirar bilhete do potinho"
          >
            {/* Glow behind jar */}
            <motion.div
              animate={
                state === "idle"
                  ? { scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }
                  : { scale: 1.2, opacity: 0.7 }
              }
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-rose-400/20 blur-2xl pointer-events-none"
            />

            <JarIllustration isOpen={state !== "idle"} />

            {state === "idle" && (
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
                className="text-sm text-foreground/50 italic flex items-center gap-2"
              >
                <span className="text-rose-400">✨</span>
                {loveJar.clickPrompt}
                <span className="text-rose-400">✨</span>
              </motion.span>
            )}
          </motion.button>

          {/* Counter */}
          {totalRevealed > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-foreground/35 tracking-wide"
            >
              {totalRevealed} de {loveJar.notes.length} bilhetes revelados
            </motion.p>
          )}

          {/* Note reveal */}
          <AnimatePresence mode="wait">
            {state === "open" && currentNote && (
              <NoteTicket
                key={currentNote.id + currentIndex}
                note={currentNote}
                onNext={nextNote}
                nextText={loveJar.nextNoteText}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
