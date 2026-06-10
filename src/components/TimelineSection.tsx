"use client";

import siteContent from "@/data/content";
import type { Moment } from "@/data/content";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

// ─── Section Header ───

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className="text-center mb-16 md:mb-20"
    >
      {/* Decorative accent */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-rose-400/50" />
        <span className="text-rose-400/60 text-sm">♥</span>
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-rose-400/50" />
      </div>

      <h2 className="font-[family-name:var(--font-playfair-display)] text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 via-pink-500 to-rose-400 bg-clip-text text-transparent mb-4">
        {title}
      </h2>
      <p className="text-foreground/50 text-base sm:text-lg max-w-md mx-auto">
        {subtitle}
      </p>
    </motion.div>
  );
}

// ─── Timeline Card ───

function TimelineCard({
  moment,
  index,
}: {
  moment: Moment;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const isEven = index % 2 === 0;

  // Format date in Portuguese
  const formattedDate = new Date(moment.date).toLocaleDateString("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
      className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-10 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Image */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
        className="relative w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shadow-xl shadow-rose-500/10 group"
      >
        <Image
          src={moment.image}
          alt={moment.imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>

      {/* Content */}
      <div
        className={`w-full md:w-1/2 space-y-3 ${
          isEven ? "md:text-left" : "md:text-right"
        } text-center`}
      >
        {/* Date badge */}
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20"
        >
          {formattedDate}
        </motion.span>

        <h3 className="font-[family-name:var(--font-playfair-display)] text-2xl sm:text-3xl font-bold text-foreground">
          {moment.title}
        </h3>

        <p className="text-foreground/60 leading-relaxed text-sm sm:text-base">
          {moment.description}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Timeline Connector ───

function TimelineConnector() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="flex justify-center py-4 md:py-8">
      <motion.div
        initial={{ height: 0 }}
        animate={isInView ? { height: 48 } : {}}
        transition={{ duration: 0.5 }}
        className="w-px bg-gradient-to-b from-rose-400/40 to-rose-400/10 relative"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="absolute -bottom-1.5 -left-1.5 w-3 h-3 rounded-full bg-rose-400/50 border-2 border-background"
        />
      </motion.div>
    </div>
  );
}

// ─── Main Section ───

export default function TimelineSection() {
  const { timeline } = siteContent;

  return (
    <section
      id="timeline"
      className="relative py-24 md:py-32 px-6"
    >
      {/* Background subtle decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--rose-50)_0%,_transparent_50%)] opacity-30 dark:opacity-5 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        <SectionHeader
          title={timeline.sectionTitle}
          subtitle={timeline.sectionSubtitle}
        />

        {/* Timeline items */}
        <div className="space-y-0">
          {timeline.moments.map((moment, index) => (
            <div key={moment.id}>
              <TimelineCard moment={moment} index={index} />
              {index < timeline.moments.length - 1 && <TimelineConnector />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
