"use client";

import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { RetroGrid } from "@/components/magicui/retro-grid";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { FileTextIcon, MagnifyingGlassIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

// Example feature data - replace with your actual features
const features = [
  {
    Icon: FileTextIcon,
    name: "Resource Hub",
    description: "Upload, tag, and manage all your digital teaching materials.",
    href: "#",
    cta: "Explore Hub",
    background: <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full transform-gpu [mask-image:linear-gradient(to_bottom,transparent,white)]"></div>,
    className: "col-span-3 lg:col-span-1",
  },
  {
    Icon: MagnifyingGlassIcon,
    name: "Smart Search",
    description: "Quickly find the exact resource you need with powerful filters.",
    href: "#",
    cta: "Try Search",
    background: <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full transform-gpu [mask-image:linear-gradient(to_bottom,transparent,white)]"></div>,
    className: "col-span-3 lg:col-span-1",
  },
  {
    Icon: EyeOpenIcon,
    name: "Easy Previews",
    description: "Preview documents, images, and presentations directly in the app.",
    href: "#",
    cta: "See Previews",
    background: <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full transform-gpu [mask-image:linear-gradient(to_bottom,transparent,white)]"></div>,
    className: "col-span-3 lg:col-span-1",
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <MaxWidthWrapper>
          <div className="flex h-14 items-center justify-between">
            <div className="flex md:flex-1">
              <Link href="/" className="flex items-center space-x-2">
                {/* <Icons.logo className="h-6 w-6" /> TODO: Add logo */}
                <span className="font-bold">
                  Virtual Teacher Assistant
                </span>
              </Link>
              <nav className="hidden md:flex items-center space-x-6 ml-6">
                <Link href="#features" className="text-sm font-medium hover:text-primary">Features</Link>
                <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">How it Works</Link>
                <Link href="#testimonials" className="text-sm font-medium hover:text-primary">Testimonials</Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="ghost" size="sm" className="hidden md:inline-flex">Sign In</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button size="sm">Sign Up</Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard">
                   <Button variant="outline" size="sm">Dashboard</Button>
                </Link>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <Button variant="ghost" size="icon" className="md:hidden">
                <span className="sr-only">Toggle menu</span>
                {/* Add menu icon here */}
              </Button>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section id="hero" className="relative isolate overflow-hidden">
          <MaxWidthWrapper>
            <div className="py-16 md:py-24 lg:py-32 text-center">
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

        {/* Features Section */}
        <section id="features" className="bg-secondary">
          <MaxWidthWrapper>
            <div className="py-16 md:py-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Streamline Your Workflow
                </h2>
                <p className="mt-4 text-muted-foreground mx-auto max-w-[600px]">
                  Everything you need, right where you need it.
                </p>
              </motion.div>

              <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.4, duration: 0.5 }}
                 viewport={{ once: true }}
                 className="mt-12"
              >
                <BentoGrid className="auto-rows-[20rem]">
                  {features.map((feature) => (
                    <BentoCard key={feature.name} {...feature} />
                  ))}
                </BentoGrid>
              </motion.div>
            </div>
          </MaxWidthWrapper>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works">
          <MaxWidthWrapper>
            <div className="py-16 md:py-24">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  How It Works
                </h2>
                <p className="mt-4 text-muted-foreground mx-auto max-w-[600px]">
                  Explain the process in simple steps.
                </p>
              </div>
              <div className="mt-12 grid gap-8 md:grid-cols-3">
                <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                  <h3 className="text-lg font-semibold mb-2">Step 1</h3>
                  <p className="text-muted-foreground">Step 1 Info</p>
                </div>
                <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                  <h3 className="text-lg font-semibold mb-2">Step 2</h3>
                  <p className="text-muted-foreground">Step 2 Info</p>
                </div>
                <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                  <h3 className="text-lg font-semibold mb-2">Step 3</h3>
                  <p className="text-muted-foreground">Step 3 Info</p>
                </div>
              </div>
            </div>
          </MaxWidthWrapper>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="bg-secondary">
          <MaxWidthWrapper>
            <div className="py-16 md:py-24">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  What Teachers Say
                </h2>
                <p className="mt-4 text-muted-foreground mx-auto max-w-[600px]">
                  Hear from educators who use our platform every day.
                </p>
              </div>
              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                  <blockquote className="text-muted-foreground">Quote 1</blockquote>
                </div>
                <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                  <blockquote className="text-muted-foreground">Quote 2</blockquote>
                </div>
                <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                  <blockquote className="text-muted-foreground">Quote 3</blockquote>
                </div>
              </div>
            </div>
          </MaxWidthWrapper>
        </section>

        {/* CTA Section */}
        <section id="cta">
          <MaxWidthWrapper>
            <div className="py-16 md:py-24">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Ready to Get Started?
                </h2>
                <p className="mt-4 text-muted-foreground mx-auto max-w-[600px]">
                  Join now and streamline your virtual teaching workflow.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                  <SignedOut>
                    <SignUpButton mode="modal">
                      <Button size="lg" className="w-full sm:w-auto">Sign Up for Free</Button>
                    </SignUpButton>
                  </SignedOut>
                  <SignedIn>
                    <Link href="/dashboard" className="w-full sm:w-auto">
                      <Button size="lg" className="w-full">Go to Dashboard</Button>
                    </Link>
                  </SignedIn>
                </div>
              </div>
            </div>
          </MaxWidthWrapper>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted">
        <MaxWidthWrapper>
          <div className="py-6 md:py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground text-center md:text-left">
                © {new Date().getFullYear()} Virtual Teacher Assistant. All rights reserved.
              </p>
              <nav className="flex gap-6">
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms
                </Link>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy
                </Link>
              </nav>
            </div>
          </div>
        </MaxWidthWrapper>
      </footer>
    </div>
  );
}

// Placeholder components for Terms and Privacy pages (or link to actual pages)
// You might want to create these as separate files later
// e.g., app/terms/page.tsx and app/privacy/page.tsx

// Example inline placeholder:
// const TermsPage = () => <div>Terms of Service Placeholder</div>;
// const PrivacyPage = () => <div>Privacy Policy Placeholder</div>; 