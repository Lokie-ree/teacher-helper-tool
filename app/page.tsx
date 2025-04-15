"use client";

import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CtaSection from "@/components/CtaSection";

export default function LandingPage() {
  return (
    <>
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
    </>
  );
}

// Placeholder components for Terms and Privacy pages (or link to actual pages)
// You might want to create these as separate files later
// e.g., app/terms/page.tsx and app/privacy/page.tsx

// Example inline placeholder:
// const TermsPage = () => <div>Terms of Service Placeholder</div>;
// const PrivacyPage = () => <div>Privacy Policy Placeholder</div>; 