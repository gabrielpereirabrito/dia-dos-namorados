"use client";

import siteContent from "@/data/content";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <footer
      ref={ref}
      className="relative py-16 px-6 text-center border-t border-rose-200/10"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto space-y-4"
      >
        <p className="font-[family-name:var(--font-playfair-display)] text-lg text-foreground/40 italic">
          Feito com ❤️ para quem eu mais amo
        </p>
        <p className="text-sm text-foreground/20">
          {siteContent.meta.coupleNames} • {new Date().getFullYear()}
        </p>
      </motion.div>
    </footer>
  );
}
