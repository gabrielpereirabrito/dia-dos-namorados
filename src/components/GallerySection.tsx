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
  ModalHeading,
} from "@heroui/react";
import { motion, useInView } from "motion/react";
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
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className="text-center mb-16 md:mb-20"
    >
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-rose-400/50" />
        <span className="text-rose-400/60 text-sm">✦</span>
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
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <motion.button
        id={`gallery-photo-${photo.id}`}
        onClick={onClick}
        whileHover={{ y: -6, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`relative ${aspect} w-full rounded-2xl overflow-hidden shadow-lg shadow-rose-500/5 hover:shadow-xl hover:shadow-rose-500/15 transition-shadow duration-300 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-400/50 focus:ring-offset-2 focus:ring-offset-background`}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Hover overlay with caption */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          {photo.caption && (
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              className="text-white text-sm font-medium leading-snug"
            >
              {photo.caption}
            </motion.p>
          )}
        </div>

        {/* Corner zoom icon */}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </motion.button>
    </motion.div>
  );
}

// ─── Photo Modal ───

function PhotoModal({
  photo,
  isOpen,
  onClose,
}: {
  photo: GalleryPhoto | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!photo) return null;

  return (
    <Modal isOpen={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <ModalBackdrop className="bg-black/80 backdrop-blur-md" isDismissable>
        <ModalContainer size="lg" placement="center">
          <ModalDialog className="bg-transparent shadow-none p-0 max-w-4xl mx-auto">
            <ModalHeader className="absolute top-2 right-2 z-10 p-0">
              <ModalCloseTrigger className="text-white/70 hover:text-white bg-black/30 backdrop-blur-sm rounded-full" />
            </ModalHeader>

            <ModalBody className="p-0">
              <div className="relative rounded-2xl overflow-hidden">
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
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white text-lg font-medium text-center">
                      {photo.caption}
                    </p>
                  </div>
                )}
              </div>
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
      />
    </section>
  );
}
