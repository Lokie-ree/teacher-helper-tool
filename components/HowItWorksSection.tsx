"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function HowItWorksSection() {
    return (
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
                {/* Placeholder content - replace with actual steps */}
                <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                  <h3 className="text-lg font-semibold mb-2">Step 1</h3>
                  <p className="text-muted-foreground">Upload your resources securely.</p>
                </div>
                <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                  <h3 className="text-lg font-semibold mb-2">Step 2</h3>
                  <p className="text-muted-foreground">Organize and tag for easy access.</p>
                </div>
                <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                  <h3 className="text-lg font-semibold mb-2">Step 3</h3>
                  <p className="text-muted-foreground">Find what you need instantly.</p>
                </div>
              </div>
            </div>
          </MaxWidthWrapper>
        </section>
    );
} 