"use client";

import HeroSection from "@/components/HeroSection";
import TimelineSection from "@/components/TimelineSection";
import GallerySection from "@/components/GallerySection";
import LoveCardSection from "@/components/LoveCardSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <TimelineSection />
      <GallerySection />
      <LoveCardSection />
      <Footer />
    </main>
  );
}
