"use client";

import HeroSection from "@/components/HeroSection";
import CounterSection from "@/components/CounterSection";
import TimelineSection from "@/components/TimelineSection";
import GallerySection from "@/components/GallerySection";
import LoveJarSection from "@/components/LoveJarSection";
import VouchersSection from "@/components/VouchersSection";
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
        <CounterSection />
        <SectionDivider variant="stars" />
        <TimelineSection />
        <SectionDivider variant="stars" />
        <GallerySection />
        <SectionDivider variant="hearts" />
        <LoveJarSection />
        <SectionDivider variant="stars" />
        <VouchersSection />
        <SectionDivider variant="hearts" />
        <LoveCardSection />
        <SectionDivider variant="stars" />
        <SurpriseSection />
        <Footer />
      </main>
    </>
  );
}
