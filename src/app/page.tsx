"use client";

import HeroSection from "@/components/HeroSection";
import TimelineSection from "@/components/TimelineSection";
import GallerySection from "@/components/GallerySection";
import LoveCardSection from "@/components/LoveCardSection";
import SurpriseSection from "@/components/SurpriseSection";
import SectionDivider from "@/components/SectionDivider";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <main className="flex flex-col">
        <HeroSection />
        <SectionDivider variant="hearts" />
        <TimelineSection />
        <SectionDivider variant="stars" />
        <GallerySection />
        <SectionDivider variant="hearts" />
        <LoveCardSection />
        <SectionDivider variant="stars" />
        <SurpriseSection />
        <Footer />
      </main>
    </>
  );
}
