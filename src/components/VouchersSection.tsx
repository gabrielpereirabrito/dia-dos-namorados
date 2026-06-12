"use client";

import siteContent from "@/data/content";
import type { GiftVoucher } from "@/data/content";
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

// ─── Redeemed state ───

interface RedeemedInfo {
  at: string; // ISO timestamp
}

function loadRedeemed(): Record<string, RedeemedInfo> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem("vouchers_redeemed") ?? "{}");
  } catch {
    return {};
  }
}

function saveRedeemed(data: Record<string, RedeemedInfo>) {
  localStorage.setItem("vouchers_redeemed", JSON.stringify(data));
}

// ─── Voucher Card ───

interface VoucherCardProps {
  voucher: GiftVoucher;
  redeemButtonText: string;
  redeemedLabel: string;
  undoRedeemText?: string;
  index: number;
}

function VoucherCard({
  voucher,
  redeemButtonText,
  redeemedLabel,
  undoRedeemText,
  index,
}: VoucherCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const [redeemed, setRedeemed] = useState(false);
  const [redeemedAt, setRedeemedAt] = useState<string | null>(null);
  const [showUndo, setShowUndo] = useState(false);
  const [stamping, setStamping] = useState(false);

  // Load persisted state
  useEffect(() => {
    const load = () => {
      const data = loadRedeemed();
      if (data[voucher.id]) {
        setRedeemed(true);
        setRedeemedAt(data[voucher.id].at);
      } else {
        setRedeemed(false);
        setRedeemedAt(null);
      }
    };
    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, [voucher.id]);

  const handleRedeem = useCallback(() => {
    if (redeemed) return;
    setStamping(true);
    setTimeout(() => {
      const now = new Date().toISOString();
      setRedeemed(true);
      setRedeemedAt(now);
      setStamping(false);
      const data = loadRedeemed();
      data[voucher.id] = { at: now };
      saveRedeemed(data);
    }, 600);
  }, [redeemed, voucher.id]);

  const handleUndo = useCallback(() => {
    setRedeemed(false);
    setRedeemedAt(null);
    setShowUndo(false);
    const data = loadRedeemed();
    delete data[voucher.id];
    saveRedeemed(data);
  }, [voucher.id]);

  const formattedDate = redeemedAt
    ? new Date(redeemedAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  const accentColor = voucher.color ?? "#f43f5e";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, type: "spring", stiffness: 120 }}
      className={`relative group transition-all duration-500 ${redeemed ? "opacity-60 grayscale-[40%]" : ""}`}
      onMouseEnter={() => redeemed && setShowUndo(true)}
      onMouseLeave={() => setShowUndo(false)}
    >
      {/* Voucher body */}
      <div
        className="relative bg-white dark:bg-white/5 border border-rose-100/30 dark:border-white/10 rounded-2xl overflow-hidden shadow-xl shadow-rose-500/5 backdrop-blur-sm"
        style={{ boxShadow: redeemed ? "none" : `0 8px 32px ${accentColor}22` }}
      >
        {/* Left punch holes — ticket style */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-evenly pl-1 gap-1">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ background: "var(--background)", boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.05)" }}
            />
          ))}
        </div>

        {/* Right punch holes */}
        <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-evenly pr-1 gap-1">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ background: "var(--background)", boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.05)" }}
            />
          ))}
        </div>

        {/* Serrated top edge */}
        <div
          className="absolute top-0 left-0 right-0 h-1 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 0%, transparent 3px, ${accentColor}33 3px)`,
            backgroundSize: "12px 6px",
          }}
        />

        {/* Color bar accent */}
        <div
          className="h-1.5 w-full"
          style={{ background: `linear-gradient(90deg, ${accentColor}cc, ${accentColor}66)` }}
        />

        {/* Content */}
        <div className="px-8 py-6 flex flex-col items-center gap-3 text-center">
          {/* Icon */}
          <motion.div
            animate={!redeemed ? { rotate: [0, -8, 8, 0], scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
            className="text-4xl sm:text-5xl select-none"
            style={{ filter: redeemed ? "grayscale(1)" : "none" }}
          >
            {voucher.icon}
          </motion.div>

          {/* Title */}
          <h3
            className="font-[family-name:var(--font-playfair-display)] text-xl font-bold"
            style={{ color: redeemed ? "var(--foreground)" : accentColor }}
          >
            {voucher.title}
          </h3>

          {/* Description */}
          <p className="text-rose-800/80 dark:text-rose-200/80 text-sm leading-relaxed">
            {voucher.description}
          </p>

          {/* Dashed divider */}
          <div className="w-full border-t border-dashed border-rose-200/40 dark:border-white/10 my-1" />

          {/* Redeem info or button */}
          {formattedDate && (
            <p className="text-rose-800/60 dark:text-rose-200/60 text-xs">Resgatado em {formattedDate}</p>
          )}

          {!redeemed && (
            <motion.button
              id={`voucher-redeem-${voucher.id}`}
              onClick={handleRedeem}
              disabled={stamping}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="mt-1 px-6 py-2.5 rounded-full text-white text-sm font-semibold shadow-md cursor-pointer transition-all disabled:opacity-60 relative overflow-hidden group/btn"
              style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}bb)` }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-600 ease-in-out" />
              <span className="relative">{redeemButtonText} 🎟️</span>
            </motion.button>
          )}
        </div>

        {/* Serrated bottom edge */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 100%, transparent 3px, ${accentColor}33 3px)`,
            backgroundSize: "12px 6px",
          }}
        />

        {/* REDEEMED STAMP OVERLAY */}
        <AnimatePresence>
          {(redeemed || stamping) && (
            <motion.div
              key="stamp"
              initial={{ scale: 3, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: -15 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="relative">
                <div
                  className="px-5 py-2 border-4 rounded-md text-lg font-black tracking-widest uppercase"
                  style={{
                    borderColor: "#dc2626cc",
                    color: "#dc2626cc",
                    fontFamily: "monospace",
                    boxShadow: "inset 0 0 0 2px #dc262622",
                    background: "transparent",
                    transform: "rotate(-15deg)",
                  }}
                >
                  {redeemedLabel}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Undo button on hover (for redeemed cards) */}
      <AnimatePresence>
        {redeemed && showUndo && undoRedeemText && (
          <motion.button
            id={`voucher-undo-${voucher.id}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            onClick={handleUndo}
            className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-foreground/40 hover:text-rose-400 cursor-pointer transition-colors bg-transparent border-none"
          >
            ↩ {undoRedeemText}
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Section ───

export default function VouchersSection() {
  const { vouchers } = siteContent;

  // Limpa todos os resgates do localStorage na primeira renderização (podes comentar isto depois)
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("vouchers_redeemed");
      // Despacha um evento customizado para que os componentes dos cartões atualizem o seu estado interno
      window.dispatchEvent(new Event("storage"));
    }
  }, []);

  return (
    <section id="vouchers" className="relative py-24 md:py-32 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--gold-100)_0%,_transparent_60%)] opacity-15 dark:opacity-5 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <SectionHeader title={vouchers.sectionTitle} subtitle={vouchers.sectionSubtitle} />

        {/* Voucher grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {vouchers.vouchers.map((voucher, i) => (
            <VoucherCard
              key={voucher.id}
              voucher={voucher}
              redeemButtonText={vouchers.redeemButtonText}
              redeemedLabel={vouchers.redeemedLabel}
              undoRedeemText={vouchers.undoRedeemText}
              index={i}
            />
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16 text-foreground/30 text-sm italic"
        >
          Cada vale é uma promessa feita com todo o amor do mundo. 🎀
        </motion.p>
      </div>
    </section>
  );
}
