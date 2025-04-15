"use client";

import { SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";

export default function CtaSection() {
    return (
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
    );
} 