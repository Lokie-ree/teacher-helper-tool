"use client";

import { SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { RetroGrid } from "@/components/magicui/retro-grid";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";

export default function HeroSection() {
  return (
    <section id="hero" className="relative isolate overflow-hidden min-h-screen flex flex-col justify-center">
      <MaxWidthWrapper>
        <div className="text-center md:py-24 lg:py-32">
          <RetroGrid className="absolute inset-0 z-[-1]" />
          <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1">
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Organize Your Digital Classroom
            </h1>
          </AnimatedShinyText>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mx-auto mt-6 max-w-[600px] text-lg text-muted-foreground sm:text-xl"
          >
            Spend less time searching, more time teaching. Your central hub for virtual resources.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <SignedOut>
              <SignUpButton mode="modal">
                 <Button size="lg" className="w-full sm:w-auto">Get Started Free</Button>
              </SignUpButton>
              <Link href="#features" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">Learn More</Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard" className="w-full sm:w-auto">
                 <Button size="lg" className="w-full">Go to Dashboard</Button>
              </Link>
              <Link href="#features" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full">Learn More</Button>
              </Link>
            </SignedIn>
          </motion.div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
} 