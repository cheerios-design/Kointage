"use client";

import { MainLayout } from "@/layouts/MainLayout";
import { Hero } from "@/components/Hero";
import { VerifiedListings } from "@/components/VerifiedListings";
import { TradingFeatures } from "@/components/TradingFeatures";
import { AIInsights } from "@/components/AIInsights";

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <VerifiedListings />
      <TradingFeatures />
      <AIInsights />
    </MainLayout>
  );
}
