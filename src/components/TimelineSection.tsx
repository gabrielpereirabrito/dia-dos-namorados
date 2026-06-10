"use client";

import siteContent from "@/data/content";
import type { Moment } from "@/data/content";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

// ─── Section Header with text reveal ───

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
      className="text-center mb-16 md:mb-20"
    >
      {/* Decorative accent — animated lines */}
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

// ─── Timeline Card with image parallax ───

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

  // Scroll-linked parallax for the image
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.98]);

  // Format date in Portuguese
  const formattedDate = new Date(moment.date).toLocaleDateString("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -50 : 50, y: 30 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-10 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Image with parallax */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="relative w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shadow-xl shadow-rose-500/10 group"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <Image
            src={moment.image}
            alt={moment.imageAlt}
            fill
            className="object-cover transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>

        {/* Hover overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Decorative corner frame */}
        <div className="absolute inset-3 border border-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </motion.div>

      {/* Content with staggered children */}
      <div
        className={`w-full md:w-1/2 space-y-4 ${
          isEven ? "md:text-left" : "md:text-right"
        } text-center`}
      >
        {/* Date badge */}
        <motion.span
          initial={{ opacity: 0, scale: 0.7, y: 10 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
          className="inline-block px-4 py-1.5 text-xs font-medium rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20 backdrop-blur-sm"
        >
          {formattedDate}
        </motion.span>

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="font-[family-name:var(--font-playfair-display)] text-2xl sm:text-3xl font-bold text-foreground"
        >
          {moment.title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-foreground/60 leading-relaxed text-sm sm:text-base"
        >
          {moment.description}
        </motion.p>
      </div>
    </motion.div>
  );
}

// ─── Timeline Connector with pulse effect ───

function TimelineConnector() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="flex justify-center py-6 md:py-10">
      <motion.div
        initial={{ height: 0 }}
        animate={isInView ? { height: 56 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-px bg-gradient-to-b from-rose-400/40 via-rose-300/20 to-rose-400/40 relative"
      >
        {/* Top dot */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="absolute -top-1.5 -left-1 w-2.5 h-2.5 rounded-full bg-rose-400/30 border border-rose-400/50"
        />
        {/* Bottom dot with pulse */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="absolute -bottom-1.5 -left-1.5 w-3 h-3 rounded-full bg-rose-400/50 border-2 border-background"
        >
          <motion.div
            animate={{ scale: [1, 1.8, 1.8], opacity: [0.5, 0, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 rounded-full bg-rose-400/30"
          />
        </motion.div>
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
