"use client";

import siteContent from "@/data/content";
import type { GalleryPhoto } from "@/data/content";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseTrigger,
  ModalContainer,
  ModalDialog,
  ModalHeader,
} from "@heroui/react";
import { AnimatePresence, motion, useInView, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";

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
      className="text-center mb-16 md:mb-20"
    >
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
          ✦
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

// ─── Gallery Photo Card ───

function PhotoCard({
  photo,
  index,
  onClick,
}: {
  photo: GalleryPhoto;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  // Subtle parallax per card
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [15, -15]);

  // Staggered aspect ratios for visual interest
  const aspectVariants = [
    "aspect-[3/4]",
    "aspect-square",
    "aspect-[4/3]",
    "aspect-[3/4]",
    "aspect-[4/3]",
    "aspect-square",
  ];
  const aspect = aspectVariants[index % aspectVariants.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ y }}
    >
      <motion.button
        id={`gallery-photo-${photo.id}`}
        onClick={onClick}
        whileHover={{ y: -8, scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`relative ${aspect} w-full rounded-2xl overflow-hidden shadow-lg shadow-rose-500/5 hover:shadow-2xl hover:shadow-rose-500/20 transition-shadow duration-500 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-400/50 focus:ring-offset-2 focus:ring-offset-background`}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Hover overlay with caption */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-4">
          {photo.caption && (
            <p className="text-white text-sm font-medium leading-snug transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              {photo.caption}
            </p>
          )}
        </div>

        {/* Corner zoom icon */}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </motion.button>
    </motion.div>
  );
}

// ─── Photo Modal with Motion transitions ───

function PhotoModal({
  photo,
  isOpen,
  onClose,
  photos,
  onNavigate,
}: {
  photo: GalleryPhoto | null;
  isOpen: boolean;
  onClose: () => void;
  photos: GalleryPhoto[];
  onNavigate: (photo: GalleryPhoto) => void;
}) {
  if (!photo) return null;

  const currentIndex = photos.findIndex((p) => p.id === photo.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < photos.length - 1;

  return (
    <Modal isOpen={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <ModalBackdrop className="bg-black/85 backdrop-blur-lg" isDismissable>
        <ModalContainer size="lg" placement="center">
          <ModalDialog className="bg-transparent shadow-none p-0 max-w-4xl mx-auto">
            <ModalHeader className="absolute top-3 right-3 z-20 p-0">
              <ModalCloseTrigger className="text-white/70 hover:text-white bg-black/40 backdrop-blur-sm rounded-full" />
            </ModalHeader>

            <ModalBody className="p-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="relative rounded-2xl overflow-hidden"
                >
                  {/* Full-size image */}
                  <div className="relative w-full max-h-[80vh] overflow-hidden">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      width={1200}
                      height={800}
                      className="w-full h-auto object-contain max-h-[80vh]"
                      sizes="(max-width: 1024px) 100vw, 80vw"
                      priority
                    />
                  </div>

                  {/* Caption overlay */}
                  {photo.caption && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent"
                    >
                      <p className="text-white text-lg font-medium text-center font-[family-name:var(--font-playfair-display)]">
                        {photo.caption}
                      </p>
                      <p className="text-white/40 text-xs text-center mt-1">
                        {currentIndex + 1} / {photos.length}
                      </p>
                    </motion.div>
                  )}

                  {/* Navigation arrows */}
                  {hasPrev && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate(photos[currentIndex - 1]);
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-all z-10"
                      aria-label="Foto anterior"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  )}
                  {hasNext && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate(photos[currentIndex + 1]);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-all z-10"
                      aria-label="Próxima foto"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                </motion.div>
              </AnimatePresence>
            </ModalBody>
          </ModalDialog>
        </ModalContainer>
      </ModalBackdrop>
    </Modal>
  );
}

// ─── Main Section ───

export default function GallerySection() {
  const { gallery } = siteContent;
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openPhoto = (photo: GalleryPhoto) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedPhoto(null), 300);
  };

  const navigatePhoto = (photo: GalleryPhoto) => {
    setSelectedPhoto(photo);
  };

  return (
    <section
      id="gallery"
      className="relative py-24 md:py-32 px-6"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--rose-50)_0%,_transparent_60%)] opacity-20 dark:opacity-5 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <SectionHeader
          title={gallery.sectionTitle}
          subtitle={gallery.sectionSubtitle}
        />

        {/* Masonry-like grid */}
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {gallery.photos.map((photo, index) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              index={index}
              onClick={() => openPhoto(photo)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <PhotoModal
        photo={selectedPhoto}
        isOpen={isModalOpen}
        onClose={closeModal}
        photos={gallery.photos}
        onNavigate={navigatePhoto}
      />
    </section>
  );
}
